"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { Environment } from "@react-three/drei";

/* ---------- Seeded RNG so positions are stable ---------- */
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ---------- Build the two point states once ---------- */
function buildStates(seed: number, count: number) {
  const rand = mulberry32(seed);
  const raw: THREE.Vector3[] = [];
  const compressed: THREE.Vector3[] = [];
  const speeds: number[] = [];
  const phases: number[] = [];

  // We'll decide which points survive the compression (~30%) and which fade
  const survival: number[] = [];

  for (let i = 0; i < count; i++) {
    // RAW: distribute on a thick spherical shell
    const r = 1.7 + rand() * 0.7;
    const theta = rand() * Math.PI * 2;
    const phi = Math.acos(2 * rand() - 1);
    const rawPos = new THREE.Vector3(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    );
    raw.push(rawPos);

    // COMPRESSED: 30% of points survive, pulled into a smaller, denser form
    const survives = rand() < 0.3;
    survival.push(survives ? 1 : 0);

    if (survives) {
      const cr = 0.8 + rand() * 0.4;
      const ctheta = rand() * Math.PI * 2;
      const cphi = Math.acos(2 * rand() - 1);
      const compressedPos = new THREE.Vector3(
        cr * Math.sin(cphi) * Math.cos(ctheta),
        cr * Math.sin(cphi) * Math.sin(ctheta),
        cr * Math.cos(cphi)
      );
      compressed.push(compressedPos);
    } else {
      compressed.push(rawPos.clone()); // unused — will be hidden
    }

    speeds.push(0.15 + rand() * 0.35);
    phases.push(rand() * Math.PI * 2);
  }

  return { raw, compressed, survival, speeds, phases };
}

/* ---------- Build connection edges based on proximity in RAW state ---------- */
function buildEdges(raw: THREE.Vector3[], maxDist: number) {
  const positions: number[] = [];
  for (let i = 0; i < raw.length; i++) {
    for (let j = i + 1; j < raw.length; j++) {
      const d = raw[i].distanceTo(raw[j]);
      if (d < maxDist) {
        positions.push(raw[i].x, raw[i].y, raw[i].z);
        positions.push(raw[j].x, raw[j].y, raw[j].z);
      }
    }
  }
  return new Float32Array(positions);
}

/* ---------- The actual 3D content ---------- */
function PointsCloud({
  states,
  cycle,
  pointer,
}: {
  states: ReturnType<typeof buildStates>;
  cycle: { current: number };
  pointer: { current: { x: number; y: number; active: boolean } };
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(states.raw.length * 3);
    for (let i = 0; i < states.raw.length; i++) {
      arr[i * 3 + 0] = states.raw[i].x;
      arr[i * 3 + 1] = states.raw[i].y;
      arr[i * 3 + 2] = states.raw[i].z;
    }
    return arr;
  }, [states]);

  const edgePositions = useMemo(
    () => buildEdges(states.raw, 0.7),
    [states]
  );

  // Color attribute (ink for points, faint ink for edges)
  const pointColors = useMemo(() => {
    const arr = new Float32Array(states.raw.length * 3);
    const ink = new THREE.Color("#0B0B0C");
    for (let i = 0; i < states.raw.length; i++) {
      arr[i * 3 + 0] = ink.r;
      arr[i * 3 + 1] = ink.g;
      arr[i * 3 + 2] = ink.b;
    }
    return arr;
  }, [states]);

  const edgeColors = useMemo(() => {
    const arr = new Float32Array((edgePositions.length / 3) * 3);
    const ink = new THREE.Color("#0B0B0C");
    for (let i = 0; i < arr.length; i += 3) {
      arr[i + 0] = ink.r;
      arr[i + 1] = ink.g;
      arr[i + 2] = ink.b;
    }
    return arr;
  }, [edgePositions]);

  useFrame((state, delta) => {
    if (!groupRef.current || !pointsRef.current) return;

    // Rotate the group slowly
    groupRef.current.rotation.y += delta * 0.06;
    groupRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;

    // The cycle: smooth ease-in-out between 0 and 1
    const t = state.clock.elapsedTime;
    const rawT = (t % 12) / 12;
    const smooth = 0.5 - 0.5 * Math.cos(rawT * Math.PI * 2);
    cycle.current = smooth;

    // Cursor proximity in 3D — project to world
    const { camera, mouse } = state;
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    // For each point, blend raw -> compressed, add small drift, perturb if near cursor
    const posAttr = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const colAttr = pointsRef.current.geometry.attributes
      .color as THREE.BufferAttribute;

    for (let i = 0; i < states.raw.length; i++) {
      const r = states.raw[i];
      const c = states.compressed[i];
      const survives = states.survival[i];

      // Base interpolation: when cycle=0 -> raw, when cycle=1 -> compressed
      // For non-surviving points, they fade OUT (visibility = 1 - smooth) and pull in anyway
      const baseX = r.x + (c.x - r.x) * smooth;
      const baseY = r.y + (c.y - r.y) * smooth;
      const baseZ = r.z + (c.z - r.z) * smooth;

      // Gentle floating drift
      const drift =
        0.05 *
        Math.sin(t * states.speeds[i] + states.phases[i]);

      // Cursor perturbation in world space (approximate via distance to ray)
      let perturbX = 0,
        perturbY = 0,
        perturbZ = 0;
      if (pointer.current.active) {
        // Project point to screen, check distance to mouse, perturb
        const pointVec = new THREE.Vector3(baseX, baseY, baseZ);
        const projected = pointVec.clone().project(camera);
        const dx = projected.x - mouse.x;
        const dy = projected.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 0.18) {
          const strength = (1 - dist / 0.18) * 0.3;
          perturbX = dx * strength * 4;
          perturbY = -dy * strength * 4;
          perturbZ = (Math.random() - 0.5) * strength * 2;
        }
      }

      posAttr.setXYZ(
        i,
        baseX + perturbX,
        baseY + drift + perturbY,
        baseZ + perturbZ
      );

      // Color/opacity: surviving points are bright, non-surviving fade with cycle
      const visibility = survives ? 1 : 1 - smooth * 0.9;
      const cVal = 0.1 + visibility * 0.9;
      colAttr.setXYZ(i, cVal, cVal, cVal);
    }
    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;

    // Edges: also blend; fade as cycle progresses
    if (linesRef.current) {
      const linePosAttr = linesRef.current.geometry.attributes
        .position as THREE.BufferAttribute;
      const lineColAttr = linesRef.current.geometry.attributes
        .color as THREE.BufferAttribute;

      // Each edge connects two raw indices
      const totalEdges = edgePositions.length / 6;
      for (let e = 0; e < totalEdges; e++) {
        const iA = e * 2;
        const iB = e * 2 + 1;
        const rawA = states.raw[iA];
        const rawB = states.raw[iB];
        const compA = states.compressed[iA];
        const compB = states.compressed[iB];

        // If both points survive, edge remains; if either doesn't, edge fades
        const survivesA = states.survival[iA];
        const survivesB = states.survival[iB];
        const edgeVis = survivesA && survivesB ? 1 : 1 - smooth;

        const ax = rawA.x + (compA.x - rawA.x) * smooth;
        const ay = rawA.y + (compA.y - rawA.y) * smooth;
        const az = rawA.z + (compA.z - rawA.z) * smooth;
        const bx = rawB.x + (compB.x - rawB.x) * smooth;
        const by = rawB.y + (compB.y - rawB.y) * smooth;
        const bz = rawB.z + (compB.z - rawB.z) * smooth;

        linePosAttr.setXYZ(e * 2, ax, ay, az);
        linePosAttr.setXYZ(e * 2 + 1, bx, by, bz);

        const v = edgeVis * 0.18; // very faint
        lineColAttr.setXYZ(e * 2, v, v, v);
        lineColAttr.setXYZ(e * 2 + 1, v, v, v);
      }
      linePosAttr.needsUpdate = true;
      lineColAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Edges */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[edgePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[edgeColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.6}
          depthWrite={false}
        />
      </lineSegments>

      {/* Points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[pointColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          size={0.06}
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

/* ---------- Pointer tracker ---------- */
function PointerTracker({
  pointer,
}: {
  pointer: { current: { x: number; y: number; active: boolean } };
}) {
  const { gl } = useThree();
  useEffect(() => {
    const el = gl.domElement;
    const onEnter = () => (pointer.current.active = true);
    const onLeave = () => (pointer.current.active = false);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [gl, pointer]);
  return null;
}

/* ---------- Public canvas ---------- */
export default function CompressionCloud() {
  const cycle = useRef(0);
  const pointer = useRef({ x: 0, y: 0, active: false });

  const states = useMemo(() => buildStates(42, 600), []);

  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <PointerTracker pointer={pointer} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 2]} intensity={0.8} />
      <directionalLight position={[-3, -2, -1]} intensity={0.3} color="#cfd6e0" />
      <PointsCloud states={states} cycle={cycle} pointer={pointer} />
      <EffectComposer>
        <Bloom
          intensity={1.1}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.5}
          mipmapBlur
          radius={0.7}
        />
      </EffectComposer>
    </Canvas>
  );
}

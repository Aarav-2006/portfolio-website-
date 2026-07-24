"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Cursor from "../../components/Cursor";
import CornerCrosshairs from "../../components/CornerCrosshairs";
import BackgroundLayer from "../../components/BackgroundLayer";
import { SectionDivider } from "../../components/SectionLabel";
import CloudFallback from "../../components/CloudFallback";

const CompressionCloud = dynamic(
  () => import("../../components/three/CompressionCloud"),
  { ssr: false, loading: () => <CloudFallback /> }
);

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.4 + i * 0.04,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function CompressionCaseStudy() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <BackgroundLayer />
      <Cursor />
      <CornerCrosshairs />

      {/* Top nav */}
      <div className="relative z-30 mx-auto flex max-w-[1320px] items-center justify-between px-4 py-6 md:px-12 md:py-8">
        <a
          href="/"
          data-cursor-hover
          className="flex items-center gap-2"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-ink">
            <div className="h-1.5 w-1.5 rounded-full bg-ink" />
          </div>
          <span className="mono-label text-ink">AARAV</span>
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {["HOME", "NOW", "WORK", "AWARDS", "CONNECT"].map((l) => (
            <a
              key={l}
              href={`/#${l.toLowerCase()}`}
              className="mono-label text-ink transition-opacity hover:opacity-50"
            >
              {l}
            </a>
          ))}
        </nav>
      </div>

      {/* Hero */}
      <section className="relative z-10 mx-auto w-full max-w-[1320px] px-4 pb-24 md:px-12 md:pb-32">
        <div className="mb-10 flex items-end justify-between md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="mono-label flex items-center gap-2 text-gray-3"
          >
            <span className="inline-block h-2 w-2">
              <span className="absolute h-px w-2 bg-gray-2" />
              <span className="absolute h-2 w-px bg-gray-2" />
            </span>
            <span>CASE STUDY · 01 / 05</span>
          </motion.div>
          <span className="mono-label hidden text-gray-3 md:block">
            ● LIVE VENTURE
          </span>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-8">
            <h1 className="display-italic text-ink leading-[0.95]" style={{ fontSize: "clamp(56px, 9vw, 128px)" }}>
              {["Universal", "Compression."].map((w, i) => (
                <motion.span
                  key={`${w}-${i}`}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  className="block"
                >
                  {w}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-8 max-w-2xl text-[16px] leading-[1.55] text-ink-soft md:text-[18px]"
            >
              An AI-driven data compression platform focused on reducing
              storage and transmission costs while preserving task-level
              information fidelity. Built for AI workloads and large-scale
              data systems where the trade-off between ratio, quality, and
              compute actually matters.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              <a
                href="https://github.com/Aarav-2006"
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className="mono-label inline-flex items-center gap-2 rounded-full border border-ink bg-ink px-5 py-3 text-paper transition-colors hover:bg-ink-soft"
              >
                GITHUB ↗
              </a>
              <a
                href="mailto:aaravjhawar578@gmail.com"
                data-cursor-hover
                className="mono-label inline-flex items-center gap-2 rounded-full border px-5 py-3 text-ink transition-colors hover:bg-paper"
                style={{ borderColor: "var(--rule)" }}
              >
                TALK ABOUT IT →
              </a>
            </motion.div>
          </div>

          <div className="md:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="grid grid-cols-2 gap-6 md:grid-cols-1"
            >
              <Meta label="ROLE" value="Founder · Solo builder" />
              <Meta label="STATUS" value="● Live venture" />
              <Meta label="PERIOD" value="2025–present" />
              <Meta label="STACK" value="Python · PyTorch · EDA" />
            </motion.div>
          </div>
        </div>

        {/* 3D scene below the fold */}
        <div className="relative mt-16 h-[420px] w-full overflow-hidden rounded-3xl border bg-paper md:mt-24 md:h-[560px]" style={{ borderColor: "var(--rule)" }}>
          {mounted && <CompressionCloud />}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div
              className="text-ink"
              style={{
                transform: "rotate(28deg)",
                opacity: 0.12,
                fontSize: "clamp(200px, 28vw, 360px)",
                fontFamily: "var(--font-display), serif",
                fontWeight: 200,
                lineHeight: 1,
              }}
              aria-hidden
            >
              ×
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between md:bottom-6 md:left-6 md:right-6">
            <div>
              <div className="mono-label text-gray-3">LIVE</div>
              <div className="display-italic mt-1 text-[24px] text-ink md:text-[32px]">
                compression ratio 0.31
              </div>
              <div className="mono-label mt-1 text-gray-3">TOPOLOGY PRESERVED</div>
            </div>
            <div className="mono-label text-gray-3">SLOW ROTATION · 60S / REV</div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* The thesis */}
      <section className="relative z-10 mx-auto w-full max-w-[1320px] px-4 py-24 md:px-12 md:py-32">
        <div className="mb-10 md:mb-14">
          <div className="mono-label flex items-center gap-2 text-gray-3">
            <span className="inline-block h-2 w-2">
              <span className="absolute h-px w-2 bg-gray-2" />
              <span className="absolute h-2 w-px bg-gray-2" />
            </span>
            <span>THE THESIS</span>
          </div>
        </div>

        <h2 className="display max-w-4xl text-ink text-[40px] leading-[1.05] md:text-[56px] lg:text-[72px]">
          Classical compression throws
          <br />
          <span className="italic" style={{ fontStyle: "italic" }}>
            information away.
          </span>
          <br />
          Learned compression throws
          <br />
          <span className="italic" style={{ fontStyle: "italic" }}>
            structure away.
          </span>
        </h2>

        <p className="mt-12 max-w-2xl text-[16px] leading-[1.6] text-ink-soft md:text-[18px]">
          The platform I'm building sits in the gap: it learns what the data
          *needs to do* downstream and preserves the structure that matters
          for that task. The bit budget goes to signal, not to redundancy.
        </p>
      </section>

      <SectionDivider />

      {/* Trade-offs */}
      <section className="relative z-10 mx-auto w-full max-w-[1320px] px-4 py-24 md:px-12 md:py-32">
        <div className="mb-10 md:mb-14">
          <div className="mono-label flex items-center gap-2 text-gray-3">
            <span className="inline-block h-2 w-2">
              <span className="absolute h-px w-2 bg-gray-2" />
              <span className="absolute h-2 w-px bg-gray-2" />
            </span>
            <span>WHAT I'M OPTIMIZING FOR</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border bg-rule md:grid-cols-3">
          {[
            {
              title: "Compression ratio",
              body: "How much smaller. The headline number. The thing everyone benchmarks on.",
            },
            {
              title: "Reconstruction quality",
              body: "How faithful the output is. For AI workloads, this means task-level fidelity, not pixel-level similarity.",
            },
            {
              title: "Computational cost",
              body: "How much it costs to compress and decompress. The number that decides if it ships.",
            },
          ].map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="bg-paper p-6 md:p-10"
            >
              <div className="mono-label text-gray-3">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="display mt-4 text-[24px] leading-[1.1] text-ink md:text-[32px]">
                {c.title}
              </h3>
              <p className="mt-4 text-[14px] leading-[1.55] text-ink-soft md:text-[15px]">
                {c.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* The 3D scene as a literal thesis */}
      <section className="relative z-10 mx-auto w-full max-w-[1320px] px-4 py-24 md:px-12 md:py-32">
        <div className="mb-10 md:mb-14">
          <div className="mono-label flex items-center gap-2 text-gray-3">
            <span className="inline-block h-2 w-2">
              <span className="absolute h-px w-2 bg-gray-2" />
              <span className="absolute h-2 w-px bg-gray-2" />
            </span>
            <span>THE 3D PIECE ABOVE</span>
          </div>
        </div>

        <h2 className="display max-w-3xl text-ink text-[40px] leading-[1.05] md:text-[56px] lg:text-[64px]">
          A point cloud that
          <br />
          <span className="italic" style={{ fontStyle: "italic" }}>
            compresses itself.
          </span>
        </h2>

        <p className="mt-8 max-w-2xl text-[16px] leading-[1.6] text-ink-soft md:text-[18px]">
          The visualization in the hero is a literal rendering of the
          platform's thesis. Hundreds of points, force-directed in 3D,
          connected by an underlying topology. On a 12-second cycle, the
          system compresses: ~70% of the points fade, the survivors pull
          inward, but the topology (the structure that matters) stays
          intact. The form changes. The meaning doesn't.
        </p>

        <p className="mt-6 max-w-2xl text-[15px] leading-[1.6] text-gray-3">
          That's the deal. That's what the platform is for.
        </p>
      </section>

      <SectionDivider />

      {/* Open to */}
      <section className="relative z-10 mx-auto w-full max-w-[1320px] px-4 py-24 md:px-12 md:py-32">
        <div className="rounded-2xl border bg-paper p-8 md:p-14" style={{ borderColor: "var(--rule)" }}>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink" />
            <span className="mono-label text-ink">OPEN TO</span>
          </div>
          <h2 className="display mt-4 max-w-3xl text-ink text-[36px] leading-[1.05] md:text-[56px]">
            If you work on
            <br />
            <span className="italic" style={{ fontStyle: "italic" }}>
              AI infrastructure,
            </span>
            <br />
            let's talk.
          </h2>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="mailto:aaravjhawar578@gmail.com"
              data-cursor-hover
              className="mono-label inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-paper transition-colors hover:bg-ink-soft"
            >
              EMAIL ME ↗
            </a>
            <a
              href="https://linkedin.com/in/aarav-jhawar-a9a9b5276"
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              className="mono-label inline-flex items-center gap-2 rounded-full border px-5 py-3 text-ink transition-colors hover:bg-bg"
              style={{ borderColor: "var(--rule)" }}
            >
              LINKEDIN ↗
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 mt-12 border-t bg-paper py-10 md:py-14">
        <div className="mx-auto max-w-[1320px] px-4 md:px-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <a
              href="/"
              data-cursor-hover
              className="display-italic text-[28px] text-ink md:text-[36px]"
            >
              Aarav Jhawar.
            </a>
            <p className="mono-label text-gray-3">
              © 2026 · BUILT IN PLAKSHA · DEPLOYED FROM EVERYWHERE
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mono-label text-gray-3">{label}</div>
      <div className="mt-1 text-[14px] text-ink md:text-[15px]">{value}</div>
    </div>
  );
}

"use client";

/**
 * Static SVG fallback that mirrors the 3D CompressionCloud's
 * compressed-state aesthetic. Used while the dynamic 3D import is
 * resolving, and as the prefers-reduced-motion fallback.
 */
export default function CloudFallback() {
  // Generate a deterministic set of points for the SVG
  const points = [
    { cx: 120, cy: 110, r: 1.4 },
    { cx: 95, cy: 130, r: 1.6 },
    { cx: 145, cy: 95, r: 1.2 },
    { cx: 165, cy: 140, r: 1.5 },
    { cx: 80, cy: 95, r: 1.1 },
    { cx: 110, cy: 155, r: 1.3 },
    { cx: 135, cy: 170, r: 1.4 },
    { cx: 175, cy: 115, r: 1.2 },
    { cx: 60, cy: 140, r: 1.1 },
    { cx: 200, cy: 145, r: 1.5 },
    { cx: 70, cy: 175, r: 1.2 },
    { cx: 150, cy: 175, r: 1.3 },
    { cx: 105, cy: 80, r: 1.0 },
    { cx: 185, cy: 170, r: 1.2 },
    { cx: 55, cy: 110, r: 1.0 },
    { cx: 130, cy: 125, r: 1.6 },
    { cx: 90, cy: 155, r: 1.1 },
    { cx: 160, cy: 85, r: 1.2 },
    { cx: 200, cy: 95, r: 1.0 },
    { cx: 115, cy: 175, r: 1.0 },
    { cx: 175, cy: 155, r: 1.1 },
    { cx: 50, cy: 165, r: 1.0 },
    { cx: 195, cy: 120, r: 1.0 },
    { cx: 140, cy: 110, r: 1.4 },
    { cx: 100, cy: 115, r: 1.2 },
  ];

  // Edges between nearby points (sparse)
  const edges = [
    [0, 1],
    [1, 5],
    [2, 7],
    [3, 10],
    [4, 0],
    [5, 6],
    [6, 10],
    [7, 13],
    [8, 3],
    [9, 7],
    [11, 6],
    [12, 0],
    [14, 8],
    [15, 5],
    [16, 11],
    [17, 2],
    [18, 9],
    [19, 11],
    [20, 13],
    [21, 8],
    [22, 9],
    [23, 15],
    [24, 0],
  ];

  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg
        viewBox="0 0 240 240"
        className="h-full w-full max-w-[480px]"
        aria-hidden
      >
        {/* Edges */}
        {edges.map(([a, b], i) => (
          <line
            key={`e-${i}`}
            x1={points[a].cx}
            y1={points[a].cy}
            x2={points[b].cx}
            y2={points[b].cy}
            stroke="#0B0B0C"
            strokeOpacity="0.18"
            strokeWidth="0.5"
          />
        ))}
        {/* Points */}
        {points.map((p, i) => (
          <circle
            key={`p-${i}`}
            cx={p.cx}
            cy={p.cy}
            r={p.r}
            fill="#0B0B0C"
            fillOpacity="0.85"
          />
        ))}
      </svg>
    </div>
  );
}

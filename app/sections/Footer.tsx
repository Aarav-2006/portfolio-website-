"use client";

import dynamic from "next/dynamic";
import CloudFallback from "../components/CloudFallback";

const CompressionCloud = dynamic(
  () => import("../components/three/CompressionCloud"),
  { ssr: false, loading: () => <CloudFallback /> }
);

export default function Footer() {
  return (
    <footer className="relative z-10 mt-16 border-t bg-paper md:mt-24">
      {/* Mini 3D cloud */}
      <div className="pointer-events-none relative h-[280px] w-full overflow-hidden md:h-[360px]">
        <div className="absolute inset-0 opacity-90">
          <CompressionCloud />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-paper" />
      </div>

      <div className="mx-auto max-w-[1320px] px-4 py-10 md:px-12 md:py-14">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="display-italic text-[28px] text-ink md:text-[36px]">
              Aarav Jhawar.
            </div>
            <p className="mono-label mt-3 text-gray-3">
              2026. BUILDING TOWARDS THE FUTURE
            </p>
          </div>

          <div className="md:col-span-6">
            <div className="flex flex-col gap-3 md:items-end">
              <a
                href="mailto:aaravjhawar578@gmail.com"
                data-cursor-hover
                className="mono-label text-ink transition-opacity hover:opacity-50"
              >
                EMAIL ↗
              </a>
              <a
                href="https://linkedin.com/in/aarav-jhawar-a9a9b5276"
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className="mono-label text-ink transition-opacity hover:opacity-50"
              >
                LINKEDIN ↗
              </a>
              <a
                href="https://github.com/Aarav-2006"
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className="mono-label text-ink transition-opacity hover:opacity-50"
              >
                GITHUB ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

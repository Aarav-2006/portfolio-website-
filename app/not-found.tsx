"use client";

import { motion } from "framer-motion";
import CornerCrosshairs from "./components/CornerCrosshairs";
import Cursor from "./components/Cursor";
import BackgroundLayer from "./components/BackgroundLayer";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundLayer />
      <Cursor />
      <CornerCrosshairs />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1320px] flex-col px-4 py-12 md:px-12 md:py-20">
        {/* Top row */}
        <div className="flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2"
            data-cursor-hover
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full border border-ink">
              <div className="h-1.5 w-1.5 rounded-full bg-ink" />
            </div>
            <span className="mono-label text-ink">AARAV</span>
          </a>
          <span className="mono-label text-gray-3">404 · NOT FOUND</span>
        </div>

        {/* Main */}
        <div className="flex flex-1 flex-col items-start justify-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mono-label text-gray-3"
          >
            <span className="inline-block h-2 w-2 align-middle">
              <span className="absolute h-px w-2 bg-gray-2" />
              <span className="absolute h-2 w-px bg-gray-2" />
            </span>
            <span className="ml-3">ERR · 404 · NODE_NOT_FOUND</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="display-italic mt-8 text-ink leading-[0.95]"
            style={{ fontSize: "clamp(72px, 14vw, 200px)" }}
          >
            404.
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="display mt-2 max-w-3xl text-ink"
            style={{ fontSize: "clamp(28px, 4vw, 56px)" }}
          >
            This node isn't
            <br />
            <span className="italic" style={{ fontStyle: "italic" }}>
              in the graph.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-md text-[15px] leading-[1.55] text-ink-soft md:text-[16px]"
          >
            The page you were looking for either doesn't exist, was moved, or
            was pruned during compression. Try the homepage, or check the
            spelling.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="/"
              data-cursor-hover
              className="group inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-paper transition-all hover:bg-ink-soft"
            >
              <span className="mono-label text-paper">BACK HOME</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="/#work"
              data-cursor-hover
              className="group inline-flex h-11 items-center gap-2 rounded-full border px-5 text-ink transition-colors hover:bg-paper"
              style={{ borderColor: "var(--rule)" }}
            >
              <span className="mono-label text-ink">SEE WORK</span>
            </a>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="flex items-end justify-between border-t pt-4 hairline">
          <span className="mono-label text-gray-3">© 2026 · AARAV JHAWAR</span>
          <span className="mono-label text-gray-3">SCROLL UP</span>
        </div>
      </div>
    </main>
  );
}

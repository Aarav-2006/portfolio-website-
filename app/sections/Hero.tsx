"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CloudFallback from "../components/CloudFallback";

const CompressionCloud = dynamic(
  () => import("../components/three/CompressionCloud"),
  { ssr: false, loading: () => <CloudFallback /> }
);

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
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

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // The greeting + name
  const nameWords = ["Hi,", "I", "am", "Aarav", "Jhawar."];
  // The new tagline
  const taglineWords = [
    "Turning",
    "data",
    "into",
    "structure,",
    "and",
    "structure",
    "into",
    "intelligence.",
  ];

  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full items-center justify-center px-4 py-24 md:px-12"
    >
      <div className="relative z-10 w-full max-w-[1320px]">
        {/* The card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative overflow-visible rounded-3xl border bg-paper"
          style={{ borderColor: "var(--rule)" }}
        >
          {/* Card corner crosshairs */}
          <CornerPlus className="absolute -top-px -left-px" />
          <CornerPlus className="absolute -top-px -right-px" />
          <CornerPlus className="absolute -bottom-px -left-px" />
          <CornerPlus className="absolute -bottom-px -right-px" />

          {/* Top row — wordmark + nav */}
          <div className="relative z-20 flex items-center justify-between px-6 pt-6 md:px-10 md:pt-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex items-center gap-2"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full border border-ink">
                <div className="h-1.5 w-1.5 rounded-full bg-ink" />
              </div>
              <span className="mono-label text-ink">AARAV</span>
            </motion.div>

            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="hidden items-center gap-6 md:flex"
            >
              {(
                [
                  { label: "HOME", href: "#top" },
                  { label: "PROJECTS", href: "#work" },
                  { label: "EXPERIENCE", href: "#experience" },
                  { label: "AWARDS", href: "#awards" },
                  { label: "CONTACT", href: "#contact" },
                ] as const
              ).map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="mono-label text-ink transition-opacity hover:opacity-50"
                >
                  {label}
                </a>
              ))}
            </motion.nav>
          </div>

          {/* Main content */}
          <div className="grid grid-cols-1 gap-6 px-6 pb-6 pt-8 md:grid-cols-12 md:gap-8 md:px-10 md:pb-10 md:pt-12 lg:gap-12">
            {/* Copy column */}
            <div className="md:col-span-7">
              <h1 className="display-italic text-ink">
                {/* Name line — slightly smaller than v1 */}
                <span
                  className="block leading-[0.95]"
                  style={{ fontSize: "clamp(40px, 7.5vw, 96px)" }}
                >
                  {nameWords.map((w, i) => (
                    <motion.span
                      key={`name-${w}-${i}`}
                      custom={i}
                      variants={fadeUp}
                      initial="hidden"
                      animate="show"
                      className="inline-block pr-[0.18em]"
                    >
                      {w}
                    </motion.span>
                  ))}
                </span>

                {/* Tagline line — replaces the v1 "I build the structure..." */}
                <span
                  className="mt-3 block leading-[1.05]"
                  style={{ fontSize: "clamp(22px, 3.4vw, 40px)" }}
                >
                  {taglineWords.map((w, i) => (
                    <motion.span
                      key={`tag-${w}-${i}`}
                      custom={i + nameWords.length}
                      variants={fadeUp}
                      initial="hidden"
                      animate="show"
                      className="inline-block pr-[0.22em]"
                    >
                      {w}
                    </motion.span>
                  ))}
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.0 }}
                className="mt-8 max-w-[560px] text-[15px] leading-[1.55] text-ink-soft md:mt-10 md:text-[16px]"
              >
                I'm a Computer Science and Artificial Intelligence student at
                Plaksha University focused on building AI systems that remain
                efficient, scalable, and useful in real-world environments. My
                work spans machine learning infrastructure, AI-driven
                compression, knowledge graphs, and data-intensive applications.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.15 }}
                className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
              >
                <a
                  href="#work"
                  data-cursor-hover
                  className="group inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-paper transition-all hover:bg-ink-soft"
                >
                  <span className="mono-label text-paper">SEE MY WORKS</span>
                  <span className="inline-block translate-x-0 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>

                {/* Temporarily hidden — CV download disabled for now
                <a
                  href="/Aarav_Jhawar _CV.pdf"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  className="group inline-flex h-11 items-center gap-2 rounded-full border px-5 text-ink transition-colors hover:bg-paper"
                  style={{ borderColor: "var(--rule)" }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5"
                    aria-hidden
                  >
                    <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
                  </svg>
                  <span className="mono-label text-ink">DOWNLOAD CV</span>
                </a>
                */}

                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                  <span className="mono-label text-gray-3">
                    OPEN TO INTERNSHIPS
                  </span>
                </div>
              </motion.div>
            </div>

            {/* 3D column */}
            <div className="relative md:col-span-5">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.4, delay: 0.6 }}
                className="relative -mr-16 -mt-8 h-[420px] w-[calc(100%+4rem)] md:h-[520px] md:-mr-32 md:-mt-16"
              >
                {mounted && <CompressionCloud />}

                {/* The "×" overlay */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div
                    className="font-display text-[200px] font-light leading-none text-ink md:text-[280px]"
                    style={{
                      transform: "rotate(28deg)",
                      opacity: 0.18,
                      fontFamily: "var(--font-display), serif",
                      fontWeight: 200,
                    }}
                    aria-hidden
                  >
                    ×
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom row — social + scroll cue */}
          <div className="flex items-end justify-between border-t px-6 py-4 md:px-10 md:py-5 hairline">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-2"
            >
              <a
                href="https://github.com/Aarav-2006"
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className="mono-label text-ink transition-opacity hover:opacity-50"
              >
                GITHUB /
              </a>
              <a
                href="https://linkedin.com/in/aarav-jhawar-a9a9b5276"
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className="mono-label text-ink transition-opacity hover:opacity-50"
              >
                LINKEDIN /
              </a>
              <a
                href="mailto:aaravjhawar578@gmail.com"
                data-cursor-hover
                className="mono-label text-ink transition-opacity hover:opacity-50"
              >
                EMAIL /
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="mono-label text-gray-3"
            >
              SCROLL FOR MORE
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CornerPlus({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none z-20 flex h-2 w-2 items-center justify-center ${className ?? ""}`}
    >
      <div className="absolute h-px w-2 bg-ink" style={{ opacity: 0.4 }} />
      <div className="absolute h-2 w-px bg-ink" style={{ opacity: 0.4 }} />
    </div>
  );
}

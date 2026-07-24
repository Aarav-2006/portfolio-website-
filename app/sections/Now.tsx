"use client";

import { motion } from "framer-motion";
import SectionLabel from "../components/SectionLabel";
import { projects } from "../../lib/data";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

export default function Now() {
  return (
    <section
      id="work"
      className="relative z-10 mx-auto w-full max-w-[1320px] px-4 py-24 md:px-12 md:py-32"
    >
      <div className="mb-10 flex items-end justify-between md:mb-14">
        <SectionLabel number="01" label="PROJECTS" />
        <span className="mono-label text-gray-3 hidden md:block">
          {projects.length} PROJECTS · 2024–2025
        </span>
      </div>

      <h2 className="display max-w-3xl text-ink text-[40px] leading-[1.05] md:text-[56px] lg:text-[72px]">
        My Projects
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border bg-rule md:mt-16 md:grid-cols-2">
        {projects.map((p, i) => {
          const isLastOdd =
            i === projects.length - 1 && projects.length % 2 !== 0;
          const cardProps = p.repo
            ? {
                href: p.repo,
                target: "_blank" as const,
                rel: "noreferrer",
                "data-cursor-hover": true,
              }
            : {};

          return (
            <motion.a
              key={p.slug}
              {...cardProps}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              }}
              className={`group relative flex flex-col bg-paper p-6 transition-all hover:bg-bg md:p-8 ${
                p.repo ? "" : "cursor-default"
              } ${isLastOdd ? "md:col-span-2" : ""}`}
            >
              {/* Status row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      p.status === "live"
                        ? "bg-ink animate-pulse"
                        : "bg-gray-2"
                    }`}
                  />
                  <span className="mono-label text-gray-3">
                    {p.status === "live"
                      ? "LIVE"
                      : p.status === "in-progress"
                        ? "IN PROGRESS"
                        : "ARCHIVED"}
                  </span>
                </div>
                {p.isVenture && (
                  <span className="mono-label text-ink">VENTURE</span>
                )}
              </div>

              <h3 className="display mt-6 text-[26px] leading-[1.1] text-ink md:text-[32px] lg:text-[36px]">
                {p.title}
              </h3>

              <p className="mt-4 flex-1 text-[14px] leading-[1.55] text-ink-soft md:text-[15px]">
                {p.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1">
                {p.tags.slice(0, 4).map((t) => (
                  <span key={t} className="mono-label text-gray-3">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex items-end justify-between border-t pt-4 hairline">
                <span className="mono-label text-gray-3">{p.period}</span>
                {p.repo && (
                  <span className="inline-flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">
                    <GitHubIcon className="h-3.5 w-3.5 text-ink" />
                    <span className="mono-label text-ink">GITHUB ↗</span>
                  </span>
                )}
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}

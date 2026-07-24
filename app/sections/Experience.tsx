"use client";

import { motion } from "framer-motion";
import SectionLabel from "../components/SectionLabel";
import { experience } from "../../lib/data";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative z-10 mx-auto w-full max-w-[1320px] px-4 py-24 md:px-12 md:py-32"
    >
      <div className="mb-10 flex items-end justify-between md:mb-14">
        <SectionLabel number="02" label="EXPERIENCE" />
        <span className="mono-label text-gray-3 hidden md:block">
          WHERE I'VE WORKED
        </span>
      </div>

      <h2 className="display max-w-3xl text-ink text-[40px] leading-[1.05] md:text-[56px] lg:text-[72px]">
        My{" "}
        <span className="italic" style={{ fontStyle: "italic" }}>
          Experience.
        </span>
      </h2>

      <div className="mt-12 flex flex-col gap-6 md:mt-16 md:gap-8">
        {experience.map((e, i) => (
          <motion.div
            key={`${e.org}-${e.period}`}
            className="overflow-hidden rounded-2xl border bg-paper hairline"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.5, ease }}
          >
            {/* Header */}
            <div className="flex items-start gap-6 border-b px-6 py-6 hairline md:gap-10 md:px-10 md:py-8">
              <span className="mono-label text-gray-3 mt-1 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="display text-[22px] leading-[1.1] text-ink md:text-[28px]">
                  {e.role}
                </h3>
                <div className="mt-1 flex flex-wrap items-center gap-x-3">
                  <span className="mono-label text-ink-soft">{e.org}</span>
                  <span className="mono-label text-gray-3">·</span>
                  <span className="mono-label text-gray-3">{e.period}</span>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-8 md:px-10 md:py-10">
              <p className="max-w-3xl text-[15px] leading-[1.6] text-ink-soft md:text-[16px]">
                {e.overview}
              </p>

              {e.highlights && e.highlights.length > 0 && (
                <div className="mt-8">
                  <div className="mono-label text-gray-3 mb-4">
                    KEY TECHNICAL WORK
                  </div>
                  <ul className="flex flex-col gap-3">
                    {e.highlights.map((h, j) => (
                      <li
                        key={j}
                        className="flex gap-3 text-[14px] leading-[1.65] text-ink-soft md:text-[15px]"
                      >
                        <span className="mt-[2px] shrink-0 text-gray-3">
                          →
                        </span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8 grid grid-cols-1 gap-6 border-t pt-8 hairline md:grid-cols-2 md:gap-10">
                <div>
                  <div className="mono-label text-gray-3 mb-3">
                    WHAT I LEARNED
                  </div>
                  <p className="text-[14px] leading-[1.6] text-ink-soft md:text-[15px]">
                    {e.learned}
                  </p>
                </div>
                <div>
                  <div className="mono-label text-gray-3 mb-3">
                    WHY IT MATTERED
                  </div>
                  <p className="text-[14px] leading-[1.6] text-ink-soft md:text-[15px]">
                    {e.mattered}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

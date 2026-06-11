"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "../components/SectionLabel";
import { experience } from "../../lib/data";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      id="experience"
      className="relative z-10 mx-auto w-full max-w-[1320px] px-4 py-24 md:px-12 md:py-32"
    >
      <div className="mb-10 flex items-end justify-between md:mb-14">
        <SectionLabel number="04" label="JOURNEY" />
        <span className="mono-label text-gray-3 hidden md:block">
          WHERE I'VE BEEN
        </span>
      </div>

      <h2 className="display max-w-3xl text-ink text-[40px] leading-[1.05] md:text-[56px] lg:text-[72px]">
        My{" "}
        <span className="italic" style={{ fontStyle: "italic" }}>
          Journey.
        </span>
      </h2>

      <div className="mt-12 flex flex-col gap-px overflow-hidden rounded-2xl border bg-rule md:mt-16">
        {experience.map((e, i) => {
          const isOpen = activeIndex === i;

          return (
            <motion.div
              key={`${e.org}-${e.period}`}
              layout
              transition={{ duration: 0.5, ease }}
              className="relative overflow-hidden bg-paper"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
            >
              {/* Animated left border line */}
              <motion.div
                className="absolute left-0 top-0 w-[2px] bg-ink"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: isOpen ? 1 : 0 }}
                transition={{ duration: 0.4, ease }}
                style={{ transformOrigin: "top", height: "100%" }}
              />

              {/* Card header — always visible, click to toggle */}
              <button
                onClick={() => setActiveIndex(isOpen ? null : i)}
                className="w-full text-left"
                aria-expanded={isOpen}
              >
                <div className="flex items-center justify-between px-6 py-6 md:px-10 md:py-8">
                  <div className="flex items-start gap-6 md:gap-10">
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

                  {/* Plus / close indicator */}
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease }}
                    className="mono-label text-[20px] text-ink shrink-0 ml-4 leading-none"
                  >
                    +
                  </motion.div>
                </div>
              </button>

              {/* Expanded narrative content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.45, ease }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="border-t grid grid-cols-1 gap-6 px-6 pb-8 pt-6 md:grid-cols-3 md:gap-8 md:px-10 md:pb-10 md:pt-8 hairline">
                      {(
                        [
                          { label: "WHAT I DID", body: e.did },
                          { label: "WHAT I LEARNED", body: e.learned },
                          { label: "WHY IT MATTERED", body: e.mattered },
                        ] as const
                      ).map(({ label, body }) => (
                        <div key={label}>
                          <div className="mono-label text-gray-3 mb-3">
                            {label}
                          </div>
                          <p className="text-[14px] leading-[1.6] text-ink-soft md:text-[15px]">
                            {body}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

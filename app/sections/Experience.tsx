"use client";

import { motion } from "framer-motion";
import SectionLabel from "../components/SectionLabel";
import { experience } from "../../lib/data";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative z-10 mx-auto w-full max-w-[1320px] px-4 py-24 md:px-12 md:py-32"
    >
      <div className="mb-10 flex items-end justify-between md:mb-14">
        <SectionLabel number="04" label="EXPERIENCE" />
        <span className="mono-label text-gray-3 hidden md:block">
          WHERE I'VE WORKED
        </span>
      </div>

      <h2 className="display max-w-3xl text-ink text-[40px] leading-[1.05] md:text-[56px] lg:text-[72px]">
        A short,
        <br />
        <span className="italic" style={{ fontStyle: "italic" }}>
          honest timeline.
        </span>
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border bg-rule md:mt-16">
        {experience.map((e, i) => (
          <motion.div
            key={`${e.org}-${e.period}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="grid grid-cols-1 gap-6 bg-paper p-6 md:grid-cols-12 md:gap-8 md:p-10"
          >
            <div className="md:col-span-4">
              <div className="mono-label text-gray-3">{e.period}</div>
              <h3 className="display mt-3 text-[24px] leading-[1.1] text-ink md:text-[28px]">
                {e.role}
              </h3>
              <div className="mt-2 text-[15px] text-ink-soft md:text-[16px]">
                {e.org}
              </div>
            </div>
            <ul className="space-y-3 md:col-span-8">
              {e.bullets.map((b, j) => (
                <li
                  key={j}
                  className="flex gap-3 text-[14px] leading-[1.55] text-ink-soft md:text-[15px]"
                >
                  <span className="mt-2 inline-block h-px w-3 flex-shrink-0 bg-gray-2" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

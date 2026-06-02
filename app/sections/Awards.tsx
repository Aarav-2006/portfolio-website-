"use client";

import { motion } from "framer-motion";
import SectionLabel from "../components/SectionLabel";
import { awards } from "../../lib/data";

export default function Awards() {
  return (
    <section
      id="awards"
      className="relative z-10 mx-auto w-full max-w-[1320px] px-4 py-24 md:px-12 md:py-32"
    >
      <div className="mb-10 flex items-end justify-between md:mb-14">
        <SectionLabel number="03" label="AWARDS" />
        <span className="mono-label text-gray-3 hidden md:block">
          ON THE PODIUM
        </span>
      </div>

      <h2 className="display max-w-3xl text-ink text-[40px] leading-[1.05] md:text-[56px] lg:text-[72px]">
        Things that
        <br />
        <span className="italic" style={{ fontStyle: "italic" }}>
          I am quietly proud of.
        </span>
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border bg-rule md:mt-16 md:grid-cols-2">
        {awards.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="bg-paper p-6 md:p-10"
          >
            <div className="flex items-center justify-between">
              <div className="mono-label text-gray-3">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="mono-label text-ink">{a.place}</div>
            </div>

            <h3 className="display mt-6 text-[24px] leading-[1.1] text-ink md:text-[28px]">
              {a.title}
            </h3>
            <p className="mt-4 max-w-md text-[14px] leading-[1.55] text-ink-soft md:text-[15px]">
              {a.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

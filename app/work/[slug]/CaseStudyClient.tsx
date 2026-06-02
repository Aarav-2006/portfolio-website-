"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Cursor from "../../components/Cursor";
import CornerCrosshairs from "../../components/CornerCrosshairs";
import BackgroundLayer from "../../components/BackgroundLayer";
import { SectionDivider } from "../../components/SectionLabel";
import CloudFallback from "../../components/CloudFallback";
import { Project, projects } from "../../../lib/data";

const CompressionCloud = dynamic(
  () => import("../../components/three/CompressionCloud"),
  { ssr: false, loading: () => <CloudFallback /> }
);

const projectVisuals: Record<
  string,
  { title: string; body: string; metric: string; metricLabel: string }
> = {
  "knowledge-map": {
    title: "A graph that knows what it knows.",
    body: "Schema.org and RDF give the data a spine. Linked Data sources give it a nervous system. The result is something you can query, visualise, and reuse — not just store.",
    metric: "∞",
    metricLabel: "QUERIES POSSIBLE",
  },
  "early-failure-prediction": {
    title: "Predict the crash before the log does.",
    body: "Probabilistic sequence modelling on the HDFS log dataset — trained to surface the early signals that precede failure, not just the symptoms that follow it.",
    metric: "Early",
    metricLabel: "DETECTION WINDOW",
  },
  "email-contact-intelligence": {
    title: "100,000 inboxes, one structured graph.",
    body: "OAuth, resumable checkpointing, deduplication. The pipeline handles scale without losing the structure of who-knows-who inside an enterprise.",
    metric: "100k+",
    metricLabel: "EMAILS PROCESSED",
  },
};

export default function CaseStudyClient({ project }: { project: Project }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const visual = projectVisuals[project.slug];
  if (!visual) return null;

  const projectIndex = projects.findIndex((p) => p.slug === project.slug) + 1;

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <BackgroundLayer />
      <Cursor />
      <CornerCrosshairs />

      {/* Top nav */}
      <div className="relative z-30 mx-auto flex max-w-[1320px] items-center justify-between px-4 py-6 md:px-12 md:py-8">
        <a href="/" data-cursor-hover className="flex items-center gap-2">
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
            <span>
              CASE STUDY · {String(projectIndex).padStart(2, "0")} /{" "}
              {String(projects.length).padStart(2, "0")}
            </span>
          </motion.div>
          <span className="mono-label hidden text-gray-3 md:block">
            {project.status === "live"
              ? "● LIVE"
              : project.status === "in-progress"
                ? "IN PROGRESS"
                : "ARCHIVED"}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-8">
            <h1
              className="display-italic text-ink leading-[0.95]"
              style={{ fontSize: "clamp(48px, 8vw, 112px)" }}
            >
              {project.title.split(/[.·]/)[0].trim()}.
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 max-w-2xl text-[16px] leading-[1.55] text-ink-soft md:text-[18px]"
            >
              {project.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  className="mono-label inline-flex items-center gap-2 rounded-full border border-ink bg-ink px-5 py-3 text-paper transition-colors hover:bg-ink-soft"
                >
                  GITHUB ↗
                </a>
              )}
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
              transition={{ duration: 0.7, delay: 0.5 }}
              className="grid grid-cols-2 gap-6 md:grid-cols-1"
            >
              <Meta label="ROLE" value={project.role} />
              <Meta
                label="STATUS"
                value={
                  project.status === "live"
                    ? "● Live"
                    : project.status === "in-progress"
                      ? "In progress"
                      : "Archived"
                }
              />
              <Meta label="PERIOD" value={project.period} />
              <Meta
                label="TAGS"
                value={project.tags.slice(0, 3).join(" · ")}
              />
            </motion.div>
          </div>
        </div>

        {/* 3D piece */}
        <div
          className="relative mt-16 h-[420px] w-full overflow-hidden rounded-3xl border bg-paper md:mt-24 md:h-[560px]"
          style={{ borderColor: "var(--rule)" }}
        >
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
              <div className="mono-label text-gray-3">METRIC</div>
              <div className="display-italic mt-1 text-[24px] text-ink md:text-[32px]">
                {visual.metric}
              </div>
              <div className="mono-label mt-1 text-gray-3">
                {visual.metricLabel}
              </div>
            </div>
            <div className="mono-label text-gray-3">
              RECURSIVE · ON-BRAND
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* The body */}
      <section className="relative z-10 mx-auto w-full max-w-[1320px] px-4 py-24 md:px-12 md:py-32">
        <div className="mb-10 md:mb-14">
          <div className="mono-label flex items-center gap-2 text-gray-3">
            <span className="inline-block h-2 w-2">
              <span className="absolute h-px w-2 bg-gray-2" />
              <span className="absolute h-2 w-px bg-gray-2" />
            </span>
            <span>THE SO WHAT</span>
          </div>
        </div>

        <h2 className="display max-w-4xl text-ink text-[40px] leading-[1.05] md:text-[56px] lg:text-[64px]">
          {visual.title}
        </h2>

        <p className="mt-8 max-w-2xl text-[16px] leading-[1.6] text-ink-soft md:text-[18px]">
          {visual.body}
        </p>
      </section>

      <SectionDivider />

      {/* Tags / stack */}
      <section className="relative z-10 mx-auto w-full max-w-[1320px] px-4 py-24 md:px-12 md:py-32">
        <div className="mb-10 md:mb-14">
          <div className="mono-label flex items-center gap-2 text-gray-3">
            <span className="inline-block h-2 w-2">
              <span className="absolute h-px w-2 bg-gray-2" />
              <span className="absolute h-2 w-px bg-gray-2" />
            </span>
            <span>STACK · TAGS</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border bg-rule md:grid-cols-2">
          {project.tags.map((t, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="bg-paper p-6 md:p-10"
            >
              <div className="mono-label text-gray-3">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="display-italic mt-3 text-[28px] text-ink md:text-[36px]">
                {t}
              </div>
            </motion.div>
          ))}
        </div>
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
            Want to talk
            <br />
            <span className="italic" style={{ fontStyle: "italic" }}>
              about this one?
            </span>
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

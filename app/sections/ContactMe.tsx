"use client";

import { motion } from "framer-motion";
import SectionLabel from "../components/SectionLabel";

/* ---------- Custom inline-SVG brand icons (line-based, ink) ---------- */
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M24 4C12.95 4 4 12.95 4 24c0 8.84 5.74 16.34 13.7 19 .99.18 1.36-.43 1.36-.96v-3.37c-5.57 1.21-6.74-2.69-6.74-2.69-.91-2.31-2.22-2.93-2.22-2.93-1.82-1.24.14-1.21.14-1.21 2.01.14 3.07 2.06 3.07 2.06 1.78 3.06 4.68 2.18 5.82 1.66.18-1.29.7-2.18 1.27-2.68-4.45-.5-9.13-2.22-9.13-9.9 0-2.19.78-3.98 2.06-5.38-.21-.5-.89-2.54.19-5.3 0 0 1.68-.54 5.5 2.06 1.6-.44 3.31-.67 5.01-.67 1.7 0 3.41.22 5.01.67 3.82-2.6 5.5-2.06 5.5-2.06 1.09 2.76.4 4.8.2 5.3 1.28 1.4 2.05 3.19 2.05 5.38 0 7.7-4.69 9.39-9.16 9.88.72.62 1.36 1.84 1.36 3.7v5.49c0 .53.36 1.15 1.37.95C38.27 40.33 44 32.83 44 24c0-11.05-8.95-20-20-20z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="6" y="6" width="36" height="36" rx="6" />
      <line x1="14" y1="20" x2="14" y2="34" />
      <circle cx="14" cy="14" r="0.6" fill="currentColor" stroke="none" />
      <path d="M20 34v-14M20 25c0-3 6-3.5 6 0v9M32 24c0-3-6-3.5-6 0v10" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="6" y="10" width="36" height="28" rx="3" />
      <path d="M6 14l18 13L42 14" />
    </svg>
  );
}

/* ---------- Contact card ---------- */
function ContactCard({
  icon,
  label,
  value,
  href,
  note,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  note: string;
  external?: boolean;
}) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      data-cursor-hover
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="group relative flex flex-col items-start gap-6 overflow-hidden rounded-2xl border bg-paper p-6 transition-all hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] md:p-10"
      style={{ borderColor: "var(--rule)" }}
    >
      {/* Card corner pluses */}
      <CardPlus className="absolute -top-px -left-px" />
      <CardPlus className="absolute -top-px -right-px" />
      <CardPlus className="absolute -bottom-px -left-px" />
      <CardPlus className="absolute -bottom-px -right-px" />

      <div className="text-ink transition-transform duration-500 group-hover:scale-[1.04]">
        {icon}
      </div>

      <div className="flex-1">
        <div className="mono-label text-gray-3">{label}</div>
        <div className="mt-2 text-[18px] leading-[1.2] text-ink md:text-[22px]">
          {value}
        </div>
        <div className="mt-2 text-[13px] leading-[1.5] text-gray-3 md:text-[14px]">
          {note}
        </div>
      </div>

      <div className="flex w-full items-center justify-between">
        <span className="mono-label text-ink">OPEN ↗</span>
      </div>
    </motion.a>
  );
}

export default function ContactMe() {
  return (
    <section
      id="contact"
      className="relative z-10 mx-auto w-full max-w-[1320px] px-4 py-20 md:px-12 md:py-28"
    >
      <div className="mb-10 flex items-end justify-between md:mb-14">
        <SectionLabel number="00" label="CONTACT" />
        <span className="mono-label text-gray-3 hidden md:block">
          THE FAST WAY TO REACH ME
        </span>
      </div>

      <h2
        className="display max-w-3xl text-ink text-[40px] leading-[1.05] md:text-[56px] lg:text-[72px]"
      >
        Get in
        <br />
        <span className="italic" style={{ fontStyle: "italic" }}>
          touch.
        </span>
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-3 md:gap-6">
        <ContactCard
          icon={<GitHubIcon className="h-12 w-12 md:h-14 md:w-14" />}
          label="GITHUB"
          value="github.com/Aarav-2006"
          href="https://github.com/Aarav-2006"
          note="Watch what I'm building in real time."
          external
        />
        <ContactCard
          icon={<LinkedInIcon className="h-12 w-12 md:h-14 md:w-14" />}
          label="LINKEDIN"
          value="linkedin.com/in/aarav-jhawar"
          href="https://linkedin.com/in/aarav-jhawar-a9a9b5276"
          note="Or, if you prefer the long-form."
          external
        />
        <ContactCard
          icon={<MailIcon className="h-12 w-12 md:h-14 md:w-14" />}
          label="EMAIL"
          value="aaravjhawar578@gmail.com"
          href="mailto:aaravjhawar578@gmail.com"
          note="I reply fast, usually within a day."
        />
      </div>
    </section>
  );
}

function CardPlus({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none z-20 flex h-2 w-2 items-center justify-center ${className ?? ""}`}
    >
      <div className="absolute h-px w-2 bg-ink" style={{ opacity: 0.3 }} />
      <div className="absolute h-2 w-px bg-ink" style={{ opacity: 0.3 }} />
    </div>
  );
}

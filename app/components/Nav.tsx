"use client";

import { motion } from "framer-motion";

const links = [
  { label: "HOME", href: "#top" },
  { label: "NOW", href: "#now" },
  { label: "WORK", href: "#work" },
  { label: "AWARDS", href: "#awards" },
  { label: "CONNECT", href: "#connect" },
];

export default function Nav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.0, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="absolute right-4 top-4 z-30 hidden items-center gap-6 md:right-8 md:top-8 md:flex"
    >
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          className="mono-label text-ink transition-opacity hover:opacity-60"
        >
          {l.label}
        </a>
      ))}
    </motion.nav>
  );
}

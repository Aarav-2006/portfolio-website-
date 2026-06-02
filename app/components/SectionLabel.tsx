import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function SectionLabel({
  number,
  label,
  className,
}: {
  number: string;
  label: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className={`mono-label flex items-center gap-2 text-gray-3 ${className ?? ""}`}
    >
      <span className="inline-block h-2 w-2">
        <span className="absolute h-px w-2 bg-gray-2" />
        <span className="absolute h-2 w-px bg-gray-2" />
      </span>
      <span>{number} / {label}</span>
    </motion.div>
  );
}

export function SectionDivider() {
  return (
    <div className="flex w-full items-center justify-center py-12 md:py-16">
      <div className="flex h-3 w-3 items-center justify-center">
        <div className="absolute h-px w-3 bg-gray-2" />
        <div className="absolute h-3 w-px bg-gray-2" />
      </div>
    </div>
  );
}

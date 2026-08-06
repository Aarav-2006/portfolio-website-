"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

type Command = {
  id: string;
  label: string;
  keywords?: string;
  action: () => void;
};

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

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(/Mac|iPod|iPhone|iPad/.test(navigator.platform));
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setActiveIndex(0);
    setCopied(false);
  }, []);

  const goTo = useCallback(
    (hash: string) => {
      close();
      window.requestAnimationFrame(() => {
        window.location.hash = hash;
      });
    },
    [close]
  );

  const commands: Command[] = useMemo(
    () => [
      { id: "home", label: "Go to Home", keywords: "top hero", action: () => goTo("#top") },
      { id: "projects", label: "Go to Projects", keywords: "work", action: () => goTo("#work") },
      {
        id: "experience",
        label: "Go to Experience",
        keywords: "internship homefirst nippon",
        action: () => goTo("#experience"),
      },
      { id: "awards", label: "Go to Awards", keywords: "achievements", action: () => goTo("#awards") },
      { id: "contact", label: "Go to Contact", keywords: "email get in touch", action: () => goTo("#contact") },
      /* Temporarily hidden — CV download disabled for now
      {
        id: "cv",
        label: "Download CV",
        keywords: "resume pdf",
        action: () => {
          const a = document.createElement("a");
          a.href = "/Aarav_Jhawar _CV.pdf";
          a.download = "Aarav_Jhawar_CV.pdf";
          a.click();
          close();
        },
      },
      */
      {
        id: "email",
        label: "Copy Email Address",
        keywords: "contact mail aaravjhawar578@gmail.com",
        action: () => {
          navigator.clipboard.writeText("aaravjhawar578@gmail.com");
          setCopied(true);
          window.setTimeout(() => close(), 900);
        },
      },
      {
        id: "github",
        label: "Open GitHub",
        keywords: "code repos",
        action: () => {
          window.open("https://github.com/Aarav-2006", "_blank", "noreferrer");
          close();
        },
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        keywords: "profile network",
        action: () => {
          window.open("https://linkedin.com/in/aarav-jhawar-a9a9b5276", "_blank", "noreferrer");
          close();
        },
      },
    ],
    [close, goTo]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.keywords?.toLowerCase().includes(q)
    );
  }, [commands, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        filtered[activeIndex]?.action();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, activeIndex, close]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Discoverability trigger — desktop only */}
      <button
        onClick={() => setIsOpen(true)}
        data-cursor-hover
        className="fixed bottom-5 right-5 z-40 hidden items-center gap-2 rounded-full border bg-paper px-4 py-2.5 shadow-sm transition-colors hover:bg-bg md:flex"
        style={{ borderColor: "var(--rule)" }}
      >
        <span className="mono-label text-ink-soft">QUICK NAV</span>
        <span
          className="mono-label flex items-center gap-0.5 rounded border px-1.5 py-0.5 text-gray-3"
          style={{ borderColor: "var(--rule)" }}
        >
          {isMac ? "⌘" : "CTRL"} K
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
              className="fixed inset-0 z-[90] bg-ink/40 backdrop-blur-sm"
            />

            <motion.div
              key="palette"
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.25, ease }}
              className="fixed left-1/2 top-[18%] z-[91] w-[92%] max-w-[560px] -translate-x-1/2"
            >
              <div
                className="relative overflow-hidden rounded-2xl border bg-paper shadow-xl"
                style={{ borderColor: "var(--rule)" }}
              >
                <CornerPlus className="absolute -top-px -left-px" />
                <CornerPlus className="absolute -top-px -right-px" />
                <CornerPlus className="absolute -bottom-px -left-px" />
                <CornerPlus className="absolute -bottom-px -right-px" />

                <div className="flex items-center gap-3 border-b px-5 py-4 hairline">
                  <span className="mono-label text-gray-3">→</span>
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Type a command..."
                    className="w-full bg-transparent text-[14px] text-ink outline-none placeholder:text-gray-2"
                  />
                  <span className="mono-label text-gray-3">ESC</span>
                </div>

                <div className="max-h-[320px] overflow-y-auto py-2">
                  {filtered.length === 0 && (
                    <div className="px-5 py-6 text-center">
                      <span className="mono-label text-gray-3">NO MATCHES</span>
                    </div>
                  )}
                  {filtered.map((cmd, i) => (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      onMouseEnter={() => setActiveIndex(i)}
                      className="flex w-full items-center justify-between px-5 py-3 text-left transition-colors"
                      style={{
                        backgroundColor: i === activeIndex ? "var(--bg)" : "transparent",
                      }}
                    >
                      <span className="text-[14px] text-ink">
                        {cmd.id === "email" && copied ? "Copied!" : cmd.label}
                      </span>
                      {i === activeIndex && <span className="mono-label text-gray-3">↵</span>}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t px-5 py-3 hairline">
                  <span className="mono-label text-gray-3">↑↓ NAVIGATE</span>
                  <span className="mono-label text-gray-3">↵ SELECT</span>
                  <span className="mono-label text-gray-3">ESC CLOSE</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";

export default function Cursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Skip on touch devices
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setIsVisible(true);

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [data-cursor-hover], input, textarea")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Default dot */}
      <div
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
        style={{
          transform: `translate3d(${position.x - 2}px, ${position.y - 2}px, 0)`,
        }}
      >
        <div
          className="h-1 w-1 rounded-full bg-ink transition-all duration-150 ease-out"
          style={{
            transform: isHovering ? "scale(0)" : "scale(1)",
          }}
        />
      </div>

      {/* Hover ring */}
      <div
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
        style={{
          transform: `translate3d(${position.x - 14}px, ${position.y - 14}px, 0)`,
        }}
      >
        <div
          className="h-7 w-7 rounded-full border border-ink transition-all duration-200 ease-out"
          style={{
            transform: isHovering ? "scale(1) opacity-1" : "scale(0.5) opacity-0",
          }}
        />
      </div>
    </>
  );
}

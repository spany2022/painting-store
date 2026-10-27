"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useFinePointer, useReducedMotion } from "@/lib/motion";

/**
 * A supplementary cursor follower for desktop. The native cursor stays visible;
 * elements with `data-cursor="Label"` expand the ring and show the label.
 */
export function Cursor() {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!fine || reduce || !ring.current) return;
    const el = ring.current;
    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });

    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      setVisible(true);
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor ?? null);
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [fine, reduce]);

  if (!fine || reduce) return null;

  return (
    <div
      ref={ring}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] mix-blend-normal"
      style={{ opacity: visible ? 1 : 0, transition: "opacity .3s" }}
    >
      <div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-center transition-all duration-500 ease-[var(--ease-gallery)]"
        style={{
          width: label ? 96 : 30,
          height: label ? 96 : 30,
          borderColor: label ? "transparent" : "rgb(166 75 50 / .45)",
          background: label ? "rgb(33 29 25 / .82)" : "transparent",
          backdropFilter: label ? "blur(4px)" : undefined,
        }}
      >
        <span
          className="eyebrow px-2 text-[0.58rem] leading-tight text-warmwhite transition-opacity duration-300"
          style={{ opacity: label ? 1 : 0 }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

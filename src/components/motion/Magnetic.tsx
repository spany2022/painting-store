"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useFinePointer, useReducedMotion } from "@/lib/motion";

/** Gently pulls its child toward the pointer on desktop. */
export function Magnetic({ children, strength = 0.28, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 16, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 16, mass: 0.4 });
  const active = fine && !reduce;

  return (
    <motion.div
      ref={ref}
      className={className ?? "inline-flex"}
      style={active ? { x, y } : undefined}
      onPointerMove={(e) => {
        if (!active || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

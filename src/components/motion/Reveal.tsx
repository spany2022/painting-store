"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { EASE } from "@/lib/motion";

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "p" | "span";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

/** Word-by-word headline reveal — a light replacement for a text-splitting library. */
export function RevealText({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  stagger = 0.06,
  immediate = false,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const state = immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "0px 0px -8% 0px" } };
  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        aria-hidden
        className="inline"
        initial={reduce ? false : "hidden"}
        {...state}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
      >
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className="inline-block will-change-transform"
              variants={{ hidden: { y: "110%" }, show: { y: "0%" } }}
              transition={{ duration: 1.1, ease: EASE }}
            >
              {w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

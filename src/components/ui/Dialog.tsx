"use client";

import { AnimatePresence, motion, type TargetAndTransition } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { EASE, useScrollLock } from "@/lib/motion";

type Variant = "center" | "right" | "top" | "full";

const panelMotion: Record<Variant, { initial: TargetAndTransition; animate: TargetAndTransition; exit: TargetAndTransition }> = {
  center: { initial: { opacity: 0, y: 24, scale: 0.98 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 16, scale: 0.98 } },
  right: { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } },
  top: { initial: { y: "-100%" }, animate: { y: 0 }, exit: { y: "-100%" } },
  full: { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } },
};

const panelClass: Record<Variant, string> = {
  center: "relative m-auto max-h-[92dvh] w-[min(1120px,calc(100vw-2rem))] overflow-y-auto bg-ivory",
  right: "ml-auto h-full w-full max-w-[460px] overflow-y-auto bg-ivory",
  top: "w-full bg-ivory",
  full: "h-full w-full",
};

/**
 * Accessible modal: traps focus, closes on Escape / backdrop, restores focus
 * to the trigger and pauses smooth scrolling while open.
 */
export function Dialog({
  open,
  onClose,
  label,
  variant = "center",
  children,
  className = "",
  dark = false,
  maxWidth,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  dark?: boolean;
  /** CSS max-width for the panel, e.g. to keep a 4:3 scene within the viewport height. */
  maxWidth?: string;
}) {
  const panel = useRef<HTMLDivElement>(null);
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const t = setTimeout(() => {
      const first = panel.current?.querySelector<HTMLElement>("[data-autofocus]") ??
        panel.current?.querySelector<HTMLElement>("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
      first?.focus();
    }, 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
      if (e.key === "Tab" && panel.current) {
        const items = Array.from(
          panel.current.querySelectorAll<HTMLElement>(
            "button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex='-1'])",
          ),
        ).filter((el) => el.offsetParent !== null);
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
  }, [open, onClose]);

  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className={`fixed inset-0 z-[70] flex ${variant === "center" ? "items-center p-4" : ""}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          data-lenis-prevent
        >
          <button
            type="button"
            tabIndex={-1}
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-charcoal/55 backdrop-blur-[3px]"
          />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className={`${panelClass[variant]} ${dark ? "on-dark bg-charcoal text-warmwhite" : "text-ink"} relative z-10 ${className}`}
            style={maxWidth ? { maxWidth } : undefined}
            {...panelMotion[variant]}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

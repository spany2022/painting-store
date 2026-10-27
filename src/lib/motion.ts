"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export const EASE = [0.22, 1, 0.36, 1] as const;

let lenisInstance: Lenis | null = null;
export const setLenis = (l: Lenis | null) => {
  lenisInstance = l;
};
export const getLenis = () => lenisInstance;

/** Pause smooth scrolling while overlays (drawers, modals) are open. */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const lenis = getLenis();
    lenis?.stop();
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = prev;
    };
  }, [locked]);
}

function subscribe(query: string, cb: (matches: boolean) => void) {
  const mq = window.matchMedia(query);
  cb(mq.matches);
  const handler = (e: MediaQueryListEvent) => cb(e.matches);
  mq.addEventListener("change", handler);
  return () => mq.removeEventListener("change", handler);
}

export function useMediaQuery(query: string, initial = false) {
  const [matches, setMatches] = useState(initial);
  useEffect(() => subscribe(query, setMatches), [query]);
  return matches;
}

export const useReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");
export const useFinePointer = () => useMediaQuery("(hover: hover) and (pointer: fine)");

/** Fired once the intro loader has finished (or was skipped). */
export const INTRO_DONE = "kk:intro-done";
export function introIsDone() {
  return typeof window !== "undefined" && (window as unknown as { __kkIntroDone?: boolean }).__kkIntroDone === true;
}
export function markIntroDone() {
  (window as unknown as { __kkIntroDone?: boolean }).__kkIntroDone = true;
  window.dispatchEvent(new Event(INTRO_DONE));
}
export function onIntroDone(cb: () => void) {
  if (introIsDone()) {
    cb();
    return () => {};
  }
  window.addEventListener(INTRO_DONE, cb, { once: true });
  return () => window.removeEventListener(INTRO_DONE, cb);
}

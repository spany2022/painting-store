"use client";

import { useEffect, useState } from "react";
import { LotusMotif } from "@/components/ui/Motif";
import { markIntroDone } from "@/lib/motion";
import { site } from "@/lib/site";

const KEY = "kk-intro-seen";

/**
 * A short branded intro shown once per browsing session. It is rendered on the
 * server so there is no flash of content, and an inline script hides it before
 * first paint for returning visitors and reduced-motion users.
 */
export function Loader() {
  const [phase, setPhase] = useState<"show" | "leave" | "gone">("show");

  useEffect(() => {
    const skip =
      document.documentElement.hasAttribute("data-intro-seen") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (skip) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPhase("gone");
      markIntroDone();
      return;
    }
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
    const t1 = setTimeout(() => {
      setPhase("leave");
      markIntroDone();
    }, 1700);
    const t2 = setTimeout(() => setPhase("gone"), 2700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `try{if(sessionStorage.getItem('${KEY}')||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.setAttribute('data-intro-seen','')}catch(e){}`,
        }}
      />
      <div
        id="kk-loader"
        aria-hidden
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-charcoal text-gold transition-[clip-path] duration-[1000ms] ease-[cubic-bezier(.76,0,.24,1)]"
        style={{ clipPath: phase === "leave" ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)" }}
      >
        <LotusMotif className="h-24 w-24 md:h-28 md:w-28" strokeWidth={0.5} draw />
        <div className="mt-8 overflow-hidden">
          <p className="kk-rise font-serif text-3xl tracking-[0.08em] text-warmwhite md:text-4xl">{site.wordmark.primary}</p>
        </div>
        <p className="kk-fade mt-3 text-[0.68rem] font-semibold tracking-[0.5em] text-gold-soft/80 uppercase">{site.wordmark.secondary}</p>
      </div>
    </>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { ArtImage } from "@/components/ui/ArtImage";
import { Magnetic } from "@/components/motion/Magnetic";
import { EASE, gsap, onIntroDone, ScrollTrigger } from "@/lib/motion";
import { DustParticles } from "./DustParticles";

const headline = "Art That Carries a Thousand Stories.";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const [go, setGo] = useState(false);

  useEffect(() => onIntroDone(() => setGo(true)), []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set("[data-light]", { opacity: 1 });
        return;
      }
      // Lights come up one by one, the camera eases back from a close crop.
      gsap.set("[data-frame]", { opacity: 0, y: 40 });
      gsap.set("[data-light]", { opacity: 0 });
      gsap.set("[data-scene]", { scale: 1.14 });

      const intro = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
      intro
        .to("[data-scene]", { scale: 1, duration: 3.2, ease: "power2.out" }, 0)
        .to("[data-light]", { opacity: 1, duration: 1.6, stagger: 0.35, ease: "sine.inOut" }, 0.1)
        .to("[data-frame]", { opacity: 1, y: 0, duration: 1.6, stagger: 0.18 }, 0.25)
        .from("[data-beam]", { opacity: 0, duration: 2.4 }, 0.4);

      const off = onIntroDone(() => intro.play());

      // Scroll (desktop only): drift the scene forward and fade the copy as the next section arrives.
      // On phones the artwork sits in the normal flow and simply scrolls with the page.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.to("[data-scene]", {
          yPercent: 8,
          scale: 1.08,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-copy]", {
          yPercent: -30,
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "70% top", scrub: true },
        });
      });

      // Pointer parallax — layers move at different depths.
      const layers = gsap.utils.toArray<HTMLElement>("[data-depth]");
      const movers = layers.map((l) => ({
        x: gsap.quickTo(l, "x", { duration: 1.4, ease: "power3" }),
        y: gsap.quickTo(l, "y", { duration: 1.4, ease: "power3" }),
        d: Number(l.dataset.depth),
      }));
      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        movers.forEach((m) => {
          m.x(nx * m.d * 40);
          m.y(ny * m.d * 24);
        });
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      return () => {
        off();
        mm.revert();
        window.removeEventListener("pointermove", onMove);
      };
    }, el);
    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section
      ref={root}
      aria-label="Introduction"
      className="on-dark relative isolate overflow-hidden bg-charcoal text-warmwhite md:h-[100svh] md:min-h-[640px]"
    >
      {/* Gallery wall */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 90% at 66% 28%, #4a3b2d 0%, #2f261f 38%, #1d1915 72%, #171310 100%)",
        }}
      />
      <div aria-hidden className="paper-texture absolute inset-0 -z-10 opacity-60 mix-blend-overlay" />
      {/* Afternoon window light */}
      <div aria-hidden data-beam className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-[10%] -top-[20%] h-[160%] w-[18%] rotate-[24deg] bg-gradient-to-b from-[#f3dcae]/[0.09] via-[#f3dcae]/[0.04] to-transparent blur-2xl" />
        <div className="absolute left-[12%] -top-[20%] h-[160%] w-[9%] rotate-[24deg] bg-gradient-to-b from-[#f3dcae]/[0.07] via-[#f3dcae]/[0.03] to-transparent blur-2xl" />
      </div>
      {/* Floor */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-[16%] bg-gradient-to-b from-transparent via-[#120f0c]/70 to-[#0f0c0a]" />

      {/* The scene */}
      <div data-scene className="absolute inset-0 hidden origin-[64%_45%] will-change-transform md:block">
        <div className="absolute bottom-[10%] left-[40%] right-[1%] top-[calc(var(--header-h)+1vh)] xl:left-[42%]">
          {/* Frames sit in a flex row and are sized by min(height, width) so they never collide. */}
          <div className="relative flex h-full w-full items-center justify-center gap-[clamp(1rem,2.6vw,3rem)]">
            {/* Left — Radha Krishna, small wooden frame */}
            <div data-depth="0.5" className="relative mt-[6%] h-[min(40%,15vw)] shrink-0">
              <Spotlight />
              <div data-frame className="frame-wood relative h-full">
                <div className="frame-mat h-full">
                  <ArtImage
                    art="patta-radha-krishna-ivory"
                    alt="Pattachitra of Radha and Krishna on an ivory ground"
                    sizes="18vw"
                    className="h-full w-auto"
                    preload
                  />
                </div>
              </div>
            </div>

            {/* Centre — Krishna on indigo, gilt frame */}
            <div data-depth="0.9" className="relative -mt-[4%] h-[min(82%,31vw)] shrink-0">
              <Spotlight wide />
              <div data-frame className="frame-gilt relative h-full" data-cursor="Discover">
                <div className="frame-mat h-full">
                  <ArtImage
                    art="patta-krishna-indigo"
                    alt="Pattachitra of Krishna playing the flute with Radha beneath an ornate arch, on an indigo ground"
                    sizes="(min-width:768px) 30vw, 60vw"
                    className="h-full w-auto"
                    preload
                    quality={85}
                  />
                </div>
              </div>
              <p data-frame className="absolute inset-x-0 top-full mt-4 whitespace-nowrap text-center text-[0.62rem] tracking-[0.24em] text-warmwhite/45 uppercase">
                Pattachitra · Natural pigments on cloth
              </p>
            </div>

            {/* Right — palm leaf on a wooden stand */}
            <div data-depth="0.65" className="relative mt-[14%] h-[min(42%,16vw)] shrink-0">
              <Spotlight />
              <div data-frame className="relative h-[86%]">
                <div className="h-full bg-[#3b2a1e] p-[5px] shadow-[var(--shadow-frame)]">
                  <ArtImage
                    art="palm-mandala"
                    alt="Etched palm leaf panel with a central mandala"
                    sizes="16vw"
                    className="h-full w-auto"
                  />
                </div>
                {/* easel stand */}
                <div aria-hidden className="absolute -bottom-[16%] left-1/2 h-[18%] w-[70%] -translate-x-1/2">
                  <span className="absolute left-[8%] top-0 h-full w-[5px] origin-top rotate-[14deg] bg-gradient-to-b from-[#5a4130] to-[#2e2017]" />
                  <span className="absolute right-[8%] top-0 h-full w-[5px] origin-top -rotate-[14deg] bg-gradient-to-b from-[#5a4130] to-[#2e2017]" />
                  <span className="absolute left-1/2 top-0 h-[112%] w-[5px] -translate-x-1/2 bg-gradient-to-b from-[#4a3526] to-[#22180f]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DustParticles className="pointer-events-none absolute inset-0 h-full w-full" />

      {/* Copy */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-[#16120f]/90 via-[#16120f]/30 to-transparent md:block" />
      <div
        data-copy
        className="container-x relative flex flex-col pb-14 pt-[calc(var(--header-h)+1.5rem)] md:h-full md:justify-center-safe md:pb-12 md:pt-[calc(var(--header-h)+2rem)]"
      >
        <div className="max-w-[34rem] md:max-w-[min(36vw,34rem)]">
          <motion.p
            className="eyebrow text-gold-soft"
            initial={{ opacity: 0, y: 12 }}
            animate={go ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, ease: EASE, delay: 0.3 }}
          >
            Pattachitra · Palm Leaf · Thread · Straw
          </motion.p>
          {/* Sized by width and height so the block fits short, wide screens without riding under the header. */}
          <h1 className="display mt-5 text-[clamp(2.6rem,min(6.4vw,9.5svh),6.4rem)]" aria-label={headline}>
            <motion.span
              aria-hidden
              className="inline"
              initial="hidden"
              animate={go ? "show" : "hidden"}
              transition={{ staggerChildren: 0.07, delayChildren: 0.45 }}
            >
              {headline.split(" ").map((w, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                  <motion.span
                    className={`inline-block ${w === "Thousand" ? "italic text-gold-soft" : ""}`}
                    variants={{ hidden: { y: "110%" }, show: { y: "0%" } }}
                    transition={{ duration: 1.3, ease: EASE }}
                  >
                    {w}&nbsp;
                  </motion.span>
                </span>
              ))}
            </motion.span>
          </h1>
          <motion.p
            className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-warmwhite/72"
            initial={{ opacity: 0, y: 16 }}
            animate={go ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1.2, ease: EASE, delay: 1.1 }}
          >
            Discover timeless Indian craftsmanship through traditional paintings, intricate handmade art, and
            thoughtfully created pieces that bring culture into your everyday spaces.
          </motion.p>
          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={go ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1.2, ease: EASE, delay: 1.3 }}
          >
            <Magnetic>
              <Link href="/shop" className="btn btn-primary" data-cursor="Explore">
                Explore the Collection <ArrowRight size={15} />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/#craft" className="btn btn-ghost">
                Discover Our Craft
              </Link>
            </Magnetic>
          </motion.div>
        </div>

        {/* Phones: the featured painting sits in the flow right below the calls to action. */}
        <div className="relative mt-12 flex justify-center md:hidden">
          <div className="relative w-[64%] max-w-[280px]">
            <Spotlight wide />
            <div data-frame className="frame-gilt relative">
              <div className="frame-mat">
                <ArtImage
                  art="patta-krishna-indigo"
                  alt="Pattachitra of Krishna playing the flute with Radha beneath an ornate arch, on an indigo ground"
                  sizes="64vw"
                  className="h-auto w-full"
                  preload
                  quality={85}
                />
              </div>
            </div>
            <p className="mt-4 text-center text-[0.6rem] tracking-[0.22em] text-warmwhite/45 uppercase">
              Pattachitra · Natural pigments on cloth
            </p>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#heritage"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[0.6rem] tracking-[0.3em] text-warmwhite/50 uppercase md:flex"
        aria-label="Scroll to next section"
      >
        Scroll
        <span className="relative block h-12 w-px overflow-hidden bg-warmwhite/15">
          <span className="absolute inset-0 bg-gold-soft" style={{ animation: "kk-scroll-cue 2.4s var(--ease-soft) infinite" }} />
        </span>
        <ArrowDown size={12} className="sr-only" />
      </a>
    </section>
  );
}

function Spotlight({ wide = false }: { wide?: boolean }) {
  return (
    <div
      aria-hidden
      data-light
      className="pointer-events-none absolute left-1/2 -z-10 -translate-x-1/2"
      style={{
        top: "-35%",
        width: wide ? "190%" : "230%",
        height: "160%",
        background:
          "radial-gradient(50% 55% at 50% 30%, rgba(255,226,170,.30) 0%, rgba(255,214,150,.12) 40%, rgba(255,214,150,0) 72%)",
        filter: "blur(6px)",
      }}
    />
  );
}

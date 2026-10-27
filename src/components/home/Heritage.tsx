"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { ArtImage } from "@/components/ui/ArtImage";
import { LotusMotif, SectionMark } from "@/components/ui/Motif";
import { Reveal, RevealText } from "@/components/motion/Reveal";
import { gsap } from "@/lib/motion";

export function Heritage() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-mask]",
        { clipPath: "inset(18% 12% 18% 12%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "power2.out",
          scrollTrigger: { trigger: "[data-mask]", start: "top 85%", end: "top 25%", scrub: 1 },
        },
      );
      gsap.fromTo("[data-mask] img", { scale: 1.25 }, {
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: "[data-mask]", start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.fromTo("[data-inset]", { yPercent: 30 }, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.to("[data-spin]", {
        rotate: 60,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="heritage" ref={root} className="relative overflow-hidden bg-ivory py-24 md:py-36">
      <div data-spin aria-hidden className="pointer-events-none absolute -right-40 top-10 text-gold/20">
        <LotusMotif className="h-[520px] w-[520px]" strokeWidth={0.3} />
      </div>

      <div className="container-x grid items-center gap-14 md:grid-cols-12 md:gap-10">
        <div className="relative md:col-span-6 lg:col-span-6">
          <div data-mask className="relative aspect-[4/5] overflow-hidden bg-sand md:aspect-[5/6]">
            <ArtImage
              art="artisan-raghurajpur"
              alt="An artisan's hand painting fine details on a large Pattachitra with a thin brush"
              fill
              sizes="(min-width:768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <figure data-inset className="absolute -bottom-10 right-4 w-[42%] border-[6px] border-ivory shadow-[var(--shadow-card)] md:-right-10 md:w-[38%]">
            <div className="relative aspect-square">
              <ArtImage
                art="artisan-pigment-shell"
                alt="A painter dipping a fine brush into pigment held in a small shell"
                fill
                sizes="20vw"
                className="object-cover"
              />
            </div>
          </figure>
          <p className="mt-14 max-w-xs text-xs leading-relaxed text-ink-soft md:mt-6">
            Pigment held in a shell, a brush fine enough for a single line — the tools of Pattachitra have changed little
            over generations.
          </p>
        </div>

        <div className="md:col-span-6 md:pl-10 lg:col-span-5 lg:col-start-8 lg:pl-0">
          <SectionMark index="01" label="Crafted with culture" />
          <RevealText
            text="Traditions Preserved. Stories Reimagined."
            className="display mt-6 text-[clamp(2.6rem,5vw,4.8rem)] text-ink"
          />
          <Reveal delay={0.15}>
            <p className="mt-8 text-[1.05rem] leading-relaxed text-ink">
              Every piece in our collection begins with a tradition — a way of preparing cloth, etching a leaf, cutting
              straw or laying a stitch that has been refined over generations of practice.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-5 leading-relaxed text-ink-soft">
              We bring together Pattachitra and palm leaf art from Odisha, embroidered paintings and appliqué, straw and
              grass craft, and canvas works for contemporary homes — choosing pieces for the clarity of their line, the
              patience in their making and the stories they carry. Each listing tells you how a work was made, what it is
              made of, and whether it is a handmade original or a print.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-y border-line py-6">
              {[
                ["5", "Craft traditions"],
                ["Natural", "Materials & pigments"],
                ["Clear", "Handmade or print labels"],
              ].map(([k, v]) => (
                <div key={v}>
                  <dt className="font-serif text-3xl text-terracotta md:text-4xl">{k}</dt>
                  <dd className="mt-1 text-xs leading-snug text-ink-soft">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.45}>
            <Link href="/about" className="group mt-10 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.2em] uppercase">
              <span className="link-underline">Discover our story</span>
              <ArrowRight size={15} className="transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

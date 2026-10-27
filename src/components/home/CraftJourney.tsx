"use client";

import { useEffect, useRef } from "react";
import { ArtImage } from "@/components/ui/ArtImage";
import { SectionMark } from "@/components/ui/Motif";
import { RevealText } from "@/components/motion/Reveal";
import { gsap } from "@/lib/motion";
import type { ArtKey } from "@/data/art";

const steps: {
  title: string;
  odia?: string;
  text: string;
  image: ArtKey;
  alt: string;
  inset: ArtKey;
  insetAlt: string;
  notes: [string, string][];
}[] = [
  {
    title: "Inspiration",
    text: "Mythology, nature and everyday ritual supply the stories. In painters' villages, even the house walls carry motifs — lotuses, creepers, peacocks and border patterns that reappear in every craft.",
    image: "raghurajpur-house",
    alt: "A village house with walls painted in red and white traditional motifs",
    inset: "palm-museum-gold",
    insetAlt: "A historic palm leaf painting with circular medallions on a dark ground",
    notes: [
      ["Pattachitra", "Jagannath, Krishna Leela, the epics"],
      ["Palm leaf", "Manuscript illustration and mandalas"],
      ["Embroidery", "Temple canopies, gardens, deities"],
      ["Straw", "Dancers, deities and courtly scenes"],
    ],
  },
  {
    title: "Materials",
    text: "Each craft begins with a natural surface: cloth layered with tamarind-seed paste and chalk, palm leaves dried and treated, cotton and silk thread, golden straw and wild grass.",
    image: "palm-raw-leaves",
    alt: "Prepared blank palm leaves fanned out on a cloth",
    inset: "sikki-dyed-grass",
    insetAlt: "Bundles of dyed sikki grass in red and magenta",
    notes: [
      ["Pigments", "Conch-shell white, lamp-soot black, mineral reds and yellows"],
      ["Palm leaf", "Cut, dried and treated before engraving"],
      ["Thread", "Cotton and silk on hand-woven ground"],
      ["Straw & grass", "Paddy straw and sikki grass, natural or dyed"],
    ],
  },
  {
    title: "Creation",
    text: "The first lines are drawn freehand. Painters customarily begin with the border; palm leaf artists incise directly into the leaf with an iron stylus, while embroiderers and straw artists build the image piece by piece.",
    image: "artisan-sketch",
    alt: "An artist sketching the outline of a figure in pencil",
    inset: "palm-etching-hands",
    insetAlt: "Hands etching a palm leaf with a fine metal stylus",
    notes: [
      ["Pattachitra", "Borders first, then figures"],
      ["Palm leaf", "Incised with a stylus, then inked with soot"],
      ["Embroidery", "Cut, layered and stitched"],
      ["Straw", "Split, flattened and laid grain by grain"],
    ],
  },
  {
    title: "Detailing",
    text: "Ornaments, textile patterns, foliage and the finest outlines come last — often with a brush of only a few hairs. This is where days become weeks.",
    image: "artisan-fineline",
    alt: "Close-up of a fine brush adding detail to a colourful painted figure",
    inset: "patta-brush-detail",
    insetAlt: "A brush adding colour within the intricate border of a Pattachitra",
    notes: [
      ["Line", "Outlines refined in black and white"],
      ["Pattern", "Jewellery, textiles and borders"],
      ["Finish", "Surfaces lacquered or burnished where traditional"],
      ["Time", "Larger works can take many weeks"],
    ],
  },
  {
    title: "The Finished Artwork",
    text: "Completed, the work leaves the studio to find its wall — a living room, a reading corner, a hotel lobby — carrying its story into a new space.",
    image: "gallery-framed-series",
    alt: "A series of framed Pattachitra paintings displayed on a gallery wall",
    inset: "straw-couple",
    insetAlt: "A straw collage of Radha and Krishna in golden straw on black",
    notes: [
      ["Framed", "Ready for living rooms and studies"],
      ["Panels", "Palm leaf and straw for intimate corners"],
      ["Textiles", "Embroidered works for bedrooms and halls"],
      ["Canvas", "Statement sizes for large walls"],
    ],
  },
];

export function CraftJourney() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const imgs = gsap.utils.toArray<HTMLElement>("[data-step-img]", el);
      const insets = gsap.utils.toArray<HTMLElement>("[data-step-inset]", el);
      const texts = gsap.utils.toArray<HTMLElement>("[data-step-text]", el);
      const ticks = gsap.utils.toArray<HTMLElement>("[data-tick]", el);

      gsap.set(imgs.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(insets.slice(1), { opacity: 0, y: 60 });
      gsap.set(texts.slice(1), { opacity: 0, y: 50 });
      gsap.set(ticks[0], { color: "#a64b32" });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: "[data-stage]",
          start: "top top",
          end: () => `+=${window.innerHeight * (steps.length - 1) * 0.9}`,
          pin: true,
          scrub: 0.8,
          snap: { snapTo: 1 / (steps.length - 1), duration: { min: 0.2, max: 0.6 }, ease: "power1.inOut" },
          invalidateOnRefresh: true,
        },
      });

      for (let i = 1; i < steps.length; i++) {
        const at = i - 1;
        tl.to(imgs[i], { clipPath: "inset(0% 0% 0% 0%)", duration: 1 }, at)
          .fromTo(imgs[i].querySelector("img"), { scale: 1.2 }, { scale: 1, duration: 1 }, at)
          .to(imgs[i - 1].querySelector("img"), { scale: 0.92, duration: 1 }, at)
          .to(insets[i - 1], { opacity: 0, y: -60, duration: 0.5 }, at)
          .to(insets[i], { opacity: 1, y: 0, duration: 0.5 }, at + 0.5)
          .to(texts[i - 1], { opacity: 0, y: -50, duration: 0.45 }, at)
          .to(texts[i], { opacity: 1, y: 0, duration: 0.5 }, at + 0.45)
          .to(ticks[i - 1], { color: "rgba(255,252,246,0.4)", duration: 0.2 }, at + 0.4)
          .to(ticks[i], { color: "#a64b32", duration: 0.2 }, at + 0.5);
      }
      tl.fromTo("[data-progress]", { scaleY: 0 }, { scaleY: 1, ease: "none", duration: steps.length - 1 }, 0);
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="craft" ref={root} className="on-dark relative bg-charcoal text-warmwhite">
      <div className="container-x pb-10 pt-24 md:pt-36">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <SectionMark index="03" label="The craftsmanship journey" dark />
            <RevealText text="From Raw Material to Finished Story" className="display mt-6 text-[clamp(2.6rem,5.4vw,5.2rem)]" />
          </div>
          <p className="text-warmwhite/65 md:col-span-4">
            Why handmade is different: every stage depends on judgement, patience and a hand that has practised for years.
          </p>
        </div>
      </div>

      {/* Desktop: pinned stage */}
      <div data-stage className="relative hidden h-[100svh] lg:block motion-reduce:lg:hidden">
        <div className="container-x grid h-full grid-cols-12 items-center gap-10 py-[calc(var(--header-h)*0.6)]">
          <div className="relative col-span-7 h-[78vh]">
            {steps.map((s, i) => (
              <div key={s.title} data-step-img className="absolute inset-0 overflow-hidden bg-charcoal-soft" style={{ zIndex: i }}>
                <ArtImage art={s.image} alt={s.alt} fill sizes="58vw" className="object-cover will-change-transform" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
              </div>
            ))}
            {steps.map((s) => (
              <figure
                key={`inset-${s.title}`}
                data-step-inset
                className="absolute -bottom-8 -right-10 z-20 w-[34%] border-[6px] border-charcoal bg-charcoal shadow-[var(--shadow-frame)]"
              >
                <div className="relative aspect-[4/5]">
                  <ArtImage art={s.inset} alt={s.insetAlt} fill sizes="20vw" className="object-cover" />
                </div>
              </figure>
            ))}
          </div>

          <div className="relative col-span-5 col-start-8 flex h-[78vh] gap-10">
            <ol className="relative flex flex-col justify-between py-2" aria-label="Stages">
              <span aria-hidden className="absolute left-[11px] top-3 bottom-3 w-px bg-warmwhite/15" />
              <span aria-hidden data-progress className="absolute left-[11px] top-3 bottom-3 w-px origin-top bg-terracotta" />
              {steps.map((s, i) => (
                <li key={s.title} data-tick className="relative flex items-center gap-3 font-serif text-sm text-warmwhite/40">
                  <span className="grid h-6 w-6 place-items-center rounded-full border border-current bg-charcoal text-[0.7rem]">
                    {i + 1}
                  </span>
                </li>
              ))}
            </ol>
            <div className="relative flex-1">
              {steps.map((s, i) => (
                <StepText key={s.title} step={s} index={i} pinned />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile & tablet: stacked */}
      <ol className="container-x space-y-20 pb-24 pt-6 lg:hidden motion-reduce:lg:block">
        {steps.map((s, i) => (
          <li key={s.title}>
            <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/10]">
              <ArtImage art={s.image} alt={s.alt} fill sizes="100vw" className="object-cover" />
            </div>
            <StepText step={s} index={i} />
          </li>
        ))}
      </ol>
    </section>
  );
}

function StepText({ step, index, pinned = false }: { step: (typeof steps)[number]; index: number; pinned?: boolean }) {
  return (
    <div data-step-text={pinned ? "" : undefined} className={pinned ? "absolute inset-0 flex flex-col justify-center" : "mt-8"}>
      <p className="font-serif text-6xl italic text-gold/50 md:text-7xl">{String(index + 1).padStart(2, "0")}</p>
      <h3 className="mt-2 font-serif text-4xl md:text-5xl">{step.title}</h3>
      <p className="mt-5 max-w-md leading-relaxed text-warmwhite/70">{step.text}</p>
      <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-warmwhite/12 pt-6">
        {step.notes.map(([k, v]) => (
          <div key={k}>
            <dt className="eyebrow text-[0.6rem] text-gold-soft">{k}</dt>
            <dd className="mt-1.5 text-[0.82rem] leading-snug text-warmwhite/75">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

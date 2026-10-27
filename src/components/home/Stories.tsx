"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Camera } from "lucide-react";
import { ArtImage } from "@/components/ui/ArtImage";
import { SectionMark } from "@/components/ui/Motif";
import { RevealText } from "@/components/motion/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { collectionStories, testimonials } from "@/data/stories";
import { EASE } from "@/lib/motion";
import { site, whatsappLink } from "@/lib/site";

export function Stories() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const n = collectionStories.length;
  const story = collectionStories[i];
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);

  const go = useCallback(
    (d: number) => {
      setDir(d);
      setI((x) => (x + d + n) % n);
    },
    [n],
  );

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = setInterval(() => go(1), 7000);
    return () => clearInterval(timer.current);
  }, [paused, go, i]);

  return (
    <section className="overflow-hidden bg-warmwhite py-24 md:py-36">
      <div className="container-x">
        <SectionMark index="07" label="Stories & collections" />
        <RevealText text="Art That Finds Its Place in Every Story." className="display mt-6 max-w-4xl text-[clamp(2.6rem,5.2vw,5rem)]" />

        <div
          className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          aria-roledescription="carousel"
          aria-label="Collection stories"
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-sand lg:col-span-7 lg:aspect-[6/5]">
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div
                key={story.id}
                custom={dir}
                className="absolute inset-0"
                initial={{ clipPath: dir > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)", scale: 1.08 }}
                animate={{ clipPath: "inset(0 0 0 0%)", scale: 1 }}
                exit={{ opacity: 0.4 }}
                transition={{ duration: 1.4, ease: EASE }}
              >
                <ArtImage art={story.image} alt={story.alt} fill sizes="(min-width:1024px) 58vw, 100vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col lg:col-span-5">
            <div className="relative min-h-[300px] flex-1" aria-live="polite">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.8, ease: EASE }}
                >
                  <p className="eyebrow text-terracotta">{story.eyebrow}</p>
                  <h3 className="display mt-4 text-[clamp(2.2rem,3.6vw,3.6rem)]">{story.title}</h3>
                  <p className="mt-6 max-w-md leading-relaxed text-ink-soft">{story.text}</p>
                  <Link href={story.href} className="group mt-8 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.2em] uppercase">
                    <span className="link-underline">{story.cta}</span>
                    <ArrowRight size={15} className="transition-transform duration-500 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
              <div className="flex items-center gap-3 font-serif text-lg">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span className="relative h-px w-20 bg-line">
                  <motion.span
                    key={`${i}-${paused}`}
                    className="absolute inset-y-0 left-0 bg-terracotta"
                    initial={{ width: `${(i / n) * 100}%` }}
                    animate={{ width: `${((i + 1) / n) * 100}%` }}
                    transition={{ duration: 0.8, ease: EASE }}
                  />
                </span>
                <span className="text-ink-soft">{String(n).padStart(2, "0")}</span>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => go(-1)} aria-label="Previous story" className="grid h-12 w-12 place-items-center rounded-full border border-ink/20 transition-colors hover:border-ink hover:bg-ink hover:text-warmwhite">
                  <ArrowLeft size={17} strokeWidth={1.4} />
                </button>
                <button type="button" onClick={() => go(1)} aria-label="Next story" className="grid h-12 w-12 place-items-center rounded-full border border-ink/20 transition-colors hover:border-ink hover:bg-ink hover:text-warmwhite">
                  <ArrowRight size={17} strokeWidth={1.4} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <CustomerVoices />
      </div>
    </section>
  );
}

/** Shows genuine testimonials when the store adds them; otherwise invites customers to share. */
function CustomerVoices() {
  if (testimonials.length > 0) {
    return (
      <ul className="mt-24 grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <li key={t.name + t.quote.slice(0, 12)} className="border border-line bg-ivory p-8">
            <blockquote className="font-serif text-2xl leading-snug">“{t.quote}”</blockquote>
            <p className="mt-6 text-sm text-ink-soft">
              {t.name}
              {t.location && `, ${t.location}`}
              {t.product && ` · ${t.product}`}
            </p>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="mt-24 grid items-center gap-8 border border-gold/40 bg-ivory p-8 md:grid-cols-12 md:p-12">
      <div className="md:col-span-7">
        <p className="eyebrow text-terracotta">Your corner, your story</p>
        <p className="mt-4 font-serif text-3xl leading-snug md:text-4xl">
          Has a piece found its place in your home? We would love to see it.
        </p>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-soft">
          Share a photograph of your artwork in its new setting. With your permission, we may feature it here alongside
          your words.
        </p>
      </div>
      <div className="flex flex-col gap-3 md:col-span-4 md:col-start-9">
        <a href={whatsappLink(`Hello ${site.name}, I'd like to share a photo of my artwork at home.`)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
          <WhatsAppIcon className="h-4 w-4" /> Share on WhatsApp
        </a>
        <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
          <Camera size={15} strokeWidth={1.5} /> Tag us on Instagram
        </a>
      </div>
    </div>
  );
}

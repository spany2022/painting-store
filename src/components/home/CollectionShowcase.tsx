"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/categories";
import { productsByCategory } from "@/data/products";
import { ArtImage } from "@/components/ui/ArtImage";
import { SectionMark } from "@/components/ui/Motif";
import { Reveal, RevealText } from "@/components/motion/Reveal";
import { EASE, useFinePointer, useReducedMotion } from "@/lib/motion";
import type { Category } from "@/lib/types";

// Editorial layout: each panel gets its own proportion and placement.
const layout: Record<string, { cell: string; aspect: string; focus: string }> = {
  pattachitra: { cell: "md:col-span-7 md:row-span-2", aspect: "aspect-[4/5] md:aspect-auto md:h-full", focus: "50% 30%" },
  canvas: { cell: "md:col-span-5", aspect: "aspect-[5/4]", focus: "50% 45%" },
  "palm-leaf": { cell: "md:col-span-5", aspect: "aspect-[5/4]", focus: "50% 20%" },
  embroidered: { cell: "md:col-span-5", aspect: "aspect-[4/5] md:aspect-[5/6]", focus: "50% 40%" },
  "straw-craft": { cell: "md:col-span-7", aspect: "aspect-[4/3] md:aspect-auto md:h-full", focus: "40% 40%" },
};

export function CollectionShowcase() {
  return (
    <section id="collections" className="relative bg-warmwhite py-24 md:py-36">
      <div className="container-x">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionMark index="02" label="The collection" />
            <RevealText text="Discover the Art Collection" className="display mt-6 text-[clamp(2.6rem,5.4vw,5.2rem)]" />
          </div>
          <Reveal className="md:col-span-4 md:col-start-9" delay={0.2}>
            <p className="leading-relaxed text-ink-soft">
              Five traditions, each with its own materials, tools and visual language — united by the patience of the hand
              that made them.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 md:mt-20 md:grid-cols-12 md:gap-6">
          {categories.map((c, i) => (
            <Panel key={c.slug} category={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Panel({ category: c, index }: { category: Category; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [4, -4]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-5, 5]), { stiffness: 120, damping: 18 });
  const tilt = fine && !reduce;
  const l = layout[c.slug];
  const count = productsByCategory(c.slug).length;

  return (
    <motion.div
      className={`${l.cell} [perspective:1200px]`}
      initial={reduce ? false : { opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.2, ease: EASE, delay: (index % 2) * 0.12 }}
    >
      <motion.div style={tilt ? { rotateX: rx, rotateY: ry } : undefined} className="h-full [transform-style:preserve-3d]">
        <Link
          ref={ref}
          href={`/collections/${c.slug}`}
          data-cursor="Explore"
          className="group relative block h-full min-h-full overflow-hidden bg-charcoal"
          onPointerMove={(e) => {
            if (!tilt || !ref.current) return;
            const r = ref.current.getBoundingClientRect();
            mx.set((e.clientX - r.left) / r.width);
            my.set((e.clientY - r.top) / r.height);
          }}
          onPointerLeave={() => {
            mx.set(0.5);
            my.set(0.5);
          }}
        >
          <div className={`relative w-full ${l.aspect}`}>
            <motion.div
              className="absolute inset-0"
              initial={reduce ? false : { clipPath: "inset(100% 0 0 0)" }}
              whileInView={{ clipPath: "inset(0% 0 0 0)" }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 1.4, ease: EASE }}
            >
              <ArtImage
                art={c.image}
                alt={`${c.name} — ${c.tagline}`}
                fill
                sizes={c.slug === "pattachitra" || c.slug === "straw-craft" ? "(min-width:768px) 58vw, 100vw" : "(min-width:768px) 42vw, 100vw"}
                className="object-cover transition-transform duration-[1.8s] ease-[var(--ease-gallery)] group-hover:scale-[1.06]"
                style={{ objectPosition: l.focus }}
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/35 to-transparent transition-opacity duration-700 group-hover:opacity-90" />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 text-warmwhite md:p-8">
              <div>
                <p className="text-[0.62rem] tracking-[0.28em] text-gold-soft uppercase">
                  {String(index + 1).padStart(2, "0")} · {c.region}
                </p>
                <h3 className="mt-3 font-serif text-[clamp(2rem,3.2vw,3.2rem)] leading-none">{c.name}</h3>
                <p className="mt-3 max-w-sm text-sm text-warmwhite/70">
                  {c.nativeName && <span className="mr-2 font-odia text-gold-soft">{c.nativeName}</span>}
                  {c.tagline}
                </p>
              </div>
              <span className="flex shrink-0 flex-col items-end gap-3">
                <span className="text-[0.62rem] tracking-[0.2em] text-warmwhite/60 uppercase">{count} works</span>
                <span className="grid h-12 w-12 place-items-center rounded-full border border-warmwhite/40 transition-all duration-500 group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold group-hover:text-charcoal">
                  <ArrowUpRight size={18} strokeWidth={1.4} />
                </span>
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

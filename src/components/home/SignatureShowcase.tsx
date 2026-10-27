"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { ProductCard } from "@/components/shop/ProductCard";
import { SectionMark } from "@/components/ui/Motif";
import { RevealText } from "@/components/motion/Reveal";
import { EASE } from "@/lib/motion";
import type { CategorySlug } from "@/lib/types";

type Sort = "featured" | "price-asc" | "price-desc";

export function SignatureShowcase() {
  const [cat, setCat] = useState<CategorySlug | "all">("all");
  const [sort, setSort] = useState<Sort>("featured");

  const list = useMemo(() => {
    let l = cat === "all" ? products : products.filter((p) => p.category === cat);
    if (sort === "featured") l = [...l].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    if (sort === "price-asc") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") l = [...l].sort((a, b) => b.price - a.price);
    return l.slice(0, 8);
  }, [cat, sort]);

  return (
    <section id="signature" className="bg-ivory py-24 md:py-36">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionMark index="04" label="Signature artworks" />
            <RevealText text="Pieces Worth Living With" className="display mt-6 text-[clamp(2.6rem,5.4vw,5.2rem)]" />
          </div>
          <Link href="/shop" className="group inline-flex items-center gap-3 self-start text-xs font-semibold tracking-[0.2em] uppercase md:self-auto">
            <span className="link-underline">View all artwork</span>
            <ArrowRight size={15} className="transition-transform duration-500 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-y border-line py-4 md:flex-row md:items-center md:justify-between">
          <div role="tablist" aria-label="Filter by category" className="no-scrollbar -mx-5 flex gap-1 overflow-x-auto px-5 md:mx-0 md:px-0">
            {[{ slug: "all" as const, shortName: "All" }, ...categories].map((c) => {
              const active = cat === c.slug;
              return (
                <button
                  key={c.slug}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCat(c.slug)}
                  className={`relative shrink-0 px-4 py-2.5 text-[0.78rem] tracking-[0.06em] transition-colors ${active ? "text-ivory" : "text-ink-soft hover:text-ink"}`}
                >
                  {active && (
                    <motion.span layoutId="sig-pill" className="absolute inset-0 -z-0 bg-charcoal" transition={{ duration: 0.5, ease: EASE }} />
                  )}
                  <span className="relative">{c.shortName}</span>
                </button>
              );
            })}
          </div>
          <label className="flex items-center gap-3 text-[0.78rem] text-ink-soft">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="cursor-pointer border-b border-line bg-transparent py-1.5 pr-2 text-ink focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </label>
        </div>

        <motion.ul layout className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.04 }}
              >
                <ProductCard product={p} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}

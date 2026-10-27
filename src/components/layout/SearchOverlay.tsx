"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
import { Dialog } from "@/components/ui/Dialog";
import { ArtImage } from "@/components/ui/ArtImage";
import { products } from "@/data/products";
import { categories, categoryMap } from "@/data/categories";
import { formatINR, makeLabel } from "@/lib/format";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return products
      .filter((p) =>
        [p.name, p.technique, p.materials, p.style, categoryMap[p.category].name, p.description]
          .join(" ")
          .toLowerCase()
          .includes(term),
      )
      .slice(0, 6);
  }, [q]);

  return (
    <Dialog open={open} onClose={onClose} label="Search artworks" variant="top">
      <div className="container-x py-6 md:py-10">
        <div className="flex items-center gap-4 border-b border-ink/20 pb-4 focus-within:border-terracotta">
          <Search size={22} strokeWidth={1.3} className="shrink-0 text-ink-soft" />
          <label htmlFor="site-search" className="sr-only">
            Search artworks
          </label>
          <input
            id="site-search"
            data-autofocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search Pattachitra, Jagannath, palm leaf…"
            className="w-full bg-transparent font-serif text-2xl outline-none focus-visible:outline-none placeholder:text-ink-soft/50 md:text-4xl"
            autoComplete="off"
          />
          <button type="button" onClick={onClose} aria-label="Close search" className="grid h-11 w-11 shrink-0 place-items-center">
            <X size={22} strokeWidth={1.3} />
          </button>
        </div>

        {q.trim() === "" ? (
          <div className="flex flex-wrap gap-2 pt-6">
            <span className="eyebrow mr-2 self-center text-ink-soft">Browse</span>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/collections/${c.slug}`}
                onClick={onClose}
                className="border border-line px-4 py-2 text-sm transition-colors hover:border-ink"
              >
                {c.shortName}
              </Link>
            ))}
          </div>
        ) : results.length === 0 ? (
          <p className="pt-8 text-ink-soft">
            No artworks match “{q}”. Try a craft, deity or material — or{" "}
            <Link href="/shop" onClick={onClose} className="underline">
              browse everything
            </Link>
            .
          </p>
        ) : (
          <ul className="grid gap-x-8 gap-y-2 pt-6 md:grid-cols-2" aria-live="polite">
            {results.map((p) => (
              <li key={p.slug}>
                <Link href={`/artwork/${p.slug}`} onClick={onClose} className="group flex items-center gap-4 py-3">
                  <span className="relative h-16 w-16 shrink-0 bg-warmwhite">
                    <ArtImage art={p.image} alt="" fill sizes="64px" className="object-contain p-1" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-serif text-xl">{p.name}</span>
                    <span className="text-xs text-ink-soft">
                      {categoryMap[p.category].shortName} · {makeLabel[p.make]} · {formatINR(p.price)}
                    </span>
                  </span>
                  <ArrowUpRight size={18} strokeWidth={1.3} className="opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Dialog>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, Heart, Plus } from "lucide-react";
import { ArtImage } from "@/components/ui/ArtImage";
import { useStore } from "@/components/providers/StoreProvider";
import { categoryMap } from "@/data/categories";
import { availabilityLabel, formatINR, makeLabel } from "@/lib/format";
import type { Product } from "@/lib/types";
import { QuickView } from "./QuickView";

export function ProductCard({ product, priority = false, sizes }: { product: Product; priority?: boolean; sizes?: string }) {
  const { add, toggleWish, isWished, ready } = useStore();
  const [quick, setQuick] = useState(false);
  const wished = ready && isWished(product.slug);
  const detail = product.details?.[0];
  const soldOut = product.availability === "sold-out";

  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-warmwhite shadow-[var(--shadow-card)]">
        <Link
          href={`/artwork/${product.slug}`}
          className="absolute inset-0 block"
          data-cursor="View Artwork"
          aria-label={`${product.name}, ${formatINR(product.price)}`}
        >
          <span
            className="absolute inset-[9%] block transition-transform duration-[1.6s] ease-[var(--ease-gallery)] group-hover:scale-[var(--zoom)]"
            style={
              {
                transformOrigin: detail ? `${detail.x}% ${detail.y}%` : "50% 50%",
                "--zoom": detail ? Math.min(detail.zoom * 0.75, 2) : 1.06,
              } as React.CSSProperties
            }
          >
            <ArtImage
              art={product.image}
              alt={product.alt}
              fill
              preload={priority}
              sizes={sizes ?? "(min-width:1280px) 25vw, (min-width:768px) 33vw, 50vw"}
              className="object-contain drop-shadow-[0_14px_18px_rgb(33_29_25/.22)]"
            />
          </span>
        </Link>

        <span className="pointer-events-none absolute left-3 top-3 bg-ivory/90 px-2.5 py-1 text-[0.62rem] font-semibold tracking-[0.16em] text-ink uppercase backdrop-blur-sm">
          {product.make === "handmade" ? "Handmade" : "Print"}
        </span>
        {detail && (
          <span className="pointer-events-none absolute bottom-3 left-3 translate-y-2 bg-charcoal/80 px-2.5 py-1 text-[0.62rem] tracking-[0.14em] text-warmwhite uppercase opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            Detail · {detail.label}
          </span>
        )}

        <button
          type="button"
          onClick={() => toggleWish(product.slug)}
          aria-pressed={wished}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          className="absolute right-2 top-2 grid h-10 w-10 place-items-center rounded-full bg-ivory/85 backdrop-blur-sm transition-colors hover:bg-ivory"
        >
          <Heart size={16} strokeWidth={1.5} className={wished ? "fill-terracotta text-terracotta" : "text-ink"} />
        </button>

        <div className="absolute inset-x-3 bottom-3 hidden translate-y-3 gap-2 opacity-0 transition-all duration-500 ease-[var(--ease-gallery)] group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 md:flex">
          <button
            type="button"
            onClick={() => setQuick(true)}
            className="flex h-11 flex-1 items-center justify-center gap-2 bg-ivory/95 text-[0.68rem] font-semibold tracking-[0.16em] uppercase backdrop-blur-sm hover:bg-warmwhite"
          >
            <Eye size={14} /> Quick view
          </button>
          <button
            type="button"
            disabled={soldOut}
            onClick={() => add(product.slug)}
            className="flex h-11 flex-1 items-center justify-center gap-2 bg-charcoal text-[0.68rem] font-semibold tracking-[0.16em] text-warmwhite uppercase hover:bg-ink disabled:opacity-50"
          >
            <Plus size={14} /> {soldOut ? "Sold out" : "Add to cart"}
          </button>
        </div>
      </div>

      {/* Fixed-height text block (two-line title, one-line meta) keeps every card in a row the same height. */}
      <div className="mt-4 flex flex-1 flex-col">
        <p className="eyebrow text-[0.6rem] text-terracotta">{categoryMap[product.category].shortName}</p>
        <h3 className="mt-1.5 line-clamp-2 min-h-[2.5em] font-serif text-[1.15rem] leading-[1.25] sm:text-[1.35rem]" title={product.name}>
          <Link href={`/artwork/${product.slug}`} className="hover:text-terracotta">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 truncate text-xs text-ink-soft">
          {product.variants ? `${product.variants.length} sizes` : product.dimensions} · {availabilityLabel[product.availability]}
        </p>
        <p className="mt-2 text-sm font-medium">
          {product.variants && <span className="text-xs font-normal text-ink-soft">from </span>}
          {formatINR(product.price)}
        </p>
      </div>
      <button
        type="button"
        disabled={soldOut}
        onClick={() => add(product.slug)}
        className="mt-4 flex h-11 w-full items-center justify-center gap-2 border border-ink/80 text-[0.66rem] font-semibold tracking-[0.16em] uppercase md:hidden"
        aria-label={`Add ${product.name} to cart`}
      >
        <Plus size={13} /> Add to cart
      </button>

      <QuickView product={product} open={quick} onClose={() => setQuick(false)} />
      <span className="sr-only">{makeLabel[product.make]}</span>
    </article>
  );
}

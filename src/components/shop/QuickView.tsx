"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Heart, X } from "lucide-react";
import { Dialog } from "@/components/ui/Dialog";
import { ArtImage } from "@/components/ui/ArtImage";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { useStore } from "@/components/providers/StoreProvider";
import { categoryMap } from "@/data/categories";
import { availabilityLabel, formatINR, makeLabel } from "@/lib/format";
import { productEnquiryLink } from "@/lib/whatsapp";
import type { Product } from "@/lib/types";
import { VariantPicker } from "./VariantPicker";

export function QuickView({ product, open, onClose }: { product: Product; open: boolean; onClose: () => void }) {
  const { add, toggleWish, isWished } = useStore();
  const [variantId, setVariantId] = useState(product.variants?.[0]?.id);
  const variant = product.variants?.find((v) => v.id === variantId);
  const wished = isWished(product.slug);

  return (
    <Dialog open={open} onClose={onClose} label={`Quick view: ${product.name}`}>
      <button type="button" onClick={onClose} aria-label="Close quick view" className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center bg-ivory/80">
        <X size={20} strokeWidth={1.4} />
      </button>
      <div className="grid md:grid-cols-[1.15fr_1fr]">
        <div className="relative aspect-square bg-sand/50 md:aspect-auto md:min-h-[600px]">
          <ArtImage
            art={product.image}
            alt={product.alt}
            fill
            sizes="(min-width:768px) 55vw, 100vw"
            className="object-contain p-8 drop-shadow-[0_20px_30px_rgb(33_29_25/.25)] md:p-12"
          />
        </div>
        <div className="flex flex-col p-6 md:p-10">
          <p className="eyebrow text-terracotta">
            {categoryMap[product.category].shortName} · {makeLabel[product.make]}
          </p>
          <h2 className="display mt-3 text-4xl md:text-5xl">{product.name}</h2>
          <p className="mt-4 font-serif text-2xl">{formatINR(variant?.price ?? product.price)}</p>
          <p className="mt-5 text-sm leading-relaxed text-ink-soft">{product.description}</p>

          {product.variants && (
            <div className="mt-6">
              <VariantPicker variants={product.variants} value={variantId} onChange={setVariantId} />
            </div>
          )}

          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-5 text-sm">
            <dt className="text-ink-soft">Technique</dt>
            <dd>{product.technique}</dd>
            <dt className="text-ink-soft">Size</dt>
            <dd>{variant?.dimensions ?? product.dimensions}</dd>
            <dt className="text-ink-soft">Availability</dt>
            <dd>{availabilityLabel[product.availability]}</dd>
          </dl>

          <div className="mt-auto grid gap-2 pt-8">
            <div className="flex gap-2">
              <button
                type="button"
                className="btn btn-primary flex-1"
                disabled={product.availability === "sold-out"}
                onClick={() => {
                  add(product.slug, variantId);
                  onClose();
                }}
              >
                Add to cart
              </button>
              <button
                type="button"
                onClick={() => toggleWish(product.slug)}
                aria-pressed={wished}
                aria-label={wished ? "Remove from wishlist" : "Save to wishlist"}
                className="grid h-[3.25rem] w-[3.25rem] place-items-center border border-line hover:border-ink"
              >
                <Heart size={18} strokeWidth={1.4} className={wished ? "fill-terracotta text-terracotta" : ""} />
              </button>
            </div>
            <a href={productEnquiryLink(product, variant)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              <WhatsAppIcon className="h-4 w-4" /> Enquire on WhatsApp
            </a>
            <Link href={`/artwork/${product.slug}`} onClick={onClose} className="mt-2 inline-flex items-center gap-2 self-start text-xs font-semibold tracking-[0.16em] uppercase">
              <span className="link-underline">View full details</span> <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

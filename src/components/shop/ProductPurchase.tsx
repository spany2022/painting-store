"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Heart, Home, Package, Truck } from "lucide-react";
import { useStore } from "@/components/providers/StoreProvider";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { Dialog } from "@/components/ui/Dialog";
import { RoomScene, roomPresets, type RoomPreset } from "@/components/rooms/RoomScene";
import { categoryMap } from "@/data/categories";
import { availabilityLabel, formatINR, makeLabel, styleLabel } from "@/lib/format";
import { productEnquiryLink } from "@/lib/whatsapp";
import { widthCmOf } from "@/lib/dimensions";
import type { Product } from "@/lib/types";
import { VariantPicker } from "./VariantPicker";
import { QtyStepper } from "./CartDrawer";

export function ProductPurchase({ product }: { product: Product }) {
  const { add, toggleWish, isWished, ready } = useStore();
  const [variantId, setVariantId] = useState(product.variants?.[1]?.id ?? product.variants?.[0]?.id);
  const [qty, setQty] = useState(1);
  const [room, setRoom] = useState(false);
  const [preset, setPreset] = useState<RoomPreset>("living");
  const [added, setAdded] = useState(false);
  const variant = product.variants?.find((v) => v.id === variantId);
  const price = variant?.price ?? product.price;
  const wished = ready && isWished(product.slug);
  const soldOut = product.availability === "sold-out";
  const cat = categoryMap[product.category];

  const addToCart = () => {
    add(product.slug, variantId, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div>
      <p className="eyebrow text-terracotta">
        <Link href={`/collections/${cat.slug}`} className="hover:underline">
          {cat.name}
        </Link>
      </p>
      <h1 className="display mt-4 text-[clamp(2.6rem,4.6vw,4.4rem)]">{product.name}</h1>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <p className="font-serif text-3xl">{formatINR(price)}</p>
        <span className={`px-2.5 py-1 text-[0.62rem] font-semibold tracking-[0.16em] uppercase ${product.make === "handmade" ? "bg-forest text-warmwhite" : "border border-ink/30"}`}>
          {makeLabel[product.make]}
        </span>
      </div>
      <p className="mt-1 text-xs text-ink-soft">Applicable taxes and delivery charges are confirmed with your order.</p>

      <p className="mt-7 leading-relaxed text-ink">{product.description}</p>

      {product.variants && (
        <div className="mt-8">
          <VariantPicker variants={product.variants} value={variantId} onChange={setVariantId} />
        </div>
      )}

      <div className="mt-8 flex gap-3">
        <QtyStepper qty={qty} onChange={(q) => setQty(Math.max(1, q))} label={product.name} />
        <button type="button" className="btn btn-primary flex-1" disabled={soldOut} onClick={addToCart}>
          {soldOut ? "Sold out" : added ? (
            <>
              <Check size={16} /> Added
            </>
          ) : (
            "Add to cart"
          )}
        </button>
        <button
          type="button"
          onClick={() => toggleWish(product.slug)}
          aria-pressed={wished}
          aria-label={wished ? "Remove from wishlist" : "Save to wishlist"}
          className="grid h-[3.25rem] w-[3.25rem] shrink-0 place-items-center border border-line transition-colors hover:border-ink"
        >
          <Heart size={18} strokeWidth={1.4} className={wished ? "fill-terracotta text-terracotta" : ""} />
        </button>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <a href={productEnquiryLink(product, variant)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
          <WhatsAppIcon className="h-4 w-4" /> Enquire on WhatsApp
        </a>
        <button type="button" onClick={() => setRoom(true)} className="btn btn-ghost">
          <Home size={15} strokeWidth={1.5} /> View in a room
        </button>
      </div>

      <ul className="mt-8 space-y-3 border-y border-line py-6 text-sm">
        <li className="flex gap-3">
          <Package size={17} strokeWidth={1.4} className="mt-0.5 shrink-0 text-terracotta" />
          <span>
            <strong className="font-medium">{availabilityLabel[product.availability]}</strong> — {product.delivery}
          </span>
        </li>
        <li className="flex gap-3">
          <Truck size={17} strokeWidth={1.4} className="mt-0.5 shrink-0 text-terracotta" />
          <span>
            Packed for safe transit. See{" "}
            <Link href="/policies/shipping" className="underline underline-offset-4">
              shipping
            </Link>{" "}
            and{" "}
            <Link href="/policies/returns" className="underline underline-offset-4">
              returns
            </Link>
            .
          </span>
        </li>
      </ul>

      <div className="mt-2 divide-y divide-line">
        <Accordion title="The story" defaultOpen>
          <p>{product.story}</p>
        </Accordion>
        <Accordion title="Details">
          <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-2.5">
            <dt className="text-ink-soft">Category</dt>
            <dd>{cat.name}</dd>
            <dt className="text-ink-soft">Technique</dt>
            <dd>{product.technique}</dd>
            <dt className="text-ink-soft">Materials</dt>
            <dd>{product.materials}</dd>
            <dt className="text-ink-soft">Dimensions</dt>
            <dd>{variant ? `${variant.label}: ${variant.dimensions}` : product.dimensions}</dd>
            {product.framing && (
              <>
                <dt className="text-ink-soft">Framing</dt>
                <dd>{product.framing}</dd>
              </>
            )}
            <dt className="text-ink-soft">Type</dt>
            <dd>{makeLabel[product.make]}</dd>
            <dt className="text-ink-soft">Style</dt>
            <dd>{styleLabel[product.style]}</dd>
          </dl>
        </Accordion>
        <Accordion title="Care">
          <p>{product.care}</p>
        </Accordion>
      </div>

      {/* Mobile sticky bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-line bg-ivory/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <div className="min-w-0 flex-1">
          <p className="truncate font-serif text-lg leading-tight">{product.name}</p>
          <p className="text-sm">{formatINR(price)}</p>
        </div>
        <a href={productEnquiryLink(product, variant)} target="_blank" rel="noopener noreferrer" aria-label="Enquire on WhatsApp" className="grid h-12 w-12 place-items-center bg-forest text-warmwhite">
          <WhatsAppIcon className="h-5 w-5" />
        </a>
        <button type="button" className="btn btn-primary !min-h-12 !px-5" disabled={soldOut} onClick={addToCart}>
          {added ? "Added" : "Add to cart"}
        </button>
      </div>

      <Dialog open={room} onClose={() => setRoom(false)} label={`${product.name} in a room`} maxWidth="calc((92dvh - 120px) * 4 / 3)">
        <RoomScene
          artKey={product.image}
          alt={product.alt}
          widthCm={widthCmOf(product, variantId)}
          preset={preset}
          sizes="90vw"
        />
        <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between md:p-6">
          <div>
            <p className="font-serif text-2xl">{product.name}</p>
            <p className="text-sm text-ink-soft">
              Shown at {variant?.dimensions ?? product.dimensions} · illustrated room, actual artwork photograph
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(roomPresets) as RoomPreset[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setPreset(r)}
                aria-pressed={preset === r}
                className={`border px-3 py-2 text-xs ${preset === r ? "border-ink bg-ink text-warmwhite" : "border-ink/20 hover:border-ink"}`}
              >
                {roomPresets[r].label}
              </button>
            ))}
            <button type="button" onClick={() => setRoom(false)} className="px-3 py-2 text-xs underline underline-offset-4">
              Close
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

function Accordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  return (
    <details className="group py-5" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between font-serif text-xl [&::-webkit-details-marker]:hidden">
        {title}
        <span className="relative h-3 w-3" aria-hidden>
          <span className="absolute left-0 top-1/2 h-px w-3 bg-current" />
          <span className="absolute left-1/2 top-0 h-3 w-px bg-current transition-transform duration-300 group-open:scale-y-0" />
        </span>
      </summary>
      <div className="pt-4 text-sm leading-relaxed text-ink-soft">{children}</div>
    </details>
  );
}

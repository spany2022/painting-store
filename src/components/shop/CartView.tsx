"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useStore } from "@/components/providers/StoreProvider";
import { ArtImage } from "@/components/ui/ArtImage";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { formatINR, makeLabel } from "@/lib/format";
import { orderRequestLink } from "@/lib/whatsapp";
import { QtyStepper } from "./CartDrawer";

export function CartView() {
  const { lines, subtotal, setQty, remove, ready } = useStore();

  if (!ready) return <div className="h-64" aria-busy="true" />;

  if (lines.length === 0) {
    return (
      <div className="border-t border-line py-24 text-center">
        <p className="font-serif text-4xl">Your cart is empty</p>
        <p className="mt-3 text-ink-soft">Find a piece that carries a story into your home.</p>
        <Link href="/shop" className="btn btn-dark mt-8">
          Explore the collection
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <ul className="divide-y divide-line border-y border-line lg:col-span-8">
        {lines.map((l) => (
          <li key={`${l.slug}-${l.variantId ?? ""}`} className="grid grid-cols-[96px_1fr] gap-5 py-6 sm:grid-cols-[140px_1fr]">
            <Link href={`/artwork/${l.slug}`} className="relative aspect-[4/5] bg-warmwhite">
              <ArtImage art={l.product.image} alt={l.product.alt} fill sizes="140px" className="object-contain p-2" />
            </Link>
            <div className="flex flex-col">
              <div className="flex justify-between gap-4">
                <div>
                  <Link href={`/artwork/${l.slug}`} className="font-serif text-2xl leading-tight hover:text-terracotta">
                    {l.product.name}
                  </Link>
                  <p className="mt-1 text-sm text-ink-soft">
                    {makeLabel[l.product.make]} · {l.variant ? `${l.variant.label}, ${l.variant.dimensions}` : l.product.dimensions}
                  </p>
                  <p className="mt-1 text-xs text-ink-soft">{l.product.delivery}</p>
                </div>
                <button type="button" onClick={() => remove(l.slug, l.variantId)} aria-label={`Remove ${l.product.name}`} className="grid h-9 w-9 shrink-0 place-items-center text-ink-soft hover:text-ink">
                  <X size={17} />
                </button>
              </div>
              <div className="mt-auto flex items-center justify-between pt-4">
                <QtyStepper qty={l.qty} onChange={(q) => setQty(l.slug, l.variantId, q)} label={l.product.name} />
                <span className="font-medium">{formatINR(l.lineTotal)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside className="lg:col-span-4">
        <div className="sticky top-[calc(var(--header-h)+24px)] bg-warmwhite p-6 shadow-[var(--shadow-card)] md:p-8">
          <p className="font-serif text-2xl">Order summary</p>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-soft">Subtotal</dt>
              <dd>{formatINR(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-soft">Delivery</dt>
              <dd className="text-ink-soft">Confirmed with your order</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-4 font-serif text-xl">
              <dt>Total (before delivery)</dt>
              <dd>{formatINR(subtotal)}</dd>
            </div>
          </dl>
          <div className="mt-6 grid gap-2">
            <Link href="/checkout" className="btn btn-primary">
              Proceed to checkout
            </Link>
            <a href={orderRequestLink(lines, subtotal)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              <WhatsAppIcon className="h-4 w-4" /> Order on WhatsApp
            </a>
          </div>
          <Link href="/shop" className="mt-5 block text-center text-xs tracking-[0.12em] text-ink-soft uppercase underline-offset-4 hover:underline">
            Continue shopping
          </Link>
        </div>
      </aside>
    </div>
  );
}

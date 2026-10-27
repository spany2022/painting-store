"use client";

import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { Dialog } from "@/components/ui/Dialog";
import { ArtImage } from "@/components/ui/ArtImage";
import { useStore } from "@/components/providers/StoreProvider";
import { formatINR, makeLabel } from "@/lib/format";
import { orderRequestLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function CartDrawer() {
  const { cartOpen, closeCart, lines, subtotal, setQty, remove, count } = useStore();

  return (
    <Dialog open={cartOpen} onClose={closeCart} label="Shopping cart" variant="right">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <p className="font-serif text-2xl">
            Your Cart <span className="text-base text-ink-soft">({count})</span>
          </p>
          <button type="button" onClick={closeCart} aria-label="Close cart" className="grid h-11 w-11 place-items-center">
            <X size={20} strokeWidth={1.4} />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <p className="font-serif text-3xl">Your cart is empty</p>
            <p className="mt-3 text-sm text-ink-soft">Discover pieces that carry a story into your home.</p>
            <Link href="/shop" onClick={closeCart} className="btn btn-dark mt-8">
              Explore the collection
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
              {lines.map((l) => (
                <li key={`${l.slug}-${l.variantId ?? ""}`} className="flex gap-4 py-5">
                  <Link href={`/artwork/${l.slug}`} onClick={closeCart} className="relative h-24 w-20 shrink-0 bg-warmwhite">
                    <ArtImage art={l.product.image} alt={l.product.alt} fill sizes="80px" className="object-contain p-1.5" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-3">
                      <Link href={`/artwork/${l.slug}`} onClick={closeCart} className="font-serif text-lg leading-tight">
                        {l.product.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => remove(l.slug, l.variantId)}
                        aria-label={`Remove ${l.product.name}`}
                        className="-mr-2 -mt-1 grid h-8 w-8 shrink-0 place-items-center text-ink-soft hover:text-ink"
                      >
                        <X size={15} />
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-ink-soft">
                      {makeLabel[l.product.make]}
                      {l.variant ? ` · ${l.variant.label}, ${l.variant.dimensions}` : ` · ${l.product.dimensions}`}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <QtyStepper
                        qty={l.qty}
                        onChange={(q) => setQty(l.slug, l.variantId, q)}
                        label={l.product.name}
                      />
                      <span className="text-sm font-medium">{formatINR(l.lineTotal)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-line bg-warmwhite px-6 py-6">
              <div className="flex items-baseline justify-between">
                <span className="eyebrow text-ink-soft">Subtotal</span>
                <span className="font-serif text-2xl">{formatINR(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-ink-soft">Delivery charges and taxes are confirmed at checkout.</p>
              <div className="mt-5 grid gap-2">
                <Link href="/checkout" onClick={closeCart} className="btn btn-primary w-full">
                  Checkout
                </Link>
                <a
                  href={orderRequestLink(lines, subtotal)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp w-full"
                >
                  <WhatsAppIcon className="h-4 w-4" /> Order on WhatsApp
                </a>
                <Link href="/cart" onClick={closeCart} className="mt-1 text-center text-xs tracking-[0.12em] text-ink-soft underline-offset-4 hover:underline">
                  VIEW FULL CART
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </Dialog>
  );
}

export function QtyStepper({ qty, onChange, label }: { qty: number; onChange: (q: number) => void; label: string }) {
  return (
    <div className="flex items-center border border-line">
      <button type="button" className="grid h-9 w-9 place-items-center" onClick={() => onChange(qty - 1)} aria-label={`Decrease quantity of ${label}`}>
        <Minus size={13} />
      </button>
      <span className="w-7 text-center text-sm tabular-nums" aria-live="polite">
        {qty}
      </span>
      <button
        type="button"
        className="grid h-9 w-9 place-items-center disabled:opacity-30"
        onClick={() => onChange(qty + 1)}
        disabled={qty >= 10}
        aria-label={`Increase quantity of ${label}`}
      >
        <Plus size={13} />
      </button>
    </div>
  );
}

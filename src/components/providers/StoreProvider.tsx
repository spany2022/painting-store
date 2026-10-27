"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct } from "@/data/products";
import type { CartLine, Product, Variant } from "@/lib/types";

const CART_KEY = "kk-cart-v1";
const WISH_KEY = "kk-wishlist-v1";

export interface ResolvedLine extends CartLine {
  product: Product;
  variant?: Variant;
  unitPrice: number;
  lineTotal: number;
}

interface StoreState {
  ready: boolean;
  lines: ResolvedLine[];
  count: number;
  subtotal: number;
  wishlist: string[];
  cartOpen: boolean;
  lastAdded: string | null;
  openCart: () => void;
  closeCart: () => void;
  add: (slug: string, variantId?: string, qty?: number) => void;
  setQty: (slug: string, variantId: string | undefined, qty: number) => void;
  remove: (slug: string, variantId?: string) => void;
  clear: () => void;
  toggleWish: (slug: string) => void;
  isWished: (slug: string) => boolean;
}

const StoreContext = createContext<StoreState | null>(null);

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be unavailable (private mode); the cart still works for this visit.
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  useEffect(() => {
    // Hydrate persisted state after mount so server and client markup match.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCart(read<CartLine[]>(CART_KEY, []).filter((l) => getProduct(l.slug)));
    setWishlist(read<string[]>(WISH_KEY, []).filter((s) => getProduct(s)));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) write(CART_KEY, cart);
  }, [cart, ready]);

  useEffect(() => {
    if (ready) write(WISH_KEY, wishlist);
  }, [wishlist, ready]);

  const add = useCallback((slug: string, variantId?: string, qty = 1) => {
    const product = getProduct(slug);
    if (!product || product.availability === "sold-out") return;
    const vid = variantId ?? product.variants?.[0]?.id;
    setCart((prev) => {
      const i = prev.findIndex((l) => l.slug === slug && l.variantId === vid);
      if (i === -1) return [...prev, { slug, variantId: vid, qty }];
      const next = [...prev];
      next[i] = { ...next[i], qty: Math.min(next[i].qty + qty, 10) };
      return next;
    });
    setLastAdded(slug);
    setCartOpen(true);
  }, []);

  const setQty = useCallback((slug: string, variantId: string | undefined, qty: number) => {
    setCart((prev) =>
      prev
        .map((l) => (l.slug === slug && l.variantId === variantId ? { ...l, qty: Math.max(0, Math.min(qty, 10)) } : l))
        .filter((l) => l.qty > 0),
    );
  }, []);

  const remove = useCallback((slug: string, variantId?: string) => {
    setCart((prev) => prev.filter((l) => !(l.slug === slug && l.variantId === variantId)));
  }, []);

  const toggleWish = useCallback((slug: string) => {
    setWishlist((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }, []);

  const value = useMemo<StoreState>(() => {
    const lines: ResolvedLine[] = cart.flatMap((l) => {
      const product = getProduct(l.slug);
      if (!product) return [];
      const variant = product.variants?.find((v) => v.id === l.variantId);
      const unitPrice = variant?.price ?? product.price;
      return [{ ...l, product, variant, unitPrice, lineTotal: unitPrice * l.qty }];
    });
    return {
      ready,
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.lineTotal, 0),
      wishlist,
      cartOpen,
      lastAdded,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      add,
      setQty,
      remove,
      clear: () => setCart([]),
      toggleWish,
      isWished: (slug) => wishlist.includes(slug),
    };
  }, [cart, wishlist, cartOpen, lastAdded, ready, add, setQty, remove, toggleWish]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}

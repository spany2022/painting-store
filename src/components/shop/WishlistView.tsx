"use client";

import Link from "next/link";
import { useStore } from "@/components/providers/StoreProvider";
import { getProduct } from "@/data/products";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { site, whatsappLink } from "@/lib/site";
import { ProductCard } from "./ProductCard";

export function WishlistView() {
  const { wishlist, ready } = useStore();
  if (!ready) return <div className="h-64" aria-busy="true" />;
  const items = wishlist.flatMap((s) => getProduct(s) ?? []);

  if (items.length === 0) {
    return (
      <div className="border-t border-line py-24 text-center">
        <p className="font-serif text-4xl">Nothing saved yet</p>
        <p className="mt-3 text-ink-soft">Tap the heart on any artwork to keep it here.</p>
        <Link href="/shop" className="btn btn-dark mt-8">
          Explore the collection
        </Link>
      </div>
    );
  }

  const message = [`Hello ${site.name}, here is my shortlist:`, ...items.map((p) => `• ${p.name} — ${site.url}/artwork/${p.slug}`)].join("\n");

  return (
    <>
      <div className="flex justify-end border-b border-line pb-4">
        <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
          <WhatsAppIcon className="h-4 w-4" /> Share shortlist
        </a>
      </div>
      <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4">
        {items.map((p) => (
          <li key={p.slug}>
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </>
  );
}

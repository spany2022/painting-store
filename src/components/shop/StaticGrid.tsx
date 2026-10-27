import Link from "next/link";
import { ArtImage } from "@/components/ui/ArtImage";
import { formatINR } from "@/lib/format";
import type { Product } from "@/lib/types";

/** Server-rendered grid used as the Suspense fallback while filters hydrate. */
export function StaticGrid({ items }: { items: Product[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:ml-[294px] xl:grid-cols-3">
      {items.map((p) => (
        <li key={p.slug}>
          <Link href={`/artwork/${p.slug}`} className="block">
            <div className="relative aspect-[4/5] bg-warmwhite">
              <ArtImage art={p.image} alt={p.alt} fill sizes="(min-width:1280px) 25vw, 50vw" className="object-contain p-[9%]" />
            </div>
            <p className="mt-4 font-serif text-[1.35rem] leading-tight">{p.name}</p>
            <p className="mt-1 text-sm">{formatINR(p.price)}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

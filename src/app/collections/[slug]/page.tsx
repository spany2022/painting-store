import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageSkeleton } from "@/components/ui/Skeletons";
import { Suspense } from "react";
import Link from "next/link";
import { categories, getCategory } from "@/data/categories";
import { productsByCategory } from "@/data/products";
import { ArtImage } from "@/components/ui/ArtImage";
import { Breadcrumbs, JsonLd, breadcrumbJsonLd } from "@/components/ui/PageHeader";
import { ShopBrowser } from "@/components/shop/ShopBrowser";
import { StaticGrid } from "@/components/shop/StaticGrid";
import { LotusMotif } from "@/components/ui/Motif";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCategory(slug);
  if (!c) return {};
  return {
    title: c.name,
    description: `${c.summary} ${c.about[0]}`.slice(0, 158),
    alternates: { canonical: `/collections/${c.slug}` },
    openGraph: { images: [{ url: `/images/art/${c.image}.webp`, alt: c.name }] },
  };
}

export default function CollectionPage({ params }: PageProps<"/collections/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <CollectionContent params={params} />
    </Suspense>
  );
}

async function CollectionContent({ params }: { params: PageProps<"/collections/[slug]">["params"] }) {
  const { slug } = await params;
  const c = getCategory(slug);
  if (!c) notFound();
  const items = productsByCategory(c.slug);
  const crumbs = [{ href: "/", label: "Home" }, { href: "/shop", label: "Shop" }, { label: c.shortName }];
  const others = categories.filter((x) => x.slug !== c.slug);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(site.url, crumbs)} />
      <section className="on-dark relative isolate overflow-hidden bg-charcoal text-warmwhite">
        <div className="absolute inset-0 -z-10">
          <ArtImage art={c.image} alt="" fill preload sizes="100vw" className="object-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/75 to-charcoal/20" />
        </div>
        <div className="container-x grid min-h-[78svh] items-end gap-10 pb-16 pt-[calc(var(--header-h)+4rem)] md:grid-cols-12 md:pb-24">
          <div className="md:col-span-7">
            <div className="[&_*]:!text-warmwhite/70">
              <Breadcrumbs items={crumbs} />
            </div>
            <p className="eyebrow mt-10 text-gold-soft">
              {c.region} · {items.length} works
            </p>
            <h1 className="display mt-4 text-[clamp(3rem,7vw,6.8rem)]">{c.name}</h1>
            {c.nativeName && <p className="mt-3 font-odia text-xl text-gold-soft">{c.nativeName}</p>}
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-warmwhite/80">{c.summary}</p>
          </div>
          <figure className="hidden md:col-span-4 md:col-start-9 md:block">
            <div className="frame-gilt">
              <div className="frame-mat">
                <ArtImage art={c.detailImage} alt={`${c.shortName} — detail`} sizes="30vw" className="h-auto w-full" />
              </div>
            </div>
          </figure>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ivory py-20 md:py-28">
        <LotusMotif className="pointer-events-none absolute -left-32 top-0 h-96 w-96 text-gold/15" strokeWidth={0.3} />
        <div className="container-x grid gap-10 md:grid-cols-12">
          <h2 className="display text-4xl md:col-span-4 md:text-5xl">About the craft</h2>
          <div className="space-y-5 leading-relaxed text-ink md:col-span-7 md:col-start-6">
            {c.about.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory pb-28" aria-label={`${c.name} artworks`}>
        <div className="container-x">
          <Suspense fallback={<StaticGrid items={items} />}>
            <ShopBrowser lockedCategory={c.slug} />
          </Suspense>
        </div>
      </section>

      <section className="border-t border-line bg-warmwhite py-20">
        <div className="container-x">
          <p className="eyebrow text-terracotta">Continue exploring</p>
          <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/collections/${o.slug}`} className="group block" data-cursor="Explore">
                  <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                    <ArtImage art={o.image} alt="" fill sizes="25vw" className="object-cover transition-transform duration-[1.4s] group-hover:scale-105" />
                  </div>
                  <p className="mt-3 font-serif text-xl">{o.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

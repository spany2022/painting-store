import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ArtImage } from "@/components/ui/ArtImage";
import { categories } from "@/data/categories";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Story",
  description: `${site.name} brings together Pattachitra, palm leaf art, embroidered paintings, straw craft and canvas works — presented with honest information about how each piece is made.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/", label: "Home" }, { label: "Our story" }]}
        eyebrow={site.tagline}
        title="Every Artwork Has a Story"
      />

      <section className="container-x grid gap-12 pb-24 md:grid-cols-12">
        <div className="relative aspect-[4/5] md:col-span-6">
          <ArtImage art="artisan-elder" alt="An elderly painter at work on a large painted scroll" fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" preload />
        </div>
        <div className="space-y-6 text-[1.05rem] leading-relaxed md:col-span-5 md:col-start-8 md:pt-10">
          {/* TODO: replace with the store's own history, founders and artisan partnerships. */}
          <p className="font-serif text-3xl leading-snug">
            {site.name} is a home for Indian craft traditions that carry stories in every line.
          </p>
          <p className="text-ink-soft">
            We bring together traditional Pattachitra and palm leaf art, embroidered paintings and appliqué, straw and grass
            craft, and canvas works for contemporary homes. We look for clarity of line, care in finishing and a sense of the
            story behind each piece.
          </p>
          <p className="text-ink-soft">
            We believe you should know exactly what you are buying. Every listing tells you whether a piece is a handmade
            original or a print, how it was made, what it is made from and how to care for it.
          </p>
          <p className="border-l-2 border-gold pl-5 text-sm text-ink-soft">
            This page is a template. The store&apos;s founding story, artisan partnerships and sourcing details will appear
            here once confirmed — we don&apos;t publish claims we can&apos;t stand behind.
          </p>
          <Link href="/shop" className="btn btn-dark">
            Explore the collection <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <section className="bg-warmwhite py-24">
        <div className="container-x">
          <h2 className="display text-4xl md:text-6xl">The traditions we work with</h2>
          <ul className="mt-14 divide-y divide-line border-y border-line">
            {categories.map((c, i) => (
              <li key={c.slug}>
                <Link href={`/collections/${c.slug}`} className="group grid items-center gap-6 py-8 md:grid-cols-12">
                  <span className="font-serif text-lg italic text-terracotta md:col-span-1">0{i + 1}</span>
                  <span className="md:col-span-4">
                    <span className="block font-serif text-3xl transition-colors group-hover:text-terracotta md:text-4xl">{c.name}</span>
                    {c.nativeName && <span className="font-odia text-sm text-ink-soft">{c.nativeName}</span>}
                  </span>
                  <span className="text-sm leading-relaxed text-ink-soft md:col-span-5">{c.summary}</span>
                  <span className="relative hidden aspect-[4/3] overflow-hidden md:col-span-2 md:block">
                    <ArtImage art={c.image} alt="" fill sizes="16vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductSkeleton } from "@/components/ui/Skeletons";
import { getProduct, products, relatedProducts } from "@/data/products";
import { categoryMap } from "@/data/categories";
import { Breadcrumbs, JsonLd, breadcrumbJsonLd } from "@/components/ui/PageHeader";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { ProductPurchase } from "@/components/shop/ProductPurchase";
import { ProductCard } from "@/components/shop/ProductCard";
import { site } from "@/lib/site";
import { makeLabel } from "@/lib/format";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/artwork/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${categoryMap[p.category].shortName}`,
    description: `${makeLabel[p.make]}. ${p.description}`.slice(0, 158),
    alternates: { canonical: `/artwork/${p.slug}` },
    openGraph: { type: "website", images: [{ url: `/images/art/${p.image}.webp`, alt: p.alt }] },
  };
}

export default function ArtworkPage({ params }: PageProps<"/artwork/[slug]">) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ArtworkContent params={params} />
    </Suspense>
  );
}

async function ArtworkContent({ params }: { params: PageProps<"/artwork/[slug]">["params"] }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const cat = categoryMap[p.category];
  const crumbs = [
    { href: "/", label: "Home" },
    { href: `/collections/${cat.slug}`, label: cat.shortName },
    { label: p.name },
  ];
  const related = relatedProducts(p.slug, 4);

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    image: `${site.url}/images/art/${p.image}.webp`,
    category: cat.name,
    material: p.materials,
    brand: { "@type": "Brand", name: site.name },
    offers: (p.variants ?? [{ id: "default", label: "", dimensions: p.dimensions, price: p.price }]).map((v) => ({
      "@type": "Offer",
      priceCurrency: "INR",
      price: v.price,
      availability:
        p.availability === "sold-out"
          ? "https://schema.org/OutOfStock"
          : p.availability === "made-to-order"
            ? "https://schema.org/PreOrder"
            : "https://schema.org/InStock",
      url: `${site.url}/artwork/${p.slug}`,
      ...(v.label ? { name: `${v.label} — ${v.dimensions}` } : {}),
    })),
  };

  return (
    <>
      <JsonLd data={productLd} />
      <JsonLd data={breadcrumbJsonLd(site.url, crumbs)} />
      <div className="container-x pb-24 pt-[calc(var(--header-h)+1.75rem)] md:pt-[calc(var(--header-h)+2.5rem)]">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ProductGallery product={p} />
          </div>
          <div className="lg:col-span-5">
            <ProductPurchase product={p} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-line bg-warmwhite py-20 pb-32 md:py-28" aria-labelledby="related-heading">
          <div className="container-x">
            <h2 id="related-heading" className="display text-4xl md:text-5xl">
              You may also love
            </h2>
            <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4">
              {related.map((r) => (
                <li key={r.slug}>
                  <ProductCard product={r} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}

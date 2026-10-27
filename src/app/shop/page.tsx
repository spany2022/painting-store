import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ShopBrowser } from "@/components/shop/ShopBrowser";
import { StaticGrid } from "@/components/shop/StaticGrid";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop All Artwork",
  description:
    "Browse handcrafted Pattachitra, palm leaf engravings, embroidered paintings, straw craft and canvas art. Filter by craft, price, size, style and availability.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/", label: "Home" }, { label: "Shop" }]}
        eyebrow="The full collection"
        title="All Artwork"
        intro="Every piece is labelled as a handmade original or a print, with its technique, materials and size — so you know exactly what you are bringing home."
      />
      <div className="container-x pb-28">
        <Suspense fallback={<StaticGrid items={products} />}>
          <ShopBrowser />
        </Suspense>
      </div>
    </>
  );
}

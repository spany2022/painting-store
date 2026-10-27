import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/shop", "/about", "/contact", "/policies/shipping", "/policies/returns", "/policies/privacy", "/policies/terms"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, priority: p === "" ? 1 : 0.6 })),
    ...categories.map((c) => ({ url: `${site.url}/collections/${c.slug}`, priority: 0.8 })),
    ...products.map((p) => ({ url: `${site.url}/artwork/${p.slug}`, priority: 0.7 })),
  ];
}

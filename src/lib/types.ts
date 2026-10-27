import type { ArtKey } from "@/data/art";

export type CategorySlug = "pattachitra" | "canvas" | "palm-leaf" | "embroidered" | "straw-craft";

export type Style = "mythological" | "devotional" | "folk-narrative" | "nature" | "decorative";

export type Make = "handmade" | "print";

export type Availability = "in-stock" | "made-to-order" | "sold-out";

export interface Category {
  slug: CategorySlug;
  name: string;
  shortName: string;
  nativeName?: string; // Odia name, shown only where it is culturally meaningful
  region: string;
  tagline: string;
  summary: string;
  about: string[];
  image: ArtKey;
  detailImage: ArtKey;
  accent: string;
}

export interface Variant {
  id: string;
  label: string;
  dimensions: string;
  price: number;
}

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  style: Style;
  make: Make;
  price: number; // INR, lowest price when variants exist
  variants?: Variant[];
  image: ArtKey;
  alt: string;
  /** Focal points (percent) used for "detail" close-ups of the same artwork. */
  details?: { x: number; y: number; zoom: number; label: string }[];
  technique: string;
  materials: string;
  dimensions: string;
  framing?: string;
  availability: Availability;
  delivery: string;
  description: string;
  story: string;
  care: string;
  tags: ("gift" | "statement" | "new" | "compact")[];
  featured?: boolean;
}

export interface CartLine {
  slug: string;
  variantId?: string;
  qty: number;
}

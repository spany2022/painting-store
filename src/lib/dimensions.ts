import type { Product } from "@/lib/types";

/** Reads the width (first number) from strings like "45 × 30 cm"; falls back to 60 cm. */
export function widthCmOf(product: Product, variantId?: string) {
  const v = product.variants?.find((x) => x.id === variantId) ?? product.variants?.[1] ?? product.variants?.[0];
  const source = v?.dimensions ?? product.dimensions;
  const m = source.match(/(\d+(?:\.\d+)?)\s*×/);
  return m ? Number(m[1]) : 60;
}

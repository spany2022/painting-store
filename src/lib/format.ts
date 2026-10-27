const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatINR(value: number) {
  return inr.format(value);
}

export const availabilityLabel = {
  "in-stock": "Ready to ship",
  "made-to-order": "Made to order",
  "sold-out": "Sold out",
} as const;

export const makeLabel = {
  handmade: "Handmade original",
  print: "Print on canvas",
} as const;

export const styleLabel = {
  mythological: "Mythological",
  devotional: "Devotional",
  "folk-narrative": "Folk narrative",
  nature: "Nature & garden",
  decorative: "Decorative",
} as const;

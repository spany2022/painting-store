import { site, whatsappLink } from "@/lib/site";
import { formatINR, makeLabel } from "@/lib/format";
import type { Product, Variant } from "@/lib/types";
import type { ResolvedLine } from "@/components/providers/StoreProvider";

export function productEnquiryLink(product: Product, variant?: Variant) {
  const lines = [
    `Hello ${site.name}, I'd like to know more about this artwork:`,
    "",
    `• ${product.name}`,
    `• ${makeLabel[product.make]} — ${product.technique}`,
    variant ? `• Size: ${variant.label} (${variant.dimensions})` : `• Size: ${product.dimensions}`,
    `• Listed price: ${formatINR(variant?.price ?? product.price)}`,
    `• Link: ${site.url}/artwork/${product.slug}`,
  ];
  return whatsappLink(lines.join("\n"));
}

export function orderRequestLink(
  lines: ResolvedLine[],
  subtotal: number,
  customer?: { name?: string; phone?: string; city?: string; pincode?: string; notes?: string },
) {
  const items = lines.map(
    (l, i) =>
      `${i + 1}. ${l.product.name}${l.variant ? ` — ${l.variant.label} (${l.variant.dimensions})` : ""} × ${l.qty} = ${formatINR(l.lineTotal)}`,
  );
  const who = customer
    ? [
        "",
        "My details:",
        customer.name && `Name: ${customer.name}`,
        customer.phone && `Phone: ${customer.phone}`,
        customer.city && `City: ${customer.city}`,
        customer.pincode && `PIN code: ${customer.pincode}`,
        customer.notes && `Notes: ${customer.notes}`,
      ].filter(Boolean)
    : [];
  const message = [
    `Hello ${site.name}, I'd like to place an order:`,
    "",
    ...items,
    "",
    `Subtotal: ${formatINR(subtotal)}`,
    ...who,
    "",
    "Please confirm availability, delivery charges and payment details.",
  ].join("\n");
  return whatsappLink(message);
}

export const enquiryTypes = [
  { id: "gift", label: "Gift recommendations", hint: "Tell us the occasion and budget" },
  { id: "corporate", label: "Corporate & bulk gifting", hint: "Quantities and timelines on request" },
  { id: "interior", label: "Interior design projects", hint: "Homes, hotels, offices and studios" },
  { id: "custom", label: "Custom artwork request", hint: "Subject to artist availability" },
  { id: "size", label: "Special size or framing", hint: "Confirmed per artwork" },
] as const;

export function generalEnquiryLink(
  type: string,
  fields: { name?: string; occasion?: string; budget?: string; message?: string } = {},
) {
  const label = enquiryTypes.find((t) => t.id === type)?.label ?? "General enquiry";
  const body = [`Hello ${site.name}, I have an enquiry: ${label}.`];
  if (fields.name) body.push(`Name: ${fields.name}`);
  if (fields.occasion) body.push(`Occasion / space: ${fields.occasion}`);
  if (fields.budget) body.push(`Budget: ${fields.budget}`);
  if (fields.message) body.push("", fields.message);
  return whatsappLink(body.join("\n"));
}

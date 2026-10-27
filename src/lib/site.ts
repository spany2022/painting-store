/**
 * Store-wide settings. Everything a store owner needs to change before launch
 * lives here: brand name, contact details, WhatsApp number and social links.
 *
 * Values marked TODO are placeholders and must be replaced with real details.
 */
export const site = {
  name: "Creative Art and Frame",
  // The wordmark splits the name over two lines so it fits beside the header icons on phones.
  wordmark: { primary: "Creative Art", secondary: "and Frame" },
  tagline: "Where Indian Heritage Becomes Timeless Art",
  description:
    "Traditional Pattachitra, palm leaf engravings, embroidered paintings, straw craft and canvas art — handcrafted Indian heritage, presented with care.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  // TODO: replace with the store's WhatsApp Business number (country code, digits only).
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "910000000000",

  // TODO: replace with real contact details.
  email: "hello@example.com",
  phoneDisplay: "+91 00000 00000",
  address: "Studio address to be confirmed",
  hours: "Mon – Sat, 10:00 – 19:00 IST",

  // TODO: only list profiles that are active.
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    pinterest: "https://pinterest.com/",
  },

  // TODO: list only the payment methods the store actually accepts once a gateway is connected.
  paymentMethods: [] as string[],

  // Feature flags — switch on only once the business confirms the service.
  services: {
    customArtwork: false,
    framing: false,
    internationalShipping: false,
    bulkOrders: false,
    newsletter: false,
  },
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

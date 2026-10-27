import type { ArtKey } from "@/data/art";

/**
 * Editorial collection stories (written by the store, not customer reviews).
 */
export const collectionStories: {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  image: ArtKey;
  alt: string;
  href: string;
  cta: string;
}[] = [
  {
    id: "devotional",
    eyebrow: "Collection highlight",
    title: "The Devotional Wall",
    text: "Jagannath, Krishna and the Buddha — works that bring a quiet focus to prayer rooms, entrances and studies.",
    image: "patta-jagannath-trinity",
    alt: "Pattachitra of Jagannath, Balabhadra and Subhadra",
    href: "/shop?style=devotional",
    cta: "Shop devotional art",
  },
  {
    id: "quiet",
    eyebrow: "Styling story",
    title: "Quiet Corners in Palm Leaf",
    text: "Palm leaf panels reward close looking. Hang them at eye level beside a reading chair, where the etched lines can be enjoyed slowly.",
    image: "palm-mandala-ii",
    alt: "Palm leaf engraving with a circular medallion",
    href: "/collections/palm-leaf",
    cta: "Explore palm leaf",
  },
  {
    id: "thread",
    eyebrow: "Collection highlight",
    title: "Golden Threads",
    text: "From bold Pipili appliqué to silk-stitched Chamba-style gardens — textile art adds warmth and softness to a room.",
    image: "rumal-garden",
    alt: "Embroidered garden of trees in muted silks",
    href: "/collections/embroidered",
    cta: "Explore embroidery",
  },
  {
    id: "gifts",
    eyebrow: "Gift edit",
    title: "Small Pieces, Long Stories",
    text: "Compact works and sikki grass keepsakes — easy to carry, simple to place and full of meaning for weddings, housewarmings and festivals.",
    image: "sikki-baskets",
    alt: "Coiled sikki grass boxes in gold and bright colours",
    href: "/shop?tag=gift",
    cta: "Explore gift ideas",
  },
  {
    id: "golden",
    eyebrow: "Styling story",
    title: "Straw That Catches the Light",
    text: "Straw collage changes through the day as light moves across its fibres. Place it opposite a window and watch it shimmer.",
    image: "straw-couple",
    alt: "Straw collage of Radha and Krishna",
    href: "/collections/straw-craft",
    cta: "Explore straw craft",
  },
];

/**
 * Customer testimonials. Add only genuine reviews, with the customer's
 * permission. The section shows an invitation instead while this is empty.
 */
export const testimonials: { quote: string; name: string; location?: string; product?: string }[] = [];

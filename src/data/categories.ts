import type { Category, CategorySlug } from "@/lib/types";

export const categories: Category[] = [
  {
    slug: "pattachitra",
    name: "Pattachitra Paintings",
    shortName: "Pattachitra",
    nativeName: "ପଟ୍ଟଚିତ୍ର",
    region: "Odisha",
    tagline: "Stories painted on cloth",
    summary:
      "Traditional narrative paintings with intricate detailing, mythological stories and decorative borders.",
    about: [
      "Pattachitra takes its name from patta (cloth) and chitra (picture). The painting surface is prepared by layering cotton cloth with a paste of tamarind seed and chalk, then burnishing it smooth before a single line is drawn.",
      "Traditional palettes come from natural sources — white from conch shell, black from lamp soot, red from hingula and yellow from haritala. Painters customarily begin with the border, then move inward to the figures, ornaments and final outlines.",
      "Themes are drawn from the Jagannath tradition, the Ramayana, the Mahabharata and the playful episodes of Krishna Leela.",
    ],
    image: "patta-krishna-indigo",
    detailImage: "patta-brush-detail",
    accent: "#A64B32",
  },
  {
    slug: "canvas",
    name: "Canvas Paintings & Prints",
    shortName: "Canvas",
    region: "Traditional & contemporary",
    tagline: "Heritage for modern walls",
    summary:
      "Traditional compositions presented on canvas for contemporary homes, offices and curated interiors.",
    about: [
      "Our canvas collection brings traditional compositions into formats suited to contemporary spaces — from intimate pieces for a reading nook to large statement works for living rooms, lobbies and boardrooms.",
      "Each listing states clearly whether it is an original hand-painted work or a print on canvas, along with the available sizes.",
    ],
    image: "patta-jagannath-trinity",
    detailImage: "patta-nauka-vihar",
    accent: "#354B3A",
  },
  {
    slug: "palm-leaf",
    name: "Palm Leaf Paintings",
    shortName: "Palm Leaf",
    nativeName: "ତାଳପତ୍ର ଚିତ୍ର",
    region: "Odisha",
    tagline: "Lines etched into leaf",
    summary:
      "Delicately incised artwork on palm leaf, showcasing fine lines and heritage craftsmanship.",
    about: [
      "Palm leaf art grew out of Odisha's manuscript tradition, where texts and illustrations were written onto prepared palm leaves with a metal stylus.",
      "Leaves are dried, treated and cut to size. The artist incises each image with a fine iron stylus, then rubs the surface with lamp soot so the pigment settles into the etched lines and the image appears.",
      "Individual leaves are stitched together with thread — sometimes in folding panels that open like a book, or as overlapping windows that reveal a second picture beneath.",
    ],
    image: "palm-mandala",
    detailImage: "palm-etching-hands",
    accent: "#B99557",
  },
  {
    slug: "embroidered",
    name: "Embroidered Paintings",
    shortName: "Embroidered",
    region: "Odisha · Himachal · Bengal",
    tagline: "Pictures drawn in thread",
    summary:
      "Textile artworks with decorative stitching, appliqué and threadwork you can almost feel through the screen.",
    about: [
      "Embroidered paintings translate the language of painting into thread and cloth. Pipili appliqué from Odisha builds bold images from cut fabric stitched onto a base cloth — the same craft used for the canopies of the Jagannath temple tradition.",
      "Chamba Rumal from Himachal Pradesh is known for its double satin stitch, worked so that the picture appears on both sides of the cloth, while Kantha from Bengal uses fine running stitches to give texture and movement.",
    ],
    image: "pipili-jagannath",
    detailImage: "rumal-gopis",
    accent: "#8A3B26",
  },
  {
    slug: "straw-craft",
    name: "Straw Craft",
    shortName: "Straw Craft",
    region: "Odisha · Bihar",
    tagline: "Golden fibre, patient hands",
    summary:
      "Decorative art made from natural straw and grass — split, flattened, coiled and arranged by hand.",
    about: [
      "In straw collage, stalks of paddy or wheat straw are split, flattened and cut into fine pieces, then laid onto a dark ground so the natural sheen of the fibre forms a golden picture.",
      "Sikki grass craft from Bihar uses a golden wild grass, sometimes dyed, coiled and stitched into boxes, figures and ornaments.",
    ],
    image: "straw-dancers",
    detailImage: "sikki-weaving",
    accent: "#B99557",
  },
];

export const categoryMap = Object.fromEntries(categories.map((c) => [c.slug, c])) as Record<
  CategorySlug,
  Category
>;

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

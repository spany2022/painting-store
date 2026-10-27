import type { Product } from "@/lib/types";

/**
 * SAMPLE CATALOGUE — names, prices, dimensions and stock are placeholders for the
 * demo. Replace with the store's real products and photographs before launch.
 */

const ORIGINAL_CARE =
  "Display away from direct sunlight and damp walls. Dust gently with a soft, dry brush. Avoid touching the painted surface and never use water or cleaning sprays.";
const PALM_CARE =
  "Keep away from moisture and direct sun. Store flat or hang without bending the leaves. Dust lightly with a soft brush; do not wipe across the etched lines.";
const TEXTILE_CARE =
  "Hang away from direct sunlight to protect the dyes. Dust with a soft brush or low-suction vacuum through a mesh. Professional dry cleaning only.";
const STRAW_CARE =
  "Keep dry and away from direct sun to preserve the natural golden sheen. Dust gently with a soft, dry brush.";
const PRINT_CARE =
  "Wipe the canvas surface gently with a dry, lint-free cloth. Keep away from direct sunlight and humidity.";

const canvasSizes = (base: number) => [
  { id: "s", label: "Small", dimensions: "30 × 45 cm", price: base },
  { id: "m", label: "Medium", dimensions: "50 × 75 cm", price: Math.round(base * 1.75) },
  { id: "l", label: "Large", dimensions: "80 × 120 cm", price: Math.round(base * 2.9) },
];

export const products: Product[] = [
  // ——— Pattachitra ———
  {
    slug: "radha-krishna-kadamba",
    name: "Radha Krishna beneath the Kadamba",
    category: "pattachitra",
    style: "devotional",
    make: "handmade",
    price: 14500,
    image: "patta-radha-krishna-ivory",
    alt: "Pattachitra painting of Radha and Krishna standing together beneath a flowering tree, on an ivory ground with a yellow and red border",
    details: [
      { x: 38, y: 32, zoom: 2.4, label: "Radha's ornaments" },
      { x: 50, y: 92, zoom: 2.6, label: "Border detail" },
    ],
    technique: "Hand-painted Pattachitra",
    materials: "Natural pigments on prepared cotton patta",
    dimensions: "30 × 45 cm",
    availability: "in-stock",
    delivery: "Ships in 3–5 working days",
    description:
      "Radha and Krishna stand together under the kadamba tree, framed by a floral border. The ivory ground lets every fine line of jewellery, textile pattern and foliage read clearly.",
    story:
      "Krishna's flute beneath the kadamba tree is one of the most loved images in Odia devotional art — a moment of stillness amid the playful stories of Vrindavan.",
    care: ORIGINAL_CARE,
    tags: ["gift", "compact"],
    featured: true,
  },
  {
    slug: "royal-horsemen-frieze",
    name: "Royal Horsemen Frieze",
    category: "pattachitra",
    style: "folk-narrative",
    make: "handmade",
    price: 18900,
    image: "patta-horsemen",
    alt: "Long horizontal Pattachitra frieze of horsemen riding between stylised trees, on a pale terracotta ground",
    details: [{ x: 70, y: 50, zoom: 2.8, label: "Rider and horse" }],
    technique: "Hand-painted Pattachitra",
    materials: "Natural pigments on prepared cotton patta",
    dimensions: "90 × 30 cm",
    availability: "in-stock",
    delivery: "Ships in 3–5 working days",
    description:
      "A panoramic composition of riders moving between stylised trees, finished with a painted double border. Ideal above a console, bed or long sofa.",
    story:
      "Processional friezes like this read from one end to the other, like a story unrolling — a format well suited to corridors and long walls.",
    care: ORIGINAL_CARE,
    tags: ["statement"],
  },
  {
    slug: "ramayana-procession",
    name: "Ramayana Procession",
    category: "pattachitra",
    style: "mythological",
    make: "handmade",
    price: 21000,
    image: "patta-ramayana-frieze",
    alt: "Horizontal Pattachitra scroll showing a chariot procession with figures and trees from the Ramayana",
    details: [{ x: 22, y: 50, zoom: 3, label: "The chariot" }],
    technique: "Hand-painted Pattachitra",
    materials: "Natural pigments on prepared cotton patta",
    dimensions: "100 × 35 cm",
    availability: "made-to-order",
    delivery: "Made to order — allow 4–6 weeks",
    description:
      "A chariot procession winds through a forest of finely painted trees. Blue-grey tones and a restrained palette give this frieze a calm, scholarly quality.",
    story:
      "Episodes from the Ramayana have been painted in Odisha for generations; long friezes allow several moments of the epic to share a single surface.",
    care: ORIGINAL_CARE,
    tags: ["statement"],
  },
  {
    slug: "rath-yatra-procession",
    name: "Rath Yatra Procession",
    category: "pattachitra",
    style: "devotional",
    make: "handmade",
    price: 16500,
    image: "patta-rath-yatra",
    alt: "Framed Pattachitra of a festive chariot procession with a striped canopy, horses and devotees on a turquoise ground",
    details: [{ x: 50, y: 32, zoom: 2.4, label: "Chariot canopy" }],
    technique: "Hand-painted Pattachitra",
    materials: "Natural pigments on prepared cotton patta",
    dimensions: "45 × 30 cm",
    framing: "Supplied mounted, unframed",
    availability: "in-stock",
    delivery: "Ships in 3–5 working days",
    description:
      "A jubilant chariot procession under a striped canopy, rendered in turquoise, saffron and red with a layered black-and-red border.",
    story:
      "The chariot festival of Puri is one of Odisha's most celebrated events, and a recurring subject for Pattachitra painters.",
    care: ORIGINAL_CARE,
    tags: ["gift"],
    featured: true,
  },
  {
    slug: "krishna-leela-bands",
    name: "Krishna Leela in Bands",
    category: "pattachitra",
    style: "mythological",
    make: "handmade",
    price: 26500,
    image: "patta-dashavatara-bands",
    alt: "Detail of a dark Pattachitra with multiple painted bands of figures, medallions and processions in pink, green and gold",
    details: [{ x: 30, y: 25, zoom: 2.4, label: "Narrative band" }],
    technique: "Hand-painted Pattachitra",
    materials: "Natural pigments on prepared cotton patta",
    dimensions: "75 × 50 cm",
    availability: "made-to-order",
    delivery: "Made to order — allow 6–8 weeks",
    description:
      "Concentric bands of medallions and processions on a deep black ground — an intensely detailed work that rewards close looking.",
    story:
      "Band compositions let a painter gather dozens of episodes into one work; each ring can be read as its own small story.",
    care: ORIGINAL_CARE,
    tags: ["statement"],
  },
  {
    slug: "compassionate-buddha",
    name: "The Compassionate Buddha",
    category: "pattachitra",
    style: "devotional",
    make: "handmade",
    price: 12800,
    image: "patta-buddha",
    alt: "Painting of a seated Buddha with a radiant halo beneath a stylised tree, in the Pattachitra style with a decorated border",
    details: [{ x: 50, y: 30, zoom: 2.2, label: "Halo" }],
    technique: "Hand-painted Pattachitra",
    materials: "Natural pigments on prepared surface",
    dimensions: "40 × 60 cm",
    availability: "in-stock",
    delivery: "Ships in 3–5 working days",
    description:
      "A serene seated Buddha surrounded by a radiant halo and lotus motifs — a calm, luminous piece for meditation spaces and studies.",
    story:
      "Contemporary Pattachitra painters often bring their traditional vocabulary of borders, halos and foliage to new subjects.",
    care: ORIGINAL_CARE,
    tags: ["gift"],
  },

  // ——— Canvas ———
  {
    slug: "venugopala-indigo-canvas",
    name: "Venugopala in Indigo",
    category: "canvas",
    style: "devotional",
    make: "print",
    price: 3200,
    variants: canvasSizes(3200),
    image: "patta-krishna-indigo",
    alt: "Pattachitra-style image of Krishna playing the flute with Radha, on a deep indigo ground under an ornate arch",
    details: [
      { x: 50, y: 28, zoom: 2.4, label: "Krishna with flute" },
      { x: 50, y: 88, zoom: 2.6, label: "Lotus and swans" },
    ],
    technique: "Print on canvas",
    materials: "Pigment print on cotton-blend canvas, stretched on wooden bars",
    dimensions: "Available in three sizes",
    framing: "Gallery-wrapped, ready to hang",
    availability: "in-stock",
    delivery: "Printed and dispatched in 5–7 working days",
    description:
      "Krishna plays the flute beneath an ornate arch, with Radha and attendants on a deep indigo ground. Reproduced on canvas for contemporary interiors.",
    story:
      "Indigo-ground compositions are a dramatic counterpoint to the more common red grounds of Pattachitra, letting the gold and white tones glow.",
    care: PRINT_CARE,
    tags: ["gift", "statement"],
    featured: true,
  },
  {
    slug: "jagannath-trinity-canvas",
    name: "Jagannath Trinity",
    category: "canvas",
    style: "devotional",
    make: "print",
    price: 2900,
    variants: canvasSizes(2900),
    image: "patta-jagannath-trinity",
    alt: "Jagannath, Balabhadra and Subhadra painted in the Pattachitra tradition on a black ground with an ornate canopy and border",
    details: [{ x: 50, y: 50, zoom: 2.2, label: "The three deities" }],
    technique: "Print on canvas",
    materials: "Pigment print on cotton-blend canvas, stretched on wooden bars",
    dimensions: "Available in three sizes",
    framing: "Gallery-wrapped, ready to hang",
    availability: "in-stock",
    delivery: "Printed and dispatched in 5–7 working days",
    description:
      "Jagannath, Balabhadra and Subhadra beneath a decorated canopy — the most recognisable image of Odia devotional art, reproduced on canvas.",
    story:
      "The trinity of Puri sits at the heart of the Pattachitra tradition; many painting families began by painting images for the temple and its pilgrims.",
    care: PRINT_CARE,
    tags: ["gift"],
    featured: true,
  },
  {
    slug: "nauka-vihar-canvas",
    name: "Nauka Vihar — The Boat Ride",
    category: "canvas",
    style: "mythological",
    make: "print",
    price: 3400,
    variants: canvasSizes(3400),
    image: "patta-nauka-vihar",
    alt: "Pattachitra-style scene of Krishna and the gopis on an ornate boat with a canopy, set against a dark ground",
    details: [{ x: 55, y: 45, zoom: 2.2, label: "The boat" }],
    technique: "Print on canvas",
    materials: "Pigment print on cotton-blend canvas, stretched on wooden bars",
    dimensions: "Available in three sizes",
    framing: "Gallery-wrapped, ready to hang",
    availability: "in-stock",
    delivery: "Printed and dispatched in 5–7 working days",
    description:
      "Krishna and the gopis glide across the Yamuna in a boat shaped like a peacock — a joyful, richly patterned scene in jewel tones.",
    story:
      "Nauka Vihar, the boat pastime, is one of the lighter episodes of Krishna Leela and a favourite of painters for its swirling water patterns.",
    care: PRINT_CARE,
    tags: ["statement"],
  },
  {
    slug: "krishna-leela-panel-canvas",
    name: "Krishna Leela Panel",
    category: "canvas",
    style: "mythological",
    make: "print",
    price: 3600,
    variants: canvasSizes(3600),
    image: "patta-krishna-leela",
    alt: "Pattachitra-style panel with a central scene of Krishna and the gopis surrounded by small framed episodes",
    details: [{ x: 50, y: 55, zoom: 2.2, label: "Central scene" }],
    technique: "Print on canvas",
    materials: "Pigment print on cotton-blend canvas, stretched on wooden bars",
    dimensions: "Available in three sizes",
    framing: "Gallery-wrapped, ready to hang",
    availability: "in-stock",
    delivery: "Printed and dispatched in 5–7 working days",
    description:
      "A central scene ringed by small framed episodes — a classic Pattachitra composition that reads like an illustrated storybook.",
    story:
      "Framing many small episodes around a central image lets a single work hold an entire cycle of stories.",
    care: PRINT_CARE,
    tags: ["new"],
  },

  // ——— Palm leaf ———
  {
    slug: "dashavatara-mandala-palm-leaf",
    name: "Dashavatara Mandala",
    category: "palm-leaf",
    style: "mythological",
    make: "handmade",
    price: 9800,
    image: "palm-mandala",
    alt: "Palm leaf engraving with a large circular mandala and bands of finely etched figures in black on golden leaf",
    details: [
      { x: 50, y: 20, zoom: 2.4, label: "Central mandala" },
      { x: 30, y: 60, zoom: 3, label: "Etched figures" },
    ],
    technique: "Hand-etched palm leaf (tala pattachitra)",
    materials: "Treated palm leaf, iron-stylus engraving, lamp-soot ink, cotton thread",
    dimensions: "35 × 50 cm",
    availability: "in-stock",
    delivery: "Ships in 3–5 working days",
    description:
      "A circular mandala surrounded by bands of tiny figures, every line etched into the leaf by hand and darkened with lamp soot.",
    story:
      "Palm leaf engraving descends from Odisha's manuscript tradition, where scribes and illustrators worked with the same iron stylus.",
    care: PALM_CARE,
    tags: ["gift", "statement"],
    featured: true,
  },
  {
    slug: "rasa-chakra-palm-leaf",
    name: "Rasa Chakra",
    category: "palm-leaf",
    style: "mythological",
    make: "handmade",
    price: 11200,
    image: "palm-mandala-ii",
    alt: "Palm leaf artwork with an oval central medallion of dancing figures and rows of etched scenes",
    details: [{ x: 60, y: 45, zoom: 2.6, label: "Dancing ring" }],
    technique: "Hand-etched palm leaf (tala pattachitra)",
    materials: "Treated palm leaf, iron-stylus engraving, lamp-soot ink, cotton thread",
    dimensions: "40 × 55 cm",
    availability: "made-to-order",
    delivery: "Made to order — allow 4–6 weeks",
    description:
      "An oval medallion of dancers at the centre of rows of etched scenes — the circle of the rasa dance rendered in fine black line.",
    story:
      "The rasa dance, where Krishna dances with every gopi at once, translates naturally into the circular compositions of palm leaf art.",
    care: PALM_CARE,
    tags: ["statement"],
  },
  {
    slug: "village-life-palm-leaf",
    name: "Village Life in Bands",
    category: "palm-leaf",
    style: "folk-narrative",
    make: "handmade",
    price: 7600,
    image: "palm-village-bands",
    alt: "Horizontal palm leaf strips stitched together, each etched with village scenes, animals and figures",
    details: [{ x: 40, y: 40, zoom: 2.6, label: "Etched scene" }],
    technique: "Hand-etched palm leaf",
    materials: "Treated palm leaf, iron-stylus engraving, lamp-soot ink, cotton thread",
    dimensions: "45 × 30 cm",
    availability: "in-stock",
    delivery: "Ships in 3–5 working days",
    description:
      "Stitched strips of leaf, each carrying a band of everyday scenes — farmers, animals and festivities etched in fine line.",
    story:
      "Not every palm leaf work is mythological; artists also record village life, seasons and festivals.",
    care: PALM_CARE,
    tags: ["gift"],
  },
  {
    slug: "coloured-gopis-palm-leaf",
    name: "Gopis in Colour",
    category: "palm-leaf",
    style: "mythological",
    make: "handmade",
    price: 8400,
    image: "palm-coloured",
    alt: "Palm leaf painting with figures in muted green, blue and ochre against a natural leaf background",
    details: [{ x: 45, y: 35, zoom: 2.4, label: "Painted figures" }],
    technique: "Etched and hand-coloured palm leaf",
    materials: "Treated palm leaf, stylus engraving, natural colours, cotton thread",
    dimensions: "40 × 50 cm",
    availability: "in-stock",
    delivery: "Ships in 3–5 working days",
    description:
      "Soft greens, blues and ochres are brushed into the etched lines, giving this panel a gentle, watercolour-like warmth.",
    story:
      "Colour is added sparingly in palm leaf art so the natural golden leaf remains part of the picture.",
    care: PALM_CARE,
    tags: ["new"],
  },
  {
    slug: "pothi-folding-book",
    name: "Pothi Chitra — Folding Leaf Book",
    category: "palm-leaf",
    style: "mythological",
    make: "handmade",
    price: 6200,
    image: "palm-folding-book",
    alt: "Palm leaf folding book opened to show stitched leaves etched with small framed figures",
    details: [{ x: 50, y: 40, zoom: 2.4, label: "Leaf panels" }],
    technique: "Hand-etched palm leaf, folding format",
    materials: "Treated palm leaf, iron-stylus engraving, lamp-soot ink, cotton thread",
    dimensions: "Opens to approx. 60 × 25 cm",
    availability: "in-stock",
    delivery: "Ships in 3–5 working days",
    description:
      "Leaves stitched to open like a concertina book, each panel holding a small etched figure — equally beautiful on a shelf or a wall.",
    story:
      "The folding format recalls the bound palm leaf manuscripts (pothi) from which the craft grew.",
    care: PALM_CARE,
    tags: ["gift", "compact"],
  },
  {
    slug: "tall-palm-leaf-panel",
    name: "Tall Palm Leaf Panel",
    category: "palm-leaf",
    style: "decorative",
    make: "handmade",
    price: 4800,
    image: "palm-panel-tall",
    alt: "Tall narrow palm leaf panel with a vertical column of etched medallions",
    technique: "Hand-etched palm leaf",
    materials: "Treated palm leaf, iron-stylus engraving, lamp-soot ink, cotton thread",
    dimensions: "15 × 60 cm",
    availability: "in-stock",
    delivery: "Ships in 3–5 working days",
    description:
      "A slender column of etched medallions — made for narrow walls, pillars and the space beside a doorway.",
    story:
      "Narrow vertical panels echo the proportions of the leaf itself.",
    care: PALM_CARE,
    tags: ["compact", "gift"],
  },
  {
    slug: "ramayana-palm-leaf-panels",
    name: "Ramayana Leaf Panels",
    category: "palm-leaf",
    style: "mythological",
    make: "handmade",
    price: 13500,
    image: "palm-fanned-panels",
    alt: "Several palm leaf panels fanned out, densely etched with narrative scenes in black on pale leaf",
    details: [{ x: 35, y: 45, zoom: 2.4, label: "Narrative detail" }],
    technique: "Hand-etched palm leaf",
    materials: "Treated palm leaf, iron-stylus engraving, lamp-soot ink, cotton thread",
    dimensions: "Set of panels, each approx. 30 × 40 cm",
    availability: "made-to-order",
    delivery: "Made to order — allow 4–6 weeks",
    description:
      "A set of densely etched panels telling the Ramayana across several leaves — to be displayed together or across a wall.",
    story:
      "Long epics suit palm leaf art, where each strip can carry a new episode.",
    care: PALM_CARE,
    tags: ["statement"],
  },

  // ——— Embroidered ———
  {
    slug: "jagannath-applique-hanging",
    name: "Jagannath Appliqué Hanging",
    category: "embroidered",
    style: "devotional",
    make: "handmade",
    price: 3800,
    image: "pipili-jagannath",
    alt: "Red Pipili appliqué hanging with the face of Lord Jagannath surrounded by yellow vine embroidery and tassels",
    details: [{ x: 50, y: 40, zoom: 2.2, label: "Jagannath face" }],
    technique: "Pipili appliqué and embroidery",
    materials: "Cotton fabric appliqué with embroidery on cotton base",
    dimensions: "40 × 45 cm",
    availability: "in-stock",
    delivery: "Ships in 3–5 working days",
    description:
      "The wide eyes of Jagannath framed by scrolling yellow vines on vivid red cloth, finished with colourful tassels.",
    story:
      "Pipili, a village near Puri, is synonymous with appliqué — a craft long associated with canopies and umbrellas for the Jagannath festivals.",
    care: TEXTILE_CARE,
    tags: ["gift", "compact"],
    featured: true,
  },
  {
    slug: "pipili-mandala-panels",
    name: "Pipili Mandala Panels",
    category: "embroidered",
    style: "decorative",
    make: "handmade",
    price: 5200,
    image: "pipili-wall",
    alt: "Diamond-shaped Pipili appliqué panels in red, yellow and green featuring Jagannath and a peacock",
    technique: "Pipili appliqué",
    materials: "Cotton fabric appliqué, mirror work and embroidery",
    dimensions: "Set of panels, each approx. 45 × 45 cm",
    availability: "in-stock",
    delivery: "Ships in 3–5 working days",
    description:
      "Diamond panels of layered appliqué — mandalas, peacocks and the face of Jagannath in saturated temple colours.",
    story:
      "Appliqué motifs such as peacocks, elephants, flowers and the sun recur across generations of Pipili work.",
    care: TEXTILE_CARE,
    tags: ["statement"],
  },
  {
    slug: "jagannath-applique-panel",
    name: "Jagannath on the Sun Ground",
    category: "embroidered",
    style: "devotional",
    make: "handmade",
    price: 6900,
    image: "applique-jagannath-detail",
    alt: "Large appliqué panel with the face of Jagannath on a multicoloured ground of suns and geometric motifs",
    technique: "Appliqué and embroidery",
    materials: "Cotton fabric appliqué on cotton base",
    dimensions: "60 × 60 cm",
    availability: "made-to-order",
    delivery: "Made to order — allow 3–4 weeks",
    description:
      "A bold, graphic Jagannath against suns and zigzags in saffron, green and pink — appliqué at its most joyful.",
    story:
      "Appliqué builds images from cut cloth rather than paint, giving a flat, luminous colour that reads from across a room.",
    care: TEXTILE_CARE,
    tags: ["statement", "new"],
  },
  {
    slug: "gopis-adoring-krishna-embroidery",
    name: "Gopis Adoring Krishna",
    category: "embroidered",
    style: "mythological",
    make: "handmade",
    price: 32000,
    image: "rumal-gopis",
    alt: "Embroidered textile in the Chamba Rumal style showing gopis adoring Krishna among trees and flowers on ivory cloth",
    details: [{ x: 40, y: 30, zoom: 2.4, label: "Silk satin stitch" }],
    technique: "Chamba-style double satin stitch embroidery",
    materials: "Silk thread on hand-woven cotton",
    dimensions: "65 × 65 cm",
    availability: "made-to-order",
    delivery: "Made to order — allow 8–10 weeks",
    description:
      "Gopis gather around Krishna amid flowering trees, every figure filled with lustrous silk stitches on ivory cloth.",
    story:
      "Chamba Rumal embroidery is admired for its double satin stitch, which makes the image appear on both faces of the cloth.",
    care: TEXTILE_CARE,
    tags: ["statement"],
  },
  {
    slug: "garden-of-krishna-embroidery",
    name: "Garden of Krishna",
    category: "embroidered",
    style: "nature",
    make: "handmade",
    price: 28000,
    image: "rumal-garden",
    alt: "Embroidered textile with a garden of many different trees and a small figure of Krishna, worked in muted silks",
    details: [{ x: 50, y: 40, zoom: 2.4, label: "Embroidered trees" }],
    technique: "Chamba-style embroidery",
    materials: "Silk thread on hand-woven cotton",
    dimensions: "70 × 50 cm",
    availability: "made-to-order",
    delivery: "Made to order — allow 8–10 weeks",
    description:
      "A garden of individually stitched trees — mango, banana, cypress and flowering shrubs — with Krishna at its heart.",
    story:
      "Embroidered gardens were a way of bringing paradise indoors, each tree stitched with its own character.",
    care: TEXTILE_CARE,
    tags: ["statement"],
  },
  {
    slug: "nakshi-kantha-flower",
    name: "Nakshi Kantha Flower Panel",
    category: "embroidered",
    style: "nature",
    make: "handmade",
    price: 4200,
    image: "kantha-flower",
    alt: "White cloth with green lattice and orange flower motifs worked in running-stitch kantha embroidery",
    technique: "Kantha running-stitch embroidery",
    materials: "Cotton thread on cotton",
    dimensions: "50 × 70 cm",
    availability: "in-stock",
    delivery: "Ships in 3–5 working days",
    description:
      "Terracotta flowers in a green lattice, worked in fine running stitch. Quiet, textural and easy to place.",
    story:
      "Kantha began as a way of layering and stitching old cloth; today its running stitch is prized for its delicate rhythm.",
    care: TEXTILE_CARE,
    tags: ["gift", "compact"],
  },

  // ——— Straw craft ———
  {
    slug: "dancing-gopis-straw",
    name: "Dancing Gopis in Straw",
    category: "straw-craft",
    style: "mythological",
    make: "handmade",
    price: 15500,
    image: "straw-dancers",
    alt: "Straw collage on a black ground showing graceful dancing women, built from golden pieces of split straw",
    details: [{ x: 40, y: 35, zoom: 2.4, label: "Straw texture" }],
    technique: "Straw collage",
    materials: "Split and flattened natural straw on black ground",
    dimensions: "60 × 45 cm",
    availability: "in-stock",
    delivery: "Ships in 3–5 working days",
    description:
      "Graceful dancers built from thousands of slivers of golden straw. As the light changes through the day, the natural fibre shimmers.",
    story:
      "No paint is used for the golden tones — the colour and sheen come entirely from the straw itself.",
    care: STRAW_CARE,
    tags: ["statement"],
    featured: true,
  },
  {
    slug: "radha-krishna-straw",
    name: "Radha Krishna in Straw",
    category: "straw-craft",
    style: "devotional",
    make: "handmade",
    price: 13800,
    image: "straw-couple",
    alt: "Straw collage of Radha and Krishna in profile with an ornate border, golden straw on a dark ground",
    details: [{ x: 55, y: 40, zoom: 2.4, label: "Facial profile" }],
    technique: "Straw collage",
    materials: "Split and flattened natural straw on black ground",
    dimensions: "50 × 40 cm",
    availability: "made-to-order",
    delivery: "Made to order — allow 3–4 weeks",
    description:
      "Radha and Krishna in tender profile, framed by a carved-looking border — all formed from cut straw laid grain by grain.",
    story:
      "Straw artists vary the direction of each sliver so the fibre catches light differently, giving the illusion of shading.",
    care: STRAW_CARE,
    tags: ["gift"],
  },
  {
    slug: "sikki-grass-boxes",
    name: "Sikki Grass Coiled Boxes",
    category: "straw-craft",
    style: "decorative",
    make: "handmade",
    price: 2400,
    image: "sikki-baskets",
    alt: "Coiled sikki grass boxes and bangles in natural gold with bright magenta, blue and green dyed grass",
    technique: "Sikki grass coiling",
    materials: "Natural and dyed sikki grass",
    dimensions: "Set of three, approx. 8–14 cm diameter",
    availability: "in-stock",
    delivery: "Ships in 3–5 working days",
    description:
      "Tightly coiled boxes in natural gold with bright dyed accents — a small, joyful handmade gift.",
    story:
      "Sikki grass craft from Bihar is traditionally made by women, coiling golden grass into boxes, toys and ornaments.",
    care: STRAW_CARE,
    tags: ["gift", "compact"],
  },
  {
    slug: "sikki-grass-ornaments",
    name: "Sikki Grass Medallions",
    category: "straw-craft",
    style: "decorative",
    make: "handmade",
    price: 1800,
    image: "sikki-ornaments",
    alt: "Row of round and teardrop-shaped sikki grass ornaments in gold, green and red",
    technique: "Sikki grass coiling",
    materials: "Natural and dyed sikki grass",
    dimensions: "Set of six, approx. 6–10 cm",
    availability: "in-stock",
    delivery: "Ships in 3–5 working days",
    description:
      "Round and teardrop medallions of coiled grass — hang them as a cluster, on a festive tree or as gift toppers.",
    story:
      "Coiling turns a single blade of grass into a sturdy, lightweight ornament.",
    care: STRAW_CARE,
    tags: ["gift", "compact", "new"],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function productsByCategory(category: string) {
  return products.filter((p) => p.category === category);
}

export function relatedProducts(slug: string, limit = 4) {
  const p = getProduct(slug);
  if (!p) return [];
  const same = products.filter((x) => x.slug !== slug && x.category === p.category);
  const other = products.filter((x) => x.slug !== slug && x.category !== p.category && x.style === p.style);
  return [...same, ...other].slice(0, limit);
}

export const featuredProducts = products.filter((p) => p.featured);

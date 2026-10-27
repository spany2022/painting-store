import { Reveal, RevealText } from "@/components/motion/Reveal";
import { SectionMark } from "@/components/ui/Motif";

const features = [
  {
    title: "Cultural Heritage",
    text: "Explore artwork rooted in Indian artistic traditions — Pattachitra, palm leaf engraving, appliqué, embroidery and straw craft.",
    icon: (
      // temple spire
      <path d="M32 6 L32 12 M24 26 C24 18 28 14 32 12 C36 14 40 18 40 26 M20 40 C20 30 26 26 32 26 C38 26 44 30 44 40 M16 58 L16 40 L48 40 L48 58 M12 58 L52 58 M28 58 L28 48 C28 45 36 45 36 48 L36 58" />
    ),
  },
  {
    title: "Handcrafted Detail",
    text: "Every listing explains the technique, materials and time behind the piece, so you can see the patience in each line.",
    icon: (
      // brush on a line
      <>
        <path d="M44 8 L56 20 L30 46 L18 34 Z" />
        <path d="M18 34 C12 36 10 44 6 52 C14 50 22 48 30 46" />
        <path d="M36 16 L48 28" />
      </>
    ),
  },
  {
    title: "Thoughtful Selection",
    text: "Find artwork for personal collections, considered interiors and meaningful gifts — with honest labels for originals and prints.",
    icon: (
      // eye / lotus
      <>
        <path d="M6 32 C16 18 48 18 58 32 C48 46 16 46 6 32 Z" />
        <circle cx="32" cy="32" r="8" />
        <circle cx="32" cy="32" r="2" />
      </>
    ),
  },
  {
    title: "Art With a Story",
    text: "Choose pieces that bring mythology, ritual and personal expression into your space — and come with their story attached.",
    icon: (
      // scroll
      <>
        <path d="M14 12 L46 12 C50 12 52 15 52 18 L52 52 L20 52 C16 52 14 49 14 46 Z" />
        <path d="M14 46 C14 42 18 40 20 42 C22 44 20 52 20 52" />
        <path d="M22 22 L44 22 M22 30 L44 30 M22 38 L36 38" />
      </>
    ),
  },
];

export function WhyChoose() {
  return (
    <section className="bg-ivory py-24 md:py-36">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <SectionMark index="06" label="Why choose our art" />
          </div>
          <RevealText text="Chosen with Care, Made by Hand" className="display mt-6 text-[clamp(2.6rem,5vw,4.6rem)]" />
        </div>

        <ul className="mt-16 grid gap-px border border-gold/35 bg-gold/35 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal as="li" key={f.title} delay={i * 0.1} className="group relative bg-ivory p-8 md:p-10">
              <span aria-hidden className="absolute inset-3 border border-gold/0 transition-colors duration-700 group-hover:border-gold/40" />
              <svg
                viewBox="0 0 64 64"
                className="h-14 w-14 text-gold transition-transform duration-700 ease-[var(--ease-gallery)] group-hover:-translate-y-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                {f.icon}
              </svg>
              <p className="mt-8 font-serif text-sm italic text-terracotta">0{i + 1}</p>
              <h3 className="mt-2 font-serif text-[1.75rem] leading-tight">{f.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">{f.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

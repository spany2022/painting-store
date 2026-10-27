"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Expand, X } from "lucide-react";
import { ArtImage } from "@/components/ui/ArtImage";
import { Dialog } from "@/components/ui/Dialog";
import { SectionMark } from "@/components/ui/Motif";
import { RevealText, Reveal } from "@/components/motion/Reveal";
import { RoomScene, roomPresets, wallColours, type RoomPreset } from "@/components/rooms/RoomScene";
import { getProduct, products } from "@/data/products";
import { categories, categoryMap } from "@/data/categories";
import { EASE, gsap } from "@/lib/motion";
import { formatINR } from "@/lib/format";
import { widthCmOf } from "@/lib/dimensions";
import type { ArtKey } from "@/data/art";
import type { CategorySlug } from "@/lib/types";

type Tile =
  | { kind: "room"; id: string; slug: string; preset: RoomPreset; caption: string }
  | { kind: "photo"; id: string; art: ArtKey; alt: string; caption: string; category: CategorySlug; ratio: string };

const tiles: Tile[] = [
  { kind: "room", id: "t1", slug: "venugopala-indigo-canvas", preset: "living", caption: "Pattachitra-style canvas above a modern sofa" },
  { kind: "photo", id: "t2", art: "museum-gallery-applique", alt: "Framed appliqué and embroidered works hung on a gallery wall", caption: "Appliqué works hung as a group", category: "embroidered", ratio: "aspect-[3/4]" },
  { kind: "room", id: "t3", slug: "dashavatara-mandala-palm-leaf", preset: "reading", caption: "Palm leaf art in a calm reading corner" },
  { kind: "room", id: "t4", slug: "gopis-adoring-krishna-embroidery", preset: "bedroom", caption: "Embroidered painting above a bed" },
  { kind: "photo", id: "t5", art: "gallery-framed-series", alt: "A grid of framed Pattachitra paintings on a white wall", caption: "A Pattachitra series as a gallery wall", category: "pattachitra", ratio: "aspect-[2/3]" },
  { kind: "room", id: "t6", slug: "dancing-gopis-straw", preset: "earthy", caption: "Straw craft in a natural, earthy interior" },
  { kind: "room", id: "t7", slug: "jagannath-trinity-canvas", preset: "console", caption: "Jagannath Trinity in an entrance hall" },
];

export function InYourSpace() {
  const root = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<CategorySlug | "all">("all");
  const [open, setOpen] = useState<Tile | null>(null);

  const visible = useMemo(
    () =>
      tiles.filter((t) => {
        if (filter === "all") return true;
        const cat = t.kind === "room" ? getProduct(t.slug)?.category : t.category;
        return cat === filter;
      }),
    [filter],
  );

  useEffect(() => {
    if (!root.current) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-depth-tile]", root.current).forEach((el, i) => {
        const speed = [0.6, 1.2, 0.9][i % 3];
        gsap.fromTo(el, { y: 50 * speed }, {
          y: -50 * speed,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    });
    return () => mm.revert();
  }, [visible]);

  return (
    <section id="spaces" ref={root} className="bg-sand/40 py-24 md:py-36">
      <div className="container-x">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionMark index="05" label="Art in your space" />
            <RevealText text="Experience Art in Your Space" className="display mt-6 text-[clamp(2.6rem,5.4vw,5.2rem)]" />
          </div>
          <Reveal className="md:col-span-4 md:col-start-9" delay={0.2}>
            <p className="leading-relaxed text-ink-soft">
              See how each tradition settles into a room. Room previews place the actual artwork photograph at its listed
              size within an illustrated interior.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 flex flex-wrap gap-2">
          {[{ slug: "all" as const, shortName: "All spaces" }, ...categories].map((c) => (
            <button
              key={c.slug}
              type="button"
              aria-pressed={filter === c.slug}
              onClick={() => setFilter(c.slug)}
              className={`border px-4 py-2 text-[0.75rem] tracking-[0.06em] transition-colors duration-300 ${
                filter === c.slug ? "border-ink bg-ink text-warmwhite" : "border-ink/20 hover:border-ink"
              }`}
            >
              {c.shortName}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3">
          <AnimatePresence mode="popLayout">
            {visible.map((t) => (
              <motion.figure
                key={t.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="mb-6 break-inside-avoid"
              >
                <div data-depth-tile>
                  <button
                    type="button"
                    onClick={() => setOpen(t)}
                    className="group relative block w-full overflow-hidden text-left"
                    data-cursor="Expand"
                    aria-label={`Expand: ${t.caption}`}
                  >
                    <TileVisual tile={t} />
                    <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-ivory/85 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                      <Expand size={14} />
                    </span>
                  </button>
                  <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-sm">
                    <span>{t.caption}</span>
                    <span className="shrink-0 text-[0.62rem] tracking-[0.16em] text-ink-soft uppercase">
                      {t.kind === "room" ? "Room preview" : "Photograph"}
                    </span>
                  </figcaption>
                </div>
              </motion.figure>
            ))}
          </AnimatePresence>
        </motion.div>

        <RoomExplorer />
      </div>

      <Dialog open={!!open} onClose={() => setOpen(null)} label="Expanded view" maxWidth={open?.kind === "photo" ? "min(900px, calc((92dvh - 130px) * 0.75))" : "calc((92dvh - 130px) * 4 / 3)"}>
        {open && <Lightbox tile={open} onClose={() => setOpen(null)} />}
      </Dialog>
    </section>
  );
}

function TileVisual({ tile, large = false }: { tile: Tile; large?: boolean }) {
  if (tile.kind === "photo") {
    return (
      <div className={`relative ${tile.ratio} ${large ? "max-h-[80vh]" : ""}`}>
        <ArtImage
          art={tile.art}
          alt={tile.alt}
          fill
          sizes={large ? "90vw" : "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-gallery)] group-hover:scale-105"
        />
      </div>
    );
  }
  const p = getProduct(tile.slug)!;
  return (
    <RoomScene
      artKey={p.image}
      alt={p.alt}
      widthCm={widthCmOf(p, p.variants?.at(-1)?.id)}
      preset={tile.preset}
      sizes={large ? "60vw" : "25vw"}
      className="transition-transform duration-[1.6s] ease-[var(--ease-gallery)] group-hover:scale-[1.03]"
    />
  );
}

function Lightbox({ tile, onClose }: { tile: Tile; onClose: () => void }) {
  const p = tile.kind === "room" ? getProduct(tile.slug) : null;
  return (
    <div>
      <button type="button" onClick={onClose} aria-label="Close" className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center bg-ivory/85">
        <X size={20} strokeWidth={1.4} />
      </button>
      <div className="bg-charcoal">
        <TileVisual tile={tile} large />
      </div>
      <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div>
          <p className="font-serif text-2xl">{tile.caption}</p>
          {p && (
            <p className="mt-1 text-sm text-ink-soft">
              {p.name} · {categoryMap[p.category].shortName} · from {formatINR(p.price)}
            </p>
          )}
        </div>
        {p ? (
          <Link href={`/artwork/${p.slug}`} className="btn btn-dark" onClick={onClose}>
            View artwork <ArrowRight size={15} />
          </Link>
        ) : (
          tile.kind === "photo" && (
            <Link href={`/collections/${tile.category}`} className="btn btn-dark" onClick={onClose}>
              Explore {categoryMap[tile.category].shortName} <ArrowRight size={15} />
            </Link>
          )
        )}
      </div>
    </div>
  );
}

const explorerPicks = [
  "venugopala-indigo-canvas",
  "radha-krishna-kadamba",
  "royal-horsemen-frieze",
  "dashavatara-mandala-palm-leaf",
  "jagannath-applique-hanging",
  "garden-of-krishna-embroidery",
  "radha-krishna-straw",
  "nauka-vihar-canvas",
];

function RoomExplorer() {
  const picks = explorerPicks.map((s) => products.find((p) => p.slug === s)!);
  const [slug, setSlug] = useState(picks[0].slug);
  const [preset, setPreset] = useState<RoomPreset>("living");
  const [wall, setWall] = useState<string | null>(null);
  const p = picks.find((x) => x.slug === slug)!;

  return (
    <div id="room-explorer" className="mt-24 grid gap-10 border-t border-ink/15 pt-16 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <p className="eyebrow text-terracotta">Explore in a room</p>
        <h3 className="display mt-4 text-4xl md:text-5xl">Try a piece on your wall</h3>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">
          Choose an artwork, a room and a wall colour. The preview uses the artwork photograph at its listed size, so you
          can judge scale before you enquire.
        </p>

        <fieldset className="mt-8">
          <legend className="eyebrow text-ink-soft">Artwork</legend>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {picks.map((x) => (
              <button
                key={x.slug}
                type="button"
                onClick={() => setSlug(x.slug)}
                aria-pressed={slug === x.slug}
                aria-label={x.name}
                className={`relative aspect-square bg-warmwhite outline-offset-2 transition-all ${slug === x.slug ? "outline outline-2 outline-terracotta" : "opacity-75 hover:opacity-100"}`}
              >
                <ArtImage art={x.image} alt="" fill sizes="80px" className="object-contain p-1" />
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-6">
          <legend className="eyebrow text-ink-soft">Room</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {(Object.keys(roomPresets) as RoomPreset[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setPreset(r)}
                aria-pressed={preset === r}
                className={`border px-3 py-2 text-xs transition-colors ${preset === r ? "border-ink bg-ink text-warmwhite" : "border-ink/20 hover:border-ink"}`}
              >
                {roomPresets[r].label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-6">
          <legend className="eyebrow text-ink-soft">Wall colour</legend>
          <div className="mt-3 flex gap-2">
            {wallColours.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setWall(c.value)}
                aria-pressed={wall === c.value}
                aria-label={c.label}
                title={c.label}
                className={`h-9 w-9 rounded-full border border-ink/15 outline-offset-2 ${wall === c.value ? "outline outline-2 outline-terracotta" : ""}`}
                style={{ background: c.value ?? `conic-gradient(${roomPresets[preset].wall} 0 50%, #fff 50%)` }}
              />
            ))}
          </div>
        </fieldset>
      </div>

      <div className="lg:col-span-8">
        <RoomScene artKey={p.image} alt={p.alt} widthCm={widthCmOf(p)} preset={preset} wall={wall} sizes="(min-width:1024px) 60vw, 100vw" className="shadow-[var(--shadow-card)]" />
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-serif text-2xl">{p.name}</p>
            <p className="text-sm text-ink-soft">
              {p.variants ? `Shown at ${p.variants[1]?.dimensions ?? p.variants[0].dimensions}` : p.dimensions} · {roomPresets[preset].label}
            </p>
          </div>
          <Link href={`/artwork/${p.slug}`} className="btn btn-dark">
            View artwork <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}

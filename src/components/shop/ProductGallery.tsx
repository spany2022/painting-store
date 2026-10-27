"use client";

import { useRef, useState } from "react";
import { Maximize2, X, ZoomIn } from "lucide-react";
import { ArtImage } from "@/components/ui/ArtImage";
import { Dialog } from "@/components/ui/Dialog";
import { art } from "@/data/art";
import type { Product } from "@/lib/types";

const LENS = 176;

type View = { label: string; x: number; y: number; zoom: number };

export function ProductGallery({ product }: { product: Product }) {
  const views: View[] = [{ label: "Full artwork", x: 50, y: 50, zoom: 1 }, ...(product.details ?? [])];
  const [active, setActive] = useState(0);
  const [lens, setLens] = useState<{ x: number; y: number; bgX: number; bgY: number; bgW: number } | null>(null);
  const [full, setFull] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const v = views[active];
  const a = art[product.image];
  const src = a.src;

  return (
    <div className="lg:sticky lg:top-[calc(var(--header-h)+16px)]">
      <div
        ref={stage}
        className="group relative aspect-square cursor-zoom-in overflow-hidden bg-sand/45 md:aspect-[5/5.4]"
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse" || v.zoom !== 1 || !stage.current) return;
          const r = stage.current.getBoundingClientRect();
          // The artwork sits object-contain inside a 7% inset; find its painted rectangle.
          const cw = r.width * 0.86;
          const ch = r.height * 0.86;
          const ratio = a.width / a.height;
          const w = cw / ch > ratio ? ch * ratio : cw;
          const h = cw / ch > ratio ? ch : cw / ratio;
          const left = r.left + r.width * 0.07 + (cw - w) / 2;
          const top = r.top + r.height * 0.07 + (ch - h) / 2;
          const px = (e.clientX - left) / w;
          const py = (e.clientY - top) / h;
          if (px < 0 || px > 1 || py < 0 || py > 1) return setLens(null);
          const zoom = 2.6;
          setLens({ x: e.clientX - r.left, y: e.clientY - r.top, bgW: w * zoom, bgX: LENS / 2 - px * w * zoom, bgY: LENS / 2 - py * h * zoom });
        }}
        onPointerLeave={() => setLens(null)}
        onClick={() => setFull(true)}
        data-cursor="Zoom"
      >
        <div
          className="absolute inset-[7%] transition-transform duration-[1.2s] ease-[var(--ease-gallery)]"
          style={{ transform: `scale(${v.zoom})`, transformOrigin: `${v.x}% ${v.y}%` }}
        >
          <ArtImage
            art={product.image}
            alt={product.alt}
            fill
            preload
            quality={85}
            sizes="(min-width:1024px) 55vw, 100vw"
            className="object-contain drop-shadow-[0_24px_30px_rgb(33_29_25/.28)]"
          />
        </div>

        {/* magnifier */}
        {lens && (
          <div
            aria-hidden
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-warmwhite shadow-[0_10px_30px_rgb(0_0_0/.35)]"
            style={{
              left: lens.x,
              top: lens.y,
              width: LENS,
              height: LENS,
              backgroundImage: `url(${src})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${lens.bgW}px auto`,
              backgroundPosition: `${lens.bgX}px ${lens.bgY}px`,
              backgroundColor: "#fffcf6",
            }}
          />
        )}

        <span className="absolute bottom-4 left-4 bg-ivory/90 px-3 py-1.5 text-[0.62rem] tracking-[0.16em] uppercase">
          {v.label}
        </span>
        <span className="absolute bottom-4 right-4 hidden items-center gap-2 text-[0.62rem] tracking-[0.16em] text-ink-soft uppercase md:flex">
          <ZoomIn size={13} /> Hover to magnify · click to expand
        </span>
      </div>

      {views.length > 1 && (
        <div className="mt-3 flex gap-3" role="tablist" aria-label="Artwork views">
          {views.map((view, i) => (
            <button
              key={view.label}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`relative h-20 w-20 overflow-hidden bg-sand/45 transition-all md:h-24 md:w-24 ${i === active ? "outline outline-2 outline-offset-2 outline-terracotta" : "opacity-70 hover:opacity-100"}`}
            >
              <span className="absolute inset-[8%] block" style={{ transform: `scale(${view.zoom})`, transformOrigin: `${view.x}% ${view.y}%` }}>
                <ArtImage art={product.image} alt="" fill sizes="96px" className="object-contain" />
              </span>
              <span className="sr-only">{view.label}</span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => setFull(true)}
            className="grid h-20 w-20 place-items-center border border-line text-ink-soft hover:text-ink md:h-24 md:w-24"
            aria-label="View full screen"
          >
            <Maximize2 size={18} strokeWidth={1.3} />
          </button>
        </div>
      )}

      <Dialog open={full} onClose={() => setFull(false)} label={`${product.name} — full view`} variant="full" dark>
        <div className="relative h-full w-full bg-charcoal">
          <button type="button" onClick={() => setFull(false)} aria-label="Close" className="absolute right-4 top-4 z-10 grid h-12 w-12 place-items-center rounded-full bg-warmwhite/10 text-warmwhite hover:bg-warmwhite/20">
            <X size={22} strokeWidth={1.4} />
          </button>
          <FullViewer src={src} alt={product.alt} />
        </div>
      </Dialog>
    </div>
  );
}

/** Full-screen viewer: click to toggle 2.5× zoom, move the pointer (or drag on touch) to pan. */
function FullViewer({ src, alt }: { src: string; alt: string }) {
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const ref = useRef<HTMLDivElement>(null);
  const setFrom = (clientX: number, clientY: number) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setOrigin({ x: ((clientX - r.left) / r.width) * 100, y: ((clientY - r.top) / r.height) * 100 });
  };
  return (
    <div
      ref={ref}
      className={`absolute inset-0 overflow-hidden ${zoomed ? "cursor-zoom-out" : "cursor-zoom-in"} touch-none`}
      onClick={(e) => {
        setFrom(e.clientX, e.clientY);
        setZoomed((z) => !z);
      }}
      onPointerMove={(e) => zoomed && setFrom(e.clientX, e.clientY)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 m-auto h-full w-full object-contain p-6 transition-transform duration-500 ease-[var(--ease-gallery)] md:p-12"
        style={{ transform: zoomed ? "scale(2.5)" : "scale(1)", transformOrigin: `${origin.x}% ${origin.y}%` }}
      />
      <p className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 text-[0.62rem] tracking-[0.2em] text-warmwhite/50 uppercase">
        {zoomed ? "Move to explore · click to zoom out" : "Click anywhere to zoom in"}
      </p>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { ArtImage } from "@/components/ui/ArtImage";
import { Magnetic } from "@/components/motion/Magnetic";
import { RevealText, Reveal } from "@/components/motion/Reveal";
import { DustParticles } from "./DustParticles";
import { gsap } from "@/lib/motion";

export function Closing() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 75%", end: "center center", scrub: 1 },
      });
      tl.fromTo("[data-spot]", { opacity: 0, scaleY: 0.6 }, { opacity: 1, scaleY: 1, ease: "power2.out" }, 0).fromTo(
        "[data-closing-frame]",
        { y: 80, rotateX: 8, opacity: 0.2 },
        { y: 0, rotateX: 0, opacity: 1, ease: "power2.out" },
        0,
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="on-dark relative isolate overflow-hidden bg-charcoal py-24 text-warmwhite md:py-32">
      <div aria-hidden className="absolute inset-0 -z-10" style={{ background: "radial-gradient(80% 70% at 70% 40%, #3b3027 0%, #211d19 60%)" }} />
      <DustParticles className="pointer-events-none absolute inset-0 -z-10 h-full w-full" density={40} />

      <div className="container-x grid items-center gap-16 lg:grid-cols-12">
        <div className="order-2 lg:order-1 lg:col-span-6">
          <RevealText text="Bring Home a Piece of Indian Heritage." className="display text-[clamp(2.8rem,5.6vw,5.6rem)]" />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md leading-relaxed text-warmwhite/70">
              Explore meaningful artwork shaped by tradition, creativity, and the beauty of handmade craftsmanship.
            </p>
          </Reveal>
          <Reveal delay={0.25} className="mt-10 flex flex-wrap gap-3">
            <Magnetic>
              <Link href="/shop" className="btn bg-gold text-charcoal hover:bg-gold-soft" data-cursor="Explore">
                Shop All Artwork <ArrowRight size={15} />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/contact" className="btn btn-ghost">
                Contact Us
              </Link>
            </Magnetic>
          </Reveal>
        </div>

        <div className="relative order-1 flex justify-center [perspective:1400px] lg:order-2 lg:col-span-5 lg:col-start-8">
          <div
            data-spot
            aria-hidden
            className="pointer-events-none absolute -top-40 left-1/2 h-[140%] w-[160%] origin-top -translate-x-1/2"
            style={{
              background: "conic-gradient(from 180deg at 50% 0%, transparent 152deg, rgba(255,226,170,.16) 170deg, rgba(255,226,170,.22) 180deg, rgba(255,226,170,.16) 190deg, transparent 208deg)",
              filter: "blur(10px)",
            }}
          />
          <Link href="/artwork/jagannath-trinity-canvas" data-closing-frame data-cursor="View Artwork" className="frame-gilt relative block w-[min(78vw,440px)]">
            <div className="frame-mat">
              <ArtImage
                art="patta-jagannath-trinity"
                alt="Pattachitra of Jagannath, Balabhadra and Subhadra beneath a decorated canopy"
                sizes="(min-width:1024px) 34vw, 78vw"
                className="h-auto w-full"
              />
            </div>
          </Link>
          <div aria-hidden className="absolute -bottom-10 left-1/2 h-10 w-[70%] -translate-x-1/2 rounded-[50%] bg-black/50 blur-2xl" />
        </div>
      </div>
    </section>
  );
}

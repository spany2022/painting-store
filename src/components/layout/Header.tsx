"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { categories } from "@/data/categories";
import { ArtImage } from "@/components/ui/ArtImage";
import { useStore } from "@/components/providers/StoreProvider";
import { EASE, useScrollLock } from "@/lib/motion";
import { site } from "@/lib/site";
import { SearchOverlay } from "./SearchOverlay";
import { Wordmark } from "@/components/ui/Wordmark";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/#craft", label: "Our Craft" },
  { href: "/#spaces", label: "In Your Space" },
  { href: "/#gifting", label: "Gifting" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const { count, wishlist, openCart, ready } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const megaTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const overHero = pathname === "/" && !scrolled && !mega;
  useScrollLock(menu);

  useEffect(() => {
    // The header stays fixed and visible; scrolling only switches it from transparent to solid over the hero.
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close overlays on navigation.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenu(false);
    setMega(false);
    setSearch(false);
  }, [pathname]);

  const openMega = () => {
    clearTimeout(megaTimer.current);
    setMega(true);
  };
  const closeMega = () => {
    megaTimer.current = setTimeout(() => setMega(false), 140);
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[120] bg-charcoal px-4 py-3 text-warmwhite focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow] duration-300 ease-out ${
          overHero ? "on-dark bg-transparent text-warmwhite" : "bg-ivory text-ink shadow-[0_1px_0_rgb(220_205_181/.7)]"
        }`}
      >
        <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" className="shrink-0" aria-label={`${site.name} — home`}>
            <Wordmark accent={overHero ? "text-gold-soft" : "text-terracotta"} />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9 text-[0.8rem] font-medium tracking-[0.06em]">
              <li onMouseEnter={openMega} onMouseLeave={closeMega}>
                <button
                  type="button"
                  className="link-underline"
                  aria-expanded={mega}
                  aria-controls="mega-menu"
                  onClick={() => setMega((v) => !v)}
                  onFocus={openMega}
                >
                  Collections
                </button>
              </li>
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="link-underline" aria-current={pathname === n.href ? "page" : undefined}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <IconButton label="Search artworks" onClick={() => setSearch(true)}>
              <Search size={19} strokeWidth={1.4} />
            </IconButton>
            <Link href="/wishlist" className="relative grid h-11 w-11 place-items-center" aria-label={`Wishlist, ${wishlist.length} items`}>
              <Heart size={19} strokeWidth={1.4} />
              {ready && wishlist.length > 0 && <Badge n={wishlist.length} />}
            </Link>
            <IconButton label={`Open cart, ${count} items`} onClick={openCart}>
              <ShoppingBag size={19} strokeWidth={1.4} />
              {ready && count > 0 && <Badge n={count} />}
            </IconButton>
            <span className="lg:hidden">
              <IconButton label="Open menu" onClick={() => setMenu(true)}>
                <Menu size={21} strokeWidth={1.4} />
              </IconButton>
            </span>
          </div>
        </div>

        <AnimatePresence>
          {mega && (
            <motion.div
              id="mega-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: EASE }}
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
              className="absolute inset-x-0 top-full hidden border-t border-line bg-ivory text-ink shadow-[0_30px_60px_-30px_rgb(33_29_25/.35)] lg:block"
            >
              <div className="container-x grid grid-cols-5 gap-6 py-10">
                {categories.map((c) => (
                  <Link key={c.slug} href={`/collections/${c.slug}`} className="group block" data-cursor="Explore">
                    <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                      <ArtImage
                        art={c.image}
                        alt=""
                        fill
                        sizes="18vw"
                        className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-gallery)] group-hover:scale-[1.06]"
                      />
                    </div>
                    <p className="mt-4 font-serif text-xl">{c.name}</p>
                    <p className="mt-1 text-xs text-ink-soft">
                      {c.nativeName && <span className="mr-2 font-odia text-terracotta">{c.nativeName}</span>}
                      {c.tagline}
                    </p>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>{menu && <MobileMenu onClose={() => setMenu(false)} />}</AnimatePresence>
      <SearchOverlay open={search} onClose={() => setSearch(false)} />
    </>
  );
}

function IconButton({ children, label, onClick }: { children: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className="relative grid h-11 w-11 place-items-center">
      {children}
    </button>
  );
}

function Badge({ n }: { n: number }) {
  return (
    <span className="absolute right-1 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-terracotta px-1 text-[0.6rem] font-semibold leading-none text-warmwhite">
      {n}
    </span>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="on-dark fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-charcoal text-warmwhite"
      data-lenis-prevent
    >
      <div className="container-x flex h-[var(--header-h)] shrink-0 items-center justify-between">
        <Wordmark />
        <button type="button" onClick={onClose} aria-label="Close menu" className="grid h-11 w-11 place-items-center">
          <X size={22} strokeWidth={1.4} />
        </button>
      </div>
      <nav aria-label="Mobile" className="container-x flex-1 pb-10 pt-4">
        <p className="eyebrow text-gold-soft">Collections</p>
        <ul className="mt-4 space-y-1">
          {categories.map((c, i) => (
            <motion.li
              key={c.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.05, duration: 0.6, ease: EASE }}
            >
              <Link href={`/collections/${c.slug}`} className="flex items-center gap-4 py-2.5" onClick={onClose}>
                <span className="relative h-14 w-11 shrink-0 overflow-hidden bg-charcoal-soft">
                  <ArtImage art={c.image} alt="" fill sizes="44px" className="object-cover" />
                </span>
                <span className="font-serif text-[1.7rem] leading-none">{c.shortName}</span>
                {c.nativeName && <span className="font-odia text-xs text-gold-soft/80">{c.nativeName}</span>}
              </Link>
            </motion.li>
          ))}
        </ul>
        <div className="my-8 h-px bg-warmwhite/15" />
        <ul className="grid grid-cols-2 gap-y-4 text-sm tracking-[0.08em]">
          {[...nav, { href: "/wishlist", label: "Wishlist" }, { href: "/contact", label: "Contact" }].map((n) => (
            <li key={n.href}>
              <Link href={n.href} onClick={onClose} className="py-2">
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
}

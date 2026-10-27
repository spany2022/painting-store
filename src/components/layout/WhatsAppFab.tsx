"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { site, whatsappLink } from "@/lib/site";

/** Floating WhatsApp shortcut — appears after the hero, hidden on product pages which have their own sticky bar. */
export function WhatsAppFab() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/artwork/") || pathname.startsWith("/checkout")) return null;

  return (
    <a
      href={whatsappLink(`Hello ${site.name}, I'd like some help choosing an artwork.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={`fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center gap-3 rounded-full bg-forest text-warmwhite sm:w-auto sm:justify-start sm:pl-4 sm:pr-5 shadow-[0_12px_30px_-10px_rgb(33_29_25/.6)] transition-all duration-700 ease-[var(--ease-gallery)] hover:bg-[#2a3c2e] md:bottom-8 md:right-8 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <WhatsAppIcon className="h-6 w-6 shrink-0" />
      <span className="hidden text-xs font-semibold tracking-[0.14em] sm:inline">ENQUIRE</span>
    </a>
  );
}

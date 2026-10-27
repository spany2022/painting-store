"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { ArtImage } from "@/components/ui/ArtImage";
import { SectionMark } from "@/components/ui/Motif";
import { Reveal, RevealText } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { enquiryTypes, generalEnquiryLink } from "@/lib/whatsapp";

export function Gifting() {
  const [type, setType] = useState<string>("gift");
  const [name, setName] = useState("");
  const [occasion, setOccasion] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");

  const link = generalEnquiryLink(type, { name, occasion, budget, message });

  return (
    <section id="gifting" className="relative overflow-hidden bg-forest py-24 text-warmwhite md:py-36 on-dark">
      <div aria-hidden className="absolute inset-y-0 right-0 hidden w-[38%] lg:block">
        <ArtImage art="pipili-chandua" alt="" fill sizes="38vw" className="object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/40 to-transparent" />
      </div>

      <div className="container-x relative grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionMark index="08" label="Personalised orders & gifting" dark />
          <RevealText text="Find a Piece That Feels Uniquely Yours." className="display mt-6 text-[clamp(2.6rem,5.2vw,5rem)]" />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl leading-relaxed text-warmwhite/75">
              Looking for a meaningful gift, a special artwork for your home, or a collection for a thoughtfully designed
              space? Let us help you discover the right piece.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <form
              className="mt-12 max-w-2xl"
              onSubmit={(e) => {
                e.preventDefault();
                window.open(link, "_blank", "noopener,noreferrer");
              }}
            >
              <fieldset>
                <legend className="eyebrow text-gold-soft">I&apos;m looking for</legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {enquiryTypes.map((t) => (
                    <label
                      key={t.id}
                      className={`cursor-pointer border px-4 py-2.5 text-[0.8rem] transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-gold-soft ${
                        type === t.id ? "border-gold bg-gold text-charcoal" : "border-warmwhite/25 hover:border-warmwhite/70"
                      }`}
                    >
                      <input type="radio" name="enquiry" value={t.id} checked={type === t.id} onChange={() => setType(t.id)} className="sr-only" />
                      {t.label}
                    </label>
                  ))}
                </div>
                <p className="mt-3 text-xs text-warmwhite/55">{enquiryTypes.find((t) => t.id === type)?.hint}</p>
              </fieldset>

              <div className="mt-8 grid gap-x-8 sm:grid-cols-2">
                <label className="block">
                  <span className="sr-only">Your name</span>
                  <input className="field" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
                </label>
                <label className="block">
                  <span className="sr-only">Occasion or space</span>
                  <input className="field" placeholder="Occasion or space" value={occasion} onChange={(e) => setOccasion(e.target.value)} />
                </label>
                <label className="block">
                  <span className="sr-only">Budget</span>
                  <select className="field cursor-pointer [&>option]:text-ink" value={budget} onChange={(e) => setBudget(e.target.value)}>
                    <option value="">Budget (optional)</option>
                    <option>Under ₹5,000</option>
                    <option>₹5,000 – ₹15,000</option>
                    <option>₹15,000 – ₹30,000</option>
                    <option>Above ₹30,000</option>
                  </select>
                </label>
                <label className="block sm:col-span-2">
                  <span className="sr-only">Message</span>
                  <textarea
                    className="field min-h-24 resize-none"
                    placeholder="Tell us a little more — sizes, quantities, dates…"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </label>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Magnetic>
                  <button type="submit" className="btn bg-warmwhite text-forest hover:bg-gold-soft">
                    <WhatsAppIcon className="h-4 w-4" /> Enquire on WhatsApp
                  </button>
                </Magnetic>
                <Magnetic>
                  <Link href="/shop?tag=gift" className="btn btn-ghost">
                    Explore Gift Ideas <ArrowRight size={15} />
                  </Link>
                </Magnetic>
              </div>
              <p className="mt-6 max-w-lg text-xs leading-relaxed text-warmwhite/50">
                Opens WhatsApp with your details pre-filled — nothing is sent until you press send. Custom work, framing,
                bulk orders and international delivery are confirmed individually on enquiry.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

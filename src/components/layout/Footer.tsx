import Link from "next/link";
import { categories } from "@/data/categories";
import { site, whatsappLink } from "@/lib/site";
import { LotusMotif, BorderMotif } from "@/components/ui/Motif";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { Year } from "@/components/ui/Year";
import { Wordmark } from "@/components/ui/Wordmark";

const policies = [
  { href: "/policies/shipping", label: "Shipping & delivery" },
  { href: "/policies/returns", label: "Returns & refunds" },
  { href: "/policies/privacy", label: "Privacy policy" },
  { href: "/policies/terms", label: "Terms & conditions" },
];

export function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-charcoal text-warmwhite/85">
      <BorderMotif className="text-gold/30" />
      <LotusMotif className="pointer-events-none absolute -right-24 -top-10 h-[420px] w-[420px] text-gold/[0.07]" strokeWidth={0.35} />
      <div className="container-x relative grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <p className="text-warmwhite">
            <Wordmark size="lg" />
          </p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-warmwhite/65">{site.description}</p>
          <a
            href={whatsappLink(`Hello ${site.name}, I have a question.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 border border-warmwhite/25 px-5 py-3 text-xs font-semibold tracking-[0.16em] transition-colors hover:border-gold hover:text-gold-soft"
          >
            <WhatsAppIcon className="h-4 w-4" /> WHATSAPP US
          </a>
        </div>

        <FooterCol title="Shop" className="md:col-span-2">
          {categories.map((c) => (
            <FooterLink key={c.slug} href={`/collections/${c.slug}`}>
              {c.shortName}
            </FooterLink>
          ))}
          <FooterLink href="/shop">All artwork</FooterLink>
        </FooterCol>

        <FooterCol title="Discover" className="md:col-span-2">
          <FooterLink href="/about">Our story</FooterLink>
          <FooterLink href="/#craft">The craft</FooterLink>
          <FooterLink href="/#spaces">Art in your space</FooterLink>
          <FooterLink href="/#gifting">Gifting & enquiries</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
        </FooterCol>

        <FooterCol title="Care" className="md:col-span-2">
          {policies.map((p) => (
            <FooterLink key={p.href} href={p.href}>
              {p.label}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Visit" className="md:col-span-2">
          <li className="text-sm text-warmwhite/65">{site.address}</li>
          <li className="text-sm text-warmwhite/65">{site.hours}</li>
          <FooterLink href={`mailto:${site.email}`}>{site.email}</FooterLink>
          <li className="flex gap-4 pt-2 text-sm">
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="link-underline">
              Instagram
            </a>
            <a href={site.social.pinterest} target="_blank" rel="noopener noreferrer" className="link-underline">
              Pinterest
            </a>
          </li>
        </FooterCol>
      </div>

      <div className="container-x relative flex flex-col gap-4 border-t border-warmwhite/10 py-6 text-xs text-warmwhite/50 md:flex-row md:items-center md:justify-between">
        <p>
          © <Year /> {site.name}. All rights reserved.
        </p>
        <p>
          {site.paymentMethods.length > 0
            ? `We accept ${site.paymentMethods.join(", ")}`
            : "Payment options are confirmed with your order."}
        </p>
        <p>
          Demo catalogue ·{" "}
          <Link href="/credits" className="underline underline-offset-4 hover:text-warmwhite">
            Image credits
          </Link>
        </p>
      </div>
    </footer>
  );
}

function FooterCol({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <p className="eyebrow text-gold-soft">{title}</p>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="link-underline text-sm text-warmwhite/75 hover:text-warmwhite">
        {children}
      </Link>
    </li>
  );
}

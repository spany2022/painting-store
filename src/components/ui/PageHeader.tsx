import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-[0.7rem] tracking-[0.12em] text-ink-soft uppercase">
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-1.5">
            {it.href ? (
              <Link href={it.href} className="hover:text-ink">
                {it.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {it.label}
              </span>
            )}
            {i < items.length - 1 && <ChevronRight size={11} />}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function breadcrumbJsonLd(base: string, items: { href?: string; label: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.label,
      ...(it.href ? { item: `${base}${it.href}` } : {}),
    })),
  };
}

export function PageHeader({
  eyebrow,
  title,
  intro,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  crumbs?: { href?: string; label: string }[];
}) {
  return (
    <header className="container-x pb-12 pt-[calc(var(--header-h)+3rem)] md:pb-16 md:pt-[calc(var(--header-h)+4.5rem)]">
      {crumbs && <Breadcrumbs items={crumbs} />}
      {eyebrow && <p className="eyebrow mt-8 text-terracotta">{eyebrow}</p>}
      <h1 className="display mt-4 max-w-4xl text-[clamp(2.8rem,6vw,5.6rem)]">{title}</h1>
      {intro && <p className="mt-6 max-w-2xl leading-relaxed text-ink-soft">{intro}</p>}
    </header>
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

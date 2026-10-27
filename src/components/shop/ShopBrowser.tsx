"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { ProductCard } from "./ProductCard";
import { Dialog } from "@/components/ui/Dialog";
import { availabilityLabel, makeLabel, styleLabel } from "@/lib/format";
import { EASE } from "@/lib/motion";
import type { CategorySlug, Product } from "@/lib/types";

const priceBands = [
  { id: "u5", label: "Under ₹5,000", test: (p: number) => p < 5000 },
  { id: "5-15", label: "₹5,000 – ₹15,000", test: (p: number) => p >= 5000 && p <= 15000 },
  { id: "15-30", label: "₹15,000 – ₹30,000", test: (p: number) => p > 15000 && p <= 30000 },
  { id: "o30", label: "Above ₹30,000", test: (p: number) => p > 30000 },
];

const sizeBands = [
  { id: "compact", label: "Compact (under 40 cm)", test: (w: number) => w < 40 },
  { id: "medium", label: "Medium (40–70 cm)", test: (w: number) => w >= 40 && w <= 70 },
  { id: "large", label: "Large (over 70 cm)", test: (w: number) => w > 70 },
];

const sorts = {
  featured: "Featured",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  name: "Name A–Z",
} as const;
type SortKey = keyof typeof sorts;

/** Largest dimension of any size the piece is offered in, in cm. */
function sizesOf(p: Product) {
  const sources = p.variants ? p.variants.map((v) => v.dimensions) : [p.dimensions];
  return sources.flatMap((s) => {
    const m = s.match(/(\d+)\s*×\s*(\d+)/);
    return m ? [Math.max(Number(m[1]), Number(m[2]))] : [];
  });
}

type Filters = {
  category: string[];
  style: string[];
  make: string[];
  availability: string[];
  price: string[];
  size: string[];
  tag: string[];
};

const keys: (keyof Filters)[] = ["category", "style", "make", "availability", "price", "size", "tag"];

export function ShopBrowser({ lockedCategory }: { lockedCategory?: CategorySlug }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [drawer, setDrawer] = useState(false);

  const filters: Filters = useMemo(() => {
    const f = Object.fromEntries(keys.map((k) => [k, params.get(k)?.split(",").filter(Boolean) ?? []])) as Filters;
    if (lockedCategory) f.category = [lockedCategory];
    return f;
  }, [params, lockedCategory]);
  const sort = (params.get("sort") as SortKey) || "featured";

  const update = (key: keyof Filters | "sort", values: string[] | string) => {
    const next = new URLSearchParams(params.toString());
    const v = Array.isArray(values) ? values.join(",") : values;
    if (v && !(key === "sort" && v === "featured")) next.set(key, v);
    else next.delete(key);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const toggle = (key: keyof Filters, value: string) => {
    const cur = filters[key];
    update(key, cur.includes(value) ? cur.filter((x) => x !== value) : [...cur, value]);
  };

  const results = useMemo(() => {
    let l = products.filter((p) => {
      if (filters.category.length && !filters.category.includes(p.category)) return false;
      if (filters.style.length && !filters.style.includes(p.style)) return false;
      if (filters.make.length && !filters.make.includes(p.make)) return false;
      if (filters.availability.length && !filters.availability.includes(p.availability)) return false;
      if (filters.tag.length && !filters.tag.some((t) => (p.tags as string[]).includes(t))) return false;
      if (filters.price.length) {
        const prices = p.variants ? p.variants.map((v) => v.price) : [p.price];
        if (!filters.price.some((id) => prices.some((x) => priceBands.find((b) => b.id === id)?.test(x)))) return false;
      }
      if (filters.size.length) {
        const s = sizesOf(p);
        if (!filters.size.some((id) => s.some((w) => sizeBands.find((b) => b.id === id)?.test(w)))) return false;
      }
      return true;
    });
    if (sort === "featured") l = [...l].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    if (sort === "price-asc") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") l = [...l].sort((a, b) => b.price - a.price);
    if (sort === "name") l = [...l].sort((a, b) => a.name.localeCompare(b.name));
    return l;
  }, [filters, sort]);

  const active = keys
    .filter((k) => !(lockedCategory && k === "category"))
    .flatMap((k) => filters[k].map((v) => ({ k, v, label: labelFor(k, v) })));

  const groups = (
    <FilterGroups filters={filters} toggle={toggle} lockedCategory={lockedCategory} />
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-14">
      <aside className="hidden lg:block" aria-label="Filters">
        <div className="sticky top-[calc(var(--header-h)+24px)]">{groups}</div>
      </aside>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
          <p className="text-sm text-ink-soft" aria-live="polite">
            {results.length} {results.length === 1 ? "artwork" : "artworks"}
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDrawer(true)}
              className="flex h-10 items-center gap-2 border border-line px-4 text-xs tracking-[0.12em] uppercase lg:hidden"
            >
              <SlidersHorizontal size={14} /> Filters {active.length > 0 && `(${active.length})`}
            </button>
            <label className="flex items-center gap-2 text-xs text-ink-soft">
              <span className="hidden sm:inline">Sort</span>
              <select
                value={sort}
                onChange={(e) => update("sort", e.target.value)}
                className="h-10 cursor-pointer border border-line bg-transparent px-3 text-xs text-ink focus:outline-none"
              >
                {Object.entries(sorts).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {active.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-4">
            {active.map((a) => (
              <button
                key={`${a.k}-${a.v}`}
                type="button"
                onClick={() => toggle(a.k, a.v)}
                className="flex items-center gap-2 bg-sand/60 px-3 py-1.5 text-xs hover:bg-sand"
                aria-label={`Remove filter ${a.label}`}
              >
                {a.label} <X size={12} />
              </button>
            ))}
            <button
              type="button"
              onClick={() => router.replace(pathname, { scroll: false })}
              className="px-2 text-xs underline underline-offset-4"
            >
              Clear all
            </button>
          </div>
        )}

        {results.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-serif text-3xl">No artworks match these filters</p>
            <button type="button" onClick={() => router.replace(pathname, { scroll: false })} className="btn btn-dark mt-6">
              Clear filters
            </button>
          </div>
        ) : (
          <motion.ul layout className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {results.map((p, i) => (
                <motion.li
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.6, ease: EASE, delay: Math.min(i, 8) * 0.03 }}
                >
                  <ProductCard product={p} priority={i < 3} sizes="(min-width:1280px) 25vw, 50vw" />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </div>

      <Dialog open={drawer} onClose={() => setDrawer(false)} label="Filters" variant="right">
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <p className="font-serif text-2xl">Filters</p>
          <button type="button" onClick={() => setDrawer(false)} aria-label="Close filters" className="grid h-11 w-11 place-items-center">
            <X size={20} strokeWidth={1.4} />
          </button>
        </div>
        <div className="px-6 py-6">{groups}</div>
        <div className="sticky bottom-0 border-t border-line bg-ivory p-4">
          <button type="button" className="btn btn-dark w-full" onClick={() => setDrawer(false)}>
            Show {results.length} artworks
          </button>
        </div>
      </Dialog>
    </div>
  );
}

function labelFor(k: keyof Filters, v: string): string {
  switch (k) {
    case "category":
      return categories.find((c) => c.slug === v)?.shortName ?? v;
    case "style":
      return styleLabel[v as keyof typeof styleLabel] ?? v;
    case "make":
      return makeLabel[v as keyof typeof makeLabel] ?? v;
    case "availability":
      return availabilityLabel[v as keyof typeof availabilityLabel] ?? v;
    case "price":
      return priceBands.find((b) => b.id === v)?.label ?? v;
    case "size":
      return sizeBands.find((b) => b.id === v)?.label ?? v;
    case "tag":
      return v === "gift" ? "Gift ideas" : v === "statement" ? "Statement pieces" : v === "compact" ? "Compact" : "New";
  }
}

function FilterGroups({
  filters,
  toggle,
  lockedCategory,
}: {
  filters: Filters;
  toggle: (k: keyof Filters, v: string) => void;
  lockedCategory?: CategorySlug;
}) {
  const group = (title: string, k: keyof Filters, options: { value: string; label: string }[]) => (
    <fieldset className="border-b border-line py-5 first:pt-0">
      <legend className="eyebrow float-left mb-3 w-full text-ink">{title}</legend>
      <div className="clear-both space-y-1">
        {options.map((o) => {
          const checked = filters[k].includes(o.value);
          return (
            <label key={o.value} className="flex cursor-pointer items-center gap-3 py-1.5 text-sm text-ink-soft hover:text-ink">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(k, o.value)}
                className="h-4 w-4 cursor-pointer appearance-none border border-ink/40 bg-transparent transition-colors checked:border-terracotta checked:bg-terracotta"
              />
              <span className={checked ? "text-ink" : ""}>{o.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );

  return (
    <div>
      {!lockedCategory && group("Category", "category", categories.map((c) => ({ value: c.slug, label: c.shortName })))}
      {group("Handmade or print", "make", Object.entries(makeLabel).map(([value, label]) => ({ value, label })))}
      {group("Price", "price", priceBands.map((b) => ({ value: b.id, label: b.label })))}
      {group("Style", "style", Object.entries(styleLabel).map(([value, label]) => ({ value, label })))}
      {group("Size", "size", sizeBands.map((b) => ({ value: b.id, label: b.label })))}
      {group("Availability", "availability", Object.entries(availabilityLabel).filter(([v]) => v !== "sold-out").map(([value, label]) => ({ value, label })))}
      {group("Curated", "tag", [
        { value: "gift", label: "Gift ideas" },
        { value: "statement", label: "Statement pieces" },
        { value: "compact", label: "Compact" },
        { value: "new", label: "New arrivals" },
      ])}
    </div>
  );
}

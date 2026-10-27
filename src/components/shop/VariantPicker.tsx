"use client";

import { useId } from "react";
import { formatINR } from "@/lib/format";
import type { Variant } from "@/lib/types";

export function VariantPicker({
  variants,
  value,
  onChange,
}: {
  variants: Variant[];
  value?: string;
  onChange: (id: string) => void;
}) {
  const name = useId();
  return (
    <fieldset>
      <legend className="eyebrow mb-3 text-ink-soft">Size</legend>
      <div className="grid grid-cols-3 gap-2">
        {variants.map((v) => {
          const active = v.id === value;
          return (
            <label
              key={v.id}
              className={`relative cursor-pointer border px-3 py-3 text-center transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-terracotta ${
                active ? "border-ink bg-ink text-warmwhite" : "border-line hover:border-ink/60"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={v.id}
                checked={active}
                onChange={() => onChange(v.id)}
                className="sr-only"
              />
              <span className="block text-sm font-medium">{v.label}</span>
              <span className={`block text-[0.7rem] ${active ? "text-warmwhite/70" : "text-ink-soft"}`}>{v.dimensions}</span>
              <span className={`mt-1 block text-[0.7rem] ${active ? "text-warmwhite/90" : "text-ink"}`}>{formatINR(v.price)}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/**
 * Fine-line ornaments drawn from Odia temple and Pattachitra border vocabulary:
 * a lotus rosette and a running border. Strokes use currentColor.
 */
export function LotusMotif({ className, strokeWidth = 0.6, draw = false }: { className?: string; strokeWidth?: number; draw?: boolean }) {
  const petals = Array.from({ length: 8 }, (_, i) => i * 45);
  const outer = Array.from({ length: 16 }, (_, i) => i * 22.5 + 11.25);
  const pathProps = draw ? { pathLength: 1, className: "kk-draw" } : {};
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} aria-hidden>
      <circle cx="50" cy="50" r="5" {...pathProps} />
      <circle cx="50" cy="50" r="9" {...pathProps} />
      {petals.map((r) => (
        <path key={r} d="M50 41 C45 33 45 23 50 15 C55 23 55 33 50 41 Z" transform={`rotate(${r} 50 50)`} {...pathProps} />
      ))}
      {petals.map((r) => (
        <path key={`i${r}`} d="M50 37 C48 31 48 26 50 21 C52 26 52 31 50 37" transform={`rotate(${r} 50 50)`} {...pathProps} />
      ))}
      <circle cx="50" cy="50" r="38" {...pathProps} />
      {outer.map((r) => (
        <path key={`o${r}`} d="M50 12 C47.5 8.5 47.5 5.5 50 3 C52.5 5.5 52.5 8.5 50 12 Z" transform={`rotate(${r} 50 50)`} {...pathProps} />
      ))}
      <circle cx="50" cy="50" r="46.5" strokeDasharray="0.6 2.2" {...pathProps} />
    </svg>
  );
}

export function BorderMotif({ className }: { className?: string }) {
  return (
    <svg className={className} height="14" width="100%" aria-hidden preserveAspectRatio="none">
      <defs>
        <pattern id="kk-border" width="28" height="14" patternUnits="userSpaceOnUse">
          <path d="M0 7 H6 M22 7 H28" stroke="currentColor" strokeWidth="0.6" />
          <path d="M14 1 C10 4 10 10 14 13 C18 10 18 4 14 1 Z" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="14" cy="7" r="1" fill="currentColor" />
          <circle cx="3" cy="7" r="0.7" fill="currentColor" />
          <circle cx="25" cy="7" r="0.7" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="14" fill="url(#kk-border)" />
    </svg>
  );
}

export function SectionMark({ index, label, dark = false }: { index: string; label: string; dark?: boolean }) {
  return (
    <div className={`flex items-center gap-4 ${dark ? "text-gold-soft" : "text-terracotta"}`}>
      <span className="font-serif text-lg italic">{index}</span>
      <span className={`h-px w-10 ${dark ? "bg-gold/50" : "bg-terracotta/40"}`} />
      <span className="eyebrow">{label}</span>
    </div>
  );
}

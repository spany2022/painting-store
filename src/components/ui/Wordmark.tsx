import { site } from "@/lib/site";

const sizes = {
  sm: { primary: "text-[1.45rem] sm:text-[1.6rem]", secondary: "text-[0.56rem] tracking-[0.42em]" },
  md: { primary: "text-3xl md:text-4xl", secondary: "text-[0.66rem] tracking-[0.5em]" },
  lg: { primary: "text-4xl", secondary: "text-[0.7rem] tracking-[0.5em]" },
};

/** Two-line brand wordmark: serif primary line over a spaced small-caps line. */
export function Wordmark({ size = "sm", accent = "text-gold-soft", className = "" }: { size?: keyof typeof sizes; accent?: string; className?: string }) {
  const s = sizes[size];
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span className={`font-serif tracking-[0.02em] ${s.primary}`}>{site.wordmark.primary}</span>
      <span className={`mt-1.5 font-sans font-semibold uppercase ${s.secondary} ${accent}`}>{site.wordmark.secondary}</span>
    </span>
  );
}

import Link from "next/link";
import { LotusMotif } from "@/components/ui/Motif";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col items-center justify-center pt-[var(--header-h)] text-center">
      <LotusMotif className="h-20 w-20 text-gold" strokeWidth={0.6} />
      <h1 className="display mt-8 text-[clamp(2.6rem,6vw,5rem)]">This story isn&apos;t here</h1>
      <p className="mt-4 max-w-md text-ink-soft">The page you were looking for may have moved. Let&apos;s find you something beautiful instead.</p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href="/shop" className="btn btn-dark">
          Shop all artwork
        </Link>
        <Link href="/" className="btn btn-ghost">
          Back to home
        </Link>
      </div>
    </section>
  );
}

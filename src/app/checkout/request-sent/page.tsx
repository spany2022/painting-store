import type { Metadata } from "next";
import Link from "next/link";
import { LotusMotif } from "@/components/ui/Motif";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Order Request Ready",
  robots: { index: false },
};

export default function RequestSentPage() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col items-center justify-center pb-24 pt-[calc(var(--header-h)+4rem)] text-center">
      <LotusMotif className="h-20 w-20 text-gold" strokeWidth={0.6} />
      <p className="eyebrow mt-8 text-terracotta">Order request</p>
      <h1 className="display mt-4 max-w-3xl text-[clamp(2.6rem,5vw,4.6rem)]">Your order is ready to send on WhatsApp</h1>
      <p className="mt-6 max-w-xl leading-relaxed text-ink-soft">
        We opened WhatsApp with your order and delivery details. Press send in WhatsApp to share it with {site.name}. Our
        team will reply to confirm availability, delivery charges and payment. Your order is not confirmed and no payment
        has been taken until then.
      </p>
      <p className="mt-3 text-sm text-ink-soft">
        WhatsApp didn&apos;t open?{" "}
        <Link href="/cart" className="underline underline-offset-4">
          Return to your cart
        </Link>{" "}
        and use “Order on WhatsApp”, or write to{" "}
        <a href={`mailto:${site.email}`} className="underline underline-offset-4">
          {site.email}
        </a>
        .
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href="/shop" className="btn btn-dark">
          Continue browsing
        </Link>
        <Link href="/" className="btn btn-ghost">
          Back to home
        </Link>
      </div>
    </section>
  );
}

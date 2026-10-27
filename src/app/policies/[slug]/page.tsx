import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageSkeleton } from "@/components/ui/Skeletons";
import { PageHeader } from "@/components/ui/PageHeader";
import { site } from "@/lib/site";

/**
 * Policy templates. Headings show what each policy should cover; the store must
 * replace the bracketed text with its confirmed terms before launch.
 */
const policies: Record<string, { title: string; intro: string; sections: [string, string][] }> = {
  shipping: {
    title: "Shipping & Delivery",
    intro: "How and when your artwork reaches you.",
    sections: [
      ["Dispatch times", "Ready-to-ship pieces and made-to-order timelines are shown on each artwork page. [Confirm standard dispatch windows.]"],
      ["Delivery areas & charges", "[Confirm serviceable regions within India, delivery charges and any free-delivery threshold.] International delivery is offered only where confirmed on enquiry."],
      ["Packaging", "Artworks are packed to protect them in transit. [Describe packaging — e.g. rolled in tubes, flat-packed, crated.]"],
      ["Tracking", "[Describe how tracking details are shared, e.g. by WhatsApp or email.]"],
    ],
  },
  returns: {
    title: "Returns & Refunds",
    intro: "What happens if something isn't right.",
    sections: [
      ["Damaged in transit", "[Explain how to report damage, the time window and what evidence is needed.]"],
      ["Returns", "[State whether returns are accepted, the return window, condition requirements and who pays return shipping.]"],
      ["Made-to-order & custom work", "[Clarify return terms for made-to-order and personalised pieces.]"],
      ["Refunds", "[Explain refund method and processing time once a return is approved.]"],
    ],
  },
  privacy: {
    title: "Privacy Policy",
    intro: "How we handle your information.",
    sections: [
      ["What this site stores", "Your cart and wishlist are stored only in your browser on this device. This demo does not send them to a server."],
      ["Enquiries", "When you use a WhatsApp or email button, your message is sent through that service and is subject to its own privacy terms."],
      ["Orders", "[Describe what customer data is collected at checkout, why, who it is shared with (e.g. courier, payment provider) and how long it is kept.]"],
      ["Your rights & contact", `[Describe how customers can request access or deletion.] Contact: ${site.email}`],
    ],
  },
  terms: {
    title: "Terms & Conditions",
    intro: "The terms that apply when you use this site and place an order.",
    sections: [
      ["Artwork descriptions", "Handmade works vary naturally; colours may appear differently on screens. Each listing states whether it is a handmade original or a print."],
      ["Pricing", "Prices are listed in Indian Rupees. [Confirm tax treatment and how delivery charges are added.]"],
      ["Orders", "An order is confirmed only once the store has confirmed availability and payment. [Add cancellation terms.]"],
      ["Governing law", "[Add jurisdiction and business registration details.]"],
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(policies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/policies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = policies[slug];
  return p ? { title: p.title, alternates: { canonical: `/policies/${slug}` } } : {};
}

export default function PolicyPage({ params }: PageProps<"/policies/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <PolicyContent params={params} />
    </Suspense>
  );
}

async function PolicyContent({ params }: { params: PageProps<"/policies/[slug]">["params"] }) {
  const { slug } = await params;
  const p = policies[slug];
  if (!p) notFound();
  return (
    <>
      <PageHeader crumbs={[{ href: "/", label: "Home" }, { label: p.title }]} title={p.title} intro={p.intro} />
      <div className="container-x pb-28">
        <div className="max-w-3xl">
          <p className="border-l-2 border-gold bg-warmwhite px-5 py-4 text-sm text-ink-soft">
            Draft template — text in brackets must be replaced with {site.name}&apos;s confirmed policy before launch.
          </p>
          <div className="mt-12 space-y-10">
            {p.sections.map(([h, t]) => (
              <section key={h}>
                <h2 className="font-serif text-3xl">{h}</h2>
                <p className="mt-3 leading-relaxed text-ink-soft">{t}</p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

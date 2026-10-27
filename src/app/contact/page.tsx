import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { ContactForm } from "@/components/shop/ContactForm";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Reach ${site.name} on WhatsApp or email for artwork enquiries, gifting and interior projects.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/", label: "Home" }, { label: "Contact" }]}
        eyebrow="We'd love to hear from you"
        title="Contact Us"
        intro="Questions about an artwork, sizes, delivery or gifting? WhatsApp is the quickest way to reach us."
      />
      <section className="container-x grid gap-16 pb-28 md:grid-cols-12">
        <div className="md:col-span-5">
          <a href={whatsappLink(`Hello ${site.name}, I have a question.`)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp w-full sm:w-auto">
            <WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp
          </a>
          <ul className="mt-12 space-y-6 text-sm">
            <li className="flex gap-4">
              <Phone size={18} strokeWidth={1.4} className="text-terracotta" />
              <span>{site.phoneDisplay}</span>
            </li>
            <li className="flex gap-4">
              <Mail size={18} strokeWidth={1.4} className="text-terracotta" />
              <a href={`mailto:${site.email}`} className="link-underline">
                {site.email}
              </a>
            </li>
            <li className="flex gap-4">
              <MapPin size={18} strokeWidth={1.4} className="text-terracotta" />
              <span>{site.address}</span>
            </li>
            <li className="flex gap-4">
              <Clock size={18} strokeWidth={1.4} className="text-terracotta" />
              <span>{site.hours}</span>
            </li>
          </ul>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <ContactForm />
        </div>
      </section>
    </>
  );
}

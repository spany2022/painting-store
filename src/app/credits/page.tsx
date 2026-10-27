import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ArtImage } from "@/components/ui/ArtImage";
import { art, type ArtKey } from "@/data/art";

export const metadata: Metadata = {
  title: "Image Credits",
  description: "Credits and licences for photographs used on this site.",
};

export default function CreditsPage() {
  const entries = Object.entries(art) as [ArtKey, (typeof art)[ArtKey]][];
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/", label: "Home" }, { label: "Image credits" }]}
        title="Image Credits"
        intro="This is a demonstration catalogue. Photographs are sourced from Wikimedia Commons and used under the licences listed below; they illustrate each craft and will be replaced with the store's own product photography. Images may be resized or cropped for layout."
      />
      <div className="container-x pb-28">
        <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map(([key, a]) => (
            <li key={key} className="flex min-w-0 gap-4 border-t border-line pt-5 text-sm">
              <span className="relative h-16 w-16 shrink-0 bg-sand">
                <ArtImage art={key} alt="" fill sizes="64px" className="object-cover" />
              </span>
              <span className="min-w-0">
                <a href={a.source} target="_blank" rel="noopener noreferrer" className="block truncate font-medium underline-offset-4 hover:underline">
                  {a.title}
                </a>
                <span className="block text-ink-soft">{a.author}</span>
                {a.licenseUrl ? (
                  <a href={a.licenseUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-ink-soft underline underline-offset-4">
                    {a.license}
                  </a>
                ) : (
                  <span className="text-xs text-ink-soft">{a.license}</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

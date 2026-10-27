import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { WishlistView } from "@/components/shop/WishlistView";

export const metadata: Metadata = {
  title: "Wishlist",
  robots: { index: false },
};

export default function WishlistPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/", label: "Home" }, { label: "Wishlist" }]}
        title="Your Wishlist"
        intro="Pieces you have saved on this device. Share your shortlist with us on WhatsApp for advice on sizes, pairings or gifting."
      />
      <div className="container-x pb-28">
        <WishlistView />
      </div>
    </>
  );
}

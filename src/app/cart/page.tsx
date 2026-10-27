import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { CartView } from "@/components/shop/CartView";

export const metadata: Metadata = {
  title: "Your Cart",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <>
      <PageHeader crumbs={[{ href: "/", label: "Home" }, { label: "Cart" }]} title="Your Cart" />
      <div className="container-x pb-28">
        <CartView />
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { CheckoutForm } from "@/components/shop/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <>
      <PageHeader crumbs={[{ href: "/", label: "Home" }, { href: "/cart", label: "Cart" }, { label: "Checkout" }]} title="Checkout" />
      <div className="container-x pb-28">
        <CheckoutForm />
      </div>
    </>
  );
}

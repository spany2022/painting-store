/**
 * Commerce integration point.
 *
 * No payment gateway or order backend is connected yet, so checkout hands the
 * order to the store over WhatsApp instead of taking payment. To go live,
 * implement `createCheckout` against your provider (e.g. Razorpay, Stripe,
 * Shopify Storefront API, Medusa) and set `isPaymentConfigured` to true.
 * Never mark an order as paid on the client.
 */
import type { CartLine } from "@/lib/types";

export const isPaymentConfigured = false;

export interface CheckoutCustomer {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes?: string;
}

export interface CheckoutSession {
  /** URL of the provider's hosted payment page, or a client secret for an embedded form. */
  redirectUrl: string;
}

export async function createCheckout(lines: CartLine[], customer: CheckoutCustomer): Promise<CheckoutSession> {
  void lines;
  void customer;
  // Example shape once a provider is connected:
  //   const res = await fetch("/api/checkout", { method: "POST", body: JSON.stringify({ lines, customer }) });
  //   if (!res.ok) throw new Error("Checkout failed");
  //   return res.json();
  throw new Error("Payment gateway not configured");
}

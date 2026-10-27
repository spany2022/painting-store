"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Info, Lock } from "lucide-react";
import { useStore } from "@/components/providers/StoreProvider";
import { ArtImage } from "@/components/ui/ArtImage";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { formatINR } from "@/lib/format";
import { orderRequestLink } from "@/lib/whatsapp";
import { createCheckout, isPaymentConfigured, type CheckoutCustomer } from "@/lib/commerce";

const empty: CheckoutCustomer = { name: "", email: "", phone: "", address: "", city: "", state: "", pincode: "", notes: "" };

export function CheckoutForm() {
  const { lines, subtotal, ready } = useStore();
  const router = useRouter();
  const [c, setC] = useState<CheckoutCustomer>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutCustomer, string>>>({});
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (!ready) return <div className="h-64" aria-busy="true" />;
  if (lines.length === 0) {
    return (
      <div className="border-t border-line py-24 text-center">
        <p className="font-serif text-4xl">Nothing to check out yet</p>
        <Link href="/shop" className="btn btn-dark mt-8">
          Explore the collection
        </Link>
      </div>
    );
  }

  const set = (k: keyof CheckoutCustomer) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setC((x) => ({ ...x, [k]: e.target.value }));

  const validate = () => {
    const e: typeof errors = {};
    if (!c.name.trim()) e.name = "Please enter your name";
    if (!/^\S+@\S+\.\S+$/.test(c.email)) e.email = "Please enter a valid email";
    if (!/^[+\d][\d\s-]{8,}$/.test(c.phone)) e.phone = "Please enter a valid phone number";
    if (!c.address.trim()) e.address = "Please enter your address";
    if (!c.city.trim()) e.city = "Please enter your city";
    if (!c.state.trim()) e.state = "Please enter your state";
    if (!/^\d{6}$/.test(c.pincode)) e.pincode = "Enter a 6-digit PIN code";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validate()) {
      requestAnimationFrame(() => document.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
      return;
    }
    if (isPaymentConfigured) {
      setBusy(true);
      try {
        const session = await createCheckout(lines, c);
        window.location.href = session.redirectUrl;
      } catch {
        setError("We couldn't start the payment. Please try again or order on WhatsApp.");
        setBusy(false);
      }
      return;
    }
    // No gateway yet: hand the order to the store on WhatsApp.
    const link = orderRequestLink(lines, subtotal, {
      name: c.name,
      phone: c.phone,
      city: `${c.address}, ${c.city}, ${c.state}`,
      pincode: c.pincode,
      notes: [c.email, c.notes].filter(Boolean).join(" · "),
    });
    window.open(link, "_blank", "noopener,noreferrer");
    router.push("/checkout/request-sent");
  };

  const field = (k: keyof CheckoutCustomer, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}, span = false) => (
    <label className={`block ${span ? "sm:col-span-2" : ""}`}>
      <span className="eyebrow text-[0.6rem] text-ink-soft">{label}</span>
      <input className="field" value={c[k] ?? ""} onChange={set(k)} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `${k}-err` : undefined} {...props} />
      {errors[k] && (
        <span id={`${k}-err`} className="mt-1 block text-xs text-terracotta">
          {errors[k]}
        </span>
      )}
    </label>
  );

  return (
    <form onSubmit={submit} noValidate className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-7">
        {!isPaymentConfigured && (
          <div className="mb-10 flex gap-4 border border-gold/50 bg-warmwhite p-5 text-sm leading-relaxed">
            <Info size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
            <p>
              <strong className="font-medium">Online payment is not connected yet.</strong> When you place your order, we
              will open WhatsApp with your order and delivery details so our team can confirm availability, delivery
              charges and payment options with you directly. No payment is taken on this page.
            </p>
          </div>
        )}

        <fieldset>
          <legend className="font-serif text-3xl">Contact</legend>
          <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {field("name", "Full name", { autoComplete: "name" }, true)}
            {field("email", "Email", { type: "email", autoComplete: "email" })}
            {field("phone", "Phone / WhatsApp", { type: "tel", autoComplete: "tel" })}
          </div>
        </fieldset>
        <fieldset className="mt-12">
          <legend className="font-serif text-3xl">Delivery address</legend>
          <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {field("address", "Address", { autoComplete: "street-address" }, true)}
            {field("city", "City", { autoComplete: "address-level2" })}
            {field("state", "State", { autoComplete: "address-level1" })}
            {field("pincode", "PIN code", { inputMode: "numeric", autoComplete: "postal-code", maxLength: 6 })}
            <label className="block sm:col-span-2">
              <span className="eyebrow text-[0.6rem] text-ink-soft">Order notes (optional)</span>
              <textarea className="field min-h-20 resize-none" value={c.notes} onChange={set("notes")} placeholder="Gift message, delivery instructions…" />
            </label>
          </div>
        </fieldset>
      </div>

      <aside className="lg:col-span-5">
        <div className="sticky top-[calc(var(--header-h)+24px)] bg-warmwhite p-6 shadow-[var(--shadow-card)] md:p-8">
          <p className="font-serif text-2xl">Your order</p>
          <ul className="mt-6 divide-y divide-line">
            {lines.map((l) => (
              <li key={`${l.slug}-${l.variantId ?? ""}`} className="flex gap-4 py-4">
                <span className="relative h-16 w-14 shrink-0 bg-ivory">
                  <ArtImage art={l.product.image} alt="" fill sizes="56px" className="object-contain p-1" />
                  <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-ink text-[0.6rem] text-warmwhite">{l.qty}</span>
                </span>
                <span className="min-w-0 flex-1 text-sm">
                  <span className="block truncate font-medium">{l.product.name}</span>
                  <span className="text-xs text-ink-soft">{l.variant ? l.variant.dimensions : l.product.dimensions}</span>
                </span>
                <span className="text-sm">{formatINR(l.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-soft">Subtotal</dt>
              <dd>{formatINR(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-soft">Delivery</dt>
              <dd className="text-ink-soft">To be confirmed</dd>
            </div>
          </dl>
          {error && <p className="mt-4 text-sm text-terracotta">{error}</p>}
          <button type="submit" disabled={busy} className={`btn mt-6 w-full ${isPaymentConfigured ? "btn-primary" : "btn-whatsapp"}`}>
            {isPaymentConfigured ? (
              <>
                <Lock size={14} /> {busy ? "Starting payment…" : "Continue to payment"}
              </>
            ) : (
              <>
                <WhatsAppIcon className="h-4 w-4" /> Place order via WhatsApp
              </>
            )}
          </button>
          <p className="mt-4 text-xs leading-relaxed text-ink-soft">
            By placing your order you agree to our{" "}
            <Link href="/policies/terms" className="underline">
              terms
            </Link>{" "}
            and{" "}
            <Link href="/policies/returns" className="underline">
              returns policy
            </Link>
            .
          </p>
        </div>
      </aside>
    </form>
  );
}

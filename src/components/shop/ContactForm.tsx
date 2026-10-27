"use client";

import { useState } from "react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { site, whatsappLink } from "@/lib/site";

/** No form backend is connected, so the message is handed to WhatsApp or the visitor's email app. */
export function ContactForm() {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("Artwork enquiry");
  const [message, setMessage] = useState("");
  const body = `Hello ${site.name},\n\nName: ${name}\nTopic: ${topic}\n\n${message}`;

  return (
    <form
      className="bg-warmwhite p-6 shadow-[var(--shadow-card)] md:p-10"
      onSubmit={(e) => {
        e.preventDefault();
        window.open(whatsappLink(body), "_blank", "noopener,noreferrer");
      }}
    >
      <p className="font-serif text-3xl">Send a message</p>
      <div className="mt-8 space-y-6">
        <label className="block">
          <span className="eyebrow text-[0.6rem] text-ink-soft">Your name</span>
          <input className="field" required value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </label>
        <label className="block">
          <span className="eyebrow text-[0.6rem] text-ink-soft">Topic</span>
          <select className="field cursor-pointer" value={topic} onChange={(e) => setTopic(e.target.value)}>
            <option>Artwork enquiry</option>
            <option>Order & delivery</option>
            <option>Gifting</option>
            <option>Interior project</option>
            <option>Something else</option>
          </select>
        </label>
        <label className="block">
          <span className="eyebrow text-[0.6rem] text-ink-soft">Message</span>
          <textarea className="field min-h-32 resize-none" required value={message} onChange={(e) => setMessage(e.target.value)} />
        </label>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="submit" className="btn btn-whatsapp">
          <WhatsAppIcon className="h-4 w-4" /> Send via WhatsApp
        </button>
        <a
          href={`mailto:${site.email}?subject=${encodeURIComponent(topic)}&body=${encodeURIComponent(body)}`}
          className="btn btn-ghost"
        >
          Send by email
        </a>
      </div>
      <p className="mt-4 text-xs text-ink-soft">Your message opens in WhatsApp or your email app — nothing is sent until you press send there.</p>
    </form>
  );
}

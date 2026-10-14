import React from "react";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { LOCATIONS } from "@/content/data/locations";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { BreadcrumbsJsonLd } from "@/components/seo/JsonLd";

export const metadata = constructMetadata({
  title: "Executive Inquiries & Contact (UK & EMEA)",
  description:
    "Direct communication channel for enterprise mandates in the United Kingdom and Europe. Connect with Avorria technical partners.",
  path: "/contact",
  locale: "en-GB",
  hasUsAlternate: true,
});

export default function ContactPage() {
  const ukHub = LOCATIONS.find((l) => l.code === "LON")!;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />

      <header className="space-y-4 border-b border-graphite-hairline pb-8">
        <div className="flex items-center justify-between text-xs text-graphite-muted">
          <span className="uppercase tracking-widest text-rose font-light">
            Direct Transmission &middot; London Hub
          </span>
          <Link href="/us/contact" className="text-graphite hover:text-rose underline">
            View US Contact &amp; NYC Hub (/us/contact) &rarr;
          </Link>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extralight text-graphite tracking-tighter-display">
          Executive Inquiries &amp; Mandate Initiation
        </h1>
        <p className="text-base text-graphite-muted font-light max-w-2xl leading-relaxed">
          Avorria partners with enterprise leadership in London, Edinburgh, and across Europe. All preliminary discussions are held under strict mutual confidentiality.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Office Details */}
        <div className="lg:col-span-5 space-y-8">
          <div className="border border-graphite-hairline p-6 bg-ivory space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-light text-graphite">
                {ukHub.city} [{ukHub.code}]
              </span>
              <span className="text-xs font-mono text-rose">Headquarters</span>
            </div>
            <p className="text-xs text-graphite-muted leading-relaxed">
              {ukHub.status}
            </p>
            <div className="text-xs text-graphite font-mono space-y-1 pt-2 border-t border-graphite-hairline">
              <p>{ukHub.postalAddress.streetAddress}</p>
              <p>{ukHub.postalAddress.addressLocality}, {ukHub.postalAddress.postalCode}</p>
              <p>{ukHub.country}</p>
              <p className="pt-2 text-rose">{ukHub.telephone}</p>
              <p className="text-graphite-muted">{ukHub.email}</p>
            </div>
          </div>

          <div className="border border-graphite-hairline p-6 bg-ivory-subtle space-y-3">
            <h2 className="text-xs uppercase tracking-wider text-graphite font-light">
              Governance &amp; Confidentiality
            </h2>
            <p className="text-xs text-graphite-muted leading-relaxed">
              Inquiries are governed under English law. Standard bilateral NDA execution available within 4 business hours prior to architecture review.
            </p>
          </div>
        </div>

        {/* Right Column: Inquiry Terminal */}
        <div className="lg:col-span-7">
          <InquiryForm />
        </div>
      </div>
    </div>
  );
}

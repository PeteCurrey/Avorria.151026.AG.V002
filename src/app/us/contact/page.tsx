import React from "react";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { LOCATIONS } from "@/content/data/locations";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { BreadcrumbsJsonLd } from "@/components/seo/JsonLd";

export const metadata = constructMetadata({
  title: "Executive Inquiries & Contact (US)",
  description:
    "Direct communication channel for enterprise mandates in the United States and North America. Connect with Avorria technical partners.",
  path: "/us/contact",
  locale: "en-US",
  hasUsAlternate: true,
});

export default function UsContactPage() {
  const usHub = LOCATIONS.find((l) => l.code === "NYC")!;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
      <BreadcrumbsJsonLd
        items={[
          { name: "US Home", path: "/us" },
          { name: "Contact", path: "/us/contact" },
        ]}
      />

      <header className="space-y-4 border-b border-graphite-hairline pb-8">
        <div className="flex items-center justify-between text-xs text-graphite-muted">
          <span className="uppercase tracking-widest text-rose font-light">
            Direct Transmission &middot; New York Hub
          </span>
          <Link href="/contact" className="text-graphite hover:text-rose underline">
            View UK Contact &amp; London Hub (/contact) &rarr;
          </Link>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extralight text-graphite tracking-tighter-display">
          Executive Inquiries &amp; Mandate Initiation
        </h1>
        <p className="text-base text-graphite-muted font-light max-w-2xl leading-relaxed">
          Avorria partners with North American enterprise leadership. All preliminary evaluations are conducted under mutual non-disclosure agreements.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Office Details */}
        <div className="lg:col-span-5 space-y-8">
          <div className="border border-graphite-hairline p-6 bg-ivory space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-light text-graphite">
                {usHub.city} [{usHub.code}]
              </span>
              <span className="text-xs font-mono text-rose">North America Hub</span>
            </div>
            <p className="text-xs text-graphite-muted leading-relaxed">
              {usHub.status}
            </p>
            <div className="text-xs text-graphite font-mono space-y-1 pt-2 border-t border-graphite-hairline">
              <p>{usHub.postalAddress.streetAddress}</p>
              <p>{usHub.postalAddress.addressLocality}, {usHub.postalAddress.postalCode}</p>
              <p>{usHub.country}</p>
              <p className="pt-2 text-rose">{usHub.telephone}</p>
              <p className="text-graphite-muted">{usHub.email}</p>
            </div>
          </div>

          <div className="border border-graphite-hairline p-6 bg-ivory-subtle space-y-3">
            <h2 className="text-xs uppercase tracking-wider text-graphite font-light">
              Governance &amp; Confidentiality
            </h2>
            <p className="text-xs text-graphite-muted leading-relaxed">
              Inquiries are governed under Delaware and New York State law. Standard corporate bilateral NDA execution available within 4 business hours prior to architecture review.
            </p>
          </div>
        </div>

        {/* Right Column: Inquiry Terminal */}
        <div className="lg:col-span-7">
          <InquiryForm market="US" />
        </div>
      </div>
    </div>
  );
}

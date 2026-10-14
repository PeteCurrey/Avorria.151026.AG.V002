import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICES } from "@/content/data/services";
import { constructMetadata } from "@/lib/seo/metadata";
import { ServiceJsonLd, BreadcrumbsJsonLd } from "@/components/seo/JsonLd";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};

  return constructMetadata({
    title: `${service.title} | Avorria Services`,
    description: service.summary,
    path: `/services/${slug}`,
    locale: "en-GB",
    hasUsAlternate: true,
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
      <ServiceJsonLd service={service} />
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${slug}` },
        ]}
      />

      <header className="space-y-6 border-b border-graphite-hairline pb-8">
        <div className="flex items-center justify-between text-xs text-graphite-muted">
          <div className="flex items-center gap-3">
            <span className="font-mono text-rose">{service.code}</span>
            <span className="uppercase tracking-wider">{service.category}</span>
          </div>
          <Link href={`/us/services/${slug}`} className="text-graphite hover:text-rose underline">
            View US specification &rarr;
          </Link>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extralight text-graphite tracking-tighter-display">
          {service.title}
        </h1>

        <p className="text-lg text-graphite leading-relaxed">{service.headline}</p>

        <div className="flex flex-wrap gap-4 text-xs font-mono text-graphite-muted pt-2">
          <span>Focus: {service.architectureFocus}</span>
          <span>&middot;</span>
          <span>Guidance: {service.pricingGuidance.range}</span>
        </div>
      </header>

      {/* Description */}
      <section className="space-y-4">
        <h2 className="text-xl font-light text-graphite">Architectural Scope &amp; Methodology</h2>
        <p className="text-sm text-graphite-muted leading-relaxed">{service.description}</p>
      </section>

      {/* Contracted Deliverables */}
      <section className="space-y-4 border-t border-graphite-hairline pt-8">
        <h2 className="text-xl font-light text-graphite">Contracted Deliverables</h2>
        <ul className="space-y-2 text-sm text-graphite">
          {service.deliverables.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="text-rose">&mdash;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Verified Toolchains */}
      <section className="space-y-4 border-t border-graphite-hairline pt-8">
        <h2 className="text-xl font-light text-graphite">Verified Toolchains &amp; Runtimes</h2>
        <div className="flex flex-wrap gap-2">
          {service.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-ivory-subtle text-xs text-graphite border border-graphite-hairline font-mono"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Engagement Initiation */}
      <section className="border border-graphite-hairline p-8 bg-ivory-subtle space-y-4 text-center">
        <h2 className="text-xl font-light text-graphite">Discuss this mandate specification</h2>
        <p className="text-xs text-graphite-muted max-w-lg mx-auto">
          Avorria partners directly with technical decision-makers in the UK and USA. Mutual non-disclosure agreements provided prior to technical review.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-graphite text-ivory text-xs uppercase tracking-widest font-light hover:bg-rose transition-colors"
          >
            Inquire regarding {service.code} &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}

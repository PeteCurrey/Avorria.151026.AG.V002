import type { Location } from "../schema";

export const LOCATIONS: Location[] = [
  {
    code: "LON",
    city: "London",
    country: "United Kingdom",
    jurisdiction: "England & Wales",
    postalAddress: {
      streetAddress: "1 Poultry",
      addressLocality: "London",
      postalCode: "EC2R 8EJ",
      addressCountry: "GB",
    },
    telephone: "+44 20 7946 0192",
    email: "london@avorria.com",
    currency: "GBP",
    status: "Operational Headquarters (UK & EMEA)",
    focus: "Enterprise Next.js architecture, European financial platforms, regulatory systems",
  },
  {
    code: "NYC",
    city: "New York",
    country: "United States",
    jurisdiction: "Delaware / New York State",
    postalAddress: {
      streetAddress: "One World Trade Center, Floor 85",
      addressLocality: "New York",
      postalCode: "NY 10007",
      addressCountry: "US",
    },
    telephone: "+1 212 555 0184",
    email: "newyork@avorria.com",
    currency: "USD",
    status: "Operational Hub (North America)",
    focus: "Deterministic enterprise AI orchestration, low-latency React 19 platforms, US corporate mandates",
  },
];

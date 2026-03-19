/**
 * City page content for electrical service-specific pages.
 * Structure identique à cityServiceContentRoofing.ts
 *
 * 8 builders dédiés :
 *   getElectricianQuoteCityPageContent
 *   getPanelUpgradeCityPageContent
 *   getElectricalInspectionCityPageContent
 *   getOutletInstallationCityPageContent
 *   getCeilingFanInstallationCityPageContent
 *   getEvChargerInstallationCityPageContent
 *   getGeneratorInstallationCityPageContent
 *   getEmergencyElectricianCityPageContent
 *
 * Dispatcher : getServiceCityPageContent(service, params)
 */

import type { CityMetadata } from "./cityMetadata";

// ── Types ──────────────────────────────────────────────────────────────────

export interface ServiceCityContent {
  meta: { title: string; description: string };
  hero: { h1: string; sub: string; trustBullets: string[]; cta: string };
  intro: { h2: string; paragraphs: string[]; cta: string };
  costEstimator: { h2: string; intro: string; ctaBelow: string };
  mainService: {
    h2: string;
    description: string;
    localParagraphs?: string[];
    cost: string;
    whatAffects: string[];
    cta: string;
  };
  whyCall: { h2: string; paragraphs: string[] };
  localSignals: { h2: string; intro: string; bullets: string[] };
  eeat: { title: string; bullets: string[] };
  faq: { h2: string; items: { q: string; a: string }[] };
  closing: { h2: string; text: string; cta: string; sub: string };
  internalLinks: {
    otherServicesLabel: string;
    nearbyLabel: string;
    backLabel: string;
  };
}

export type ServiceContentParams = {
  cityName: string;
  stateName: string;
  stateAbbr: string;
  nearby1: string;
  nearby2: string;
  nearby3: string;
  phone?: string;
  cityMetadata?: CityMetadata | null;
};

// ── Helpers partagés ───────────────────────────────────────────────────────

const PHONE_DEFAULT = "(855) 444-3726";

function buildTrustBullets(stateAbbr: string, cityName: string, county?: string): string[] {
  const bullets = [
    `Licensed & insured in ${stateAbbr}`,
    "Free estimate, no obligation",
    `Same-day or next-day availability in ${cityName}`,
    "Upfront pricing before any work begins",
  ];
  if (county) bullets.push(`Serving ${cityName} and ${county}`);
  return bullets;
}

function buildLocalSignalsBullets(
  stateName: string,
  stateAbbr: string,
  cityName: string,
  baseBullets: string[],
  cityMetadata?: CityMetadata | null
): string[] {
  const bullets = [...baseBullets];
  const county = cityMetadata?.county;
  const medianYear = cityMetadata?.medianYearBuilt;
  const growthSnippet = cityMetadata?.growthSnippet;
  if (county) {
    bullets.unshift(`Serving ${cityName} and ${county} — licensed under ${stateName} state requirements.`);
  }
  if (medianYear) {
    bullets.push(`Many ${cityName} homes were built in the ${medianYear} era — local electricians know this housing stock and its typical wiring issues.`);
  }
  if (growthSnippet) {
    bullets.push(`${cityName} is ${growthSnippet}, so demand for licensed electrical work is high — scheduling early avoids delays.`);
  }
  return bullets;
}

const EEAT_BULLETS = [
  "This guide is written for homeowners comparing local electrical quotes — we focus on what actually affects your estimate.",
  "We don't charge electricians for placement. The quotes you get are from licensed contractors, not pay-to-play leads.",
  "Cost ranges are based on typical project scope; your final quote depends on your home, local labor rates, and permit requirements.",
];

// ── 1. Electrician Quote ───────────────────────────────────────────────────

export function getElectricianQuoteCityPageContent(
  cityName: string, stateName: string, stateAbbr: string,
  nearby1: string, nearby2: string, nearby3: string,
  phone: string = PHONE_DEFAULT, cityMetadata?: CityMetadata | null
): ServiceCityContent {
  const county = cityMetadata?.county;
  const medianYear = cityMetadata?.medianYearBuilt;
  const homeValue = cityMetadata?.medianHomeValue;
  const growthSnippet = cityMetadata?.growthSnippet;

  const localParagraphs = [
    county ? `In ${county}, electrical permits are handled by local building departments — a licensed ${cityName} electrician factors permit costs into your quote upfront.` : "",
    medianYear ? `With a median build year of ${medianYear}, many ${cityName} homes have wiring and panels that may not meet current code requirements. A free inspection identifies issues before they become emergencies.` : "",
    homeValue ? `For a home valued at $${homeValue.toLocaleString()} in ${cityName}, properly maintained and code-compliant electrical is essential for insurance coverage and resale value.` : "",
    growthSnippet ? `As ${growthSnippet}, ${cityName} sees strong demand for licensed electricians — scheduling early ensures you get a qualified contractor.` : "",
  ].filter(Boolean) as string[];

  if (!localParagraphs.length) localParagraphs.push(`A licensed ${cityName} electrician can give you an accurate estimate tailored to your home's specific wiring and panel situation.`);

  return {
    meta: {
      title: `Electrician in ${cityName}, ${stateAbbr} | Free Estimate | Licensed Local Electricians`,
      description: `Free electrician quote in ${cityName}, ${stateName}. Wiring, panels, outlets & electrical repairs from licensed electricians. Upfront pricing, no obligation.`,
    },
    hero: {
      h1: `Free Electrician Quote in ${cityName}, ${stateName}`,
      sub: `Licensed ${cityName} electricians for wiring, panel upgrades, outlet installation, and electrical repairs. Honest estimates, no commitment.`,
      trustBullets: buildTrustBullets(stateAbbr, cityName, county),
      cta: "Get Your Free Electrician Quote — Call Now",
    },
    intro: {
      h2: `Get a Real Electrician Estimate in ${cityName}, ${stateName}`,
      paragraphs: [
        `Get a free electrician quote in ${cityName}, ${stateName}. This page connects you with licensed local electricians for wiring repairs, panel upgrades, outlet installation, and general electrical work — no obligation.`,
        county ? `In ${county}, licensed electricians handle local permits and inspections. A quick call gets you a real estimate with all permit costs included.` : `A licensed electrician serving ${cityName} can give you an honest estimate over the phone in under 5 minutes.`,
      ],
      cta: `Call for a Free ${cityName} Electrician Quote`,
    },
    costEstimator: {
      h2: `Electrician Cost Estimator — ${cityName}, ${stateName}`,
      intro: `Electrician costs in ${cityName} typically run $75–$150/hour. Common jobs: outlet installation $150–$300, wiring repair $200–$800, panel upgrade $1,500–$4,000, whole-home rewire $8,000–$20,000. Your exact quote depends on your job scope and local permit requirements.`,
      ctaBelow: `Get Your Exact ${cityName} Electrician Quote — Call Now`,
    },
    mainService: {
      h2: `Electrician Services in ${cityName}, ${stateAbbr}`,
      description: `Licensed electricians in ${cityName} handle everything from simple outlet installation to full home rewiring. The most common jobs are outlet and switch installation, wiring repairs, panel upgrades, circuit additions, and safety inspections. Never attempt electrical work yourself — faulty DIY wiring is one of the leading causes of residential fires, and unpermitted work creates liability issues at resale. A licensed ${cityName} electrician quotes your job, pulls all permits, and passes inspection — protecting your home and your insurance coverage.`,
      localParagraphs,
      cost: `Typical ${cityName} electrician cost: $150 – $1,500 (varies widely by scope)`,
      whatAffects: [
        "Job type — repair, installation, panel work, or rewiring",
        "Accessibility — finished vs. unfinished walls and ceilings",
        "Panel capacity — whether new circuits require panel upgrade",
        `${stateAbbr} permit and inspection requirements for your scope`,
      ],
      cta: `Get an Electrician Quote in ${cityName} — Call Now`,
    },
    whyCall: {
      h2: `Why ${cityName} Homeowners Get an Electrician Quote First`,
      paragraphs: [
        `A phone quote from a licensed ${cityName} electrician gives you a realistic budget before any work starts. Electrical costs${county ? ` in ${county}` : ""} vary significantly by job scope and home configuration — a 5-minute call gets you a real number, not a national average.`,
        `Electrical work requires permits in most cases. A licensed ${cityName} electrician handles all permits and inspections as part of the job — DIY or unpermitted electrical work creates insurance and resale liability.`,
        `Electrical safety issues compound. A flickering light or tripping breaker that costs $200 to diagnose and fix today can cause a fire if ignored. A free quote call is the fastest way to determine whether you have a safety issue.`,
      ],
    },
    localSignals: {
      h2: `Electrician Service Areas Near ${cityName}, ${stateName}`,
      intro: `Licensed electricians available for quotes in ${cityName} and nearby communities including ${nearby1}, ${nearby2}, and ${nearby3}.`,
      bullets: buildLocalSignalsBullets(stateName, stateAbbr, cityName, [
        `All electricians are licensed and insured under ${stateName} requirements`,
        `Familiar with ${cityName}-area permit processes and local code requirements`,
        "Upfront pricing — all permit costs included in your quote",
        `Available in ${cityName} and surrounding ${stateAbbr} areas`,
      ], cityMetadata),
    },
    eeat: { title: "Why trust this guide", bullets: EEAT_BULLETS },
    faq: {
      h2: `Electrician FAQ — ${cityName}, ${stateName}`,
      items: [
        { q: `How much does an electrician cost in ${cityName}, ${stateAbbr}?`, a: `Electrician rates in ${cityName} typically run $75–$150/hour. Most jobs are quoted as flat rates: outlet installation $150–$300, circuit addition $300–$800, panel upgrade $1,500–$4,000. A licensed ${cityName} electrician gives you a specific quote for your job.` },
        { q: `Do I need a permit for electrical work in ${cityName}?`, a: `Yes, for most electrical work beyond simple device replacement. A licensed ${cityName} electrician handles all permits and inspections as part of the job at no extra charge beyond permit fees.` },
        { q: `How do I know if my ${cityName} home has unsafe wiring?`, a: `Warning signs include frequently tripping breakers, flickering lights, burning smells from outlets or panel, outlets that are warm to the touch, and aluminum wiring (common in 1960s–1970s homes). A free inspection from a licensed ${cityName} electrician identifies safety issues.` },
        { q: `Is the electrician quote in ${cityName} really free?`, a: `Yes. A phone quote and free assessment cost nothing. A licensed ${cityName} electrician gives you an estimate before any work begins — no dispatch fee, no obligation.` },
        { q: `How long does typical electrical work take in ${cityName}?`, a: `Simple jobs (outlet installation, fan wiring, circuit addition) typically take 1–4 hours. Panel upgrades take 4–8 hours. Whole-home rewiring takes 3–7 days depending on home size.` },
      ],
    },
    closing: {
      h2: `Get Your Free Electrician Quote in ${cityName} Today`,
      text: `No forms. No waiting. No obligation. A licensed electrician serving ${cityName}, ${stateName} can give you an honest estimate in under 5 minutes.`,
      cta: `Call for Your Free ${cityName} Electrician Quote`,
      sub: `Call ${phone} · Available 7 days a week · Same-day quote in ${cityName}`,
    },
    internalLinks: {
      otherServicesLabel: `Other electrical services in ${cityName}:`,
      nearbyLabel: "Nearby cities:",
      backLabel: `← All cities in ${stateName}`,
    },
  };
}

// ── 2. Panel Upgrade ───────────────────────────────────────────────────────

export function getPanelUpgradeCityPageContent(
  cityName: string, stateName: string, stateAbbr: string,
  nearby1: string, nearby2: string, nearby3: string,
  phone: string = PHONE_DEFAULT, cityMetadata?: CityMetadata | null
): ServiceCityContent {
  const county = cityMetadata?.county;
  const medianYear = cityMetadata?.medianYearBuilt;
  const homeValue = cityMetadata?.medianHomeValue;
  const growthSnippet = cityMetadata?.growthSnippet;

  const localParagraphs = [
    county ? `In ${county}, panel upgrade permits require a licensed electrician and final inspection before power is restored — a local contractor familiar with the process ensures no delays.` : "",
    medianYear ? `With a median build year of ${medianYear}, many ${cityName} homes still have 100-amp or 60-amp panels that are inadequate for modern electrical loads including EV chargers, heat pumps, and home offices.` : "",
    homeValue ? `For a home valued at $${homeValue.toLocaleString()} in ${cityName}, a panel upgrade ($1,500–$4,000) is one of the highest-ROI electrical investments — it's required by many insurers and buyers.` : "",
    growthSnippet ? `As ${growthSnippet}, ${cityName} sees growing demand for panel upgrades to support EV chargers, home additions, and high-load appliances.` : "",
  ].filter(Boolean) as string[];

  if (!localParagraphs.length) localParagraphs.push(`A licensed ${cityName} electrician can assess your current panel capacity and give you an honest upgrade recommendation.`);

  return {
    meta: {
      title: `Panel Upgrade in ${cityName}, ${stateAbbr} | Free Estimate | Licensed Electricians`,
      description: `Free electrical panel upgrade quote in ${cityName}, ${stateName}. 100A to 200A upgrades from licensed electricians. Permit included. Upfront pricing, no obligation.`,
    },
    hero: {
      h1: `Free Panel Upgrade Quote in ${cityName}, ${stateName}`,
      sub: `Licensed ${cityName} electricians for 100A to 200A panel upgrades. Permit, inspection, and all work included. Honest estimates, no commitment.`,
      trustBullets: buildTrustBullets(stateAbbr, cityName, county),
      cta: "Get Your Free Panel Upgrade Quote — Call Now",
    },
    intro: {
      h2: `Get a Real Panel Upgrade Estimate in ${cityName}, ${stateName}`,
      paragraphs: [
        `Get a free electrical panel upgrade quote in ${cityName}, ${stateName}. This page connects you with licensed electricians for 100-amp to 200-amp upgrades, subpanel installation, and breaker replacements — permit and inspection included, no obligation.`,
        county ? `In ${county}, panel upgrade permits and inspections are familiar to licensed electricians who work the area regularly.` : `A licensed electrician serving ${cityName} can assess your current panel and give you a complete upgrade quote in under 5 minutes.`,
      ],
      cta: `Call for a Free ${cityName} Panel Upgrade Quote`,
    },
    costEstimator: {
      h2: `Panel Upgrade Cost Estimator — ${cityName}, ${stateName}`,
      intro: `Panel upgrade costs in ${cityName}: 100A to 200A upgrade $1,500–$3,000; 200A to 400A upgrade $2,500–$4,500; subpanel installation $500–$1,500; breaker box replacement (same amperage) $1,000–$2,000. Permit fees are included in all quotes.`,
      ctaBelow: `Get Your Exact ${cityName} Panel Upgrade Quote — Call Now`,
    },
    mainService: {
      h2: `Electrical Panel Upgrade in ${cityName}, ${stateAbbr}`,
      description: `An electrical panel upgrade is necessary when your home can't safely handle its current or planned electrical loads. Signs you need an upgrade: breakers trip frequently, you can't add new circuits, your insurer requires an upgrade, or you're planning to add an EV charger, heat pump, or major addition. Most pre-1980 homes have 100-amp panels that are undersized for modern use. A licensed ${cityName} electrician assesses your current panel, determines the right upgrade path, pulls all permits, and schedules the utility coordination and final inspection.`,
      localParagraphs,
      cost: `Typical ${cityName} panel upgrade cost: $1,500 – $4,000`,
      whatAffects: [
        "Current panel amperage and upgrade target (100A → 200A vs. 200A → 400A)",
        "Panel location and accessibility",
        "Whether utility coordination is required",
        `${stateAbbr} permit, inspection, and utility reconnection requirements`,
      ],
      cta: `Get a Panel Upgrade Quote in ${cityName} — Call Now`,
    },
    whyCall: {
      h2: `Why ${cityName} Homeowners Get a Panel Upgrade Quote`,
      paragraphs: [
        `An undersized panel is not just an inconvenience — it's a safety risk and an insurance liability. Many ${stateName} insurers require 200-amp service as a condition of coverage. A licensed ${cityName} electrician confirms what your panel needs and gives you an accurate budget.`,
        `Panel upgrades require utility coordination. The local utility must disconnect power before the upgrade and reconnect after inspection. A licensed ${cityName} electrician handles all coordination — you don't need to call the utility yourself.`,
        `EV chargers, heat pumps, and home additions almost always require a panel upgrade. Getting a panel quote at the same time as your EV charger or addition quote saves money on permit and inspection fees.`,
      ],
    },
    localSignals: {
      h2: `Panel Upgrade Service Areas Near ${cityName}, ${stateName}`,
      intro: `Licensed electricians available for panel upgrade quotes in ${cityName} and nearby communities including ${nearby1}, ${nearby2}, and ${nearby3}.`,
      bullets: buildLocalSignalsBullets(stateName, stateAbbr, cityName, [
        `All electricians are licensed and insured under ${stateName} requirements`,
        `Familiar with ${cityName}-area utility coordination and permit processes`,
        "All permits and inspections included in your quote",
        `Serving ${cityName} and surrounding ${stateAbbr} areas`,
      ], cityMetadata),
    },
    eeat: { title: "Why trust this guide", bullets: EEAT_BULLETS },
    faq: {
      h2: `Panel Upgrade FAQ — ${cityName}, ${stateName}`,
      items: [
        { q: `How much does a panel upgrade cost in ${cityName}, ${stateAbbr}?`, a: `Panel upgrades in ${cityName} typically cost $1,500–$4,000 for a standard 100A to 200A upgrade, including permit and inspection. A licensed ${cityName} electrician gives you a complete quote including all fees.` },
        { q: `How long does a panel upgrade take in ${cityName}?`, a: `Most panel upgrades take 4–8 hours. The utility must disconnect power before work begins and reconnect after inspection — your electrician coordinates all of this.` },
        { q: `Do I need a panel upgrade to add an EV charger in ${cityName}?`, a: `In many cases, yes. Level 2 EV chargers require a dedicated 240V, 40–50 amp circuit. If your panel doesn't have the capacity, an upgrade is required. A licensed ${cityName} electrician can assess both needs in a single visit.` },
        { q: `Does my insurance require a panel upgrade in ${cityName}?`, a: `Many ${stateName} insurers require 200-amp service as a condition of homeowner coverage, especially for older homes. A licensed ${cityName} electrician can provide documentation for your insurer.` },
        { q: `Is a permit required for a panel upgrade in ${cityName}?`, a: `Yes, always. Panel upgrades require a permit and inspection in ${cityName}. A licensed electrician pulls the permit and schedules the inspection as part of the job.` },
      ],
    },
    closing: {
      h2: `Get Your Free Panel Upgrade Quote in ${cityName} Today`,
      text: `No forms. No waiting. No obligation. A licensed electrician serving ${cityName}, ${stateName} can give you a complete panel upgrade estimate — including permit, inspection, and utility coordination — in under 5 minutes.`,
      cta: `Call for Your Free ${cityName} Panel Upgrade Quote`,
      sub: `Call ${phone} · Available 7 days a week · Same-day quote in ${cityName}`,
    },
    internalLinks: {
      otherServicesLabel: `Other electrical services in ${cityName}:`,
      nearbyLabel: "Nearby cities:",
      backLabel: `← All cities in ${stateName}`,
    },
  };
}

// ── 3. Electrical Inspection ───────────────────────────────────────────────

export function getElectricalInspectionCityPageContent(
  cityName: string, stateName: string, stateAbbr: string,
  nearby1: string, nearby2: string, nearby3: string,
  phone: string = PHONE_DEFAULT, cityMetadata?: CityMetadata | null
): ServiceCityContent {
  const county = cityMetadata?.county;
  const medianYear = cityMetadata?.medianYearBuilt;
  const homeValue = cityMetadata?.medianHomeValue;
  const growthSnippet = cityMetadata?.growthSnippet;

  const localParagraphs = [
    county ? `In ${county}, a licensed electrician's written inspection report meets all real estate disclosure and insurance documentation standards.` : "",
    medianYear ? `With a median build year of ${medianYear}, many ${cityName} homes have wiring systems that may contain knob-and-tube wiring, aluminum wiring, or Federal Pacific or Zinsco panels — all of which are insurance red flags.` : "",
    homeValue ? `For a home valued at $${homeValue.toLocaleString()} in ${cityName}, a $0 electrical inspection that identifies a $500 repair is one of the best decisions a homeowner can make.` : "",
    growthSnippet ? `As ${growthSnippet}, ${cityName}'s active real estate market means electrical inspection reports are increasingly required in home sales.` : "",
  ].filter(Boolean) as string[];

  if (!localParagraphs.length) localParagraphs.push(`A licensed ${cityName} electrician delivers a comprehensive written report documenting the condition of your home's electrical system.`);

  return {
    meta: {
      title: `Free Electrical Inspection in ${cityName}, ${stateAbbr} | Licensed Electricians`,
      description: `Free electrical inspection in ${cityName}, ${stateName}. Written report with photos. Panel, wiring & safety assessment from licensed electricians. No obligation.`,
    },
    hero: {
      h1: `Free Electrical Inspection in ${cityName}, ${stateName}`,
      sub: `Licensed ${cityName} electricians for comprehensive electrical inspections. Written report with photos. Panel, wiring, and safety assessment. No commitment.`,
      trustBullets: buildTrustBullets(stateAbbr, cityName, county),
      cta: "Schedule Your Free Inspection — Call Now",
    },
    intro: {
      h2: `Get a Free Professional Electrical Inspection in ${cityName}, ${stateName}`,
      paragraphs: [
        `Get a free electrical inspection in ${cityName}, ${stateName}. This page connects you with licensed electricians for comprehensive safety inspections — written report with photos, panel assessment, wiring evaluation, and no obligation to hire.`,
        county ? `In ${county}, licensed electrician inspection reports meet all insurance and real estate documentation requirements.` : `A licensed ${cityName} electrician completes your inspection and delivers a written report typically within 24–48 hours of scheduling.`,
      ],
      cta: `Call to Schedule Your Free ${cityName} Electrical Inspection`,
    },
    costEstimator: {
      h2: `Electrical Inspection — ${cityName}, ${stateName}`,
      intro: `A professional electrical inspection in ${cityName} is free from licensed contractors with no obligation. Third-party inspections for real estate transactions may cost $150–$400 for a fully independent report.`,
      ctaBelow: `Schedule Your Free ${cityName} Electrical Inspection — Call Now`,
    },
    mainService: {
      h2: `Electrical Inspection in ${cityName}, ${stateAbbr}`,
      description: `A professional electrical inspection in ${cityName} covers all major components of your home's electrical system: the main panel (breaker condition, amperage, signs of overheating or moisture), wiring (visible type — knob-and-tube, aluminum, or copper), outlets and switches (GFCI protection, polarity, grounding), ceiling fans and fixtures (proper support and wiring), and smoke and CO detector placement. The result is a written report with photos documenting current condition, any safety hazards identified, and recommended repairs with estimated costs.`,
      localParagraphs,
      cost: "FREE — no obligation",
      whatAffects: [
        "Home size and number of electrical panels",
        "Age of wiring and panel systems",
        "Whether attic and crawl space access is needed",
        "Report format required (insurance, real estate, or personal use)",
      ],
      cta: `Schedule an Electrical Inspection in ${cityName} — Call Now`,
    },
    whyCall: {
      h2: `Why ${cityName} Homeowners Schedule Electrical Inspections`,
      paragraphs: [
        `A free electrical inspection from a licensed ${cityName} electrician identifies safety hazards before they cause fires or injuries. Electrical fires cause over 51,000 house fires annually in the US — most are preventable with proper inspection and maintenance.`,
        `For home buyers and sellers in ${cityName}, an electrical inspection is essential. Buyers use it to negotiate repairs; sellers use it to disclose accurately and avoid post-sale liability. Many lenders require a licensed electrician's report for older homes.`,
        `Insurers increasingly require electrical inspections for older homes. Federal Pacific and Zinsco panels, knob-and-tube wiring, and aluminum wiring are all known insurance red flags that a licensed ${cityName} electrician identifies and documents.`,
      ],
    },
    localSignals: {
      h2: `Electrical Inspection Service Areas Near ${cityName}, ${stateName}`,
      intro: `Licensed electricians available for free inspections in ${cityName} and nearby communities including ${nearby1}, ${nearby2}, and ${nearby3}.`,
      bullets: buildLocalSignalsBullets(stateName, stateAbbr, cityName, [
        `All electricians are licensed and insured under ${stateName} requirements`,
        `Written report with photos — meets insurance and real estate standards`,
        "No obligation — inspection is fully free",
        `Available in ${cityName} and surrounding ${stateAbbr} areas within 24–48 hours`,
      ], cityMetadata),
    },
    eeat: { title: "Why trust this guide", bullets: EEAT_BULLETS },
    faq: {
      h2: `Electrical Inspection FAQ — ${cityName}, ${stateName}`,
      items: [
        { q: `Is the electrical inspection really free in ${cityName}?`, a: `Yes, 100% free with no obligation. A licensed ${cityName} electrician inspects your electrical system, documents findings with photos, and provides a written report at no charge.` },
        { q: `What does an electrical inspection include in ${cityName}?`, a: `A standard inspection covers the main panel, visible wiring, all outlets and switches, GFCI protection, ceiling fixtures, and smoke/CO detector placement. You receive a written report with photos of any issues found.` },
        { q: `How often should I get an electrical inspection in ${cityName}?`, a: `Every 3–5 years for modern homes, annually for homes over 40 years old, and immediately when buying or selling a home or after any significant storm or electrical event.` },
        { q: `Do I need an electrical inspection to sell my home in ${cityName}?`, a: `Not legally required in most cases, but highly recommended. An electrical inspection report lets you disclose accurately, avoid post-sale liability, and negotiate from full disclosure.` },
        { q: `Can an electrical inspection help with my insurance in ${cityName}?`, a: `Yes. A licensed electrician's report documenting panel type and wiring condition is often required for insurer coverage of older homes, and can help dispute non-renewal based on electrical concerns.` },
      ],
    },
    closing: {
      h2: `Schedule Your Free Electrical Inspection in ${cityName} Today`,
      text: `No forms. No waiting. No obligation. A licensed electrician serving ${cityName}, ${stateName} will inspect your electrical system and deliver a written report — completely free.`,
      cta: `Call to Schedule Your Free ${cityName} Electrical Inspection`,
      sub: `Call ${phone} · Available 7 days a week · Report delivered within 24 hours`,
    },
    internalLinks: {
      otherServicesLabel: `Other electrical services in ${cityName}:`,
      nearbyLabel: "Nearby cities:",
      backLabel: `← All cities in ${stateName}`,
    },
  };
}

// ── 4. Outlet Installation ─────────────────────────────────────────────────

export function getOutletInstallationCityPageContent(
  cityName: string, stateName: string, stateAbbr: string,
  nearby1: string, nearby2: string, nearby3: string,
  phone: string = PHONE_DEFAULT, cityMetadata?: CityMetadata | null
): ServiceCityContent {
  const county = cityMetadata?.county;
  const medianYear = cityMetadata?.medianYearBuilt;
  const homeValue = cityMetadata?.medianHomeValue;

  const localParagraphs = [
    county ? `In ${county}, outlet installation permits are required when adding new circuits — a licensed ${cityName} electrician handles all permit and inspection requirements upfront.` : "",
    medianYear ? `Many ${cityName} homes built around ${medianYear} lack GFCI outlets in kitchens, bathrooms, and exterior locations — now required by code and by most insurers.` : "",
    homeValue ? `For a home valued at $${homeValue.toLocaleString()} in ${cityName}, code-compliant outlets are a basic requirement for insurance coverage and buyer inspections.` : "",
  ].filter(Boolean) as string[];

  if (!localParagraphs.length) localParagraphs.push(`A licensed ${cityName} electrician quotes outlet installation with all permit costs included.`);

  return {
    meta: {
      title: `Outlet Installation in ${cityName}, ${stateAbbr} | GFCI & New Outlets | Licensed Electricians`,
      description: `Free outlet installation quote in ${cityName}, ${stateName}. GFCI, USB, 240V & new circuit outlets from licensed electricians. Permit included, no obligation.`,
    },
    hero: {
      h1: `Free Outlet Installation Quote in ${cityName}, ${stateName}`,
      sub: `Licensed ${cityName} electricians for GFCI outlets, USB outlets, new circuit installation, and 240V dedicated outlets. Honest estimates, no commitment.`,
      trustBullets: buildTrustBullets(stateAbbr, cityName, county),
      cta: "Get Your Free Outlet Quote — Call Now",
    },
    intro: {
      h2: `Get a Real Outlet Installation Estimate in ${cityName}, ${stateName}`,
      paragraphs: [
        `Get a free outlet installation quote in ${cityName}, ${stateName}. This page connects you with licensed electricians for GFCI upgrades, new outlet installation, USB outlets, and dedicated 240V circuits — permit and inspection included, no obligation.`,
        `A licensed ${cityName} electrician quotes your specific outlet job and handles all permits.`,
      ],
      cta: `Call for a Free ${cityName} Outlet Quote`,
    },
    costEstimator: {
      h2: `Outlet Installation Cost — ${cityName}, ${stateName}`,
      intro: `Outlet installation in ${cityName}: GFCI outlet replacement $75–$150 each; new outlet on existing circuit $150–$300; new outlet requiring new circuit $300–$600; 240V dedicated circuit (appliance/EV) $400–$900.`,
      ctaBelow: `Get Your Exact ${cityName} Outlet Quote — Call Now`,
    },
    mainService: {
      h2: `Outlet Installation in ${cityName}, ${stateAbbr}`,
      description: `Outlet installation in ${cityName} covers everything from replacing a standard outlet with a GFCI-protected version (required in kitchens, bathrooms, garages, and exteriors by code) to adding entirely new circuits for home offices, workshops, or high-draw appliances. USB outlets, tamper-resistant outlets for child safety, and smart outlets are all available. A licensed ${cityName} electrician determines whether your existing circuit has capacity for new outlets, or whether a new circuit is required — and quotes both options.`,
      localParagraphs,
      cost: `Typical ${cityName} outlet installation: $75 – $600 per outlet (varies by type)`,
      whatAffects: [
        "Outlet type — standard, GFCI, USB, 240V, or smart",
        "Whether a new circuit is needed",
        "Wall access — finished vs. unfinished",
        `${stateAbbr} permit requirements for new circuits`,
      ],
      cta: `Get an Outlet Installation Quote in ${cityName} — Call Now`,
    },
    whyCall: {
      h2: `Why ${cityName} Homeowners Hire a Licensed Electrician for Outlets`,
      paragraphs: [
        `Outlet installation seems simple, but connecting to the wrong circuit, failing to install GFCI protection where required, or overloading an existing circuit creates real safety hazards and insurance liability.`,
        `GFCI outlets are required by code in kitchens, bathrooms, garages, and all exterior locations in ${stateName}. Homes without GFCI protection in these areas may fail real estate inspections and insurance reviews.`,
        `New circuits require permits and inspection. A licensed ${cityName} electrician handles all permit requirements for new circuit installation — DIY circuit work without permits creates liability at resale.`,
      ],
    },
    localSignals: {
      h2: `Outlet Installation Service Areas Near ${cityName}, ${stateName}`,
      intro: `Licensed electricians available for outlet quotes in ${cityName} and nearby communities including ${nearby1}, ${nearby2}, and ${nearby3}.`,
      bullets: buildLocalSignalsBullets(stateName, stateAbbr, cityName, [
        `All electricians are licensed and insured under ${stateName} requirements`,
        `GFCI and code-compliant installation guaranteed`,
        "Permit included for all new circuit work",
        `Serving ${cityName} and surrounding ${stateAbbr} areas`,
      ], cityMetadata),
    },
    eeat: { title: "Why trust this guide", bullets: EEAT_BULLETS },
    faq: {
      h2: `Outlet Installation FAQ — ${cityName}, ${stateName}`,
      items: [
        { q: `How much does outlet installation cost in ${cityName}, ${stateAbbr}?`, a: `Outlet installation in ${cityName} costs $75–$150 for a GFCI replacement, $150–$300 for a new outlet on an existing circuit, and $300–$600 for an outlet requiring a new circuit. A licensed ${cityName} electrician gives you a specific quote.` },
        { q: `Do I need GFCI outlets in my ${cityName} home?`, a: `Yes. ${stateName} code requires GFCI outlets in all kitchens, bathrooms, garages, and exterior locations. Many older ${cityName} homes don't have GFCI protection in these areas — a code violation that creates insurance liability.` },
        { q: `Can I add outlets without a permit in ${cityName}?`, a: `Adding outlets on existing circuits generally doesn't require a permit in most ${stateName} jurisdictions. Adding new circuits always requires a permit and inspection. A licensed ${cityName} electrician advises on your specific situation.` },
        { q: `What is a GFCI outlet and do I need one?`, a: `GFCI (Ground Fault Circuit Interrupter) outlets detect electrical faults and cut power within milliseconds to prevent shock. Required by code in wet areas — kitchens, baths, garages, and exteriors. Any home without GFCI in these areas should have them installed.` },
      ],
    },
    closing: {
      h2: `Get Your Free Outlet Installation Quote in ${cityName} Today`,
      text: `No forms. No waiting. No obligation. A licensed electrician serving ${cityName}, ${stateName} gives you a complete outlet installation quote — GFCI, new circuits, and all permit costs included.`,
      cta: `Call for Your Free ${cityName} Outlet Quote`,
      sub: `Call ${phone} · Available 7 days a week · Same-day quote in ${cityName}`,
    },
    internalLinks: {
      otherServicesLabel: `Other electrical services in ${cityName}:`,
      nearbyLabel: "Nearby cities:",
      backLabel: `← All cities in ${stateName}`,
    },
  };
}

// ── 5. Ceiling Fan Installation ────────────────────────────────────────────

export function getCeilingFanInstallationCityPageContent(
  cityName: string, stateName: string, stateAbbr: string,
  nearby1: string, nearby2: string, nearby3: string,
  phone: string = PHONE_DEFAULT, cityMetadata?: CityMetadata | null
): ServiceCityContent {
  const county = cityMetadata?.county;
  const medianYear = cityMetadata?.medianYearBuilt;

  const localParagraphs = [
    county ? `In ${county}, ceiling fan installations that require new wiring need a permit — a licensed ${cityName} electrician handles this as part of the job.` : "",
    medianYear ? `Many ${cityName} homes built around ${medianYear} have ceiling boxes that are not rated for fan support — a licensed electrician installs a proper fan-rated box as part of installation.` : "",
  ].filter(Boolean) as string[];

  if (!localParagraphs.length) localParagraphs.push(`A licensed ${cityName} electrician ensures your ceiling fan is properly wired and supported for safe long-term operation.`);

  return {
    meta: {
      title: `Ceiling Fan Installation in ${cityName}, ${stateAbbr} | Free Estimate | Licensed Electricians`,
      description: `Free ceiling fan installation quote in ${cityName}, ${stateName}. New wiring, fan-rated boxes & remote/smart fan installation from licensed electricians. No obligation.`,
    },
    hero: {
      h1: `Free Ceiling Fan Installation Quote in ${cityName}, ${stateName}`,
      sub: `Licensed ${cityName} electricians for ceiling fan installation, new wiring, and fan-rated box installation. Honest estimates, no commitment.`,
      trustBullets: buildTrustBullets(stateAbbr, cityName, county),
      cta: "Get Your Free Fan Installation Quote — Call Now",
    },
    intro: {
      h2: `Get a Real Ceiling Fan Installation Estimate in ${cityName}, ${stateName}`,
      paragraphs: [
        `Get a free ceiling fan installation quote in ${cityName}, ${stateName}. This page connects you with licensed electricians for ceiling fan installation with or without existing wiring — no obligation.`,
        `A licensed ${cityName} electrician quotes your specific installation and advises on fan-rated box requirements.`,
      ],
      cta: `Call for a Free ${cityName} Fan Installation Quote`,
    },
    costEstimator: {
      h2: `Ceiling Fan Installation Cost — ${cityName}, ${stateName}`,
      intro: `Ceiling fan installation in ${cityName}: existing wiring (like-for-like replacement) $75–$150; fan-rated box upgrade needed $150–$250; new wiring from panel required $250–$500; remote/smart wiring $150–$300.`,
      ctaBelow: `Get Your Exact ${cityName} Fan Installation Quote — Call Now`,
    },
    mainService: {
      h2: `Ceiling Fan Installation in ${cityName}, ${stateAbbr}`,
      description: `Ceiling fan installation in ${cityName} ranges from a straightforward replacement (existing wiring, fan-rated box already installed) to full new wiring from the panel when no ceiling fixture exists. The most common issue: existing ceiling boxes are rated for light fixtures, not fans — fans exert lateral force during operation that can cause an improperly supported fan to fall. A licensed ${cityName} electrician always verifies or installs a proper fan-rated box, wires the speed and light controls correctly, and safely mounts the fan for long-term reliable operation.`,
      localParagraphs,
      cost: `Typical ${cityName} ceiling fan installation: $75 – $500 (varies by wiring situation)`,
      whatAffects: [
        "Whether existing wiring is present at the installation location",
        "Whether a fan-rated box is already installed",
        "Ceiling height — standard vs. high ceiling",
        "Smart or remote wiring requirements",
      ],
      cta: `Get a Fan Installation Quote in ${cityName} — Call Now`,
    },
    whyCall: {
      h2: `Why ${cityName} Homeowners Hire a Licensed Electrician for Fan Installation`,
      paragraphs: [
        `Ceiling fans installed on non-rated boxes can fall — a 30–50 lb fan dropping from the ceiling is a serious safety hazard. A licensed ${cityName} electrician always checks and installs fan-rated support boxes.`,
        `Wiring a ceiling fan incorrectly causes reversed light/fan behavior, short circuits, and fire hazards. A licensed electrician ensures correct wiring for both the motor and the light kit, with proper switch configuration.`,
        `New wiring requires permits. If your installation location has no existing wiring, a licensed ${cityName} electrician pulls the permit, runs the wiring, and schedules inspection — all included in your quote.`,
      ],
    },
    localSignals: {
      h2: `Ceiling Fan Installation Service Areas Near ${cityName}, ${stateName}`,
      intro: `Licensed electricians available for fan installation quotes in ${cityName} and nearby communities including ${nearby1}, ${nearby2}, and ${nearby3}.`,
      bullets: buildLocalSignalsBullets(stateName, stateAbbr, cityName, [
        `All electricians are licensed and insured under ${stateName} requirements`,
        "Fan-rated box installation included when needed",
        "Smart and remote wiring available",
        `Serving ${cityName} and surrounding ${stateAbbr} areas`,
      ], cityMetadata),
    },
    eeat: { title: "Why trust this guide", bullets: EEAT_BULLETS },
    faq: {
      h2: `Ceiling Fan Installation FAQ — ${cityName}, ${stateName}`,
      items: [
        { q: `How much does ceiling fan installation cost in ${cityName}?`, a: `Ceiling fan installation in ${cityName} costs $75–$150 for a simple like-for-like replacement, $150–$250 if a new fan-rated box is needed, and $250–$500 if new wiring is required. A licensed ${cityName} electrician gives you a specific quote.` },
        { q: `Can I install a ceiling fan myself in ${cityName}?`, a: `If existing wiring is in place and the box is fan-rated, it's technically possible. However, improperly supported fans fall — and incorrect wiring causes fires. A licensed ${cityName} electrician does it safely for $75–$150.` },
        { q: `What is a fan-rated box and do I need one?`, a: `A fan-rated electrical box is specifically engineered to support the weight and lateral movement of a ceiling fan. Standard light fixture boxes are not rated for fans. A licensed ${cityName} electrician checks and upgrades your box as needed.` },
        { q: `Can a ceiling fan be installed where there is no wiring in ${cityName}?`, a: `Yes. A licensed ${cityName} electrician runs new wiring from your electrical panel to the ceiling location, installs a fan-rated box, and wires the fan and switch. New wiring requires a permit.` },
      ],
    },
    closing: {
      h2: `Get Your Free Ceiling Fan Installation Quote in ${cityName} Today`,
      text: `No forms. No waiting. No obligation. A licensed electrician serving ${cityName}, ${stateName} gives you a complete fan installation quote in under 5 minutes.`,
      cta: `Call for Your Free ${cityName} Fan Installation Quote`,
      sub: `Call ${phone} · Available 7 days a week · Same-day quote in ${cityName}`,
    },
    internalLinks: {
      otherServicesLabel: `Other electrical services in ${cityName}:`,
      nearbyLabel: "Nearby cities:",
      backLabel: `← All cities in ${stateName}`,
    },
  };
}

// ── 6. EV Charger Installation ─────────────────────────────────────────────

export function getEvChargerInstallationCityPageContent(
  cityName: string, stateName: string, stateAbbr: string,
  nearby1: string, nearby2: string, nearby3: string,
  phone: string = PHONE_DEFAULT, cityMetadata?: CityMetadata | null
): ServiceCityContent {
  const county = cityMetadata?.county;
  const medianYear = cityMetadata?.medianYearBuilt;
  const homeValue = cityMetadata?.medianHomeValue;

  const localParagraphs = [
    county ? `In ${county}, EV charger permits are required for all Level 2 installations — a licensed ${cityName} electrician handles the permit, inspection, and utility notification as part of the job.` : "",
    medianYear ? `Many ${cityName} homes built around ${medianYear} have 100-amp panels that may need upgrading to support a Level 2 EV charger — a licensed electrician assesses panel capacity as part of the free quote.` : "",
    homeValue ? `For a home valued at $${homeValue.toLocaleString()} in ${cityName}, an EV charger installation ($500–$1,500) increases property value and is increasingly expected by buyers.` : "",
  ].filter(Boolean) as string[];

  if (!localParagraphs.length) localParagraphs.push(`A licensed ${cityName} electrician assesses your panel capacity, recommends the right charger, and installs a code-compliant Level 2 charging circuit.`);

  return {
    meta: {
      title: `EV Charger Installation in ${cityName}, ${stateAbbr} | Level 2 | Licensed Electricians`,
      description: `Free EV charger installation quote in ${cityName}, ${stateName}. Level 2 home charging station installation from licensed electricians. Permit included, no obligation.`,
    },
    hero: {
      h1: `Free EV Charger Installation Quote in ${cityName}, ${stateName}`,
      sub: `Licensed ${cityName} electricians for Level 2 EV charger installation. Dedicated 240V circuit, permit, and inspection included. Honest estimates, no commitment.`,
      trustBullets: buildTrustBullets(stateAbbr, cityName, county),
      cta: "Get Your Free EV Charger Quote — Call Now",
    },
    intro: {
      h2: `Get a Real EV Charger Installation Estimate in ${cityName}, ${stateName}`,
      paragraphs: [
        `Get a free EV charger installation quote in ${cityName}, ${stateName}. This page connects you with licensed electricians for Level 2 home EV charging station installation — 240V dedicated circuit, permit, and inspection included, no obligation.`,
        `A licensed ${cityName} electrician assesses your panel capacity and gives you a complete quote including any panel upgrade needed.`,
      ],
      cta: `Call for a Free ${cityName} EV Charger Quote`,
    },
    costEstimator: {
      h2: `EV Charger Installation Cost — ${cityName}, ${stateName}`,
      intro: `EV charger installation in ${cityName}: basic Level 2 circuit installation $500–$900; with new sub-panel or panel upgrade $1,500–$3,500; outdoor weatherproof installation $600–$1,200. Federal tax credit covers 30% up to $1,000 for home EV charger installation.`,
      ctaBelow: `Get Your Exact ${cityName} EV Charger Quote — Call Now`,
    },
    mainService: {
      h2: `EV Charger Installation in ${cityName}, ${stateAbbr}`,
      description: `Level 2 EV charger installation in ${cityName} requires a dedicated 240V, 40–50 amp circuit — the same type used for electric dryers and ranges. A Level 2 charger adds 20–30 miles of range per hour vs. 3–5 miles with a standard 120V outlet. Most EV manufacturers recommend Level 2 home charging. A licensed ${cityName} electrician assesses your panel capacity (many older homes need an upgrade), runs the dedicated circuit, installs the charger at your preferred garage or driveway location, pulls all permits, and passes the required inspection.`,
      localParagraphs,
      cost: `Typical ${cityName} EV charger installation: $500 – $1,500 (before tax credit)`,
      whatAffects: [
        "Distance from panel to charging location",
        "Whether panel upgrade is required",
        "Indoor garage vs. outdoor weatherproof installation",
        `${stateAbbr} permit and inspection requirements`,
      ],
      cta: `Get an EV Charger Quote in ${cityName} — Call Now`,
    },
    whyCall: {
      h2: `Why ${cityName} EV Owners Choose Level 2 Home Charging`,
      paragraphs: [
        `Level 2 charging charges your vehicle 5–8x faster than a standard 120V outlet. Most EV owners who switch to Level 2 charging wake up to a fully charged vehicle every morning — eliminating range anxiety and public charging dependency.`,
        `The federal EV charger tax credit covers 30% of installation cost up to $1,000, making the effective cost of a $700 installation $490 after credit. A licensed ${cityName} electrician provides the documentation needed for your tax credit claim.`,
        `EV charger installation requires permits in most ${stateName} jurisdictions. Unpermitted EV charger circuits create insurance liability and fail buyer inspections. A licensed ${cityName} electrician handles all permits as part of the job.`,
      ],
    },
    localSignals: {
      h2: `EV Charger Installation Service Areas Near ${cityName}, ${stateName}`,
      intro: `Licensed electricians available for EV charger installation quotes in ${cityName} and nearby communities including ${nearby1}, ${nearby2}, and ${nearby3}.`,
      bullets: buildLocalSignalsBullets(stateName, stateAbbr, cityName, [
        `All electricians are licensed and insured under ${stateName} requirements`,
        "Panel assessment included in your free quote",
        "Permit and inspection handled as part of installation",
        `Serving ${cityName} and surrounding ${stateAbbr} areas`,
      ], cityMetadata),
    },
    eeat: { title: "Why trust this guide", bullets: EEAT_BULLETS },
    faq: {
      h2: `EV Charger Installation FAQ — ${cityName}, ${stateName}`,
      items: [
        { q: `How much does EV charger installation cost in ${cityName}?`, a: `EV charger installation in ${cityName} typically costs $500–$1,500 for a Level 2 circuit. The federal tax credit covers 30% up to $1,000. Panel upgrade costs $1,500–$3,500 if needed.` },
        { q: `Do I need a panel upgrade for an EV charger in ${cityName}?`, a: `Many homes — especially those with 100-amp panels built before 1990 — need a panel upgrade to safely add an EV charger circuit. A licensed ${cityName} electrician assesses your panel capacity as part of the free quote.` },
        { q: `Is a permit required for EV charger installation in ${cityName}?`, a: `Yes. Level 2 EV charger installation requires a permit and inspection in most ${stateName} jurisdictions. A licensed ${cityName} electrician handles the permit and inspection as part of the job.` },
        { q: `What is the federal EV charger tax credit?`, a: `The Alternative Fuel Vehicle Refueling Property Credit covers 30% of installation cost up to $1,000 for home EV charger installation. A licensed electrician provides documentation for your claim.` },
        { q: `How long does EV charger installation take in ${cityName}?`, a: `Most Level 2 EV charger installations take 2–4 hours. If a panel upgrade is required, allow 6–8 hours total. Your electrician schedules permit and inspection as part of the process.` },
      ],
    },
    closing: {
      h2: `Get Your Free EV Charger Installation Quote in ${cityName} Today`,
      text: `No forms. No waiting. No obligation. A licensed electrician serving ${cityName}, ${stateName} gives you a complete Level 2 EV charger installation quote — panel assessment, permit, and installation included.`,
      cta: `Call for Your Free ${cityName} EV Charger Quote`,
      sub: `Call ${phone} · Available 7 days a week · Same-day quote in ${cityName}`,
    },
    internalLinks: {
      otherServicesLabel: `Other electrical services in ${cityName}:`,
      nearbyLabel: "Nearby cities:",
      backLabel: `← All cities in ${stateName}`,
    },
  };
}

// ── 7. Generator Installation ──────────────────────────────────────────────

export function getGeneratorInstallationCityPageContent(
  cityName: string, stateName: string, stateAbbr: string,
  nearby1: string, nearby2: string, nearby3: string,
  phone: string = PHONE_DEFAULT, cityMetadata?: CityMetadata | null
): ServiceCityContent {
  const county = cityMetadata?.county;
  const medianYear = cityMetadata?.medianYearBuilt;
  const homeValue = cityMetadata?.medianHomeValue;

  const localParagraphs = [
    county ? `In ${county}, generator installation permits require both electrical and gas permits when applicable — a licensed ${cityName} electrician coordinates both as part of the installation.` : "",
    medianYear ? `Many ${cityName} homeowners with older homes are upgrading to standby generators to protect against power outages that can damage HVAC systems, sump pumps, and refrigerated medications.` : "",
    homeValue ? `For a home valued at $${homeValue.toLocaleString()} in ${cityName}, a whole-home standby generator is a premium upgrade that increases property value and provides critical power continuity.` : "",
  ].filter(Boolean) as string[];

  if (!localParagraphs.length) localParagraphs.push(`A licensed ${cityName} electrician installs your generator transfer switch, coordinates permits, and ensures safe, code-compliant operation.`);

  return {
    meta: {
      title: `Generator Installation in ${cityName}, ${stateAbbr} | Standby & Portable | Licensed Electricians`,
      description: `Free generator installation quote in ${cityName}, ${stateName}. Standby & portable generator wiring, transfer switches from licensed electricians. Permit included, no obligation.`,
    },
    hero: {
      h1: `Free Generator Installation Quote in ${cityName}, ${stateName}`,
      sub: `Licensed ${cityName} electricians for standby and portable generator installation. Transfer switch wiring, permit, and inspection included. Honest estimates, no commitment.`,
      trustBullets: buildTrustBullets(stateAbbr, cityName, county),
      cta: "Get Your Free Generator Quote — Call Now",
    },
    intro: {
      h2: `Get a Real Generator Installation Estimate in ${cityName}, ${stateName}`,
      paragraphs: [
        `Get a free generator installation quote in ${cityName}, ${stateName}. This page connects you with licensed electricians for standby generator installation, portable generator transfer switches, and all generator electrical wiring — permit included, no obligation.`,
        `A licensed ${cityName} electrician assesses your power needs, recommends the right generator size, and handles all electrical and permit requirements.`,
      ],
      cta: `Call for a Free ${cityName} Generator Quote`,
    },
    costEstimator: {
      h2: `Generator Installation Cost — ${cityName}, ${stateName}`,
      intro: `Generator installation in ${cityName}: manual transfer switch (portable generator) $400–$900; whole-home standby generator (electrical only, gas separate) $3,000–$8,000; whole-home standby with gas connection $5,000–$12,000. Annual maintenance: $150–$300.`,
      ctaBelow: `Get Your Exact ${cityName} Generator Quote — Call Now`,
    },
    mainService: {
      h2: `Generator Installation in ${cityName}, ${stateAbbr}`,
      description: `Generator installation in ${cityName} involves two main components: the generator itself and the transfer switch. The transfer switch is the critical electrical component — it isolates your home from the utility grid during an outage, allowing the generator to power your home safely. Without a transfer switch, running a generator creates back-feed that can electrocute utility workers. A licensed ${cityName} electrician installs the transfer switch, runs generator wiring to your panel, coordinates permits and inspections, and for standby generators, coordinates with your gas provider for fuel line installation.`,
      localParagraphs,
      cost: `Typical ${cityName} generator installation: $500 – $12,000 (varies by generator type)`,
      whatAffects: [
        "Generator type — portable with transfer switch vs. whole-home standby",
        "Generator size — partial home load vs. whole-home coverage",
        "Whether gas line installation is needed",
        `${stateAbbr} permit requirements for generator and transfer switch`,
      ],
      cta: `Get a Generator Installation Quote in ${cityName} — Call Now`,
    },
    whyCall: {
      h2: `Why ${cityName} Homeowners Invest in Generator Backup Power`,
      paragraphs: [
        `Power outages in ${stateName} are increasingly frequent and prolonged. A whole-home standby generator automatically starts within seconds of a power outage — protecting your HVAC system, sump pump, refrigerated medications, and security systems without any action required.`,
        `Never run a generator without a transfer switch. Portable generators run without a transfer switch can back-feed into the utility grid — a potentially fatal hazard for utility workers and your neighbors. A licensed ${cityName} electrician installs a proper transfer switch as part of every generator installation.`,
        `Generator installation requires permits in most ${stateName} jurisdictions. Unpermitted generator wiring is an insurance and safety liability. A licensed ${cityName} electrician handles all permits and inspections as part of the job.`,
      ],
    },
    localSignals: {
      h2: `Generator Installation Service Areas Near ${cityName}, ${stateName}`,
      intro: `Licensed electricians available for generator installation quotes in ${cityName} and nearby communities including ${nearby1}, ${nearby2}, and ${nearby3}.`,
      bullets: buildLocalSignalsBullets(stateName, stateAbbr, cityName, [
        `All electricians are licensed and insured under ${stateName} requirements`,
        "Transfer switch installation included",
        "Permit and inspection handled as part of installation",
        `Serving ${cityName} and surrounding ${stateAbbr} areas`,
      ], cityMetadata),
    },
    eeat: { title: "Why trust this guide", bullets: EEAT_BULLETS },
    faq: {
      h2: `Generator Installation FAQ — ${cityName}, ${stateName}`,
      items: [
        { q: `How much does generator installation cost in ${cityName}?`, a: `Generator installation in ${cityName} costs $400–$900 for a manual transfer switch for a portable generator, and $3,000–$12,000 for a whole-home standby generator with automatic transfer switch. A licensed ${cityName} electrician gives you a specific quote.` },
        { q: `Do I need a permit to install a generator in ${cityName}?`, a: `Yes. Generator transfer switch installation requires an electrical permit in most ${stateName} jurisdictions. Standby generators may also require gas permits. A licensed ${cityName} electrician handles all permits as part of the job.` },
        { q: `What size generator do I need for my ${cityName} home?`, a: `A 7,500–10,000 watt generator covers essential loads (fridge, lights, one AC unit, sump pump). A 20,000–22,000 watt standby covers a whole home. A licensed ${cityName} electrician calculates your specific load requirements.` },
        { q: `Can I run a generator without a transfer switch in ${cityName}?`, a: `No — never. Running a generator without a transfer switch creates back-feed that can electrocute utility workers. It is illegal and an insurance violation. A licensed ${cityName} electrician installs a proper transfer switch as part of every installation.` },
        { q: `How long does generator installation take in ${cityName}?`, a: `Transfer switch installation for a portable generator takes 2–4 hours. Whole-home standby installation takes 1–2 days including permit coordination and final inspection.` },
      ],
    },
    closing: {
      h2: `Get Your Free Generator Installation Quote in ${cityName} Today`,
      text: `No forms. No waiting. No obligation. A licensed electrician serving ${cityName}, ${stateName} gives you a complete generator installation quote — transfer switch, permit, and inspection included.`,
      cta: `Call for Your Free ${cityName} Generator Quote`,
      sub: `Call ${phone} · Available 7 days a week · Same-day quote in ${cityName}`,
    },
    internalLinks: {
      otherServicesLabel: `Other electrical services in ${cityName}:`,
      nearbyLabel: "Nearby cities:",
      backLabel: `← All cities in ${stateName}`,
    },
  };
}

// ── 8. Emergency Electrician ───────────────────────────────────────────────

export function getEmergencyElectricianCityPageContent(
  cityName: string, stateName: string, stateAbbr: string,
  nearby1: string, nearby2: string, nearby3: string,
  phone: string = PHONE_DEFAULT, cityMetadata?: CityMetadata | null
): ServiceCityContent {
  const county = cityMetadata?.county;
  const medianYear = cityMetadata?.medianYearBuilt;
  const homeValue = cityMetadata?.medianHomeValue;

  const localParagraphs = [
    county ? `In ${county}, licensed electricians are available for same-day emergency response — familiar with local utility contacts for outage coordination.` : "",
    medianYear ? `Many ${cityName} homes built around ${medianYear} have aging wiring and panels that are more vulnerable to sudden failures — emergency response prevents small issues from becoming fires.` : "",
    homeValue ? `For a home valued at $${homeValue.toLocaleString()} in ${cityName}, fast emergency electrical response prevents property damage that can cost far more than the repair itself.` : "",
  ].filter(Boolean) as string[];

  if (!localParagraphs.length) localParagraphs.push(`A licensed ${cityName} emergency electrician can diagnose and repair urgent electrical issues the same day you call.`);

  return {
    meta: {
      title: `Emergency Electrician in ${cityName}, ${stateAbbr} | Same-Day Response | Licensed`,
      description: `Emergency electrician in ${cityName}, ${stateName}. Same-day response for power outages, sparking outlets & electrical emergencies. Licensed, available 7 days a week.`,
    },
    hero: {
      h1: `Emergency Electrician in ${cityName}, ${stateName} — Call Now`,
      sub: `Licensed ${cityName} electricians for same-day electrical emergencies. Sparking outlets, burning smells, power outages, and tripped breakers. 7 days a week.`,
      trustBullets: buildTrustBullets(stateAbbr, cityName, county),
      cta: "Call for Emergency Electrician — Now",
    },
    intro: {
      h2: `Emergency Electrician in ${cityName} — Same-Day Response`,
      paragraphs: [
        `If you have a sparking outlet, burning smell, complete power loss, or any electrical situation that feels dangerous in ${cityName}, ${stateName} — call now. This page connects you with licensed electricians for same-day emergency electrical response.`,
        county ? `In ${county}, licensed electricians are available for emergency response and know how to coordinate with local utilities for power restoration.` : `Licensed emergency electricians serving ${cityName} are available 7 days a week for urgent electrical situations.`,
      ],
      cta: "Call for Emergency Electrician Now",
    },
    costEstimator: {
      h2: `Emergency Electrician Cost — ${cityName}, ${stateName}`,
      intro: `Emergency electrician costs in ${cityName}: diagnostic service call $150–$300; emergency repair after hours $200–$600+; emergency panel work $500–$2,000+. Most homeowner insurance policies cover sudden electrical damage from storms or power surges.`,
      ctaBelow: "Call for Emergency Response in ${cityName} Now",
    },
    mainService: {
      h2: `Emergency Electrician in ${cityName}, ${stateAbbr}`,
      description: `Electrical emergencies in ${cityName} include: sparking or smoking outlets or panels, burning electrical smell without visible source, complete loss of power to the home or a major circuit, breakers that won't stay reset, exposed or damaged wiring, flickering that suddenly gets worse, and any electrical situation following a storm or power surge. Never ignore a burning smell or sparking outlet — these are fire precursors. A licensed ${cityName} emergency electrician diagnoses the source accurately, makes the home safe, and gives you a complete repair estimate before any major work begins.`,
      localParagraphs,
      cost: `Emergency electrician in ${cityName}: $150 – $600+ (varies by issue and time of call)`,
      whatAffects: [
        "Nature of emergency — outlet, panel, wiring, or full outage",
        "Time of call — business hours vs. after hours",
        "Parts required for immediate repair",
        "Whether utility coordination is needed",
      ],
      cta: "Call for Emergency Electrician in ${cityName} Now",
    },
    whyCall: {
      h2: `Electrical Emergencies That Require Immediate Response`,
      paragraphs: [
        `Sparking outlets, burning smells, and smoking panels are fire precursors — not nuisances to monitor. Electrical fires start and spread faster than most homeowners expect. If you smell burning plastic or see sparking from any outlet or panel in ${cityName}, call now and do not use the outlet.`,
        `Breakers that won't stay reset indicate a real problem — an overloaded circuit, a short circuit, or a failing breaker. Never put a higher-amp breaker in to make a circuit "stop tripping" — this removes your only protection against electrical fire.`,
        `Complete power loss may be a utility issue or an internal panel failure. A licensed ${cityName} emergency electrician quickly determines whether the issue is at the meter, the main breaker, or in your panel — and coordinates with the utility if needed.`,
      ],
    },
    localSignals: {
      h2: `Emergency Electrician Service Areas Near ${cityName}, ${stateName}`,
      intro: `Licensed emergency electricians available for same-day response in ${cityName} and nearby communities including ${nearby1}, ${nearby2}, and ${nearby3}.`,
      bullets: buildLocalSignalsBullets(stateName, stateAbbr, cityName, [
        `All electricians are licensed and insured under ${stateName} requirements`,
        "Same-day emergency response available",
        "Utility coordination included for outage situations",
        `Emergency response in ${cityName} and surrounding ${stateAbbr} areas — 7 days a week`,
      ], cityMetadata),
    },
    eeat: { title: "Why trust this guide", bullets: EEAT_BULLETS },
    faq: {
      h2: `Emergency Electrician FAQ — ${cityName}, ${stateName}`,
      items: [
        { q: `How fast can an emergency electrician respond in ${cityName}?`, a: `Most licensed emergency electricians in ${cityName} can respond within 1–4 hours for same-day service. Sparking or smoke situations should be treated as fire hazards — call 911 if smoke or fire is present, then call an electrician.` },
        { q: `What counts as an electrical emergency in ${cityName}?`, a: `Sparking outlets or panels, burning smells, smoking wiring or fixtures, breakers that won't stay reset, complete power loss to the home, and any electrical situation following a storm are all emergencies requiring immediate professional response.` },
        { q: `Should I try to reset my breaker myself in ${cityName}?`, a: `You can reset a breaker once. If it trips again immediately or won't stay reset, stop and call a licensed ${cityName} electrician. Repeated breaker tripping indicates a real problem — not a nuisance.` },
        { q: `What should I do while waiting for the emergency electrician in ${cityName}?`, a: `If there's smoke or fire, evacuate and call 911. If there's sparking, turn off the circuit at the breaker. Avoid using the affected outlet or circuit. Don't attempt repairs yourself.` },
        { q: `Does homeowner insurance cover emergency electrical repairs in ${cityName}?`, a: `Most homeowner policies in ${stateName} cover sudden electrical damage from storms, power surges, and covered events. Pre-existing wiring defects are typically excluded. A licensed electrician documents the cause for your insurance claim.` },
      ],
    },
    closing: {
      h2: `Emergency Electrician in ${cityName} — Call Now`,
      text: `Don't wait. Electrical emergencies get more dangerous with time. A licensed emergency electrician serving ${cityName}, ${stateName} can respond today.`,
      cta: `Call for Emergency Electrician in ${cityName}`,
      sub: `Call ${phone} · Emergency response available · 7 days a week`,
    },
    internalLinks: {
      otherServicesLabel: `Other electrical services in ${cityName}:`,
      nearbyLabel: "Nearby cities:",
      backLabel: `← All cities in ${stateName}`,
    },
  };
}

// ── Dispatcher ─────────────────────────────────────────────────────────────

export function getServiceCityPageContent(
  service: string,
  params: ServiceContentParams
): ServiceCityContent {
  const { cityName, stateName, stateAbbr, nearby1, nearby2, nearby3, phone, cityMetadata } = params;
  const p = [cityName, stateName, stateAbbr, nearby1, nearby2, nearby3, phone ?? PHONE_DEFAULT, cityMetadata] as const;

  switch (service) {
    case "electrician-quote":         return getElectricianQuoteCityPageContent(...p);
    case "panel-upgrade":             return getPanelUpgradeCityPageContent(...p);
    case "electrical-inspection":     return getElectricalInspectionCityPageContent(...p);
    case "outlet-installation":       return getOutletInstallationCityPageContent(...p);
    case "ceiling-fan-installation":  return getCeilingFanInstallationCityPageContent(...p);
    case "ev-charger-installation":   return getEvChargerInstallationCityPageContent(...p);
    case "generator-installation":    return getGeneratorInstallationCityPageContent(...p);
    case "emergency-electrician":     return getEmergencyElectricianCityPageContent(...p);
    default:                          return getElectricianQuoteCityPageContent(...p);
  }
}

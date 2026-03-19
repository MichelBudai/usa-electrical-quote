import type { ServiceSlug } from "./data";
import { getCurrentSiteConfig } from "./getSiteConfig";
import stateMetadataJson from "../data/state_metadata.json";

interface StateMetadata {
  cityCount: number;
  pctPre1980: number | null;
  avgMedianYear: number | null;
  avgHomeownership: number | null;
  topCities: { name: string; population: number }[];
}

const stateMetadataMap = stateMetadataJson as Record<string, StateMetadata>;

export interface StatePageContent {
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSub: string;
  trustBullets: string[];
  intro: {
    h2: string;
    paragraphs: string[];
    ctaText: string;
  };
  why: {
    h2: string;
    points: { h3: string; text: string }[];
  };
  services: {
    h2: string;
    intro: string;
    items: { slug: ServiceSlug; title: string; description: string; costRange: string }[];
  };
  cityIntro: {
    h2: string;
    paragraph: string;
    ctaText: string;
  };
  faq: {
    h2: string;
    items: { q: string; a: string }[];
  };
  closing: {
    h2: string;
    text: string;
    ctaText: string;
  };
  internalLinks: {
    otherStatesLabel: string;
    viewAllStatesLabel: string;
    otherServicesLabel: string;
  };
}

// ── Descriptions des services pour la grille état ─────────────────────────

const SERVICE_STATE_DESCRIPTIONS: Record<
  string,
  { description: string; costRange: string }
> = {
  "electrician-quote": {
    description:
      "From wiring repairs to full home rewiring, electrical costs vary by scope, home age, and local permit requirements. Connect with a licensed electrician in your city for an accurate estimate before any work begins.",
    costRange: "Varies by job — get a free quote",
  },
  "panel-upgrade": {
    description:
      "Electrical panel upgrades are required when your current panel can't safely handle modern electrical loads. Most older homes need an upgrade to 200-amp service. A licensed electrician assesses your current panel and gives you an honest recommendation.",
    costRange: "$1,500 – $4,000",
  },
  "electrical-inspection": {
    description:
      "A professional electrical inspection identifies code violations, outdated wiring, overloaded circuits, and safety hazards. Required for home sales in many states. Free inspections available from licensed electricians — no obligation.",
    costRange: "FREE",
  },
  "outlet-installation": {
    description:
      "New outlet installation, GFCI outlet upgrades, USB outlets, and dedicated circuit installation. Required for kitchen and bathroom code compliance. A licensed electrician quotes and installs to local code.",
    costRange: "$150 – $500",
  },
  "ceiling-fan-installation": {
    description:
      "Ceiling fan installation and replacement, including new wiring and switch installation when no existing fixture is present. A licensed electrician ensures safe wiring and proper support bracket installation.",
    costRange: "$100 – $350",
  },
  "ev-charger-installation": {
    description:
      "Level 2 EV charger installation requires a dedicated 240V circuit and permit in most states. A licensed electrician assesses your panel capacity, pulls the permit, and installs a charger compatible with your vehicle.",
    costRange: "$500 – $1,500",
  },
  "generator-installation": {
    description:
      "Standby and portable generator installation, including transfer switch wiring and permit. Whole-home standby generators require a licensed electrician and often a gas line connection. Quotes include all permit and inspection costs.",
    costRange: "$3,000 – $12,000",
  },
  "emergency-electrician": {
    description:
      "Power outages, burning smells, sparking outlets, and tripped breakers that won't reset are electrical emergencies. Licensed electricians available for same-day emergency response — never attempt to fix electrical emergencies yourself.",
    costRange: "$150 – $600 + emergency premium",
  },
};

const ELECTRICAL_LABELS: Record<string, string> = {
  "electrician-quote":        "Electrician Quote",
  "panel-upgrade":            "Panel Upgrade Quote",
  "electrical-inspection":    "Free Electrical Inspection",
  "outlet-installation":      "Outlet Installation Quote",
  "ceiling-fan-installation": "Ceiling Fan Installation Quote",
  "ev-charger-installation":  "EV Charger Installation Quote",
  "generator-installation":   "Generator Installation Quote",
  "emergency-electrician":    "Emergency Electrician",
};

// ── Contexte électrique par état ──────────────────────────────────────────

const STATE_ELECTRICAL_CONTEXT: Record<string, { risk: string; season: string; permit: string }> = {
  alabama:          { risk: "aging wiring in pre-1980 homes, storm outages, high AC loads",         season: "Year-round demand, peak summer AC load season",                       permit: "State licensing required. Local permits for all panel and wiring work." },
  alaska:           { risk: "extreme cold loads, heating system electrical, remote locations",        season: "Year-round, winter heating demand peaks",                             permit: "Municipality licensing. Permits required for panel and new circuits." },
  arizona:          { risk: "extreme heat AC loads, solar tie-in wiring, aging mobile home wiring",  season: "Year-round, summer AC overload season critical",                       permit: "ROC license required. Permits mandatory for panels and new wiring." },
  arkansas:         { risk: "older home wiring, storm outages, tornado surge damage",                season: "Year-round demand, spring storm season",                              permit: "State contractor license. Local permits for electrical work." },
  california:       { risk: "wildfire defensible space wiring, seismic flex conduit, EV charger demand", season: "Year-round, fire season June–October heightens generator demand",   permit: "C-10 license required. Strict permits statewide — inspections mandatory." },
  colorado:         { risk: "altitude derating of equipment, snow load on outdoor panels, EV charger demand", season: "Year-round, winter heating and summer AC both peak",           permit: "State licensing + local permits. Front Range cities strict enforcement." },
  connecticut:      { risk: "aging housing stock, knob-and-tube wiring, nor'easter outages",         season: "Year-round, nor'easter outage season Nov–March",                      permit: "Licensed HIC contractor. Building permits for all electrical work." },
  delaware:         { risk: "coastal humidity on panels, older wiring in beach communities",          season: "Year-round feasible, peak summer coastal demand",                     permit: "Licensed contractor. Permits for panel and new circuits." },
  florida:          { risk: "hurricane surge damage, humidity corrosion, high AC loads, lightning",   season: "Year-round, hurricane season June–November critical",                 permit: "EC/CEC license. Permits mandatory. GFCI requirements very strict." },
  georgia:          { risk: "aging wiring, storm outages, high AC loads, Atlanta growth panel demand", season: "Year-round, summer peak AC and storm damage",                        permit: "State contractor license. Atlanta strict inspection protocols." },
  hawaii:           { risk: "salt air corrosion, solar tie-in wiring, high electricity costs",        season: "Year-round, solar installation demand very high",                    permit: "Licensed contractor. Permits for all electrical work." },
  idaho:            { risk: "snow load on outdoor equipment, ag electrical loads, EV demand growing", season: "Year-round, winter heating loads peak",                              permit: "Licensed contractor. Building permits vary by municipality." },
  illinois:         { risk: "aging Chicago housing stock, knob-and-tube, wind storm outages",         season: "Year-round, Chicago wind and ice storm outages Nov–Mar",              permit: "Licensed contractor. Chicago strict code and inspection requirements." },
  indiana:          { risk: "tornado surge damage, older Midwest wiring, ice storm outages",          season: "Year-round, spring tornado and winter ice storm seasons",             permit: "Licensed contractor. County permits vary." },
  iowa:             { risk: "blizzard outages, tornado damage, aging farm electrical",                season: "Year-round, winter blizzard and spring tornado seasons",              permit: "Licensed contractor. Building permits required." },
  kansas:           { risk: "tornado alley surge damage, extreme temperature electrical loads",        season: "Year-round, April–June severe weather peak",                          permit: "Licensed contractor. Post-storm inspection requirements." },
  kentucky:         { risk: "ice storm outages, older Appalachian home wiring, tornado damage",       season: "Year-round, Dec–Feb ice storm season critical",                       permit: "Licensed contractor. Local building permits required." },
  louisiana:        { risk: "hurricane damage, extreme humidity corrosion, high AC loads",            season: "Year-round, hurricane season June–November dominant",                 permit: "Licensed contractor. Post-Katrina strict electrical codes." },
  maine:            { risk: "aging rural wiring, nor'easter outages, heating load electrical",         season: "Year-round, winter heating and nor'easter outage season",             permit: "Licensed contractor. Municipal permits required." },
  maryland:         { risk: "nor'easters, tropical storms, older DC suburb wiring",                  season: "Year-round, nor'easter response Nov–Mar, summer AC peak",             permit: "Licensed HIC contractor. County requirements vary." },
  massachusetts:    { risk: "knob-and-tube wiring, nor'easters, aging housing stock",                 season: "Year-round, nor'easter outage Jan–March busiest",                     permit: "Licensed construction supervisor. Building permits statewide." },
  michigan:         { risk: "lake-effect storm outages, older Midwest wiring, EV demand growing",     season: "Year-round, lake-effect outages Dec–March",                           permit: "Licensed contractor. Building permits required." },
  minnesota:        { risk: "extreme cold electrical loads, blizzard outages, heating system wiring", season: "Year-round, compressed outdoor work May–Oct",                         permit: "Licensed contractor. Hennepin/Ramsey specific protocols." },
  mississippi:      { risk: "hurricane damage, humidity corrosion, older wiring, high AC loads",      season: "Year-round, hurricane season dominates June–Nov",                     permit: "Licensed contractor. Post-Katrina electrical codes." },
  missouri:         { risk: "tornado damage, ice storm outages, older St. Louis housing stock",       season: "Year-round, April–June severe weather peak",                          permit: "Licensed contractor. STL/KC inspection requirements." },
  montana:          { risk: "extreme cold loads, remote locations, ag electrical demand",             season: "May–September outdoor work, year-round indoor",                       permit: "Licensed contractor. Municipal requirements vary." },
  nebraska:         { risk: "tornado damage, blizzard outages, aging Midwest wiring",                 season: "Year-round, spring tornado and winter blizzard seasons",              permit: "Licensed contractor. Omaha specific protocols." },
  nevada:           { risk: "extreme heat AC loads, solar tie-in demand, Las Vegas construction",     season: "Year-round, summer AC overload season critical",                      permit: "C-2 license required. Clark County specific requirements." },
  "new-hampshire":  { risk: "knob-and-tube wiring, nor'easters, older rural home electrical",         season: "Year-round, nor'easter outage season Nov–March",                      permit: "Licensed contractor. Town requirements vary." },
  "new-jersey":     { risk: "nor'easters, Sandy-era damage, older housing stock, EV charger demand", season: "Year-round, nor'easter season Nov–Mar",                               permit: "HIC registration. Permits statewide." },
  "new-mexico":     { risk: "extreme heat AC loads, older adobe home wiring, solar demand",           season: "Year-round, summer monsoon surge damage July–Sept",                   permit: "GB98 license. Building permits required." },
  "new-york":       { risk: "knob-and-tube in NYC brownstones, nor'easters, Sandy damage",            season: "Year-round, NYC strict permit process all seasons",                   permit: "Licensed HIC. NYC DOB permits. Upstate varies by county." },
  "north-carolina": { risk: "hurricane damage, tornado, ice storm outages, growing EV demand",        season: "Year-round, hurricane June–Nov dominant coastal concern",              permit: "Licensed contractor. County inspection requirements vary." },
  "north-dakota":   { risk: "extreme cold heating loads, blizzard outages, ag electrical",            season: "May–September outdoor, year-round indoor service",                    permit: "Licensed contractor. Municipal permits required." },
  ohio:             { risk: "lake-effect outages, older Midwest wiring, tornado damage",              season: "Year-round, ice storm and lake-effect Dec–March",                     permit: "Licensed contractor. Columbus/Cleveland/Cincinnati protocols." },
  oklahoma:         { risk: "tornado alley surge damage, ice storm outages, high wind",               season: "Year-round, March–June severe weather peak",                          permit: "Licensed contractor. Local inspection requirements." },
  oregon:           { risk: "Pacific storm outages, solar tie-in demand, EV charger demand",          season: "Year-round, rainy season outages Nov–March",                          permit: "CCB license. Portland metro specific requirements." },
  pennsylvania:     { risk: "knob-and-tube in older homes, nor'easters, aging housing stock",          season: "Year-round, nor'easter outage Nov–March",                             permit: "Licensed HIC. Philadelphia strict inspections." },
  "rhode-island":   { risk: "nor'easters, coastal wind, older housing stock",                         season: "Year-round emergency response, outdoor work May–Oct",                 permit: "Licensed contractor. Municipal requirements vary." },
  "south-carolina": { risk: "hurricane damage, humidity corrosion, older coastal home wiring",        season: "Year-round, hurricane June–Nov, summer AC peak",                       permit: "Licensed contractor. Coastal requirements strict." },
  "south-dakota":   { risk: "blizzard outages, extreme cold loads, ag electrical demand",             season: "May–September outdoor, year-round indoor",                            permit: "Licensed contractor. Municipal requirements vary." },
  tennessee:        { risk: "tornado damage, ice storm outages, older Appalachian home wiring",       season: "Year-round, Dec–Feb ice storm and spring tornado seasons",            permit: "Licensed contractor. Nashville/Memphis inspection requirements." },
  texas:            { risk: "grid instability outages (Feb 2021), hurricane coastal, extreme heat AC", season: "Year-round, summer AC overload and hurricane June–Nov",               permit: "Licensed contractor. DFW/Houston high permit volumes." },
  utah:             { risk: "extreme heat/cold temperature swings, growing EV demand, solar tie-in",  season: "Year-round, Wasatch Front all-season",                                permit: "Licensed contractor. Salt Lake/Utah County protocols." },
  vermont:          { risk: "knob-and-tube in older homes, nor'easters, heating load wiring",          season: "May–October outdoor, year-round indoor",                              permit: "Licensed contractor. Town requirements vary." },
  virginia:         { risk: "nor'easters, hurricane coastal, aging NOVA housing stock",               season: "Year-round, hurricane June–Nov and nor'easter Nov–Mar",               permit: "Class A/B/C license. NOVA high inspection volumes." },
  washington:       { risk: "Pacific storm outages, solar/EV demand highest in nation, older wiring", season: "Year-round, rainy season outages Oct–March",                          permit: "Licensed electrician required. Seattle specific inspections." },
  "west-virginia":  { risk: "aging rural wiring, ice storm outages, mountainous remote access",       season: "Year-round, winter ice storm season critical",                        permit: "Licensed contractor. County requirements vary." },
  wisconsin:        { risk: "lake-effect outages, older Midwest wiring, extreme cold loads",          season: "Year-round, lake-effect and blizzard Dec–March",                      permit: "Licensed contractor. Milwaukee/Madison protocols." },
  wyoming:          { risk: "extreme wind and cold loads, remote locations, ag electrical",            season: "May–September outdoor, year-round indoor",                            permit: "Licensed contractor. Municipal requirements vary." },
};

const DEFAULT_CONTEXT = {
  risk:   "aging wiring, storm outages, electrical safety hazards",
  season: "Year-round electrical service available.",
  permit: "A licensed electrician handles all permits as part of your quote.",
};

// ── Export principal ───────────────────────────────────────────────────────

export function getStatePageContent(
  serviceSlug: string,
  serviceLabel: string,
  stateName: string,
  stateAbbr: string,
  stateSlug: string
): StatePageContent {
  const serviceLower  = serviceLabel.toLowerCase();
  const serviceClean  = serviceLower.replace(/\s*quote\s*$/i, "").trim();

  const stateMeta    = stateMetadataMap[stateSlug] ?? null;
  const ctx          = STATE_ELECTRICAL_CONTEXT[stateSlug] ?? DEFAULT_CONTEXT;
  const topCityNames = stateMeta?.topCities.slice(0, 3).map((c) => c.name).join(", ") ?? "";

  const slugs = [
    "electrician-quote",
    "panel-upgrade",
    "electrical-inspection",
    "outlet-installation",
    "ceiling-fan-installation",
    "ev-charger-installation",
    "generator-installation",
    "emergency-electrician",
  ] as ServiceSlug[];

  return {
    metaTitle: `${serviceLabel} in ${stateName} | Free Quotes by City | Licensed Electricians`,
    metaDescription: `Get free ${serviceClean} quotes from licensed electricians in ${stateName}. ${ctx.risk} — compare estimates by city. No obligation. Licensed & insured.`,

    heroTitle: `Free ${serviceLabel} in ${stateName}`,
    heroSub: `Connect with licensed ${stateName} electricians in your city — free, no-obligation estimate. ${ctx.risk} experts ready now.`,

    trustBullets: [
      `Licensed & insured ${stateAbbr} electricians`,
      "Free estimate, zero commitment",
      `Same-day or next-day availability in most ${stateName} cities`,
      "Upfront pricing before any work begins",
    ],

    intro: {
      h2: `Get an Honest ${serviceLabel} from a${/^[AEIOU]/i.test(stateName) ? "n" : ""} ${stateName}-Licensed Electrician`,
      paragraphs: [
        `Electrical costs in ${stateName} vary significantly by job type, home age, and city. Labor rates, permit fees, and material costs all shift by county. The only quote that matters is one from a licensed electrician who knows your local code requirements.`,
        `${stateName} electrical risks include: ${ctx.risk}. ${ctx.season}`,
        ...(stateMeta?.pctPre1980
          ? [`${stateMeta.pctPre1980}% of ${stateName} cities have a median home build year before 1980 — meaning a large share of the housing stock has aging wiring, undersized panels, and outdated breakers that pose real safety risks. A free inspection identifies issues before they become emergencies.`]
          : []),
        ...(stateMeta?.avgHomeownership
          ? [`With an average homeownership rate of ${stateMeta.avgHomeownership}% across ${stateName}, most residents have a direct financial and safety stake in keeping their electrical system up to code.`]
          : []),
        `Select your ${stateName} city below and connect with a licensed local electrician for an accurate, no-obligation estimate.`,
      ],
      ctaText: "Select Your City Below",
    },

    why: {
      h2: `Why ${stateName} Homeowners Get an Electrical Quote First`,
      points: [
        {
          h3: `${stateName} Electrical Permits Vary by County`,
          text: `Most electrical work in ${stateName} requires a permit and inspection. ${ctx.permit} No surprises on the final invoice when permit costs are included upfront.`,
        },
        {
          h3: `${stateName} Electrical Risks Are Real`,
          text: `${stateName} electrical concerns include: ${ctx.risk}. ${ctx.season} Catching an issue during a free inspection costs nothing — repairing fire or water damage from an electrical failure costs thousands.`,
        },
        {
          h3: `${stateName} Labor Rates Vary by City`,
          text: `Electrician labor rates in ${stateName} are not consistent across the state. ${topCityNames ? `Metro areas like ${topCityNames} trend higher than rural counties.` : "Metro areas trend higher than rural counties."} A quote from a licensed electrician in your specific city gives you the real number.`,
        },
      ],
    },

    services: {
      h2: `Electrical Services Available for Quotes Across ${stateName}`,
      intro: "Select your city to get a local quote on any of the electrical services below.",
      items: slugs.map((slug) => {
        const { description, costRange } = SERVICE_STATE_DESCRIPTIONS[slug] ?? {
          description: `Licensed ${stateName} electricians available for ${slug} quotes.`,
          costRange: "Get a free quote",
        };
        const title = `${ELECTRICAL_LABELS[slug] ?? slug} — ${stateName}`;
        return { slug, title, description, costRange };
      }),
    },

    cityIntro: {
      h2: `Find a${/^[AEIOU]/i.test(serviceLabel) ? "n" : ""} ${serviceLabel} in Your ${stateName} City`,
      paragraph: `Licensed electricians are available for free quotes in ${stateMeta?.cityCount ?? "hundreds of"} ${stateName} cities${topCityNames ? `, including ${topCityNames}` : ""}. Select your city below to get an estimate specific to your area.`,
      ctaText: "Select Your City",
    },

    faq: {
      h2: `${stateName} Electrical Quote FAQ`,
      items: [
        {
          q: `How much does an electrician cost in ${stateName}?`,
          a: `Electrician costs in ${stateName} typically run $75–$150/hour for labor. Common jobs: outlet installation $150–$300, ceiling fan $100–$350, panel upgrade $1,500–$4,000, EV charger $500–$1,500. Select your city for a local estimate.`,
        },
        {
          q: `Do electricians need a license in ${stateName}?`,
          a: `Yes. ${stateName} requires electricians to be licensed and insured. ${ctx.permit} All electricians connected through this page are licensed and insured in ${stateName}.`,
        },
        {
          q: `How do I find a licensed electrician in ${stateName}?`,
          a: `Select your city on this page to connect with licensed, insured electricians familiar with local building codes and permit requirements in your area.`,
        },
        {
          q: `What electrical problems are most common in ${stateName} homes?`,
          a: `In ${stateName}, the most common issues are: ${ctx.risk}. ${stateMeta?.pctPre1980 ? `With ${stateMeta.pctPre1980}% of homes built before 1980, aging panels and outdated wiring are widespread.` : "A free inspection is the fastest way to identify safety issues."}`,
        },
        {
          q: `Can I get a same-day electrician quote in ${stateName}?`,
          a: `In most ${stateName} cities, same-day phone quotes and next-day service appointments are available. Emergency situations are often same-day. Select your city to check availability in your area.`,
        },
        {
          q: `Does homeowner insurance cover electrical damage in ${stateName}?`,
          a: `Most homeowner policies in ${stateName} cover sudden electrical damage from storms and power surges. Pre-existing wiring defects and code violations are typically excluded — which is why a licensed inspection is important.`,
        },
      ],
    },

    closing: {
      h2: `Ready to Find a Licensed Electrician in Your ${stateName} City?`,
      text: `Homeowners across ${stateName} get free electrical quotes through this page every day. Select your city, connect with a licensed local electrician, and get an honest estimate before spending a dollar. No forms. No wait. No obligation.`,
      ctaText: `Select Your ${stateName} City`,
    },

    internalLinks: {
      otherStatesLabel: "Other electrical quote states",
      viewAllStatesLabel: "View All States",
      otherServicesLabel: `Other electrical services in ${stateName}`,
    },
  };
}

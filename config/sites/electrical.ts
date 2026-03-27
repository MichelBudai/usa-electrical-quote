export const electricalConfig = {
  name: "Electrician",
  namePlural: "Electricians",
  slug: "electrical",
  siteUrl: "https://usa-electrical-quote.com",
  siteName: "USA Electrical Quote",
  phoneTel: "tel:+18335675779",
  phoneDisplay: "(833) 567-5779",
  ga4Id: "G-FW9Y3C2WS4", // ← à remplir après création GA4
  services: [
    { slug: "electrician-quote",         label: "Electrician Quote" },
    { slug: "panel-upgrade",             label: "Panel Upgrade Quote" },
    { slug: "electrical-inspection",     label: "Free Electrical Inspection" },
    { slug: "outlet-installation",       label: "Outlet Installation Quote" },
    { slug: "ceiling-fan-installation",  label: "Ceiling Fan Installation Quote" },
    { slug: "ev-charger-installation",   label: "EV Charger Installation Quote" },
    { slug: "generator-installation",    label: "Generator Installation Quote" },
    { slug: "emergency-electrician",     label: "Emergency Electrician" },
  ],
} as const;

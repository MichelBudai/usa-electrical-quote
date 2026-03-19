/**
 * Full service page content for electrical — usa-electrical-quote.com
 * Structure : FullServiceContent (identique à roofing-content.ts)
 */
import type { FullServiceContent } from "@/lib/fullServiceContentTypes";

export const ELECTRICAL_FULL_CONTENT: Record<string, FullServiceContent> = {
  "electrician-quote": {
    meta: {
      title: "Electrician Quote | Free Estimates from Licensed Local Electricians",
      description: "Get free electrician quotes from licensed electricians near you. Wiring, outlets, repairs & panel work. Upfront pricing, no obligation.",
    },
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Electrician Quote" }],
    hero: {
      h1: "Free Electrician Quotes from Licensed Local Electricians",
      sub: "Connect with licensed electricians in your city — free, no-obligation estimate for wiring, outlets, panel work, and electrical repairs.",
      trustBar: ["Licensed & insured electricians", "Free estimates", "Same-day availability", "Upfront pricing"],
      cta: "Get Your Free Quote",
    },
    intro: {
      h2: "Get an Honest Electrician Estimate Before Spending a Dollar",
      paragraphs: [
        "Electrical costs vary significantly by job type, home age, and city. Labor rates, permit fees, and required materials all differ by county and municipality.",
        "A free quote from a licensed local electrician gives you a realistic budget — with all permit costs included — before any work begins. Select your state and city below.",
      ],
      cta: "Select Your State Below",
    },
    why: {
      h2: "Why Get an Electrician Quote First",
      items: [
        { h3: "Permits Are Required — and Included", p: "Most electrical work requires a permit and inspection. A licensed electrician includes all permit costs in your quote upfront — no surprises on the final invoice." },
        { h3: "Electrical Safety Issues Compound", p: "A flickering light or tripping breaker that costs $200 to fix today can cause a house fire if ignored. A free quote call identifies whether you have a safety issue." },
        { h3: "DIY Creates Liability", p: "Unpermitted electrical work creates insurance liability and fails buyer inspections at resale. A licensed electrician protects your home and your coverage." },
      ],
    },
    services: {
      h2: "Electrical Services Available Nationwide",
      intro: "Select your state to find licensed electricians in your city.",
      items: [
        { h3: "Wiring Repair & Installation", description: "Wiring repairs, new circuits, and outlet installation for all home electrical needs.", range: "$150 – $1,500", linkLabel: "Get a quote", href: "/electrician-quote" },
        { h3: "Panel Upgrade", description: "100A to 200A panel upgrades for homes that can't handle modern electrical loads.", range: "$1,500 – $4,000", linkLabel: "Get a quote", href: "/panel-upgrade" },
        { h3: "GFCI & Outlet Installation", description: "Code-required GFCI outlets for kitchens, bathrooms, garages, and exterior locations.", range: "$75 – $500", linkLabel: "Get a quote", href: "/outlet-installation" },
        { h3: "EV Charger Installation", description: "Level 2 home EV charging station installation — dedicated 240V circuit, permit included.", range: "$500 – $1,500", linkLabel: "Get a quote", href: "/ev-charger-installation" },
      ],
    },
    stateGridIntro: {
      h2: "Find an Electrician Quote in Your State",
      paragraphs: ["Select your state below to find licensed electricians in your city. Free estimates, no obligation."],
      cta: "Select Your State",
    },
    howItWorks: {
      h2: "How It Works",
      steps: [
        { title: "Select Your State & City", text: "Choose your location to connect with licensed local electricians who know your local code requirements." },
        { title: "Get a Free Estimate", text: "A licensed electrician assesses your job and gives you an upfront quote with all permit costs included." },
        { title: "Decide With No Pressure", text: "Compare options and decide on your timeline. No obligation, no commitment." },
      ],
    },
    faq: {
      h2: "Electrician Quote FAQ",
      items: [
        { q: "How much does an electrician cost?", a: "Electrician rates typically run $75–$150/hour. Common jobs: outlet installation $150–$300, circuit addition $300–$800, panel upgrade $1,500–$4,000. Most electricians quote flat rates for standard jobs." },
        { q: "Do I need a permit for electrical work?", a: "Yes, for most electrical work beyond simple device replacement. Adding circuits, panel upgrades, and new wiring all require permits and inspection. A licensed electrician handles all permits as part of the job." },
        { q: "Is the electrician quote really free?", a: "Yes. A phone quote and free assessment cost nothing. No dispatch fee, no obligation. You get a real estimate from a licensed electrician before any work begins." },
        { q: "How long does typical electrical work take?", a: "Simple jobs (outlet installation, fan wiring) take 1–4 hours. Panel upgrades take 4–8 hours. Whole-home rewiring takes 3–7 days depending on home size." },
      ],
    },
    closing: {
      h2: "Ready to Get Your Free Electrician Quote?",
      paragraphs: ["Select your state below. Connect with a licensed local electrician. Get an honest estimate before spending a dollar. No forms. No wait. No obligation."],
      cta: "Select Your State",
    },
    internalLinks: {
      heading: "Other electrical services:",
      links: [
        { label: "Panel Upgrade Quote", href: "/panel-upgrade" },
        { label: "Free Electrical Inspection", href: "/electrical-inspection" },
        { label: "EV Charger Installation", href: "/ev-charger-installation" },
        { label: "Emergency Electrician", href: "/emergency-electrician" },
      ],
    },
  },

  "panel-upgrade": {
    meta: {
      title: "Panel Upgrade Quote | Free Estimates from Licensed Electricians",
      description: "Get free electrical panel upgrade quotes from licensed electricians. 100A to 200A upgrades, permit included. Upfront pricing, no obligation.",
    },
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Panel Upgrade Quote" }],
    hero: {
      h1: "Free Panel Upgrade Quotes from Licensed Electricians",
      sub: "100A to 200A panel upgrades for homes that can't safely handle modern electrical loads. Permit, utility coordination, and inspection included.",
      trustBar: ["Licensed & insured electricians", "Permit included", "Utility coordination", "Free estimates"],
      cta: "Get Your Free Panel Upgrade Quote",
    },
    intro: {
      h2: "Get a Real Panel Upgrade Estimate Before Committing",
      paragraphs: [
        "An undersized electrical panel is not just an inconvenience — it's a safety risk and an insurance liability. Many homes need an upgrade to 200-amp service before adding EV chargers, heat pumps, or home additions.",
        "A free quote from a licensed electrician includes panel assessment, permit, utility coordination, and inspection — all in one call. Select your state and city below.",
      ],
      cta: "Select Your State Below",
    },
    why: {
      h2: "Why Get a Panel Upgrade Quote",
      items: [
        { h3: "Insurance May Require It", p: "Many insurers require 200-amp service as a condition of homeowner coverage, especially for older homes with 60 or 100-amp panels." },
        { h3: "Required for EV Chargers & Heat Pumps", p: "Level 2 EV chargers and heat pumps require dedicated high-amperage circuits that most older panels can't safely support." },
        { h3: "Utility Coordination Is Included", p: "The utility must disconnect power before the upgrade. A licensed electrician handles all utility coordination — you don't need to call them yourself." },
      ],
    },
    services: {
      h2: "Panel Upgrade Options Available Nationwide",
      intro: "Select your state to find licensed electricians for panel upgrades in your city.",
      items: [
        { h3: "100A to 200A Upgrade", description: "The most common upgrade for pre-1980 homes — expands capacity for modern electrical loads.", range: "$1,500 – $3,000", linkLabel: "Get a quote", href: "/panel-upgrade" },
        { h3: "200A to 400A Upgrade", description: "For large homes, home additions, or whole-home electrification projects.", range: "$2,500 – $4,500", linkLabel: "Get a quote", href: "/panel-upgrade" },
        { h3: "Subpanel Installation", description: "Subpanel for garages, additions, or outbuildings that need their own circuit distribution.", range: "$500 – $1,500", linkLabel: "Get a quote", href: "/panel-upgrade" },
        { h3: "Breaker Box Replacement", description: "Same-amperage panel replacement for Federal Pacific, Zinsco, or failed breaker boxes.", range: "$1,000 – $2,500", linkLabel: "Get a quote", href: "/panel-upgrade" },
      ],
    },
    stateGridIntro: {
      h2: "Find a Panel Upgrade Quote in Your State",
      paragraphs: ["Select your state below to find licensed electricians for panel upgrades in your city."],
      cta: "Select Your State",
    },
    howItWorks: {
      h2: "How It Works",
      steps: [
        { title: "Free Panel Assessment", text: "A licensed electrician assesses your current panel, determines the right upgrade path, and quotes all costs — permit, utility fee, and labor." },
        { title: "Permit & Utility Coordination", text: "Your electrician pulls the permit and coordinates utility disconnect and reconnect — you don't need to make any calls." },
        { title: "Upgrade & Final Inspection", text: "The upgrade is completed and inspected. Power is restored after the inspection passes." },
      ],
    },
    faq: {
      h2: "Panel Upgrade FAQ",
      items: [
        { q: "How much does a panel upgrade cost?", a: "Panel upgrades typically cost $1,500–$3,000 for a 100A to 200A upgrade, including permit and inspection. Larger upgrades run $2,500–$4,500. Final cost depends on your location and utility requirements." },
        { q: "How long does a panel upgrade take?", a: "Most panel upgrades take 4–8 hours including utility disconnect and reconnect. You'll be without power for the duration of the work — typically 4–6 hours." },
        { q: "Do I need a panel upgrade to add an EV charger?", a: "Many homes — especially those with 100-amp panels — need a panel upgrade to safely support a Level 2 EV charger circuit. A licensed electrician assesses your panel capacity as part of the free quote." },
        { q: "Is a permit always required for a panel upgrade?", a: "Yes, always. Panel upgrades require a permit and final inspection in every jurisdiction. A licensed electrician pulls the permit and schedules inspection as part of the job." },
      ],
    },
    closing: {
      h2: "Ready to Get Your Free Panel Upgrade Quote?",
      paragraphs: ["Select your state below. A licensed electrician assesses your panel, quotes the upgrade, and handles all permits and utility coordination."],
      cta: "Select Your State",
    },
    internalLinks: {
      heading: "Other electrical services:",
      links: [
        { label: "Electrician Quote", href: "/electrician-quote" },
        { label: "EV Charger Installation", href: "/ev-charger-installation" },
        { label: "Free Electrical Inspection", href: "/electrical-inspection" },
        { label: "Generator Installation", href: "/generator-installation" },
      ],
    },
  },

  "electrical-inspection": {
    meta: {
      title: "Free Electrical Inspection | Written Report from Licensed Electricians",
      description: "Free electrical inspection with written report and photos. Panel, wiring & safety assessment from licensed electricians. No obligation.",
    },
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Free Electrical Inspection" }],
    hero: {
      h1: "Free Electrical Inspection — Written Report with Photos",
      sub: "Licensed electricians for comprehensive electrical safety inspections. Written report with photos. Panel, wiring, and outlet assessment. No obligation.",
      trustBar: ["100% free inspection", "Written report with photos", "Licensed & insured", "No obligation"],
      cta: "Schedule Your Free Inspection",
    },
    intro: {
      h2: "A Free Electrical Inspection Is the Most Cost-Effective Safety Step",
      paragraphs: [
        "Electrical fires cause over 51,000 house fires annually in the US. Most are preventable with proper inspection and maintenance. Issues caught during a free inspection cost $200–$800 to fix. The same issues, after a fire starts, cost everything.",
        "A free inspection from a licensed electrician delivers a written report with photos documenting current condition, any safety hazards, and recommended repairs with cost estimates.",
      ],
      cta: "Select Your State Below",
    },
    why: {
      h2: "When You Need an Electrical Inspection",
      items: [
        { h3: "Older Homes — 40+ Years", p: "Homes over 40 years old may have knob-and-tube wiring, aluminum wiring, or Federal Pacific panels — all known fire and insurance hazards. A free inspection identifies these issues." },
        { h3: "Before Buying or Selling", p: "An electrical inspection report is increasingly required by lenders and expected by buyers. Sellers use it to disclose accurately and avoid post-sale liability." },
        { h3: "After Any Storm or Power Event", p: "Power surges, lightning strikes, and utility outages can damage your panel and wiring invisibly. A post-event inspection confirms your system is safe." },
      ],
    },
    services: {
      h2: "What's Included in Your Free Inspection",
      intro: "A comprehensive inspection covers every major component of your home's electrical system.",
      items: [
        { h3: "Panel Assessment", description: "Breaker condition, amperage, signs of overheating, moisture, and panel brand safety record.", range: "Included", linkLabel: "Schedule inspection", href: "/electrical-inspection" },
        { h3: "Wiring Evaluation", description: "Visible wiring type identification — knob-and-tube, aluminum, or copper — and condition assessment.", range: "Included", linkLabel: "Schedule inspection", href: "/electrical-inspection" },
        { h3: "Outlet & GFCI Assessment", description: "All outlets tested for proper grounding, GFCI protection where required, and safety compliance.", range: "Included", linkLabel: "Schedule inspection", href: "/electrical-inspection" },
        { h3: "Written Report with Photos", description: "Documented condition report with photos — meets insurance and real estate documentation standards.", range: "Included", linkLabel: "Schedule inspection", href: "/electrical-inspection" },
      ],
    },
    stateGridIntro: {
      h2: "Schedule a Free Electrical Inspection in Your State",
      paragraphs: ["Select your state below to find licensed electricians offering free inspections in your city."],
      cta: "Select Your State",
    },
    howItWorks: {
      h2: "How It Works",
      steps: [
        { title: "Schedule Your Free Inspection", text: "Select your state and city. A licensed electrician schedules your inspection — typically within 24–48 hours." },
        { title: "Comprehensive Assessment", text: "The electrician inspects your panel, visible wiring, all outlets, and fixtures. Photos are taken of any issues found." },
        { title: "Written Report Delivered", text: "You receive a written report with photos documenting condition, any safety hazards, recommended repairs, and estimated costs." },
      ],
    },
    faq: {
      h2: "Electrical Inspection FAQ",
      items: [
        { q: "Is the electrical inspection really free?", a: "Yes, 100% free with no obligation. A licensed electrician inspects your system and provides a written report at no charge." },
        { q: "What does an electrical inspection include?", a: "Panel assessment, visible wiring evaluation, outlet and GFCI testing, fixture inspection, and smoke/CO detector check. You receive a written report with photos." },
        { q: "How often should I get an electrical inspection?", a: "Every 3–5 years for modern homes, annually for homes over 40 years old, and immediately when buying or selling or after any significant electrical event." },
        { q: "What are Federal Pacific and Zinsco panels?", a: "These are panel brands known for defective breakers that fail to trip during overloads — a significant fire hazard. Many insurers refuse coverage for homes with these panels. A free inspection identifies whether your home has one." },
      ],
    },
    closing: {
      h2: "Schedule Your Free Electrical Inspection Today",
      paragraphs: ["No forms. No waiting. No obligation. Select your state below to connect with a licensed electrician who will inspect your system and deliver a complete written report — completely free."],
      cta: "Select Your State",
    },
    internalLinks: {
      heading: "Other electrical services:",
      links: [
        { label: "Electrician Quote", href: "/electrician-quote" },
        { label: "Panel Upgrade Quote", href: "/panel-upgrade" },
        { label: "Outlet Installation Quote", href: "/outlet-installation" },
        { label: "Emergency Electrician", href: "/emergency-electrician" },
      ],
    },
  },

  "outlet-installation": {
    meta: {
      title: "Outlet Installation Quote | GFCI & New Circuits | Licensed Electricians",
      description: "Free outlet installation quote. GFCI, USB, 240V & new circuit outlets from licensed electricians. Permit included where required, no obligation.",
    },
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Outlet Installation Quote" }],
    hero: {
      h1: "Free Outlet Installation Quotes from Licensed Electricians",
      sub: "GFCI outlets, USB outlets, 240V dedicated circuits, and new circuit installation. Code-compliant installation, permit included where required.",
      trustBar: ["Licensed & insured", "GFCI code-compliant", "Permit included", "Free estimates"],
      cta: "Get Your Free Outlet Quote",
    },
    intro: {
      h2: "Get a Real Outlet Installation Estimate First",
      paragraphs: [
        "GFCI outlets are required by code in kitchens, bathrooms, garages, and exterior locations — and many older homes don't have them, creating insurance liability and real estate inspection failures.",
        "A free quote from a licensed electrician tells you exactly what's needed, whether a new circuit is required, and what the total cost will be before any work begins.",
      ],
      cta: "Select Your State Below",
    },
    why: {
      h2: "Why Hire a Licensed Electrician for Outlet Work",
      items: [
        { h3: "GFCI Is Required by Code", p: "Kitchens, bathrooms, garages, and exterior locations require GFCI protection by code in all US jurisdictions. Homes without GFCI in these areas fail inspections and may be uninsurable." },
        { h3: "New Circuits Need Permits", p: "Adding outlets that require new circuit runs always requires a permit and inspection. Unpermitted wiring creates insurance liability at resale." },
        { h3: "Overloaded Circuits Are a Fire Hazard", p: "Adding outlets to an already loaded circuit without amperage analysis is a common DIY mistake that creates overload fire risk. A licensed electrician always checks circuit capacity first." },
      ],
    },
    services: {
      h2: "Outlet Installation Services Nationwide",
      intro: "Select your state to find licensed electricians for outlet work in your city.",
      items: [
        { h3: "GFCI Outlet Replacement", description: "Code-required GFCI protection for kitchens, bathrooms, garages, and exterior outlets.", range: "$75 – $150 each", linkLabel: "Get a quote", href: "/outlet-installation" },
        { h3: "New Outlet on Existing Circuit", description: "Adding outlets to rooms with insufficient coverage — on circuits with verified available capacity.", range: "$150 – $300 each", linkLabel: "Get a quote", href: "/outlet-installation" },
        { h3: "New Circuit + Outlet", description: "New dedicated circuit from the panel when existing circuits don't have capacity.", range: "$300 – $600", linkLabel: "Get a quote", href: "/outlet-installation" },
        { h3: "240V Dedicated Circuit", description: "High-amperage dedicated circuits for electric ranges, dryers, EV chargers, or workshop equipment.", range: "$400 – $900", linkLabel: "Get a quote", href: "/outlet-installation" },
      ],
    },
    stateGridIntro: {
      h2: "Find an Outlet Installation Quote in Your State",
      paragraphs: ["Select your state below to find licensed electricians for outlet work in your city."],
      cta: "Select Your State",
    },
    howItWorks: {
      h2: "How It Works",
      steps: [
        { title: "Free Assessment", text: "A licensed electrician assesses your current circuit capacity and outlet situation, and quotes the most cost-effective installation path." },
        { title: "Permit Where Required", text: "Your electrician pulls all required permits for new circuit work and schedules the inspection." },
        { title: "Code-Compliant Installation", text: "All outlets installed to current code — GFCI where required, properly grounded, and inspected." },
      ],
    },
    faq: {
      h2: "Outlet Installation FAQ",
      items: [
        { q: "How much does outlet installation cost?", a: "GFCI replacement $75–$150 each; new outlet on existing circuit $150–$300; new outlet requiring new circuit $300–$600; 240V circuit $400–$900." },
        { q: "Do I need GFCI outlets in my home?", a: "Yes, in kitchens, bathrooms, garages, and exterior locations by code. Many older homes don't have GFCI in all required locations — a code violation that creates insurance liability." },
        { q: "Can I add outlets without a permit?", a: "In most jurisdictions, adding outlets on existing circuits doesn't require a permit. Adding new circuits always does. A licensed electrician advises on your specific situation." },
        { q: "What is a 240V outlet and when do I need one?", a: "240V outlets are required for electric ranges, dryers, EV chargers, large workshop equipment, and some HVAC equipment. They require a dedicated circuit installed by a licensed electrician." },
      ],
    },
    closing: {
      h2: "Ready to Get Your Free Outlet Installation Quote?",
      paragraphs: ["Select your state below. A licensed electrician assesses your situation and gives you a complete quote — GFCI, new circuits, and all permit costs included."],
      cta: "Select Your State",
    },
    internalLinks: {
      heading: "Other electrical services:",
      links: [
        { label: "Electrician Quote", href: "/electrician-quote" },
        { label: "Panel Upgrade Quote", href: "/panel-upgrade" },
        { label: "Ceiling Fan Installation", href: "/ceiling-fan-installation" },
        { label: "EV Charger Installation", href: "/ev-charger-installation" },
      ],
    },
  },

  "ceiling-fan-installation": {
    meta: {
      title: "Ceiling Fan Installation Quote | Licensed Electricians | Free Estimate",
      description: "Free ceiling fan installation quote. New wiring, fan-rated boxes & smart fan installation from licensed electricians. No obligation.",
    },
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Ceiling Fan Installation Quote" }],
    hero: {
      h1: "Free Ceiling Fan Installation Quotes from Licensed Electricians",
      sub: "Licensed electricians for ceiling fan installation, fan-rated box upgrades, and new wiring. Safe installation guaranteed, honest estimates.",
      trustBar: ["Licensed & insured", "Fan-rated box included", "New wiring available", "Free estimates"],
      cta: "Get Your Free Fan Quote",
    },
    intro: {
      h2: "Get a Real Ceiling Fan Installation Estimate",
      paragraphs: [
        "Ceiling fans installed on non-rated boxes can fall — a 30–50 lb fan dropping from the ceiling is a serious safety hazard. The most common DIY ceiling fan mistake is using the existing light fixture box, which is not rated to support a fan's weight and movement.",
        "A licensed electrician verifies or installs a proper fan-rated box, wires the controls correctly, and mounts the fan safely — typically for $75–$250.",
      ],
      cta: "Select Your State Below",
    },
    why: {
      h2: "Why Hire a Licensed Electrician for Fan Installation",
      items: [
        { h3: "Fan-Rated Boxes Are Required", p: "Standard light fixture boxes are not rated for ceiling fans. A licensed electrician always checks and upgrades your box — the single most important safety step in fan installation." },
        { h3: "Wiring Must Be Correct", p: "Ceiling fans have separate motor and light kit circuits. Incorrect wiring causes reversed behavior, short circuits, and fire hazards. A licensed electrician wires it correctly the first time." },
        { h3: "New Wiring Requires a Permit", p: "Installing a fan where no wiring exists requires new circuit wiring and a permit. A licensed electrician handles all permits as part of the job." },
      ],
    },
    services: {
      h2: "Ceiling Fan Installation Options Nationwide",
      intro: "Select your state to find licensed electricians for fan installation in your city.",
      items: [
        { h3: "Like-for-Like Replacement", description: "Replace an existing fan or light fixture with a new ceiling fan — existing wiring and fan-rated box already in place.", range: "$75 – $150", linkLabel: "Get a quote", href: "/ceiling-fan-installation" },
        { h3: "Fan-Rated Box Upgrade", description: "Replace a non-rated light box with a proper fan-rated support box — required before any fan installation.", range: "$150 – $250", linkLabel: "Get a quote", href: "/ceiling-fan-installation" },
        { h3: "New Wiring Required", description: "Install a ceiling fan where no existing wiring is present — new circuit from the panel, permit included.", range: "$250 – $500", linkLabel: "Get a quote", href: "/ceiling-fan-installation" },
        { h3: "Smart/Remote Fan Wiring", description: "Install remote or smart home control wiring for fans without a dedicated light/fan switch circuit.", range: "$150 – $300", linkLabel: "Get a quote", href: "/ceiling-fan-installation" },
      ],
    },
    stateGridIntro: {
      h2: "Find a Ceiling Fan Installation Quote in Your State",
      paragraphs: ["Select your state below to find licensed electricians for fan installation in your city."],
      cta: "Select Your State",
    },
    howItWorks: {
      h2: "How It Works",
      steps: [
        { title: "Free Assessment", text: "A licensed electrician determines what's needed — existing wiring and box condition — and quotes your specific installation." },
        { title: "Safe Installation", text: "Fan-rated box installed or verified, wiring completed correctly, fan mounted and tested." },
        { title: "One-Time Done Right", text: "No callbacks, no re-wiring, no safety concerns. Licensed installation guaranteed." },
      ],
    },
    faq: {
      h2: "Ceiling Fan Installation FAQ",
      items: [
        { q: "How much does ceiling fan installation cost?", a: "Simple replacement $75–$150; new fan-rated box needed $150–$250; new wiring required $250–$500; smart/remote wiring $150–$300." },
        { q: "Can I install a ceiling fan myself?", a: "If existing wiring is in place and the box is fan-rated, it's technically possible. However, most existing boxes are not fan-rated — and improperly supported fans fall. A licensed electrician installs correctly for $75–$150." },
        { q: "What is a fan-rated box?", a: "A fan-rated electrical box is specifically engineered to support the weight and lateral movement of a ceiling fan. Standard light fixture boxes are rated for 35 lbs static load — not the dynamic force of a spinning fan." },
        { q: "Can a ceiling fan be installed where there is no wiring?", a: "Yes. A licensed electrician runs new wiring from your panel, installs a fan-rated box, and wires the fan and switch. New wiring always requires a permit." },
      ],
    },
    closing: {
      h2: "Ready to Get Your Free Ceiling Fan Installation Quote?",
      paragraphs: ["Select your state below. A licensed electrician assesses your wiring situation and gives you a complete installation quote — fan-rated box and permit included where needed."],
      cta: "Select Your State",
    },
    internalLinks: {
      heading: "Other electrical services:",
      links: [
        { label: "Electrician Quote", href: "/electrician-quote" },
        { label: "Outlet Installation Quote", href: "/outlet-installation" },
        { label: "EV Charger Installation", href: "/ev-charger-installation" },
        { label: "Free Electrical Inspection", href: "/electrical-inspection" },
      ],
    },
  },

  "ev-charger-installation": {
    meta: {
      title: "EV Charger Installation Quote | Level 2 Home Charging | Licensed Electricians",
      description: "Free Level 2 EV charger installation quote. Dedicated 240V circuit, permit included. Federal tax credit available. Licensed electricians, no obligation.",
    },
    breadcrumb: [{ label: "Home", href: "/" }, { label: "EV Charger Installation Quote" }],
    hero: {
      h1: "Free EV Charger Installation Quotes from Licensed Electricians",
      sub: "Level 2 home EV charging station installation. Dedicated 240V circuit, permit and inspection included. Federal tax credit covers 30% up to $1,000.",
      trustBar: ["Licensed & insured", "Permit included", "Tax credit eligible", "Free estimates"],
      cta: "Get Your Free EV Charger Quote",
    },
    intro: {
      h2: "Get a Real EV Charger Installation Estimate",
      paragraphs: [
        "Level 2 home charging adds 20–30 miles of range per hour — vs. 3–5 miles on a standard 120V outlet. Most EV owners switch to Level 2 and never look back. The federal tax credit covers 30% of installation cost up to $1,000.",
        "A free quote from a licensed electrician includes panel capacity assessment, circuit installation, permit, and inspection — all in one call.",
      ],
      cta: "Select Your State Below",
    },
    why: {
      h2: "Why Hire a Licensed Electrician for EV Charger Installation",
      items: [
        { h3: "Permit Is Required — and Included", p: "Level 2 EV charger installation requires a permit and inspection in most jurisdictions. A licensed electrician handles all permits as part of the job — unpermitted charger circuits create insurance liability." },
        { h3: "Panel Assessment Is Critical", p: "Many older homes need a panel upgrade before a Level 2 charger circuit can be safely added. A licensed electrician assesses your panel capacity as part of the free quote." },
        { h3: "Tax Credit Documentation", p: "The federal EV charger tax credit requires documentation of qualified installation. A licensed electrician provides all necessary documentation for your tax credit claim." },
      ],
    },
    services: {
      h2: "EV Charger Installation Options Nationwide",
      intro: "Select your state to find licensed electricians for EV charger installation in your city.",
      items: [
        { h3: "Level 2 Circuit Installation", description: "Dedicated 240V, 40–50 amp circuit for Level 2 home EV charging — permit and inspection included.", range: "$500 – $900", linkLabel: "Get a quote", href: "/ev-charger-installation" },
        { h3: "Outdoor Weatherproof Installation", description: "Exterior EV charger installation with weatherproof conduit and NEMA 4 enclosure.", range: "$600 – $1,200", linkLabel: "Get a quote", href: "/ev-charger-installation" },
        { h3: "With Panel Upgrade", description: "EV charger installation combined with panel upgrade when existing panel capacity is insufficient.", range: "$2,000 – $4,500", linkLabel: "Get a quote", href: "/ev-charger-installation" },
        { h3: "Smart Charger with Load Management", description: "Smart EV charger installation with automated load management to prevent circuit overloading.", range: "$700 – $1,500", linkLabel: "Get a quote", href: "/ev-charger-installation" },
      ],
    },
    stateGridIntro: {
      h2: "Find an EV Charger Installation Quote in Your State",
      paragraphs: ["Select your state below to find licensed electricians for EV charger installation in your city. Federal tax credit covers 30% up to $1,000."],
      cta: "Select Your State",
    },
    howItWorks: {
      h2: "How It Works",
      steps: [
        { title: "Free Panel Assessment", text: "A licensed electrician checks your panel capacity and recommends the right installation path — with or without a panel upgrade." },
        { title: "Permit & Installation", text: "Your electrician pulls the permit, runs the dedicated circuit, and installs your charger at your preferred location." },
        { title: "Inspection & Tax Credit", text: "After inspection passes, you receive all documentation needed for your federal tax credit claim." },
      ],
    },
    faq: {
      h2: "EV Charger Installation FAQ",
      items: [
        { q: "How much does EV charger installation cost?", a: "EV charger installation typically costs $500–$1,500 including permit. The federal tax credit covers 30% up to $1,000, making the effective cost of a $700 installation $490. Panel upgrades add $1,500–$3,500 if needed." },
        { q: "Do I need a panel upgrade for an EV charger?", a: "Many homes — especially those with 100-amp panels — need a panel upgrade. A licensed electrician assesses your panel capacity as part of the free quote." },
        { q: "What is the federal EV charger tax credit?", a: "The Alternative Fuel Vehicle Refueling Property Credit covers 30% of installation cost up to $1,000 for qualifying home EV charger installations. A licensed electrician provides documentation for your claim." },
        { q: "How long does EV charger installation take?", a: "Most Level 2 installations take 2–4 hours. If a panel upgrade is required, allow 6–8 hours total including utility coordination." },
      ],
    },
    closing: {
      h2: "Ready to Get Your Free EV Charger Quote?",
      paragraphs: ["Select your state below. A licensed electrician assesses your panel, installs your Level 2 charger, handles the permit, and provides your tax credit documentation."],
      cta: "Select Your State",
    },
    internalLinks: {
      heading: "Other electrical services:",
      links: [
        { label: "Panel Upgrade Quote", href: "/panel-upgrade" },
        { label: "Outlet Installation Quote", href: "/outlet-installation" },
        { label: "Generator Installation Quote", href: "/generator-installation" },
        { label: "Electrician Quote", href: "/electrician-quote" },
      ],
    },
  },

  "generator-installation": {
    meta: {
      title: "Generator Installation Quote | Standby & Portable | Licensed Electricians",
      description: "Free generator installation quote. Standby & portable generator wiring, transfer switches from licensed electricians. Permit included, no obligation.",
    },
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Generator Installation Quote" }],
    hero: {
      h1: "Free Generator Installation Quotes from Licensed Electricians",
      sub: "Standby and portable generator installation. Transfer switch wiring, permit, and inspection included. Never run a generator without a transfer switch.",
      trustBar: ["Licensed & insured", "Transfer switch included", "Permit included", "Free estimates"],
      cta: "Get Your Free Generator Quote",
    },
    intro: {
      h2: "Get a Real Generator Installation Estimate",
      paragraphs: [
        "Power outages are increasing in frequency and duration across the US. A whole-home standby generator automatically starts within seconds of a power outage — protecting your HVAC, sump pump, refrigerated medications, and security systems.",
        "A free quote from a licensed electrician covers generator sizing, transfer switch installation, permit, and inspection — all in one call.",
      ],
      cta: "Select Your State Below",
    },
    why: {
      h2: "Why Hire a Licensed Electrician for Generator Installation",
      items: [
        { h3: "Never Run Without a Transfer Switch", p: "Generators without transfer switches back-feed into the utility grid — a potentially fatal hazard for utility workers. A transfer switch is always required for any generator connected to your home's wiring." },
        { h3: "Permit Is Always Required", p: "Transfer switch installation requires an electrical permit and inspection in every jurisdiction. Unpermitted generator wiring is an insurance and safety liability." },
        { h3: "Generator Sizing Matters", p: "An undersized generator overloads and fails during outages. A licensed electrician calculates your home's load requirements and recommends the right generator size." },
      ],
    },
    services: {
      h2: "Generator Installation Options Nationwide",
      intro: "Select your state to find licensed electricians for generator installation in your city.",
      items: [
        { h3: "Manual Transfer Switch", description: "For portable generators — safe connection to your home's wiring without back-feed risk. Permit included.", range: "$400 – $900", linkLabel: "Get a quote", href: "/generator-installation" },
        { h3: "Automatic Transfer Switch", description: "Automatically starts and connects your standby generator within seconds of a power outage.", range: "$1,000 – $2,500", linkLabel: "Get a quote", href: "/generator-installation" },
        { h3: "Whole-Home Standby Generator", description: "Complete standby generator installation including electrical and gas (gas contractor separate).", range: "$3,000 – $8,000", linkLabel: "Get a quote", href: "/generator-installation" },
        { h3: "Generator Maintenance & Repair", description: "Annual generator maintenance, load testing, and repair for existing standby systems.", range: "$150 – $400/year", linkLabel: "Get a quote", href: "/generator-installation" },
      ],
    },
    stateGridIntro: {
      h2: "Find a Generator Installation Quote in Your State",
      paragraphs: ["Select your state below to find licensed electricians for generator installation in your city."],
      cta: "Select Your State",
    },
    howItWorks: {
      h2: "How It Works",
      steps: [
        { title: "Load Assessment & Sizing", text: "A licensed electrician calculates your home's electrical load and recommends the right generator size for your needs and budget." },
        { title: "Transfer Switch Installation", text: "Permit pulled, transfer switch installed and wired, generator connected to your electrical system safely." },
        { title: "Inspection & Testing", text: "Final inspection passed, generator tested under load, and you're ready for the next outage." },
      ],
    },
    faq: {
      h2: "Generator Installation FAQ",
      items: [
        { q: "How much does generator installation cost?", a: "Manual transfer switch for a portable generator: $400–$900. Automatic transfer switch: $1,000–$2,500. Whole-home standby (electrical only): $3,000–$8,000. All include permit and inspection." },
        { q: "Do I need a transfer switch for my portable generator?", a: "Yes, always. Running a generator without a transfer switch creates back-feed that can electrocute utility workers and your neighbors. A manual transfer switch costs $400–$900 installed." },
        { q: "What size generator do I need for my home?", a: "Essential loads (fridge, lights, one AC unit, sump pump): 7,500–10,000 watts. Whole home: 20,000–22,000 watts. A licensed electrician calculates your specific load requirements." },
        { q: "Is a permit required for generator installation?", a: "Yes. Transfer switch installation requires an electrical permit and inspection in every jurisdiction. Standby generators may also require gas permits. Your electrician handles all permits." },
      ],
    },
    closing: {
      h2: "Ready to Get Your Free Generator Installation Quote?",
      paragraphs: ["Select your state below. A licensed electrician sizes your generator, installs the transfer switch, handles the permit, and ensures you're ready for the next power outage."],
      cta: "Select Your State",
    },
    internalLinks: {
      heading: "Other electrical services:",
      links: [
        { label: "Panel Upgrade Quote", href: "/panel-upgrade" },
        { label: "EV Charger Installation", href: "/ev-charger-installation" },
        { label: "Electrician Quote", href: "/electrician-quote" },
        { label: "Emergency Electrician", href: "/emergency-electrician" },
      ],
    },
  },

  "emergency-electrician": {
    meta: {
      title: "Emergency Electrician | Same-Day Response | Licensed Electricians",
      description: "Emergency electrician — same-day response for sparking outlets, burning smells & power outages. Licensed electricians available 7 days a week. No obligation.",
    },
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Emergency Electrician" }],
    hero: {
      h1: "Emergency Electrician — Same-Day Response Available",
      sub: "Sparking outlets, burning smells, power outages, tripped breakers that won't reset. Licensed electricians available 7 days a week for same-day response.",
      trustBar: ["Same-day response", "Licensed & insured", "7 days a week", "Upfront pricing"],
      cta: "Call for Emergency Electrician",
    },
    intro: {
      h2: "Electrical Emergencies Require Immediate Professional Response",
      paragraphs: [
        "Sparking outlets and burning smells are fire precursors — not issues to monitor. Electrical fires start and spread faster than most homeowners expect. Never ignore a burning plastic smell or visible sparking from any outlet or panel.",
        "Licensed emergency electricians in most cities can respond within 1–4 hours. Select your state and city below to connect with an emergency electrician now.",
      ],
      cta: "Select Your State Below",
    },
    why: {
      h2: "Situations That Require Immediate Emergency Response",
      items: [
        { h3: "Sparking or Smoking Outlets & Panels", p: "Any sparking, smoking, or visible arcing from an outlet, switch, or panel is a fire emergency. Turn off the circuit at the breaker, do not use the outlet, and call an emergency electrician immediately." },
        { h3: "Breakers That Won't Stay Reset", p: "Breakers that immediately trip after being reset indicate an overloaded circuit, a short circuit, or a failing breaker. Never install a higher-amp breaker to make a circuit stop tripping — this removes your only fire protection." },
        { h3: "Burning Smell Without Visible Source", p: "A burning plastic smell without a visible source often indicates wiring insulation burning inside walls or in the panel. This is a fire emergency — evacuate and call an electrician and 911 if smoke is present." },
      ],
    },
    services: {
      h2: "Emergency Electrical Services Nationwide",
      intro: "Select your state to find licensed emergency electricians in your city.",
      items: [
        { h3: "Emergency Outlet & Panel Repair", description: "Same-day diagnosis and repair for sparking outlets, smoking panels, and burning smell sources.", range: "$150 – $600+", linkLabel: "Call now", href: "/emergency-electrician" },
        { h3: "Emergency Breaker & Circuit Repair", description: "Breakers that won't stay reset, tripped GFCI/AFCI that won't reset, and circuit failures.", range: "$150 – $400", linkLabel: "Call now", href: "/emergency-electrician" },
        { h3: "Power Outage Diagnosis", description: "Determine whether power loss is a utility issue or internal panel/main breaker failure — and coordinate utility response if needed.", range: "$150 – $400", linkLabel: "Call now", href: "/emergency-electrician" },
        { h3: "Storm Damage Electrical Repair", description: "Surge damage, lightning damage, and storm-related electrical failures — with insurance documentation.", range: "$200 – $1,500", linkLabel: "Call now", href: "/emergency-electrician" },
      ],
    },
    stateGridIntro: {
      h2: "Find an Emergency Electrician in Your State",
      paragraphs: ["Select your state below to find licensed emergency electricians in your city. Same-day response available."],
      cta: "Select Your State",
    },
    howItWorks: {
      h2: "How Emergency Electrician Response Works",
      steps: [
        { title: "Call Now", text: "Select your state and city to connect with a licensed emergency electrician. Most respond within 1–4 hours." },
        { title: "Diagnosis & Safe Repair", text: "The electrician diagnoses the source of the emergency, makes the home safe, and provides a complete repair estimate." },
        { title: "Insurance Documentation", text: "For storm or surge damage, you receive documentation for your homeowner insurance claim." },
      ],
    },
    faq: {
      h2: "Emergency Electrician FAQ",
      items: [
        { q: "How fast can an emergency electrician respond?", a: "Most licensed emergency electricians can respond within 1–4 hours for same-day service. If there is visible smoke or fire, evacuate and call 911 first — then call an electrician." },
        { q: "What counts as an electrical emergency?", a: "Sparking outlets or panels, burning smells, smoking wiring, breakers that won't stay reset, complete power loss to the home, and any electrical situation following a storm are all emergencies requiring immediate professional response." },
        { q: "Should I reset my breaker myself?", a: "You can reset a breaker once. If it trips again immediately or won't stay reset, call a licensed electrician. Repeated tripping indicates a real problem — not a nuisance." },
        { q: "Does homeowner insurance cover emergency electrical repairs?", a: "Most policies cover sudden electrical damage from storms, lightning, and power surges. Pre-existing wiring defects are typically excluded. A licensed electrician documents the cause for your insurance claim." },
      ],
    },
    closing: {
      h2: "Emergency Electrician — Call Now",
      paragraphs: ["Don't wait. Electrical emergencies get more dangerous with time. Select your state below to connect with a licensed emergency electrician in your city. Same-day response available."],
      cta: "Select Your State",
    },
    internalLinks: {
      heading: "Other electrical services:",
      links: [
        { label: "Electrician Quote", href: "/electrician-quote" },
        { label: "Panel Upgrade Quote", href: "/panel-upgrade" },
        { label: "Free Electrical Inspection", href: "/electrical-inspection" },
        { label: "Generator Installation", href: "/generator-installation" },
      ],
    },
  },
};

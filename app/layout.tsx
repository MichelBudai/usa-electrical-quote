import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PhoneCallButton } from "@/components/PhoneCallButton";
import { getCurrentSiteConfig } from "@/lib/getSiteConfig";
import { getSiteConfigValues } from "@/lib/siteConfig";

export async function generateMetadata(): Promise<Metadata> {
  const config = getCurrentSiteConfig();
  return {
    metadataBase: new URL(config.siteUrl),
    title: `Free ${config.name} Quotes | Licensed Local ${config.namePlural} | ${config.siteName}`,
    description: `Get free ${config.name.toLowerCase()} quotes from licensed local ${config.namePlural.toLowerCase()} across the US. Compare estimates in 4,000+ cities. No obligation.`,
    verification: {
      google: "ckod_5zAhfgl96Eq6KAkO4vakw8GluUJ2n0GnF-YxqQ",
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = getCurrentSiteConfig();
  const { PHONE_TEL, CTA_CALL_LABEL } = getSiteConfigValues();

  return (
    <html lang="en">
      <body>
        {config.ga4Id && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${config.ga4Id}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${config.ga4Id}');
              `}
            </Script>
            <Script id="phone-tracking" strategy="afterInteractive">
              {`document.addEventListener('click', function(e) {
                var el = e.target.closest('a[href^="tel:"]');
                if (el && typeof gtag !== 'undefined') {
                  var callValues = {'plumbing':40,'pest-control':50,'roofing':62,'electrical':40,'tree-removal':38,'hvac':53,'water-damage':75,'mold-remediation':68,'solar':90,'flooring':35,'bathroom-remodel':50,'kitchen-remodel':58}; var slug = window.location.hostname.replace('usa-','').replace('-quote.com',''); var callValue = callValues[slug] || 40; gtag('event', 'phone_call_click', { event_category: 'conversion', event_label: el.href, value: callValue, currency: 'USD' });
                }
              });`}
            </Script>
          </>
        )}
        <Header
          phoneTel={config.phoneTel}
          ctaLabel={`Call Now - ${config.phoneDisplay}`}
          siteName={config.siteName}
          services={config.services}
        />
        <main className="main-content">
          {children}
        </main>
        <Footer
          phoneTel={PHONE_TEL}
          ctaLabel={CTA_CALL_LABEL}
          services={config.services}
        />
        <PhoneCallButton phoneTel={PHONE_TEL} ctaLabel={CTA_CALL_LABEL} />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { getSiteConfigValues } from "@/lib/siteConfig";

export function generateMetadata(): Metadata {
  const { SITE_NAME } = getSiteConfigValues();
  return {
    title: `Disclaimer | ${SITE_NAME}`,
    description: `Disclaimer for ${SITE_NAME}.`,
  };
}

const styles = {
  wrap: { maxWidth: 720, margin: "0 auto", padding: "2rem 1rem" },
  h1: { fontSize: "1.75rem", fontWeight: 700, marginBottom: "1rem" },
  p: { marginBottom: "1rem", lineHeight: 1.6 },
  disclaimer: { marginTop: "1.5rem", padding: "1rem", background: "#f5f5f5", borderRadius: 8 },
};

export default function DisclaimerPage() {
  const { SITE_NAME } = getSiteConfigValues();
  const disclaimerText = `Disclaimer: ${SITE_NAME} is a free service to assist homeowners in connecting with local service providers. All contractors/providers are independent and ${SITE_NAME} does not warrant or guarantee any work performed. It is the responsibility of the homeowner to verify that the hired contractor furnishes the necessary license and insurance required for the work being performed. All persons depicted in a photo or video are actors or models and not contractors listed on ${SITE_NAME}.`;

  return (
    <article style={styles.wrap}>
      <h1 style={styles.h1}>Disclaimer</h1>
      <p style={styles.p}>Last updated: March 2025.</p>

      <div style={styles.disclaimer}>
        <p style={{ ...styles.p, marginBottom: 0 }}>
          {disclaimerText}
        </p>
      </div>
    </article>
  );
}

/**
 * Dynamic state page content — loads the right content based on current site.
 */
import { getCurrentSiteConfig } from "./getSiteConfig";
import { getStatePageContent as getNicheStatePageContent, type StatePageContent } from "./statePageContentElectrical";

export type { StatePageContent };

const CONTENT_BY_NICHE: Record<string, typeof getNicheStatePageContent> = {
  "electrical": getNicheStatePageContent,
};

export function getStatePageContent(
  serviceSlug: string,
  serviceLabel: string,
  stateName: string,
  stateAbbr: string,
  stateSlug: string
) {
  const config = getCurrentSiteConfig();
  const fn = CONTENT_BY_NICHE[config.slug] ?? getNicheStatePageContent;
  return fn(serviceSlug as never, serviceLabel, stateName, stateAbbr, stateSlug) as StatePageContent;
}

import { electricalConfig } from "./sites/electrical";

const SITE_CONFIGS_BY_SLUG = {
  "electrical": electricalConfig,
} as const;

const SITE_CONFIGS_BY_HOST: Record<string, typeof electricalConfig> = {
  "usa-electrical-quote.com": electricalConfig,
  "www.usa-electrical-quote.com": electricalConfig,
  "localhost:3000": electricalConfig,
};

export type SiteConfig = typeof electricalConfig;

export function getSiteConfig(hostname: string): SiteConfig {
  return SITE_CONFIGS_BY_HOST[hostname] ?? electricalConfig;
}

export function getSiteConfigBySlug(slug: string): SiteConfig {
  return SITE_CONFIGS_BY_SLUG[slug as keyof typeof SITE_CONFIGS_BY_SLUG] ?? electricalConfig;
}

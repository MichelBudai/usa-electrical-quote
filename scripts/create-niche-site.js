/* eslint-disable no-console */
/**
 * Clone le master `usa-home-services` vers un nouveau site `usa-<slug>-quote`,
 * puis injecte les fichiers niche depuis `niches/<slug>/...` et patche les dispatchers/config.
 *
 * Usage:
 *   node scripts/create-niche-site.js roofing
 *
 * Options:
 *   --targetDir "C:\path\to\usa-roofing-quote"
 *   --hosts "usa-roofing-quote.com,www.usa-roofing-quote.com"
 *   --dry-run
 */

const fs = require("fs/promises");
const fssync = require("fs");
const path = require("path");

function toKebab(input) {
  return String(input || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function slugToCamel(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part, i) => (i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join("");
}

function nowStamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(
    d.getMinutes()
  )}${pad(d.getSeconds())}`;
}

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) {
      args._.push(a);
      continue;
    }
    const key = a.slice(2);
    const next = argv[i + 1];
    if (next && !next.startsWith("--")) {
      args[key] = next;
      i++;
    } else {
      args[key] = true;
    }
  }
  return args;
}

async function pathExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function copyDir(src, dest, { dryRun = false } = {}) {
  if (dryRun) return;
  await fs.cp(src, dest, {
    recursive: true,
    force: true,
    filter: (item) => {
      const rel = path.relative(src, item);
      if (!rel) return true;
      const parts = rel.split(path.sep);
      const top = parts[0];
      if (top === "node_modules" || top === ".next" || top === "out" || top === ".git") return false;
      if (top === ".cursor") return false;
      return true;
    },
  });
}

async function copyFile(src, dest, { dryRun = false } = {}) {
  if (dryRun) return;
  await ensureDir(path.dirname(dest));
  await fs.copyFile(src, dest);
}

async function writeFile(dest, content, { dryRun = false } = {}) {
  if (dryRun) return;
  await ensureDir(path.dirname(dest));
  await fs.writeFile(dest, content, "utf8");
}

async function readFile(p) {
  return await fs.readFile(p, "utf8");
}

async function patchPackageJson(targetRoot, slug, { dryRun = false } = {}) {
  const pkgPath = path.join(targetRoot, "package.json");
  if (!(await pathExists(pkgPath))) return;
  const raw = await readFile(pkgPath);
  const pkg = JSON.parse(raw);
  pkg.name = `usa-${slug}-quote`;
  await writeFile(pkgPath, JSON.stringify(pkg, null, 2) + "\n", { dryRun });
}

function buildConfigIndexTs({ nicheSlug, configVarName, hosts }) {
  const hostLines = hosts
    .map((h) => `  "${h}": ${configVarName},`)
    .join("\n");

  return `import { ${configVarName} } from "./sites/${nicheSlug}";

const SITE_CONFIGS_BY_SLUG = {
  "${nicheSlug}": ${configVarName},
} as const;

const SITE_CONFIGS_BY_HOST: Record<string, typeof ${configVarName}> = {
${hostLines}
  "localhost:3000": ${configVarName},
};

export type SiteConfig = typeof ${configVarName};

export function getSiteConfig(hostname: string): SiteConfig {
  return SITE_CONFIGS_BY_HOST[hostname] ?? ${configVarName};
}

export function getSiteConfigBySlug(slug: string): SiteConfig {
  return SITE_CONFIGS_BY_SLUG[slug as keyof typeof SITE_CONFIGS_BY_SLUG] ?? ${configVarName};
}
`;
}

function buildCityDispatcherTs({ nicheSlug, nichePascal }) {
  return `/**
 * Dynamic city service content — loads the right content based on current site.
 */
import { getCurrentSiteConfig } from "./getSiteConfig";
import {
  getServiceCityPageContent as getNicheCityContent,
  type ServiceCityContent,
  type ServiceContentParams,
} from "./cityServiceContent${nichePascal}";

export type { ServiceCityContent, ServiceContentParams };

const CONTENT_BY_NICHE: Record<string, typeof getNicheCityContent> = {
  "${nicheSlug}": getNicheCityContent,
};

export function getServiceCityPageContent(service: string, params: Record<string, unknown>) {
  const config = getCurrentSiteConfig();
  const fn = CONTENT_BY_NICHE[config.slug] ?? getNicheCityContent;
  return fn(service, params) as ServiceCityContent;
}
`;
}

function buildStateDispatcherTs({ nicheSlug, nichePascal }) {
  return `/**
 * Dynamic state page content — loads the right content based on current site.
 */
import { getCurrentSiteConfig } from "./getSiteConfig";
import { getStatePageContent as getNicheStatePageContent, type StatePageContent } from "./statePageContent${nichePascal}";

export type { StatePageContent };

const CONTENT_BY_NICHE: Record<string, typeof getNicheStatePageContent> = {
  "${nicheSlug}": getNicheStatePageContent,
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
`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const nicheRaw = args._[0];
  const nicheSlug = toKebab(nicheRaw);
  if (!nicheSlug) {
    console.error("Missing niche slug. Example: node scripts/create-niche-site.js roofing");
    process.exit(1);
  }

  const dryRun = Boolean(args["dry-run"]);
  const masterRoot = process.cwd();
  const defaultTarget = path.resolve(masterRoot, "..", `usa-${nicheSlug}-quote`);
  const targetRoot = args.targetDir ? path.resolve(String(args.targetDir)) : defaultTarget;

  const hosts = String(args.hosts || `usa-${nicheSlug}-quote.com,www.usa-${nicheSlug}-quote.com`)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const nichePackRoot = path.join(masterRoot, "niches", nicheSlug);
  const packConfig = path.join(nichePackRoot, "config", "sites", `${nicheSlug}.ts`);
  const packCity = path.join(nichePackRoot, "lib", `cityServiceContent${slugToCamel(nicheSlug).replace(/^./, (c) => c.toUpperCase())}.ts`);
  const packState = path.join(nichePackRoot, "lib", `statePageContent${slugToCamel(nicheSlug).replace(/^./, (c) => c.toUpperCase())}.ts`);

  if (!(await pathExists(packConfig))) {
    console.error(`Pack missing: ${packConfig}`);
    process.exit(1);
  }
  if (!(await pathExists(packCity))) {
    console.error(`Pack missing: ${packCity}`);
    process.exit(1);
  }
  if (!(await pathExists(packState))) {
    console.error(`Pack missing: ${packState}`);
    process.exit(1);
  }

  if (await pathExists(targetRoot)) {
    const backup = `${targetRoot}__backup__${nowStamp()}`;
    console.log(`Target exists. Backup -> ${backup}`);
    if (!dryRun) await fs.rename(targetRoot, backup);
  }

  console.log(`Clone master -> ${targetRoot}`);
  await copyDir(masterRoot, targetRoot, { dryRun });

  // Inject niche pack files
  console.log("Inject niche pack files");
  await copyFile(packConfig, path.join(targetRoot, "config", "sites", `${nicheSlug}.ts`), { dryRun });
  await copyFile(packCity, path.join(targetRoot, "lib", path.basename(packCity)), { dryRun });
  await copyFile(packState, path.join(targetRoot, "lib", path.basename(packState)), { dryRun });

  // Patch config/index.ts (mono-niche in new repo)
  const configVarName = `${slugToCamel(nicheSlug)}Config`;
  console.log("Write config/index.ts");
  await writeFile(
    path.join(targetRoot, "config", "index.ts"),
    buildConfigIndexTs({ nicheSlug, configVarName, hosts }),
    { dryRun }
  );

  // Patch dispatchers to point at niche content
  const nichePascal = slugToCamel(nicheSlug).replace(/^./, (c) => c.toUpperCase());
  console.log("Write lib/cityServiceContent.ts + lib/statePageContent.ts");
  await writeFile(
    path.join(targetRoot, "lib", "cityServiceContent.ts"),
    buildCityDispatcherTs({ nicheSlug, nichePascal }),
    { dryRun }
  );
  await writeFile(
    path.join(targetRoot, "lib", "statePageContent.ts"),
    buildStateDispatcherTs({ nicheSlug, nichePascal }),
    { dryRun }
  );

  // Patch package.json name
  console.log("Patch package.json name");
  await patchPackageJson(targetRoot, nicheSlug, { dryRun });

  console.log("Done.");
  console.log(`Next: cd "${targetRoot}"`);
  console.log("Then: npm install ; npm run build");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


import { promises as fs } from "node:fs";
import path from "node:path";

type MetricSummary = {
  url: string;
  formFactor: string;
  runs: number;
  performanceScoreMedian: number | null;
  lcpMsMedian: number | null;
  tbtMsMedian: number | null;
  clsMedian: number | null;
};

type RunSummary = {
  timestamp: string; // derived from filenames
  gitCommit?: string;
  entries: MetricSummary[];
};

const LIGHTHOUSE_DIR = path.resolve("metrics/lighthouse");
const HISTORY_DIR = path.resolve("metrics/history");

const isJson = (file: string): boolean => file.toLowerCase().endsWith(".json");
const isManifest = (name: string): boolean =>
  path.basename(name) === "manifest.json";
const extractTimestamp = (name: string): string | null => {
  // Support both ISO-like and underscore formats emitted by LHCI DATETIME
  // Examples:
  //   2025-08-14T18:51:04-es-...
  //   2025_08_14_18_51_04-es-...
  const iso = name.match(/^(\d{4}-\d{2}-\d{2}T\d{2}[:\-]?\d{2}[:\-]?\d{2})-/);
  if (iso) return iso[1];
  const under = name.match(/^(\d{4}_\d{2}_\d{2}_\d{2}_\d{2}_\d{2})-/);
  if (under) return under[1];
  return null;
};

const extractFormFactor = (name: string): string => {
  // Extract formFactor from filename pattern: ...-mobile. or ...-desktop.
  const match = name.match(/-(\w+)\.(html|json)$/);
  return match ? match[1] : "unknown";
};
const looksLikeTimedReport = (name: string): boolean =>
  extractTimestamp(name) !== null;

const median = (values: number[]): number | null => {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
};

async function ensureDir(dir: string): Promise<void> {
  await fs.mkdir(dir, { recursive: true });
}

async function readLatestTimestamp(files: string[]): Promise<string | null> {
  // Filenames follow pattern: %%DATETIME%%-%%PATHNAME%%-%%VARIANT%%.json
  // Extract leading token before first '-'
  const timestamps = files
    .map((f) => path.basename(f))
    .filter((name) => !isManifest(name))
    .map((name) => extractTimestamp(name))
    .filter((v): v is string => Boolean(v));
  if (timestamps.length === 0) return null;
  // Choose lexicographically max as latest
  timestamps.sort();
  return timestamps[timestamps.length - 1] ?? null;
}

async function loadJsonReportsForTimestamp(
  timestamp: string
): Promise<{ data: any[]; formFactor: string }[]> {
  const all = await fs.readdir(LIGHTHOUSE_DIR);
  const jsonFiles = all
    .filter(isJson)
    .filter((name) => looksLikeTimedReport(name))
    .filter((name) => name.startsWith(timestamp + "-"));

  // Group by formFactor
  const formFactorGroups = new Map<string, string[]>();
  for (const file of jsonFiles) {
    const formFactor = extractFormFactor(file);
    const list = formFactorGroups.get(formFactor) ?? [];
    list.push(file);
    formFactorGroups.set(formFactor, list);
  }

  const results: { data: any[]; formFactor: string }[] = [];
  for (const [formFactor, files] of formFactorGroups) {
    const data = await Promise.all(
      files.map(async (name) => {
        const full = path.join(LIGHTHOUSE_DIR, name);
        const content = await fs.readFile(full, "utf8");
        try {
          return JSON.parse(content);
        } catch {
          return null;
        }
      })
    );
    results.push({ data: data.filter(Boolean), formFactor });
  }
  return results;
}

function toEntryByUrl(reports: any[], formFactor: string): MetricSummary[] {
  const groups = new Map<string, any[]>();
  for (const r of reports) {
    const url: string = r.finalUrl ?? r.requestedUrl ?? "";
    if (!url) continue;
    const list = groups.get(url) ?? [];
    list.push(r);
    groups.set(url, list);
  }

  const entries: MetricSummary[] = [];
  for (const [url, group] of groups) {
    const perfScores: number[] = [];
    const lcp: number[] = [];
    const tbt: number[] = [];
    const cls: number[] = [];

    for (const r of group) {
      const categories = r.categories ?? {};
      const audits = r.audits ?? {};
      if (categories.performance?.score != null) {
        perfScores.push(Number(categories.performance.score) * 100);
      }
      if (audits["largest-contentful-paint"]?.numericValue != null) {
        lcp.push(Number(audits["largest-contentful-paint"].numericValue));
      }
      if (audits["total-blocking-time"]?.numericValue != null) {
        tbt.push(Number(audits["total-blocking-time"].numericValue));
      }
      if (audits["cumulative-layout-shift"]?.numericValue != null) {
        cls.push(Number(audits["cumulative-layout-shift"].numericValue));
      }
    }

    entries.push({
      url,
      formFactor,
      runs: group.length,
      performanceScoreMedian: median(perfScores),
      lcpMsMedian: median(lcp),
      tbtMsMedian: median(tbt),
      clsMedian: median(cls),
    });
  }
  return entries.sort((a, b) => a.url.localeCompare(b.url));
}

async function getGitCommit(): Promise<string | undefined> {
  try {
    const { exec } = await import("node:child_process");
    const commit = await new Promise<string>((resolve) => {
      exec("git rev-parse --short HEAD", (err, stdout) => {
        if (err) return resolve("");
        resolve(String(stdout).trim());
      });
    });
    return commit || undefined;
  } catch {
    return undefined;
  }
}

async function main(): Promise<void> {
  await ensureDir(LIGHTHOUSE_DIR);
  await ensureDir(HISTORY_DIR);

  const files = (await fs.readdir(LIGHTHOUSE_DIR)).filter(isJson);
  if (files.length === 0) {
    console.error("No Lighthouse JSON reports found in", LIGHTHOUSE_DIR);
    return;
  }

  // Prefer manifest.json if present
  const manifestPath = path.join(LIGHTHOUSE_DIR, "manifest.json");
  let latestTimestamp = await readLatestTimestamp(files);
  try {
    const manifestRaw = await fs.readFile(manifestPath, "utf8");
    const manifest = JSON.parse(manifestRaw) as {
      runs?: Array<{ jsonPath?: string } | { lhr?: string }>;
    };
    const manifestJsons: string[] = [];
    for (const run of manifest.runs ?? []) {
      const candidate = (run as any).jsonPath ?? (run as any).lhr;
      if (typeof candidate === "string") {
        manifestJsons.push(path.basename(candidate));
      }
    }
    const tsFromManifest = await readLatestTimestamp(manifestJsons);
    if (tsFromManifest) latestTimestamp = tsFromManifest;
  } catch {
    // ignore if manifest doesn't exist or can't be parsed
  }
  if (!latestTimestamp) {
    console.error("Could not determine latest timestamp from reports.");
    return;
  }

  const reportGroups = await loadJsonReportsForTimestamp(latestTimestamp);
  if (reportGroups.length === 0) {
    console.error("No reports matched latest timestamp", latestTimestamp);
    return;
  }

  const allEntries: MetricSummary[] = [];
  for (const { data: reports, formFactor } of reportGroups) {
    if (reports.length > 0) {
      allEntries.push(...toEntryByUrl(reports, formFactor));
    }
  }

  const summary: RunSummary = {
    timestamp: latestTimestamp,
    gitCommit: await getGitCommit(),
    entries: allEntries,
  };

  const outfile = path.join(
    HISTORY_DIR,
    `lhci-${latestTimestamp}.summary.json`
  );
  await fs.writeFile(outfile, JSON.stringify(summary, null, 2) + "\n", "utf8");
  console.log("Wrote summary:", outfile);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

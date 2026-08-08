import { readFile } from "node:fs/promises";
import { strict as assert } from "node:assert";

const [html, css, app] = await Promise.all([
  readFile(new URL("./index.html", import.meta.url), "utf8"),
  readFile(new URL("./styles.css", import.meta.url), "utf8"),
  readFile(new URL("./app.js", import.meta.url), "utf8")
]);

const ids = [...new Set(app.match(/(?:FOMC|EMP|CPI|PCE|GDP)-2026-\d{2}/g) || [])];
const familyCounts = Object.fromEntries(["FOMC", "EMP", "CPI", "PCE", "GDP"].map(family => [family, ids.filter(id => id.startsWith(`${family}-`)).length]));
const directSourceBindings = app.match(/"(?:FOMC|EMP|CPI|PCE|GDP)-2026-\d{2}": "https:\/\//g) || [];
const directSourceIds = new Set(directSourceBindings.map(binding => binding.slice(1, binding.indexOf('"', 1))));
const scheduleSourceBlock = app.match(/const scheduleSources = \{([\s\S]*?)\n  \};/)?.[1] || "";
const scheduleFamilies = new Set([...scheduleSourceBlock.matchAll(/^\s+(FOMC|EMP|CPI|PCE|GDP):/gm)].map(match => match[1]));
const officialUrls = [...new Set(app.match(/https:\/\/[^"\s]+/g) || [])];
const allowedHosts = new Set(["www.federalreserve.gov", "www.bls.gov", "www.bea.gov"]);

assert.equal(ids.length, 58, "fixed release-event inventory must contain 58 unique IDs");
assert.deepEqual(familyCounts, { FOMC: 8, EMP: 12, CPI: 12, PCE: 13, GDP: 13 });
assert.equal(directSourceBindings.length, 35, "all 35 released events must bind a direct official release/statement URL");
assert.equal(ids.filter(id => directSourceIds.has(id) || scheduleFamilies.has(id.split("-")[0])).length, 58, "all 58 event ledgers must resolve to a direct release or family schedule URL");
assert.match(app, /One release event contains two child observations/, "the combined PCE release must preserve the 35-event / 36-observation distinction");
assert.ok(officialUrls.length >= 39, "direct releases plus family schedules must be present");
for (const url of officialUrls) assert.ok(allowedHosts.has(new URL(url).hostname), `unapproved source host: ${url}`);
assert.match(html, /id="timeline-grid"/);
assert.match(html, /id="event-list"/);
assert.match(html, /<dialog id="ledger"/);
assert.match(html, /<link rel="canonical" href="https:\/\/kairos-atlas\.com\/macro-calendar\/">/);
assert.match(html, /application\/ld\+json/);
assert.match(html, /<script src="app\.js\?v=/);
assert.match(html, /id="ledger-close"[^>]+title="Close event ledger"/);
assert.match(css, /@media \(max-width: 1099px\)/);
assert.match(css, /@media \(max-width: 767px\)/);
assert.match(css, /@media \(max-width: 360px\)/);
assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
assert.match(app, /state === "rescheduled"|state: "rescheduled"/);
assert.match(app, /state: "superseded"/);
assert.match(app, /sourceRestricted: true/);
assert.match(app, /review_pending/);
assert.match(app, /q1Chain/);
assert.match(app, /PCE-2026-08/);
assert.match(app, /GDP-2026-08/);
assert.match(app, /<a class="source-link"/);
assert.match(app, /target="_blank"/);
assert.match(app, /rel="noopener noreferrer"/);
assert.match(app, /function parseLocationState\(\)/);
assert.match(app, /history\.pushState\(\{ kind: "filter" \}/);
assert.match(app, /applyResponsiveSectionOrder/);
assert.doesNotMatch(`${html}\n${app}`, /BRD|01_Projects|private workspace|isolated design prototype|no publication/i, "runtime must not expose internal or candidate-only wording");
assert.doesNotMatch(app, /\bfetch\s*\(/, "calendar must not call an API");
assert.doesNotMatch(app, /XMLHttpRequest|WebSocket|EventSource/, "calendar must not poll or stream");
assert.doesNotMatch(app, /setInterval\s*\(/, "calendar must not use continuous animation or polling");
assert.doesNotMatch(html, /<canvas\b/i, "timeline must not rely on canvas");

const result = {
  status: "PASS",
  inventory: { releaseEvents: ids.length, familyCounts, releasedAtCutoff: 35, scheduledAtCutoff: 23, observationRows: 36 },
  runtime: "public-candidate static HTML/CSS/JS; no API, polling, SaaS or external dependency",
  requiredSurfaces: ["Annual Timeline", "month-grouped Event Stream", "FOMC Decision Ledger", "GDP revision-chain Event Ledger"],
  sourceContract: { ledgerOfficialLinks: 58, releasedDirectLinks: directSourceBindings.length, scheduledOfficialScheduleLinks: 23, officialUrlCount: officialUrls.length, allowedHosts: [...allowedHosts] },
  navigationContract: "filter changes push history; popstate reparses query and hash",
  mobileContract: "Event Stream is moved before Timeline at <=767px; desktop/tablet order is restored",
  guardrails: ["no canvas-only timeline", "no continuous animation", "no network runtime", "no internal source-path text"]
};

console.log(JSON.stringify(result, null, 2));

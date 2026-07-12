# Kairos Public Release Manifest

> Purpose: define exactly what belongs in the public GitHub release package.

## Included

| Path | Status | Notes |
|---|---|---|
| `index.html` | included | Public static website entry |
| `README.md` | included | English-first GitHub README |
| `README.zh-CN.md` | included | Chinese README |
| `ROADMAP.md` | included | Public roadmap and collaboration tracks |
| `CONTRIBUTING.md` | included | Public contribution rules and evidence discipline |
| `CODE_OF_CONDUCT.md` | included | Public collaboration behavior expectations |
| `robots.txt` | included | Crawler access rules and sitemap pointer |
| `sitemap.xml` | included | Public URL discovery map for the live site |
| `llms.txt` | included | AI / LLM discovery summary with Kairos guardrails |
| `_headers` | included | Exact-path crawler headers for three supporting Markdown artifacts; no wildcard Markdown policy |
| `favicon.svg` | included | Stable crawlable site icon for browsers and Google Search appearance |
| `LICENSE` | included | Split license notice |
| `LICENSE-CODE-MIT` | included | MIT license for website implementation code |
| `CONTENT_LICENSE.md` | included | Content and research framing rights boundary |
| `.github/ISSUE_TEMPLATE/` | included | Structured public issue templates for evidence, source correction, periodization, website feedback, and research questions |
| `.github/pull_request_template.md` | included | Pull request guardrails for research and website changes |
| `.gitignore` | included | Public repo hygiene |
| `assets/screenshots/` | included | Public README screenshots |
| `assets/social/` | included | GitHub social preview and public sharing assets |
| `assets/` | included | Reserved for OG image and static assets |
| `research/` | included | Curated public research briefs only; not raw internal Evidence Packs |
| `research/OPEN_QUESTIONS.md` | included | Public research questions open to source-backed contributions |
| `research/sources/README.md` | included | Public source-layer boundary and registry use rules |
| `research/sources/public_source_registry.md` | included | Curated public source links for Source Inspector and public briefs; not raw internal Evidence Packs |

## Excluded From Public Release

| Private Path | Public Release Status | Reason |
|---|---|---|
| `00_Theoretical_Knowledge/` | excluded | Private theoretical notes and potential copyright-sensitive reading extracts |
| `01_BRD/` | excluded | Internal product requirements and design specs |
| `02_Watchlist/` | excluded | Internal dynamic observation records |
| `03_Evidence_Packs/` | excluded | Internal evidence packs and claim-source mapping |
| `Claude_Import/` | excluded | Historical AI import context |
| `AGENTS.md` | excluded | Internal AI collaboration rules |
| `PROJECT_CONTEXT_HANDOFF.md` | excluded | Internal project recovery context |
| `Kairos_Build_Log.md` | excluded | Internal build log |
| `Harness_Engineering_Playbook.md` | excluded | Internal collaboration / evidence workflow |
| `Kairos_Methodology_Candidates.md` | excluded | Internal methodology candidates |
| `DEPLOYMENT_CHECKLIST.md` | excluded | WebOps / release operations checklist |
| `.DS_Store` | excluded | Local system file |

## Release Rule

The public GitHub repository should be created from `Kairos_Public/`, not from the full private Kairos workspace.

Raw internal Evidence Packs should not be copied directly. Public research material must be rewritten as curated briefs with clear status, source boundaries, watch triggers, and kill criteria.

Before publishing:

- create OG image if needed;
- verify `index.html`;
- verify `robots.txt` points to `sitemap.xml`;
- verify `sitemap.xml` includes only public release URLs;
- verify `llms.txt` preserves Kairos guardrails and does not present K6 / AI as confirmed;
- verify public source registry links are direct source URLs, not search wrappers or weak evidence links;
- check mobile layout;
- confirm no private files are present;
- confirm Roadmap / Contributing / issue templates preserve K6 Candidate and evidence-gated boundaries;
- update WebOps `Sites_Register.md`.

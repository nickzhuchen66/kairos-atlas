# Kairos Public Release Manifest

> Purpose: define exactly what belongs in the public GitHub release package.

## Included

| Path | Status | Notes |
|---|---|---|
| `index.html` | included | Public static website entry |
| `README.md` | included | English-first GitHub README |
| `README.zh-CN.md` | included | Chinese README |
| `LICENSE` | included | Split license notice |
| `LICENSE-CODE-MIT` | included | MIT license for website implementation code |
| `CONTENT_LICENSE.md` | included | Content and research framing rights boundary |
| `.gitignore` | included | Public repo hygiene |
| `assets/screenshots/` | included | Public README screenshots |
| `assets/` | included | Reserved for OG image and static assets |
| `research/` | included | Curated public research briefs only; not raw internal Evidence Packs |

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
- check mobile layout;
- confirm no private files are present;
- update WebOps `Sites_Register.md`.

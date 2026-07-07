# Kairos · Macro Cycle Observatory

**Kairos** is a public macro-cycle observatory for regime readings, long-wave context, watchlists, asset implications, and evidence-gated validation.

Chinese name: **周期天象图**  
English subtitle: **Macro Cycle Observatory**

Public repository: **kairos-atlas**  
Planned website domain: **kairos-atlas.com**

`kairos-atlas` is the public repository and domain identity. `Macro Cycle Observatory` remains the product subtitle because the site is designed as an observatory-style macro dashboard, while the Atlas name anchors the public URL and the Long Wave Atlas concept.

Kairos is designed to make macro-cycle judgment more inspectable: every major reading should remain clickable, reviewable, and falsifiable.

## What Kairos Shows

- **Current Regime**: the current macro-cycle weather map.
- **Cycle Stack**: a six-layer view of macro clock, credit cycle, liquidity / policy, global dollar, long-wave context, and market validation.
- **Long Wave Atlas**: K4 / K5 historical phases and K6 Candidate Watch.
- **Watchlist**: observations that could change the current reading.
- **Asset Behavior Map**: regime implications across major asset groups.
- **Evidence Ledger**: supported, contested, unconfirmed, evidence gaps, and validation notes.

## What Kairos Is Not

Kairos is not:

- a date oracle;
- a trading signal system;
- investment advice;
- a promise that K6 has been confirmed;
- a news feed that automatically updates macro judgments.

## Product Guardrails

- **K6 remains Candidate Watch**, not confirmed K6.
- Watchlist items are observations, not confirmed facts.
- Contested claims must remain visibly contested.
- Partial / source-review material must not be presented as fully supported.
- Macro readings should preserve evidence status, confidence, related watch items, and kill criteria.

## Public Release Scope

This public release repository is intentionally curated.

It includes:

- the public website entry file;
- public-facing README files;
- public release metadata;
- content licensing notes.

It does **not** include the private research workspace, internal BRDs, theoretical notes, raw evidence packs, AI collaboration context, or internal build logs.

## Local Preview

From this folder:

```bash
python3 -m http.server 8765
```

Open:

```text
http://127.0.0.1:8765/index.html
http://127.0.0.1:8765/index.html?lang=en
```

## Repository Structure

```text
.
├── index.html
├── README.md
├── README.zh-CN.md
├── LICENSE
├── LICENSE-CODE-MIT
├── CONTENT_LICENSE.md
├── PUBLIC_RELEASE_MANIFEST.md
├── .gitignore
└── assets/
```

## License

Kairos uses a split license model:

- **Website implementation code**: MIT License. See `LICENSE-CODE-MIT`.
- **Kairos content and research framing**: all rights reserved. See `CONTENT_LICENSE.md`.

Because `index.html` contains both implementation code and Kairos content, the MIT License applies only to the implementation code portions. It does not grant rights to commercially reuse or republish the Kairos name, 周期天象图 name, macro-cycle framing, website copy, regime descriptions, Watchlist language, Evidence Ledger wording, or research interpretation.

## Language

The website supports Chinese and English modes. The GitHub repository uses English as the default language for global accessibility, with Chinese documentation provided in `README.zh-CN.md`.

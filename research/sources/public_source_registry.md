# Kairos Public Curated Source Registry

> Status: v0.1 seed registry
> Last reviewed: 2026-07-08
> Boundary: curated public links only; not internal Evidence Packs

This registry lists public sources that may support Kairos website Source Inspector panels, public research briefs, and GitHub evidence contributions.

It does not expose internal Evidence Packs, L / Gemini raw outputs, private source-repair notes, or unreviewed search material.

## 1. Use Rules

- `show`: source can be used in public Source Inspector or public research briefs.
- `source-repair`: source direction is useful, but URL, data series, claim-source mapping, or interpretation still needs repair.
- `internal-only`: source may inform internal work but should not be shown as public evidence.
- `reject`: do not use as a Kairos evidence source.

Every public source must keep both `Supports` and `Limits`. Kairos does not treat evidence links as rhetorical decoration.

## 2. Source Hardness Legend

| Hardness | Meaning |
| --- | --- |
| primary | Official data, official institutional release, legal filing, or direct policy source |
| high-quality secondary | Academic paper, central-bank research, multilateral research, or reputable historical synthesis |
| secondary | Press, industry analysis, encyclopedia, or non-primary summary |
| weak | Unverified, indirect, search-wrapper, hallucination-prone, or unsuitable as core evidence |

## 3. Long Wave Atlas Sources

| Source ID | Related Node | Related Claim | Source Title | URL | Publisher | Date | Type | Hardness | Supports | Limits | Public Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SRC-K4D-001 | K4-D | Dollar-gold break / Nixon Shock | Nixon Shock | https://history.state.gov/milestones/1969-1976/nixon-shock | Office of the Historian, U.S. Department of State | n/a | official history | primary | Supports the 1971 suspension of dollar-gold convertibility as a monetary-system break. | Does not quantify inflation, asset returns, or long-wave dating by itself. | show |
| SRC-K4D-002 | K4-D | London Gold Pool stress before Bretton Woods break | The Collapse of the London Gold Pool | https://www.federalreservehistory.org/essays/gold-pool-collapses | Federal Reserve History | n/a | central-bank history | high-quality secondary | Supports the pre-1971 stress in the gold-dollar system. | Historical essay; should not be treated as raw market data. | show |
| SRC-K4D-003 | K4-D | Bretton Woods endgame | The End of the Bretton Woods System | https://www.federalreservehistory.org/essays/bretton-woods-ends | Federal Reserve History | n/a | central-bank history | high-quality secondary | Supports the transition from Bretton Woods to floating exchange rates. | Does not settle long-wave periodization. | show |
| SRC-K4D-004 | K4-D | 1970s inflation / inflation peak | Consumer Price Index for All Urban Consumers: All Items in U.S. City Average | https://fred.stlouisfed.org/series/CPIAUCSL | FRED / BLS | updated regularly | official data | primary | Supports CPI inflation analysis when transformed correctly. | Level series; YoY inflation must be calculated correctly. | show |
| SRC-K4D-005 | K4-D | 1982 labor-market stress | Unemployment Rate | https://fred.stlouisfed.org/series/UNRATE | FRED / BLS | updated regularly | official data | primary | Supports unemployment stress around the 1981-1982 recession. | Does not explain causality or asset behavior. | show |
| SRC-K5A-001 | K5-A | Fed funds path during Volcker / post-Volcker disinflation | Effective Federal Funds Rate | https://fred.stlouisfed.org/series/FEDFUNDS | FRED / Federal Reserve Board | updated regularly | official data | primary | Supports effective fed funds rate history. | Effective monthly averages are not identical to FOMC target rates. | show |
| SRC-K5A-002 | K5-A | Dollar reset / broad dollar movement | Trade Weighted U.S. Dollar Index: Broad, Goods | https://fred.stlouisfed.org/series/TWEXBMTH | FRED / Federal Reserve Board | updated regularly | official data | primary | Supports broad dollar-index movement with corrected values. | Do not reuse unverified L / model-provided values without recalculation. | show |
| SRC-K5A-003 | K5-A | Plaza Accord | Statement of the G5 Finance Ministers and Central Bank Governors | https://g7.utoronto.ca/finance/fm850922.htm | G7 Information Centre, University of Toronto archive | 1985-09-22 | official document archive | high-quality secondary | Supports the 1985 coordinated policy agreement to address dollar exchange rates. | Archive host is secondary; meaning must not be reversed. | show |
| SRC-K5A-004 | K5-A | Louvre Accord | Statement of the G6 Finance Ministers and Central Bank Governors | https://g7.utoronto.ca/finance/fm870222.htm | G7 Information Centre, University of Toronto archive | 1987-02-22 | official document archive | high-quality secondary | Supports the 1987 policy coordination phase after Plaza. | Does not by itself prove asset performance. | show |
| SRC-K5A-005 | K5-A | Latin American debt crisis | Latin American Debt Crisis | https://www.federalreservehistory.org/essays/latin-american-debt-crisis | Federal Reserve History | n/a | central-bank history | high-quality secondary | Supports the link between global rates, recession, debt structure, and emerging-market stress. | Does not prove strong dollar as the sole cause. | show |
| SRC-K5B-001 | K5-B | 1990-1991 recession and 1990s expansion anchor | U.S. Business Cycle Expansions and Contractions | https://www.nber.org/research/data/us-business-cycle-expansions-and-contractions | NBER | updated periodically | business-cycle chronology | primary | Supports recession start/end dates as cycle anchors. | NBER dates do not define long-wave phases by themselves. | show |
| SRC-K5B-002 | K5-B | Great Moderation framework | The Great Moderation | https://www.federalreserve.gov/boarddocs/speeches/2004/20040220/ | Federal Reserve Board | 2004-02-20 | central-bank speech | primary | Supports lower volatility as an observed macro framework. | Causes remain contested: structural change, improved policy, and good luck are all discussed. | show |
| SRC-K5B-003 | K5-B | Dot-com valuation warning / irrational exuberance | Central Banking in a Democratic Society | https://www.federalreserve.gov/boarddocs/speeches/1996/19961205.htm | Federal Reserve Board | 1996-12-05 | central-bank speech | primary | Supports Greenspan's early valuation-warning language. | Does not time the dot-com peak or prove a crash prediction. | show |
| SRC-K5B-004 | K5-B | Global trade expansion | Trade (% of GDP) | https://data.worldbank.org/indicator/NE.TRD.GNFS.ZS | World Bank | updated regularly | official multilateral data | primary | Supports global trade expansion as goods and services trade share of GDP. | Does not isolate supply-chain outsourcing, transfer pricing, or China-WTO effects. | show |
| SRC-K5B-005 | K5-B | ICT productivity acceleration | The Resurgence of Growth in the Late 1990s: Is Information Technology the Story? | https://ideas.repec.org/a/aea/jecper/v14y2000i4p3-22.html | Journal of Economic Perspectives / IDEAS | 2000 | academic paper | high-quality secondary | Supports ICT capital deepening and productivity acceleration as a late-1990s explanation. | Growth accounting is model-based and not a single-cause proof. | show |
| SRC-K5C-001 | K5-C | Global saving glut hypothesis | The Global Saving Glut and the U.S. Current Account Deficit | https://www.federalreserve.gov/boarddocs/speeches/2005/200503102/ | Federal Reserve Board | 2005-03-10 | central-bank speech | primary | Supports the global-saving-glut framework and current-account imbalance discussion. | It is a policy-maker framework, not an exhaustive crisis cause. | show |
| SRC-K5C-002 | K5-C | Global imbalances and dollar recycling | Global Imbalances: Links to Economic and Financial Stability | https://www.federalreserve.gov/newsevents/speech/bernanke20110218a.htm | Federal Reserve Board | 2011-02-18 | central-bank speech | primary | Supports Bernanke's later discussion of global imbalances. | Does not replace direct housing, shadow-banking, or securitization data. | show |
| SRC-K5C-003 | K5-C | Saving glut / banking glut effects | The Effects of the Saving and Banking Glut on the U.S. Economy | https://www.newyorkfed.org/medialibrary/media/research/staff_reports/sr648.pdf | Federal Reserve Bank of New York | 2013-11 | central-bank research | high-quality secondary | Supports distinguishing saving glut and banking glut channels. | Model estimates should not be quoted as direct accounting facts without caveat. | show |
| SRC-K5C-004 | K5-C | Crisis liquidity facilities / bridge to public balance sheet | Crisis Response | https://www.federalreserve.gov/monetarypolicy/bst_crisisresponse.htm | Federal Reserve Board | updated page | official policy source | primary | Supports the list and role of crisis liquidity facilities. | Does not itself explain the whole K5-C to K5-D transition. | show |
| SRC-K5C-005 | K5-C | Oil / commodity stress around 2008 | Crude Oil Prices: West Texas Intermediate | https://fred.stlouisfed.org/series/DCOILWTICO | FRED / U.S. Energy Information Administration | updated regularly | official data | primary | Supports WTI oil price history. | Use care distinguishing spot, futures, daily, monthly, and intraday peaks. | show |
| SRC-K5D-001 | K5-D | Fed balance sheet / QE regime | Assets: Total Assets: Total Assets (Less Eliminations from Consolidation) | https://fred.stlouisfed.org/series/WALCL | FRED / Federal Reserve Board | updated regularly | official data | primary | Supports Fed balance-sheet expansion and contraction analysis. | Does not identify specific QE program effects without event mapping. | show |
| SRC-K5D-002 | K5-D | Equity price trend | S&P 500 | https://fred.stlouisfed.org/series/SP500 | FRED / S&P Dow Jones Indices | updated regularly | market data | primary | Supports S&P 500 price-index observations where history is available. | Price index only; not total return and not always sufficient for long historical windows. | show |
| SRC-K5D-003 | K5-D | Long-rate decline | Market Yield on U.S. Treasury Securities at 10-Year Constant Maturity | https://fred.stlouisfed.org/series/GS10 | FRED / Federal Reserve Board | updated regularly | official data | primary | Supports 10-year Treasury yield analysis. | Yield series does not directly prove bond total returns. | show |
| SRC-K5D-004 | K5-D | Fiscal shock bridge into 2020 | Federal Surplus or Deficit | https://fred.stlouisfed.org/series/FYFSD | FRED / Office of Management and Budget | updated annually | official data | primary | Supports federal surplus / deficit tracking. | Annual fiscal data cannot show monthly transfer timing. | show |

## 4. K5-E / K6 Candidate Sources

| Source ID | Related Node | Related Claim | Source Title | URL | Publisher | Date | Type | Hardness | Supports | Limits | Public Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SRC-K5E-001 | K5-E | 2020 fiscal shock | The Federal Budget in Fiscal Year 2020 | https://www.cbo.gov/publication/57170 | Congressional Budget Office | 2021-04-30 | official budget report | primary | Supports the scale of the FY2020 federal deficit. | Does not prove permanent fiscal dominance. | show |
| SRC-K5E-002 | K5-E | Net interest pressure | Federal Net Interest Outlays, 1940 to 2034 | https://www.cbo.gov/publication/60114 | Congressional Budget Office | 2024-06-18 | official fiscal projection | primary | Supports net-interest pressure as a fiscal watch item. | Forecast path depends on future rates, deficits, and debt dynamics. | show |
| SRC-K5E-003 | K5-E | Financial conditions despite high rates | Chicago Fed National Financial Conditions Index | https://fred.stlouisfed.org/series/NFCI | FRED / Chicago Fed | updated regularly | official data | primary | Supports tracking whether financial conditions are tighter or easier than average. | Composite index may hide stress in smaller borrowers or bank credit. | show |
| SRC-K5E-004 | K5-E | Real-rate regime | 10-Year Treasury Inflation-Indexed Security, Constant Maturity | https://fred.stlouisfed.org/series/DFII10 | FRED / Federal Reserve Board | updated regularly | official data | primary | Supports 10-year real-rate observations. | Real rates alone do not explain gold, equities, or credit conditions. | show |
| SRC-K5E-005 | K5-E | High-yield credit stress | ICE BofA US High Yield Index Option-Adjusted Spread | https://fred.stlouisfed.org/series/BAMLH0A0HYM2 | FRED / ICE Data Indices | updated regularly | market data | primary | Supports high-yield spread tracking. | Index composition may not capture private credit or small-business lending stress. | show |
| SRC-K6C-001 | K6 Candidate | AI business adoption | Large Firms With at Least 20 Employees Biggest AI Users | https://www.census.gov/library/stories/2026/05/ai-use-businesses.html | U.S. Census Bureau | 2026-05-26 | official statistical article | primary | Supports AI adoption-rate watch by firm size and sector. | Experimental survey data; self-reported usage may miss embedded AI use. | show |
| SRC-K6C-002 | K6 Candidate | AI adoption / task diffusion | Businesses' Use of Artificial Intelligence in Producing Goods and Services | https://www.census.gov/library/working-papers/2026/adrm/CES-WP-26-25.html | U.S. Census Bureau | 2026 | official working paper | primary | Supports details on AI use across business functions and tasks. | Does not by itself prove macro productivity diffusion. | show |
| SRC-K6C-003 | K6 Candidate | AI and data-center electricity demand | Electricity 2024 | https://www.iea.org/reports/electricity-2024 | International Energy Agency | 2024-01-24 | multilateral energy report | high-quality secondary | Supports data-center / AI / crypto electricity-demand watch. | Forecasts are scenario-based and may shift with efficiency, siting, and policy. | show |
| SRC-K6C-004 | K6 Candidate | Cautious AI macro productivity view | The Simple Macroeconomics of AI | https://www.nber.org/papers/w32487 | NBER / Daron Acemoglu | 2024-05 | academic working paper | high-quality secondary | Supports caution against premature broad TFP claims. | Working paper; one model-based view, not final truth. | show |
| SRC-K6C-005 | K6 Candidate | Productivity paradox / delayed benefits framework | Artificial Intelligence and the Modern Productivity Paradox | https://www.nber.org/papers/w24001 | NBER | 2017-11 | academic working paper | high-quality secondary | Supports the idea that GPT benefits may lag adoption and require complementary investment. | Written before the current GenAI cycle; apply by analogy with caution. | show |

## 5. KW-006 AI Capex Sources

| Source ID | Related Node | Related Claim | Source Title | URL | Publisher | Date | Type | Hardness | Supports | Limits | Public Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SRC-KW006-001 | KW-006 | Hyperscaler capex / cash-flow support | Microsoft FY2025 Form 10-K | https://www.sec.gov/Archives/edgar/data/789019/000095017025100235/msft-20250630.htm | SEC / Microsoft | 2025 | company filing | primary | Supports Microsoft capex, cash flow, commitments, and risk-factor review. | Does not isolate pure AI capex from broader cloud infrastructure. | show |
| SRC-KW006-002 | KW-006 | Hyperscaler capex / commitments | Alphabet FY2025 Form 10-K | https://www.sec.gov/Archives/edgar/data/1652044/000165204426000018/goog-20251231.htm | SEC / Alphabet | 2026 | company filing | primary | Supports Alphabet capex and commitments review. | Does not prove future AI ROI. | show |
| SRC-KW006-003 | KW-006 | Cloud / AI infrastructure spending | Amazon FY2025 Form 10-K | https://www.sec.gov/Archives/edgar/data/1018724/000101872426000004/amzn-20251231.htm | SEC / Amazon | 2026 | company filing | primary | Supports Amazon capex, AWS context, and financing review. | Does not separate every AI-specific infrastructure component. | show |
| SRC-KW006-004 | KW-006 | AI infrastructure / capex watch | Meta FY2025 Form 10-K | https://www.sec.gov/Archives/edgar/data/1326801/000162828026003942/meta-20251231.htm | SEC / Meta | 2026 | company filing | primary | Supports Meta capex, AI infrastructure, and operating-risk review. | Does not confirm K6 or broad productivity diffusion. | show |
| SRC-KW006-005 | KW-006 | AI compute supply chain | NVIDIA FY2026 Results | https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-fourth-quarter-and-fiscal-2026 | NVIDIA | 2026 | company official results | primary | Supports AI accelerator revenue and demand context. | Vendor revenue does not prove downstream ROI or macro productivity. | show |
| SRC-KW006-006 | KW-006 | Independent AI infrastructure financing watch | CoreWeave Q1 2026 Results | https://investors.coreweave.com/news/news-details/2026/CoreWeave-Reports-Strong-First-Quarter-2026-Results/ | CoreWeave | 2026 | company official results | primary | Supports CoreWeave as one financing-structure watch example. | CoreWeave is not a proxy for the whole AI cycle. | show |
| SRC-KW006-007 | KW-006 | Data-center REIT financing watch | Digital Realty Q1 2026 Results | https://investor.digitalrealty.com/static-files/186019d2-aa98-4bf5-a1c6-15bb5af879ed | Digital Realty | 2026 | company official results | primary | Supports data-center operator financing and capex watch. | One company does not prove systemic financing stress. | show |
| SRC-KW006-008 | KW-006 | Large-load / grid constraint watch | NERC Level 3 Alert | https://www.nerc.com/newsroom/nerc-issues-level-3-alert-reliability-guideline-focused-on-large-load-challenges | NERC | 2026 | reliability alert | primary | Supports large-load grid constraint monitoring. | Alert does not by itself prove AI capex fragility. | show |
| SRC-KW006-009 | KW-006 | Interconnection / construction bottleneck watch | PJM Construction Metrics January 2026 | https://www.pjm.com/-/media/DotCom/committees-groups/subcommittees/ips/2026/20260126/20260126-item-04---construction-metrics.pdf | PJM | 2026-01-26 | grid operator document | primary | Supports power-infrastructure bottleneck tracking. | Regional document; cannot generalize globally without cross-check. | show |
| SRC-KW006-010 | KW-006 | Emergency power-system constraint watch | DOE Emergency Order No. 202-26-23 | https://www.energy.gov/documents/doe-emergency-order-no-202-26-23pdf | U.S. Department of Energy | 2026 | government order | primary | Supports emergency-order monitoring as a power-system stress signal. | Does not establish AI as the sole cause. | show |

## 6. Source Repair Needed

| Repair ID | Area | Issue | Preferred Repair Path | Public Status |
| --- | --- | --- | --- | --- |
| REPAIR-001 | Gold price | Direct gold-price source remains unresolved. | Repair to LBMA, World Gold Council, or verified FRED gold series. | source-repair |
| REPAIR-002 | Dollar index | DXY / broad dollar exact ranges require clean source and calculation. | Use Fed broad dollar index or verified ICE DXY source. | source-repair |
| REPAIR-003 | Dot-com asset performance | Nasdaq / S&P dot-com performance needs reliable market source. | Use Nasdaq, S&P, CRSP, Shiller, or another clearly licensed source. | source-repair |
| REPAIR-004 | ABCP / shadow banking | ABCP series and shadow-banking scale need stronger direct support. | Repair to FRED, Fed, BIS, or academic primary sources. | source-repair |
| REPAIR-005 | NAFTA / WTO / China WTO | Globalization institution nodes need official source package. | Use WTO, USTR, treaty text, or accession documents. | source-repair |
| REPAIR-006 | EM crises | Mexico 1994, Asia 1997, Russia/LTCM 1998 need hard sources. | Use IMF, BIS, Fed History, Treasury, or official crisis reports. | source-repair |
| REPAIR-007 | Equity / bond total returns | Price-index and yield sources do not equal total returns. | Use clearly licensed total-return datasets or academic sources. | source-repair |

## 7. Rejected / Do Not Use As Core Evidence

| Reject ID | Source Type | Reason |
| --- | --- | --- |
| REJECT-001 | Wikipedia as core evidence | Useful for orientation only; not a Kairos core evidence link. |
| REJECT-002 | Google search wrapper links | Not source URLs. |
| REJECT-003 | Grokipedia or similar generated summaries | Source hardness too weak and hallucination risk too high. |
| REJECT-004 | Unverified FRED gold links | Series code / URL must be repaired first. |
| REJECT-005 | Industry articles as primary support | May be used as leads, not as primary support for major claims. |
| REJECT-006 | L / Gemini raw responses | External model output is a search mirror, not a source. |

## 8. Website Display Rule

When this registry is used by the website, do not dump every link into the page. Use a layered display:

```text
Current Regime Board: source status only
Long Wave Atlas node card: 2-3 key links
Source Inspector: curated source cards
Research brief: related source list
GitHub: source correction and counterevidence submission path
```

Kairos should show evidence without turning the interface into a link dump.

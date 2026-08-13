(() => {
  "use strict";

  const CUTOFF = "2026-08-13T04:00:00Z";
  const MONTHS = {
    en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    zh: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
  };
  const FAMILY = {
    FOMC: { symbol: "F", en: "Federal Reserve decision", zh: "美联储利率决策" },
    EMP: { symbol: "E", en: "Employment Situation", zh: "就业形势报告" },
    CPI: { symbol: "C", en: "Consumer Price Index", zh: "消费者价格指数" },
    PCE: { symbol: "P", en: "Personal Income and Outlays", zh: "个人收入与支出" },
    GDP: { symbol: "G", en: "Gross Domestic Product", zh: "国内生产总值" }
  };
  const COPY = {
    en: {
      product: "Macro Calendar", title: "Macro events, without the false certainty.",
      observatory: "MACRO CYCLE OBSERVATORY",
      cutoff: "Data cutoff · 13 Aug 2026 · 00:00 ET",
      boundary: "Official release ≠ Kairos interpretation. Every record remains human-reviewed and versioned.",
      released: "Released", scheduled: "Scheduled", rescheduled: "Released · rescheduled", superseded: "Released · snapshot superseded",
      pending: "Kairos review pending", restricted: "Batch source restricted · browser verified",
      notReleased: "Official values not released at the fixed cutoff.",
      count: n => `${n} matching event${n === 1 ? "" : "s"}`,
      sameDate: n => `${n} independent records · same release date`,
      eventLedger: "EVENT LEDGER", decisionLedger: "DECISION LEDGER",
      officialRecord: "Official record", releaseIdentity: "Release identity", source: "Source custody",
      reviewBoundary: "This official record does not independently change Current Regime, K5-E, or K6 Candidate Watch.",
      emptyTitle: "No events match this view.", emptyBody: "The selected year or family has no records in the fixed public inventory.",
      loadingTitle: "Loading fixed inventory…", loadingBody: "The stream is preserving its reading order while the local dataset is prepared.",
      errorTitle: "Inventory could not be rendered.", errorBody: "No partial facts are shown. Clear the state preview to return to the fixed local inventory.",
      method: "Method and qualifiers", sources: "Exact source references", revisions: "Revision chain",
      date: "Release date", time: "Official time", reference: "Reference period", status: "State", eventId: "Event ID",
      result: "Released observation snapshot", minutes: "Minutes",
      officialRelease: "Official release", officialSchedule: "Official schedule",
      accessBoundary: "Batch access limitation is separate from release and review status.",
      snapshotBoundary: "The release-time snapshot is preserved separately from later official revisions and Kairos interpretation.",
      selectedStage: "Selected release", priorStage: "Known before selected release", laterStage: "Subsequent release after selected snapshot",
      gdpRevision: "GDP revision vs previous stage", privateSalesRevision: "Private-sales revision vs previous stage",
      baselineStage: "Not applicable · first stage in this chain",
      invalidTitle: "Event link not found.", invalidBody: "The requested record is outside this fixed public inventory.", dismiss: "Dismiss",
      contextAria: "Calendar context", timelineLegendAria: "Timeline legend",
      loadingCode: "LOCAL DATASET · LOADING", errorCode: "RENDER FAILURE · SAFE STOP", emptyCode: "NO MATCHING INVENTORY",
      visualNote: "Timeline node size and position do not encode importance, score, or forecast.",
      clear: "Clear filters",
      footerBoundary: "Semi-static · human-reviewed · event-driven · no automatic regime update",
      footerSource: "Source scope: Federal Reserve · BLS · BEA official records",
      footerHome: "Back to Macro Cycle Observatory"
    },
    zh: {
      product: "宏观日历", title: "记录宏观事件，不制造虚假的确定性。",
      observatory: "周期天象图",
      cutoff: "数据截止 · 2026年8月13日 · 美东时间 00:00",
      boundary: "官方发布 ≠ Kairos 解读。每条记录均保留人工复核与版本边界。",
      released: "已发布", scheduled: "已排期", rescheduled: "已发布 · 曾改期", superseded: "已发布 · 快照已被后续版本取代",
      pending: "Kairos 待复核", restricted: "批量来源受限 · 已经浏览器核验",
      notReleased: "截至固定 cutoff，官方数值尚未发布。",
      count: n => `共 ${n} 条匹配事件`,
      sameDate: n => `同一发布日期 · ${n} 条独立记录`,
      eventLedger: "事件账本", decisionLedger: "决策账本",
      officialRecord: "官方记录", releaseIdentity: "发布身份", source: "来源留存",
      reviewBoundary: "该官方记录不会独立改变 Current Regime、K5-E 或 K6 Candidate Watch。",
      emptyTitle: "当前视图没有匹配事件。", emptyBody: "所选年份或事件类别不在固定候选数据集中。",
      loadingTitle: "正在载入固定事件清单…", loadingBody: "本地数据准备期间，事件流保留稳定阅读顺序。",
      errorTitle: "事件清单无法呈现。", errorBody: "不会显示不完整事实。清除状态预览可返回固定本地清单。",
      method: "方法与限定", sources: "精确来源引用", revisions: "修订链",
      date: "发布日期", time: "官方时间", reference: "参考期", status: "状态", eventId: "事件 ID",
      result: "已发布观察快照", minutes: "会议纪要",
      officialRelease: "官方发布", officialSchedule: "官方日程",
      accessBoundary: "批量访问限制与发布状态、Kairos 复核状态分别记录。",
      snapshotBoundary: "发布时快照与后续官方修订、Kairos 解读分别留存。",
      selectedStage: "当前所选发布", priorStage: "所选发布当时已知", laterStage: "发生在所选发布之后",
      gdpRevision: "GDP 较上一估值修订", privateSalesRevision: "私人国内最终销售较上一估值修订",
      baselineStage: "不适用 · 该链首次估值",
      invalidTitle: "未找到该事件链接。", invalidBody: "请求的记录不在这份固定公开清单内。", dismiss: "关闭提示",
      contextAria: "日历上下文", timelineLegendAria: "时间线图例",
      loadingCode: "本地数据集 · 正在载入", errorCode: "渲染失败 · 安全停止", emptyCode: "无匹配事件",
      visualNote: "时间线节点大小与位置不表达重要性、评分或预测。",
      clear: "清除筛选",
      footerBoundary: "半静态 · 人工复核 · 事件驱动 · 不自动改变周期判断",
      footerSource: "来源范围：Federal Reserve · BLS · BEA 官方记录",
      footerHome: "返回周期天象图"
    }
  };

  const bi = (en, zh) => ({ en, zh });
  const fact = (labelEn, labelZh, valueEn, valueZh = valueEn) => [bi(labelEn, labelZh), bi(valueEn, valueZh)];

  const escapeHtml = value => String(value ?? "").replace(/[&<>\"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[char]));
  const pad = value => String(value).padStart(2, "0");
  const isoDate = value => value.slice(0, 10);
  const utcFromEt = value => `${value.replace(" ", "T")}:00-04:00`;
  const released = value => new Date(value) < new Date(CUTOFF);

  const sourceMap = {
    FOMC: ["FED-FOMC-2026", "Federal Reserve FOMC calendars, statements and implementation notes"],
    EMP: ["BLS-EMP-ARCHIVE / BLS-EMP-SCHEDULE", "BLS Employment Situation archive and release calendar"],
    CPI: ["BLS-CPI-ARCHIVE / BLS-CPI-SCHEDULE", "BLS CPI archive and release calendar"],
    PCE: ["BEA-SCHEDULE-FULL", "BEA Personal Income and Outlays release schedule and releases"],
    GDP: ["BEA-SCHEDULE-FULL", "BEA GDP release schedule and releases"]
  };
  const scheduleSources = {
    FOMC: "https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm",
    EMP: "https://www.bls.gov/schedule/news_release/empsit.htm",
    CPI: "https://www.bls.gov/schedule/news_release/cpi.htm",
    PCE: "https://www.bea.gov/news/schedule/full",
    GDP: "https://www.bea.gov/news/schedule/full"
  };
  const sourceAgency = { FOMC: "Federal Reserve", EMP: "U.S. Bureau of Labor Statistics", CPI: "U.S. Bureau of Labor Statistics", PCE: "U.S. Bureau of Economic Analysis", GDP: "U.S. Bureau of Economic Analysis" };
  const directSources = {
    "FOMC-2026-01": "https://www.federalreserve.gov/newsevents/pressreleases/monetary20260128a.htm",
    "FOMC-2026-02": "https://www.federalreserve.gov/newsevents/pressreleases/monetary20260318a.htm",
    "FOMC-2026-03": "https://www.federalreserve.gov/newsevents/pressreleases/monetary20260429a.htm",
    "FOMC-2026-04": "https://www.federalreserve.gov/newsevents/pressreleases/monetary20260617a.htm",
    "FOMC-2026-05": "https://www.federalreserve.gov/newsevents/pressreleases/monetary20260729a.htm",
    "EMP-2026-01": "https://www.bls.gov/news.release/archives/empsit_01092026.htm",
    "EMP-2026-02": "https://www.bls.gov/news.release/archives/empsit_02112026.htm",
    "EMP-2026-03": "https://www.bls.gov/news.release/archives/empsit_03062026.htm",
    "EMP-2026-04": "https://www.bls.gov/news.release/archives/empsit_04032026.htm",
    "EMP-2026-05": "https://www.bls.gov/news.release/archives/empsit_05082026.htm",
    "EMP-2026-06": "https://www.bls.gov/news.release/archives/empsit_06052026.htm",
    "EMP-2026-07": "https://www.bls.gov/news.release/archives/empsit_07022026.htm",
    "EMP-2026-08": "https://www.bls.gov/news.release/archives/empsit_08072026.htm",
    "CPI-2026-01": "https://www.bls.gov/news.release/archives/cpi_01132026.htm",
    "CPI-2026-02": "https://www.bls.gov/news.release/archives/cpi_02132026.htm",
    "CPI-2026-03": "https://www.bls.gov/news.release/archives/cpi_03112026.htm",
    "CPI-2026-04": "https://www.bls.gov/news.release/archives/cpi_04102026.htm",
    "CPI-2026-05": "https://www.bls.gov/news.release/archives/cpi_05122026.htm",
    "CPI-2026-06": "https://www.bls.gov/news.release/archives/cpi_06102026.htm",
    "CPI-2026-07": "https://www.bls.gov/news.release/archives/cpi_07142026.htm",
    "CPI-2026-08": "https://www.bls.gov/news.release/archives/cpi_08122026.htm",
    "PCE-2026-01": "https://www.bea.gov/news/2026/personal-income-and-outlays-october-and-november-2025",
    "PCE-2026-02": "https://www.bea.gov/news/2026/personal-income-and-outlays-december-2025",
    "PCE-2026-03": "https://www.bea.gov/news/2026/personal-income-and-outlays-january-2026",
    "PCE-2026-04": "https://www.bea.gov/news/2026/personal-income-and-outlays-february-2026",
    "PCE-2026-05": "https://www.bea.gov/news/2026/personal-income-and-outlays-march-2026",
    "PCE-2026-06": "https://www.bea.gov/news/2026/personal-income-and-outlays-april-2026",
    "PCE-2026-07": "https://www.bea.gov/news/2026/personal-income-and-outlays-may-2026",
    "PCE-2026-08": "https://www.bea.gov/news/2026/personal-income-and-outlays-june-2026",
    "GDP-2026-01": "https://www.bea.gov/news/2026/gross-domestic-product-3rd-quarter-2025-updated-estimate-gdp-industry-and-corporate",
    "GDP-2026-02": "https://www.bea.gov/news/2026/gdp-advance-estimate-4th-quarter-and-year-2025",
    "GDP-2026-03": "https://www.bea.gov/news/2026/gdp-second-estimate-4th-quarter-and-year-2025",
    "GDP-2026-04": "https://www.bea.gov/news/2026/gdp-third-estimate-industries-corporate-profits-state-gdp-and-state-personal-income-4th",
    "GDP-2026-05": "https://www.bea.gov/news/2026/gdp-advance-estimate-1st-quarter-2026",
    "GDP-2026-06": "https://www.bea.gov/news/2026/gdp-second-estimate-and-corporate-profits-1st-quarter-2026",
    "GDP-2026-07": "https://www.bea.gov/news/2026/gdp-third-estimate-industries-corporate-profits-state-gdp-and-state-personal-income-1st",
    "GDP-2026-08": "https://www.bea.gov/news/2026/gdp-advance-estimate-2nd-quarter-2026"
  };

  function makeEvent(id, family, reference, dateTime, extras = {}) {
    const isReleased = released(utcFromEt(dateTime));
    const directSource = directSources[id];
    return {
      id, family, reference, dateTime, year: Number(dateTime.slice(0, 4)),
      releaseDate: isoDate(dateTime),
      state: isReleased ? "released" : "scheduled",
      review: isReleased ? "review_pending" : null,
      sourceId: sourceMap[family][0], sourceLabel: sourceMap[family][1],
      sourceUrl: directSource || scheduleSources[family],
      sourceAgency: sourceAgency[family],
      sourceKind: directSource ? "Official release" : "Official schedule",
      ...extras
    };
  }

  const fomcRows = [
    ["FOMC-2026-01", "Jan 27–28", "2026-01-28 14:00"],
    ["FOMC-2026-02", "Mar 17–18 · SEP", "2026-03-18 14:00"],
    ["FOMC-2026-03", "Apr 28–29", "2026-04-29 14:00"],
    ["FOMC-2026-04", "Jun 16–17 · SEP", "2026-06-17 14:00"],
    ["FOMC-2026-05", "Jul 28–29", "2026-07-29 14:00"],
    ["FOMC-2026-06", "Sep 15–16 · SEP", "2026-09-16 14:00"],
    ["FOMC-2026-07", "Oct 27–28", "2026-10-28 14:00"],
    ["FOMC-2026-08", "Dec 8–9 · SEP", "2026-12-09 14:00"]
  ];
  const empRows = [
    ["EMP-2026-01", "December 2025", "2026-01-09 08:30"], ["EMP-2026-02", "January 2026", "2026-02-11 08:30"],
    ["EMP-2026-03", "February 2026", "2026-03-06 08:30"], ["EMP-2026-04", "March 2026", "2026-04-03 08:30"],
    ["EMP-2026-05", "April 2026", "2026-05-08 08:30"], ["EMP-2026-06", "May 2026", "2026-06-05 08:30"],
    ["EMP-2026-07", "June 2026", "2026-07-02 08:30"], ["EMP-2026-08", "July 2026", "2026-08-07 08:30"],
    ["EMP-2026-09", "August 2026", "2026-09-04 08:30"], ["EMP-2026-10", "September 2026", "2026-10-02 08:30"],
    ["EMP-2026-11", "October 2026", "2026-11-06 08:30"], ["EMP-2026-12", "November 2026", "2026-12-04 08:30"]
  ];
  const cpiRows = [
    ["CPI-2026-01", "December 2025", "2026-01-13 08:30"], ["CPI-2026-02", "January 2026", "2026-02-13 08:30"],
    ["CPI-2026-03", "February 2026", "2026-03-11 08:30"], ["CPI-2026-04", "March 2026", "2026-04-10 08:30"],
    ["CPI-2026-05", "April 2026", "2026-05-12 08:30"], ["CPI-2026-06", "May 2026", "2026-06-10 08:30"],
    ["CPI-2026-07", "June 2026", "2026-07-14 08:30"], ["CPI-2026-08", "July 2026", "2026-08-12 08:30"],
    ["CPI-2026-09", "August 2026", "2026-09-11 08:30"], ["CPI-2026-10", "September 2026", "2026-10-14 08:30"],
    ["CPI-2026-11", "October 2026", "2026-11-10 08:30"], ["CPI-2026-12", "November 2026", "2026-12-10 08:30"]
  ];
  const pceRows = [
    ["PCE-2026-01", "October–November 2025 combined", "2026-01-22 10:00"], ["PCE-2026-02", "December 2025", "2026-02-20 08:30"],
    ["PCE-2026-03", "January 2026", "2026-03-13 08:30"], ["PCE-2026-04", "February 2026", "2026-04-09 08:30"],
    ["PCE-2026-05", "March 2026", "2026-04-30 08:30"], ["PCE-2026-06", "April 2026", "2026-05-28 08:30"],
    ["PCE-2026-07", "May 2026", "2026-06-25 08:30"], ["PCE-2026-08", "June 2026", "2026-07-30 08:30"],
    ["PCE-2026-09", "July 2026", "2026-08-26 08:30"], ["PCE-2026-10", "August 2026", "2026-09-30 08:30"],
    ["PCE-2026-11", "September 2026", "2026-10-29 08:30"], ["PCE-2026-12", "October 2026", "2026-11-25 08:30"],
    ["PCE-2026-13", "November 2026", "2026-12-23 08:30"]
  ];
  const gdpRows = [
    ["GDP-2026-01", "2025 Q3 updated estimate", "2026-01-22 08:30"], ["GDP-2026-02", "2025 Q4 advance estimate", "2026-02-20 08:30"],
    ["GDP-2026-03", "2025 Q4 second estimate", "2026-03-13 08:30"], ["GDP-2026-04", "2025 Q4 third estimate", "2026-04-09 08:30"],
    ["GDP-2026-05", "2026 Q1 advance estimate", "2026-04-30 08:30"], ["GDP-2026-06", "2026 Q1 second estimate", "2026-05-28 08:30"],
    ["GDP-2026-07", "2026 Q1 third estimate", "2026-06-25 08:30"], ["GDP-2026-08", "2026 Q2 advance estimate", "2026-07-30 08:30"],
    ["GDP-2026-09", "2026 Q2 second estimate", "2026-08-26 08:30"], ["GDP-2026-10", "2026 Q2 third estimate", "2026-09-30 08:30"],
    ["GDP-2026-11", "2026 Q3 advance estimate", "2026-10-29 08:30"], ["GDP-2026-12", "2026 Q3 second estimate", "2026-11-25 08:30"],
    ["GDP-2026-13", "2026 Q3 third estimate", "2026-12-23 08:30"]
  ];

  const events = [
    ...fomcRows.map(row => makeEvent(row[0], "FOMC", row[1], row[2])),
    ...empRows.map(row => makeEvent(row[0], "EMP", row[1], row[2])),
    ...cpiRows.map(row => makeEvent(row[0], "CPI", row[1], row[2])),
    ...pceRows.map(row => makeEvent(row[0], "PCE", row[1], row[2])),
    ...gdpRows.map(row => makeEvent(row[0], "GDP", row[1], row[2]))
  ];

  function fomcSnapshot(vote, preferenceEn, preferenceZh, dissentEn, dissentZh, sepEn, sepZh, minutesEn, minutesZh, operationEn, operationZh) {
    return {
      summary: bi(`Hold 3.50%–3.75% · statement vote ${vote}`, `维持 3.50%–3.75% · 声明表决 ${vote}`),
      facts: [
        fact("Target range · before / after", "目标区间 · 决策前 / 后", "3.50%–3.75% / 3.50%–3.75%"),
        fact("Change", "利率变动", "0 bp", "0 个基点"),
        fact("Statement vote", "声明表决", vote),
        fact("Rate preference distribution", "利率倾向分布", preferenceEn, preferenceZh),
        fact("Dissent", "异议", dissentEn, dissentZh),
        fact("Implementation parameters", "实施参数", "IORB 3.65%; standing overnight repo 3.75%; ON RRP 3.50% with USD 160bn daily counterparty limit; primary credit 3.75%; Treasury principal rolled over; agency principal reinvested in Treasury bills.", "IORB 3.65%；常备隔夜回购利率 3.75%；ON RRP 3.50%，单一交易对手每日上限 1,600 亿美元；一级信贷利率 3.75%；国债本金到期滚续；机构证券本金再投资于国库券。"),
        fact("Reserve-management wording", "准备金管理措辞", operationEn, operationZh),
        fact("SEP", "经济预测摘要（SEP）", sepEn, sepZh),
        fact("Minutes", "会议纪要", minutesEn, minutesZh)
      ],
      qualifier: bi("Statement vote, rate preference and implementation language are separate official facts. None independently changes the Kairos regime reading.", "声明表决、利率倾向与实施措辞是相互独立的官方事实；任何一项都不会单独改变 Kairos 周期判断。")
    };
  }

  function employmentSnapshot(initial, latest, chain, delta, priorMap, netRevision, unemployment, participationEn, participationZh, earnings, workweek, boundaryEn, boundaryZh) {
    return {
      summary: bi(`Payrolls ${initial} initial / ${latest} latest at cutoff · unemployment ${unemployment}`, `非农就业首发 ${initial} / 截止时点最新 ${latest} · 失业率 ${unemployment}`),
      facts: [
        fact("Payrolls · initial / latest at cutoff", "非农就业 · 首发 / 截止时点最新", `${initial} / ${latest}`),
        fact("Payroll revision chain", "非农修订链", chain),
        fact("Initial-to-latest delta", "首发至最新变化", delta),
        fact("Prior-month mappings in this release", "本次发布披露的前月修订", priorMap),
        fact("Two-month net revision", "前两月净修订", netRevision),
        fact("Unemployment rate · CPS", "失业率 · CPS 住户调查", unemployment),
        fact("Participation · CPS", "劳动参与率 · CPS 住户调查", participationEn, participationZh),
        fact("Average hourly earnings", "平均时薪", earnings),
        fact("Average workweek", "平均每周工时", workweek),
        fact("Vintage / comparability boundary", "版本 / 可比性边界", boundaryEn, boundaryZh)
      ],
      qualifier: bi("Payroll, hours and earnings come from the CES establishment survey; unemployment and participation come from the CPS household survey. Routine revisions are not final annual benchmark history.", "非农、工时与时薪来自 CES 机构调查；失业率与劳动参与率来自 CPS 住户调查。常规月度修订不等于最终年度基准历史。")
    };
  }

  function cpiSnapshot(headline, core, food, energy, shelter, driverEn, driverZh, limitEn, limitZh, extras = {}) {
    return {
      summary: bi(`Headline ${headline} · core ${core}`, `总体 CPI ${headline} · 核心 CPI ${core}`),
      facts: [
        fact("Headline CPI-U · MoM SA / YoY NSA", "总体 CPI-U · 月率季调 / 年率未季调", headline),
        fact("Core CPI-U · MoM SA / YoY NSA", "核心 CPI-U · 月率季调 / 年率未季调", core),
        fact("Food · MoM SA", "食品 · 月率季调", food),
        fact("Energy · MoM SA", "能源 · 月率季调", energy),
        fact("Shelter · MoM SA", "住房 · 月率季调", shelter),
        fact("Release driver", "本次发布的主要驱动", driverEn, driverZh),
        fact("Revision / vintage boundary", "修订 / 版本边界", "CPI-U release snapshot; monthly SA values may change with annual seasonal-factor updates; YoY NSA is final at release for CPI-U.", "CPI-U 发布快照；月率季调值可能随年度季调因子更新而变化；CPI-U 的未季调年率在发布时视为最终值。")
      ],
      qualifier: bi(limitEn, limitZh),
      ...extras
    };
  }

  function pceSnapshot(headline, core, income, nominal, real, saving, revisionEn, revisionZh, boundaryEn, boundaryZh, extras = {}) {
    return {
      summary: bi(`Headline PCE ${headline} · core ${core}`, `总体 PCE ${headline} · 核心 PCE ${core}`),
      facts: [
        fact("Headline PCE price · MoM / YoY", "总体 PCE 价格 · 月率 / 年率", headline),
        fact("Core PCE price · MoM / YoY", "核心 PCE 价格 · 月率 / 年率", core),
        fact("Personal income · MoM", "个人收入 · 月率", income),
        fact("Nominal PCE · MoM", "名义个人消费支出 · 月率", nominal),
        fact("Real PCE · MoM", "实际个人消费支出 · 月率", real),
        fact("Personal saving rate", "个人储蓄率", saving),
        fact("Observed next-release revision", "下一次发布中观察到的修订", revisionEn, revisionZh),
        fact("Snapshot / vintage boundary", "快照 / 版本边界", boundaryEn, boundaryZh)
      ],
      qualifier: bi("Price, income, nominal spending, real consumption and saving remain separate fields. A next-release update is not a final revision and does not independently change the regime reading.", "价格、收入、名义支出、实际消费与储蓄率分别记录。下一次发布中的更新不是最终修订，也不会单独改变周期判断。"),
      ...extras
    };
  }

  function gdpSnapshot(stageEn, stageZh, gdp, gdpRevisionEn, gdpRevisionZh, privateSales, privateRevisionEn, privateRevisionZh, gdiEn, gdiZh, profitsEn, profitsZh, boundaryEn, boundaryZh, chainKey) {
    return {
      summary: bi(`Real GDP ${gdp} SAAR · private final sales ${privateSales} SAAR`, `实际 GDP ${gdp}（SAAR）· 私人国内最终销售 ${privateSales}（SAAR）`),
      facts: [
        fact("Selected estimate stage", "所选估值阶段", stageEn, stageZh),
        fact("Real GDP · QoQ SAAR", "实际 GDP · 环比折年率（SAAR）", gdp),
        fact("GDP revision vs previous estimate", "GDP 较上一估值修订", gdpRevisionEn, gdpRevisionZh),
        fact("Real final sales to private domestic purchasers · SAAR", "私人国内最终销售 · SAAR", privateSales),
        fact("Private-sales revision vs previous estimate", "私人国内最终销售较上一估值修订", privateRevisionEn, privateRevisionZh),
        fact("GDI / GDP-GDI average", "GDI / GDP-GDI 平均值", gdiEn, gdiZh),
        fact("Corporate profits", "企业利润", profitsEn, profitsZh),
        fact("Cutoff / vintage boundary", "截止时点 / 版本边界", boundaryEn, boundaryZh)
      ],
      qualifier: bi("GDP headline, private domestic final sales and GDI are separate observations. SAAR is not YoY; no estimate stage independently confirms recession, soft landing or a regime change.", "GDP headline、私人国内最终销售与 GDI 是相互独立的观察项。SAAR 不是同比；任何单一估值阶段都不能独立确认衰退、软着陆或周期变化。"),
      gdpChain: chainKey
    };
  }

  const snapshots = {
    "FOMC-2026-01": fomcSnapshot("10–2", "10 hold / 2 cut 25bp", "10 票维持 / 2 票倾向降息 25bp", "Miran and Waller preferred a 25bp cut.", "Miran 与 Waller 倾向降息 25bp。", "Not published for this meeting.", "本次会议不发布 SEP。", "Available · released 18 Feb 2026.", "已发布 · 2026年2月18日。", "Increase SOMA Treasury-bill holdings as needed to maintain ample reserves.", "按维持充足准备金所需，增加 SOMA 国库券持有量。"),
    "FOMC-2026-02": fomcSnapshot("11–1", "11 hold / 1 cut 25bp", "11 票维持 / 1 票倾向降息 25bp", "Miran preferred a 25bp cut.", "Miran 倾向降息 25bp。", "Available · 2026 medians: real GDP 2.4%, unemployment 4.4%, PCE 2.7%, core PCE 2.7%, year-end funds rate 3.4%; projections are not a commitment.", "已发布 · 2026年中位数：实际 GDP 2.4%、失业率 4.4%、PCE 2.7%、核心 PCE 2.7%、年末联邦基金利率 3.4%；预测不等于承诺。", "Available · released 8 Apr 2026.", "已发布 · 2026年4月8日。", "Increase SOMA Treasury-bill holdings as needed to maintain ample reserves.", "按维持充足准备金所需，增加 SOMA 国库券持有量。"),
    "FOMC-2026-03": fomcSnapshot("8–4", "11 hold / 1 cut 25bp", "11 票维持 / 1 票倾向降息 25bp", "Miran preferred a 25bp cut; Hammack, Kashkari and Logan supported the hold but dissented from the easing-bias language.", "Miran 倾向降息 25bp；Hammack、Kashkari 与 Logan 支持维持利率，但反对声明中的宽松倾向措辞。", "Not published for this meeting.", "本次会议不发布 SEP。", "Available · released 20 May 2026.", "已发布 · 2026年5月20日。", "Increase SOMA Treasury-bill holdings as needed to maintain ample reserves.", "按维持充足准备金所需，增加 SOMA 国库券持有量。"),
    "FOMC-2026-04": fomcSnapshot("12–0", "12 hold", "12 票一致维持", "None.", "无。", "Available · June medians: real GDP 2.2%, unemployment 4.3%, PCE 3.6%, core PCE 3.3%, year-end funds rate 3.8%; projections are not a commitment.", "已发布 · 6月中位数：实际 GDP 2.2%、失业率 4.3%、PCE 3.6%、核心 PCE 3.3%、年末联邦基金利率 3.8%；预测不等于承诺。", "Available · released 8 Jul 2026.", "已发布 · 2026年7月8日。", "When appropriate, increase SOMA Treasury-bill holdings to maintain ample reserves.", "在适当时增加 SOMA 国库券持有量，以维持充足准备金。"),
    "FOMC-2026-05": fomcSnapshot("9–3", "9 hold / 3 hike 25bp", "9 票维持 / 3 票倾向加息 25bp", "Hammack, Kashkari and Logan preferred a 25bp increase.", "Hammack、Kashkari 与 Logan 倾向加息 25bp。", "Not published for this meeting.", "本次会议不发布 SEP。", "Pending at the fixed cutoff; no release date or conclusion is prefilled.", "固定截止时点仍待发布；不预填发布日期或结论。", "When appropriate, increase SOMA Treasury-bill holdings to maintain ample reserves.", "在适当时增加 SOMA 国库券持有量，以维持充足准备金。"),

    "EMP-2026-01": employmentSnapshot("+50k", "−17k", "+50k → +48k → −17k", "−67k", "Oct 2025 −105k → −173k; Nov 2025 +64k → +56k", "−76k", "4.4%", "62.4% release snapshot", "62.4% 发布快照", "+0.3% MoM / +3.8% YoY", "34.2h", "Two routine revisions observed. The 2025 shutdown affected household-survey collection; annual benchmark and birth-death model changes remained separate.", "已观察到两次常规修订。2025 年政府停摆影响住户调查采集；年度基准与出生-死亡模型变化另行记录。"),
    "EMP-2026-02": employmentSnapshot("+130k", "+160k", "+130k → +126k → +160k", "+30k", "Nov 2025 +56k → +41k; Dec 2025 +50k → +48k", "−17k", "4.3%", "62.5% initial; later population-control update did not reissue this archive", "首发 62.5%；后续人口控制更新未重发本归档", "+0.4% MoM / +3.7% YoY", "34.3h", "Two routine revisions observed. January household estimates carry a population-control revision flag; the archived release was not rewritten.", "已观察到两次常规修订。1月住户调查估值保留人口控制修订标记；归档发布未被改写。"),
    "EMP-2026-03": employmentSnapshot("−92k", "−156k", "−92k → −133k → −156k", "−64k", "Dec 2025 +48k → −17k; Jan 2026 +130k → +126k", "−69k", "4.4%", "62.0% with updated population estimates", "62.0%，采用更新后人口估计", "+0.4% MoM / +3.8% YoY", "34.3h", "Two routine revisions observed. Health-care payrolls reflected strike activity; January and February household data include updated population estimates.", "已观察到两次常规修订。医疗保健就业受罢工活动影响；1月与2月住户数据采用更新后人口估计。"),
    "EMP-2026-04": employmentSnapshot("+178k", "+214k", "+178k → +185k → +214k", "+36k", "Jan 2026 +126k → +160k; Feb 2026 −92k → −133k", "−7k", "4.3%", "61.9%", "61.9%", "+0.2% MoM / +3.5% YoY", "34.2h", "Two routine revisions observed at the fixed cutoff; later annual benchmark revisions may still alter the series.", "固定截止时点已观察到两次常规修订；后续年度基准修订仍可能改变该序列。"),
    "EMP-2026-05": employmentSnapshot("+115k", "+148k", "+115k → +179k → +148k", "+33k", "Feb 2026 −133k → −156k; Mar 2026 +178k → +185k", "−16k", "4.3%", "61.8%", "61.8%", "+0.2% MoM / +3.6% YoY", "34.3h", "Two routine revisions observed at the fixed cutoff; latest does not mean final benchmark value.", "固定截止时点已观察到两次常规修订；“最新”不等于最终基准值。"),
    "EMP-2026-06": employmentSnapshot("+172k", "+63k", "+172k → +129k → +63k", "−109k", "Mar 2026 +185k → +214k; Apr 2026 +115k → +179k", "+93k", "4.3%", "61.8%", "61.8%", "+0.3% MoM / +3.4% YoY", "34.3h", "Two routine revisions observed at the current cutoff; latest does not mean final benchmark value.", "当前截止时点已观察到两次常规修订；“最新”不等于最终基准值。"),
    "EMP-2026-07": { ...employmentSnapshot("+57k", "+20k", "+57k → +20k", "−37k", "Apr 2026 +179k → +148k; May 2026 +172k → +129k", "−74k", "4.2%", "61.5%, down 0.3pp in the release", "61.5%，本次发布下降 0.3 个百分点", "+0.3% MoM / +3.5% YoY", "34.3h", "One routine revision observed at the current cutoff. The preliminary benchmark scheduled for 28 Aug does not update official CES estimates.", "当前截止时点已观察到一次常规修订。8月28日预定公布的初步基准不会改写官方 CES 估值。"), sourceRestricted: true },
    "EMP-2026-08": { ...employmentSnapshot("−23k", "−23k", "−23k", "0k", "May 2026 +129k → +63k; June 2026 +57k → +20k", "−103k", "4.1%", "61.4%; employment-population ratio 58.9%", "61.4%；就业人口比 58.9%", "+0.1% MoM (+$0.02) / +3.2% YoY", "34.3h", "Unrevised at the current cutoff. Local government education −50k, retail −19k and financial activities −14k offset health care +22k. The preliminary benchmark due 28 Aug does not update official CES estimates.", "当前截止时点尚未修订。地方政府教育就业减少 5 万、零售减少 1.9 万、金融活动减少 1.4 万，抵消了医疗保健增加 2.2 万。8月28日预定公布的初步基准不会改写官方 CES 估值。"), sourceRestricted: true },

    "CPI-2026-01": cpiSnapshot("+0.3% / 2.7%", "+0.2% / 2.6%", "+0.7%", "+0.3%", "+0.4%", "Shelter was the largest headline factor; food rose 0.7%.", "住房是总体指数最大贡献项；食品上涨 0.7%。", "October/November 2025 gaps limit a continuous short-term sequence; CPI is not the Fed's PCE target.", "2025年10月/11月缺口限制了连续短期比较；CPI 不是美联储的 PCE 目标指标。"),
    "CPI-2026-02": cpiSnapshot("+0.2% / 2.4%", "+0.3% / 2.5%", "+0.2%", "−1.5%", "+0.2%", "Shelter rose while energy fell 1.5%.", "住房上涨，能源下降 1.5%。", "Headline deceleration does not isolate persistent services inflation. The release moved from 11 Feb to 13 Feb after an official schedule change.", "总体通胀放缓不能单独识别持续性服务通胀。本次发布因官方日程调整由2月11日改至2月13日。", { state: "rescheduled" }),
    "CPI-2026-03": cpiSnapshot("+0.3% / 2.4%", "+0.2% / 2.5%", "+0.4%", "+0.6%", "+0.2%", "Shelter, food and energy all rose.", "住房、食品与能源均上涨。", "No single component explains the full monthly move; one release does not establish an inflation regime.", "没有单一分项可以解释全部月度变化；一次发布不能确认通胀 regime。"),
    "CPI-2026-04": cpiSnapshot("+0.9% / 3.3%", "+0.2% / 2.6%", "0.0%", "+10.9%", "+0.3%", "Energy +10.9%; gasoline +21.2% accounted for nearly three quarters of headline MoM.", "能源上涨 10.9%；汽油上涨 21.2%，约占总体月率的四分之三。", "The energy shock does not establish broad-based inflation by itself.", "能源冲击本身不能确认广泛通胀。"),
    "CPI-2026-05": cpiSnapshot("+0.6% / 3.8%", "+0.4% / 2.8%", "+0.5%", "+3.8%", "+0.6%", "Energy accounted for more than 40% of headline MoM; shelter also rose 0.6%.", "能源贡献了总体月率的 40% 以上；住房也上涨 0.6%。", "Core rose 0.4%, so the month was not energy-only; it still does not independently confirm a regime shift.", "核心 CPI 上涨 0.4%，因此并非仅由能源驱动；但仍不能单独确认 regime 转变。"),
    "CPI-2026-06": cpiSnapshot("+0.5% / 4.2%", "+0.2% / 2.9%", "+0.2%", "+3.9%", "+0.3%", "Energy +3.9% accounted for more than 60% of headline MoM.", "能源上涨 3.9%，贡献了总体月率的 60% 以上。", "Core remained positive at +0.2%; component evidence must be reviewed with PCE and other families.", "核心 CPI 仍上涨 0.2%；分项证据必须与 PCE 及其他事件类别交叉复核。"),
    "CPI-2026-07": cpiSnapshot("−0.4% / 3.5%", "0.0% / 2.6%", "+0.2%", "−5.7%", "+0.1%", "Energy −5.7% was the largest contributor to the headline decline.", "能源下降 5.7%，是总体指数下跌的最大贡献项。", "Core was flat rather than negative; shelter and food still rose. One reversal does not confirm the end of a supply shock.", "核心 CPI 为持平而非负增长；住房与食品仍上涨。一次反转不能确认供应冲击已经结束。"),
    "CPI-2026-08": { ...cpiSnapshot("+0.1% / 3.4%", "+0.2% / 2.5%", "+0.1%", "−1.5%", "+0.1%", "Shelter rose 0.1% and accounted for roughly two-thirds of the monthly all-items increase; lower energy prices restrained headline CPI.", "住房上涨 0.1%，约占总体 CPI 月度涨幅的三分之二；能源价格下降压低了总体读数。", "One month does not confirm a durable inflation-regime change. Energy fell month over month but remained 14.7% higher year over year; CPI is not the Fed's PCE target.", "单月数据不足以确认持久的通胀 regime 转换。能源环比下降，但同比仍上涨 14.7%；CPI 不是美联储的 PCE 目标指标。"), sourceRestricted: true },

    "PCE-2026-01": { summary: bi("Combined release · two observation rows", "合并发布 · 两条观察记录"), facts: [
      fact("Oct observation · headline / core", "10月观察 · 总体 / 核心 PCE", "+0.2% / 2.7% · +0.2% / 2.7%"),
      fact("Oct income / nominal / real PCE / saving", "10月收入 / 名义消费 / 实际消费 / 储蓄率", "+0.1% / +0.5% / +0.3% / 3.7%"),
      fact("Nov observation · headline / core", "11月观察 · 总体 / 核心 PCE", "+0.2% / 2.8% · +0.2% / 2.8%"),
      fact("Nov income / nominal / real PCE / saving", "11月收入 / 名义消费 / 实际消费 / 储蓄率", "+0.3% / +0.5% / +0.3% / 3.5%"),
      fact("Observed next-release revision", "下一次发布中观察到的修订", "Nov nominal PCE +0.5% → +0.4%; real PCE +0.3% → +0.2%. No approved next-release revision row is listed for Oct.", "11月名义 PCE +0.5% → +0.4%；实际 PCE +0.3% → +0.2%。批准的修订表未列出10月的下一次发布修订。"),
      fact("Combined-release boundary", "合并发布边界", "One release event contains Oct and Nov child observations; it counts once in the calendar and twice in the observation ledger. Missing Oct CPI inputs used BEA's approved imputation treatment.", "一次发布包含10月与11月两条子观察；在日历中计一次，在观察账本中计两次。缺失的10月 CPI 输入采用 BEA 说明的估算处理。")
    ], qualifier: bi("The combined release replaced two previously scheduled releases. Imputed source inputs are not direct observations and do not authorize a regime conclusion.", "该合并发布取代了两次原计划发布。估算的来源输入不是直接观察，也不能授权周期结论。") },
    "PCE-2026-02": pceSnapshot("+0.4% / 2.9%", "+0.4% / 3.0%", "+0.3%", "+0.4%", "+0.1%", "3.6%", "No next-release change is listed for Dec in the approved observed-revision ledger.", "批准的观察修订表未列出12月的下一次发布变化。", "First-release snapshot; special income included a domestic utility settlement. Later annual NIPA updates may revise it.", "首发快照；特殊收入因素包括一项国内公用事业和解款。后续年度 NIPA 更新仍可能修订。"),
    "PCE-2026-03": pceSnapshot("+0.3% / 2.8%", "+0.4% / 3.1%", "+0.4%", "+0.4%", "+0.1%", "4.5%", "Nominal PCE +0.4% → +0.3%; real PCE +0.1% → 0.0%.", "名义 PCE +0.4% → +0.3%；实际 PCE +0.1% → 0.0%。", "First-release snapshot; Social Security COLA affected transfer receipts. The observed revision is not final.", "首发快照；社会保障生活成本调整影响转移收入。已观察修订不是最终值。"),
    "PCE-2026-04": pceSnapshot("+0.4% / 2.8%", "+0.4% / 3.0%", "−0.1%", "+0.5%", "+0.1%", "4.0%", "Income −0.1% → 0.0%; nominal PCE +0.5% → +0.6%; real PCE +0.1% → +0.3%.", "收入 −0.1% → 0.0%；名义 PCE +0.5% → +0.6%；实际 PCE +0.1% → +0.3%。", "First-release snapshot; income decline reflected dividends and transfers, partly offset by compensation and farm income.", "首发快照；收入下降主要反映股息与转移收入，部分被雇员报酬及农场业主收入抵消。"),
    "PCE-2026-05": pceSnapshot("+0.7% / 3.5%", "+0.3% / 3.2%", "+0.6%", "+0.9%", "+0.2%", "3.6%", "Income +0.6% → +0.5%; nominal PCE +0.9% → +1.0%; real PCE +0.2% → +0.3%.", "收入 +0.6% → +0.5%；名义 PCE +0.9% → +1.0%；实际 PCE +0.2% → +0.3%。", "First-release snapshot; farm income included Farmer Bridge Assistance Program payments.", "首发快照；农场业主收入包含 Farmer Bridge Assistance Program 款项。"),
    "PCE-2026-06": pceSnapshot("+0.4% / 3.8%", "+0.2% / 3.3%", "0.0%", "+0.5%", "+0.1%", "2.6%", "Nominal PCE +0.5% → +0.4%; real PCE +0.1% → 0.0%; core price +0.2% → +0.3%.", "名义 PCE +0.5% → +0.4%；实际 PCE +0.1% → 0.0%；核心 PCE 价格 +0.2% → +0.3%。", "First-release snapshot; real DPI was −0.5%. Farm assistance applications had closed.", "首发快照；实际可支配个人收入为 −0.5%。农场援助申请已经关闭。"),
    "PCE-2026-07": pceSnapshot("+0.4% / 4.1%", "+0.3% / 3.4%", "+0.7%", "+0.7%", "+0.3%", "3.0%", "Nominal PCE +0.7% → +0.9%; real PCE +0.3% → +0.4%; headline price +0.4% → +0.5%; saving 3.0% → 2.8%.", "名义 PCE +0.7% → +0.9%；实际 PCE +0.3% → +0.4%；总体价格 +0.4% → +0.5%；储蓄率 3.0% → 2.8%。", "The June release superseded this May first-release snapshot; it remains visible for audit. Annual NIPA update was scheduled for 30 Sep.", "6月数据发布时取代了这份5月首发快照；该快照仍保留用于审计。年度 NIPA 更新计划于9月30日进行。", { state: "superseded" }),
    "PCE-2026-08": pceSnapshot("−0.1% / 3.7%", "+0.1% / 3.3%", "+0.2%", "+0.3%", "+0.4%", "2.7%", "Unavailable: no later PIO release occurred before the fixed cutoff.", "不可用：固定截止时点前尚无后续 PIO 发布。", "First-release snapshot. Nominal growth was below real growth because the monthly PCE price index was −0.1%; the series remain separate.", "首发快照。由于当月 PCE 价格指数为 −0.1%，名义消费增速低于实际消费增速；两条序列分别记录。"),

    "GDP-2026-01": gdpSnapshot("2025 Q3 updated estimate", "2025年第三季度更新估值", "4.4%", "+0.1pp vs initial 4.3%", "较首次估值 4.3% 上修 0.1 个百分点", "2.9%", "−0.1pp vs initial 3.0%", "较首次估值 3.0% 下修 0.1 个百分点", "Latest at cutoff: GDI 2.4%; GDP-GDI average 3.4%", "截止时点最新：GDI 2.4%；GDP-GDI 平均值 3.4%", "+USD 175.6bn · revised estimate", "+1,756 亿美元 · 修订估值", "The shutdown-adjusted sequence uses Updated, not Third. Annual updates may revise the history.", "受停摆调整的发布序列使用“更新估值”，不是“第三次估值”。年度更新仍可能修订历史。", "2025Q3"),
    "GDP-2026-02": gdpSnapshot("2025 Q4 advance estimate", "2025年第四季度首次估值", "1.4%", "Not applicable · first Q4 estimate", "不适用 · 第四季度首次估值", "2.4%", "Not applicable · first Q4 estimate", "不适用 · 第四季度首次估值", "Unavailable in the approved selected-release baseline; later stages are shown only as subsequent releases.", "批准的所选发布基线中不可用；后续阶段仅作为之后发布展示。", "Unavailable in the approved selected-release baseline.", "批准的所选发布基线中不可用。", "Selected advance snapshot; later Q4 stages were not yet known on 20 Feb.", "所选首次估值快照；2月20日当时尚未知晓之后的第四季度估值阶段。", "2025Q4"),
    "GDP-2026-03": gdpSnapshot("2025 Q4 second estimate", "2025年第四季度第二次估值", "0.7%", "−0.7pp vs advance", "较首次估值下修 0.7 个百分点", "1.9%", "−0.5pp vs advance", "较首次估值下修 0.5 个百分点", "Unavailable in the approved selected-release baseline; the later third estimate reports GDI separately.", "批准的所选发布基线中不可用；后续第三次估值另行报告 GDI。", "Unavailable in the approved selected-release baseline.", "批准的所选发布基线中不可用。", "Selected second-estimate snapshot; the third estimate occurred after 13 Mar.", "所选第二次估值快照；第三次估值发生在3月13日之后。", "2025Q4"),
    "GDP-2026-04": gdpSnapshot("2025 Q4 third estimate", "2025年第四季度第三次估值", "0.5%", "−0.2pp vs second", "较第二次估值下修 0.2 个百分点", "1.8%", "−0.1pp vs second", "较第二次估值下修 0.1 个百分点", "GDI 2.6%; GDP-GDI average 1.5%", "GDI 2.6%；GDP-GDI 平均值 1.5%", "+USD 246.9bn · revised estimate", "+2,469 亿美元 · 修订估值", "Third is the latest stage at cutoff, not a permanently final estimate; annual updates may revise it.", "第三次估值是截止时点最新阶段，并非永久最终值；年度更新仍可能修订。", "2025Q4"),
    "GDP-2026-05": gdpSnapshot("2026 Q1 advance estimate", "2026年第一季度首次估值", "2.0%", "Not applicable · first Q1 estimate", "不适用 · 第一季度首次估值", "2.5%", "Not applicable · first Q1 estimate", "不适用 · 第一季度首次估值", "Unavailable in the advance estimate.", "首次估值中不可用。", "Unavailable in the advance estimate.", "首次估值中不可用。", "Information-processing equipment and software were partial contributors; they are not automatically AI-driven. Later Q1 stages were not yet known on 30 Apr.", "信息处理设备与软件是部分贡献项；不得自动解释为 AI 驱动。4月30日当时尚未知晓之后的第一季度估值阶段。", "2026Q1"),
    "GDP-2026-06": gdpSnapshot("2026 Q1 second estimate", "2026年第一季度第二次估值", "1.6%", "−0.4pp vs advance", "较首次估值下修 0.4 个百分点", "2.4%", "−0.1pp vs advance", "较首次估值下修 0.1 个百分点", "GDI 0.9%; GDP-GDI average 1.3%", "GDI 0.9%；GDP-GDI 平均值 1.3%", "+USD 40.4bn · preliminary estimate", "+404 亿美元 · 初步估值", "Selected second-estimate snapshot; the third estimate occurred after 28 May.", "所选第二次估值快照；第三次估值发生在5月28日之后。", "2026Q1"),
    "GDP-2026-07": gdpSnapshot("2026 Q1 third estimate", "2026年第一季度第三次估值", "2.1%", "+0.5pp vs second", "较第二次估值上修 0.5 个百分点", "1.7%", "−0.7pp vs second", "较第二次估值下修 0.7 个百分点", "GDI 1.2%; GDP-GDI average 1.7%", "GDI 1.2%；GDP-GDI 平均值 1.7%", "+USD 74.4bn · revised estimate", "+744 亿美元 · 修订估值", "Headline GDP rose while private final sales fell versus the second estimate; the two directions must remain separate.", "相较第二次估值，GDP headline 上修而私人国内最终销售下修；两者方向必须分别呈现。", "2026Q1"),
    "GDP-2026-08": gdpSnapshot("2026 Q2 advance estimate", "2026年第二季度首次估值", "1.5%", "Not applicable · first Q2 estimate", "不适用 · 第二季度首次估值", "3.9%", "Not applicable · first Q2 estimate", "不适用 · 第二季度首次估值", "Unavailable · advance estimate only", "不可用 · 仅有首次估值", "Unavailable · expected with second estimate", "不可用 · 预计随第二次估值发布", "The next estimate was scheduled for 26 Aug 2026; no later value is backfilled before the fixed cutoff.", "下一次估值计划于2026年8月26日发布；固定截止时点前不回填后续数值。", "2026Q2")
  };

  const gdpChains = {
    "2025Q3": [
      { eventId: null, stage: bi("Initial · 23 Dec 2025", "首次估值 · 2025年12月23日"), gdp: "4.3%", gdpDelta: bi("Baseline", "基线"), sales: "3.0%", salesDelta: bi("Baseline", "基线") },
      { eventId: "GDP-2026-01", stage: bi("Updated · 22 Jan 2026", "更新估值 · 2026年1月22日"), gdp: "4.4%", gdpDelta: "+0.1pp", sales: "2.9%", salesDelta: "−0.1pp" }
    ],
    "2025Q4": [
      { eventId: "GDP-2026-02", stage: bi("Advance · 20 Feb", "首次估值 · 2月20日"), gdp: "1.4%", gdpDelta: null, sales: "2.4%", salesDelta: null },
      { eventId: "GDP-2026-03", stage: bi("Second · 13 Mar", "第二次估值 · 3月13日"), gdp: "0.7%", gdpDelta: "−0.7pp", sales: "1.9%", salesDelta: "−0.5pp" },
      { eventId: "GDP-2026-04", stage: bi("Third · 9 Apr", "第三次估值 · 4月9日"), gdp: "0.5%", gdpDelta: "−0.2pp", sales: "1.8%", salesDelta: "−0.1pp" }
    ],
    "2026Q1": [
      { eventId: "GDP-2026-05", stage: bi("Advance · 30 Apr", "首次估值 · 4月30日"), gdp: "2.0%", gdpDelta: null, sales: "2.5%", salesDelta: null },
      { eventId: "GDP-2026-06", stage: bi("Second · 28 May", "第二次估值 · 5月28日"), gdp: "1.6%", gdpDelta: "−0.4pp", sales: "2.4%", salesDelta: "−0.1pp" },
      { eventId: "GDP-2026-07", stage: bi("Third · 25 Jun", "第三次估值 · 6月25日"), gdp: "2.1%", gdpDelta: "+0.5pp", sales: "1.7%", salesDelta: "−0.7pp" }
    ],
    "2026Q2": [
      { eventId: "GDP-2026-08", stage: bi("Advance · 30 Jul", "首次估值 · 7月30日"), gdp: "1.5%", gdpDelta: null, sales: "3.9%", salesDelta: null }
    ]
  };

  const releasedStructuredFacts = Object.keys(snapshots).length;
  for (const event of events) {
    const snap = snapshots[event.id];
    if (snap) Object.assign(event, snap);
    if (event.state !== "scheduled" && (!event.summary || !event.facts?.length)) {
      throw new Error(`Missing structured released facts for ${event.id}`);
    }
  }
  if (releasedStructuredFacts !== 37) throw new Error(`Expected 37 structured released records, found ${releasedStructuredFacts}`);

  function parseLocationState() {
    const params = new URLSearchParams(location.search);
    const view = params.get("view");
    const family = params.get("family");
    const preview = params.get("state");
    return {
      lang: params.get("lang") === "en" ? "en" : "zh",
      view: ["upcoming", "released", "fed"].includes(view) ? view : "released",
      family: ["all", ...Object.keys(FAMILY)].includes(family) ? family : "all",
      year: params.get("year") === "2027" ? 2027 : 2026,
      preview: ["loading", "error", "empty"].includes(preview) ? preview : null,
      a11ySpacing: params.get("a11y") === "spacing",
      reduceMotion: params.get("motion") === "reduce",
      eventId: location.hash ? decodeURIComponent(location.hash.slice(1)) : null
    };
  }

  const initialLocationState = parseLocationState();
  const state = {
    ...initialLocationState,
    lastTrigger: null,
    lastTriggerId: null,
    detailHistoryPushed: false
  };

  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const timeline = $("#timeline-grid");
  const monthJumps = $("#month-jumps");
  const eventList = $("#event-list");
  const emptyState = $("#empty-state");
  const ledger = $("#ledger");
  const consoleRoot = $("main.console");
  const timelineSection = $(".timeline-section");
  const streamSection = $(".stream-section");
  const mobilePrimaryQuery = matchMedia("(max-width: 767px)");

  function applyResponsiveSectionOrder() {
    if (mobilePrimaryQuery.matches && streamSection.nextElementSibling !== timelineSection) {
      consoleRoot.insertBefore(streamSection, timelineSection);
    } else if (!mobilePrimaryQuery.matches && timelineSection.nextElementSibling !== streamSection) {
      consoleRoot.insertBefore(timelineSection, streamSection);
    }
  }

  function textFor(value) {
    if (value && typeof value === "object" && Object.hasOwn(value, "en") && Object.hasOwn(value, "zh")) return value[state.lang];
    return String(value ?? "");
  }

  function titleFor(event) {
    if (event.family === "FOMC") return state.lang === "zh" ? "联邦公开市场委员会利率决策" : "Federal Open Market Committee decision";
    return FAMILY[event.family][state.lang];
  }

  function referenceFor(event) {
    if (state.lang === "en") return event.reference;
    const monthNames = { January: "1月", February: "2月", March: "3月", April: "4月", May: "5月", June: "6月", July: "7月", August: "8月", September: "9月", October: "10月", November: "11月", December: "12月", Jan: "1月", Feb: "2月", Mar: "3月", Apr: "4月", Jun: "6月", Jul: "7月", Aug: "8月", Sep: "9月", Oct: "10月", Nov: "11月", Dec: "12月" };
    return Object.entries(monthNames).reduce((value, [source, target]) => value.replaceAll(source, target), event.reference)
      .replace("advance estimate", "首次估算").replace("second estimate", "第二次估算").replace("third estimate", "第三次估算").replace("updated estimate", "更新估算")
      .replace("combined", "合并发布");
  }

  function statusLabel(event) {
    const copy = COPY[state.lang];
    return copy[event.state] || copy.released;
  }

  function dateParts(event) {
    const [date, time] = event.dateTime.split(" ");
    const [, month, day] = date.split("-");
    return { month: Number(month), day: Number(day), time };
  }

  function formatDate(date) {
    return new Intl.DateTimeFormat(state.lang === "zh" ? "zh-Hans" : "en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "America/New_York" }).format(new Date(`${date}T12:00:00-04:00`));
  }

  function filteredEvents() {
    if (state.preview === "empty") return [];
    return events.filter(event => {
      if (event.year !== state.year) return false;
      if (state.family !== "all" && event.family !== state.family) return false;
      if (state.view === "upcoming" && event.state !== "scheduled") return false;
      if (state.view === "released" && event.state === "scheduled") return false;
      if (state.view === "fed" && event.family !== "FOMC") return false;
      return true;
    }).sort((a, b) => b.dateTime.localeCompare(a.dateTime) || a.family.localeCompare(b.family));
  }

  function timelineNode(event) {
    const { day } = dateParts(event);
    const review = event.review ? '<span class="review-mark" aria-hidden="true">!</span>' : "";
    const label = `${event.id}, ${titleFor(event)}, ${formatDate(event.releaseDate)}, ${statusLabel(event)}${event.review ? `, ${COPY[state.lang].pending}` : ""}`;
    return `<button class="timeline-node family-${event.family}" type="button" data-status="${event.state}" data-open-event="${event.id}" aria-label="${escapeHtml(label)}"><span>${day}</span>${review}</button>`;
  }

  function renderTimeline() {
    const yearEvents = events.filter(event => event.year === state.year);
    timeline.setAttribute("aria-label", `${state.year} ${state.lang === "zh" ? "年度宏观事件时间线" : "annual macro event timeline"}`);
    const summary = $(".timeline-section .section-heading > p");
    if (summary) summary.textContent = yearEvents.length
      ? (state.lang === "zh" ? "58 个发布事件 · cutoff 前已发布 37 个 · 共 38 条观察记录" : "58 release events · 37 released before cutoff · 38 observation rows")
      : (state.lang === "zh" ? `${state.year} 年没有固定公开事件清单` : `No fixed public inventory for ${state.year}`);
    timeline.innerHTML = MONTHS[state.lang].map((month, index) => {
      const inMonth = yearEvents.filter(event => dateParts(event).month === index + 1);
      return `<section class="timeline-month${state.year === 2026 && index === 7 ? " is-cutoff" : ""}" aria-label="${escapeHtml(month)}"><div class="month-label"><strong>${escapeHtml(month.slice(0, 3))}</strong><span>${inMonth.length}</span></div><div class="timeline-nodes">${inMonth.map(timelineNode).join("")}</div></section>`;
    }).join("");
    monthJumps.setAttribute("aria-label", state.lang === "zh" ? "跳转到月份" : "Jump to month");
    monthJumps.innerHTML = MONTHS[state.lang].map((month, index) => {
      const count = yearEvents.filter(event => dateParts(event).month === index + 1).length;
      return `<button type="button" class="month-jump" data-jump-month="${index + 1}"><strong>${escapeHtml(month.slice(0, 3))}</strong><span>${count} ${state.lang === "zh" ? "条" : "events"}</span></button>`;
    }).join("");
  }

  function eventRow(event) {
    const copy = COPY[state.lang];
    const { time } = dateParts(event);
    const sourceState = event.sourceRestricted ? `<span class="source-label">${escapeHtml(copy.restricted)}</span>` : "";
    const reviewState = event.review ? `<span class="review-label">${escapeHtml(copy.pending)}</span>` : "";
    return `<button type="button" class="event-row family-${event.family}" data-open-event="${event.id}" aria-label="${escapeHtml(`${titleFor(event)}, ${referenceFor(event)}, ${formatDate(event.releaseDate)}, ${statusLabel(event)}`)}">
      <span class="event-time">${escapeHtml(time)} ET</span>
      <span class="family-code" data-symbol="${FAMILY[event.family].symbol}">${event.family}</span>
      <span class="event-title"><strong>${escapeHtml(titleFor(event))}</strong><span>${escapeHtml(referenceFor(event))} · ${event.id}</span></span>
      <span class="event-snapshot">${event.state === "scheduled" ? escapeHtml(copy.notReleased) : escapeHtml(textFor(event.summary))}</span>
      <span class="event-status"><span class="status-label ${event.state}">${escapeHtml(statusLabel(event))}</span>${reviewState}${sourceState}</span>
    </button>`;
  }

  function renderStatePreview(kind) {
    const copy = COPY[state.lang];
    eventList.innerHTML = "";
    emptyState.hidden = false;
    emptyState.querySelector(".empty-code").textContent = kind === "loading" ? copy.loadingCode : copy.errorCode;
    emptyState.querySelector("h3").textContent = kind === "loading" ? copy.loadingTitle : copy.errorTitle;
    emptyState.querySelector("p").textContent = kind === "loading" ? copy.loadingBody : copy.errorBody;
    emptyState.querySelector("button").textContent = copy.clear;
    emptyState.setAttribute("role", kind === "error" ? "alert" : "status");
    $("#result-count").textContent = kind === "loading" ? copy.loadingTitle : copy.errorTitle;
  }

  function renderStream() {
    if (state.preview === "loading" || state.preview === "error") return renderStatePreview(state.preview);
    const copy = COPY[state.lang];
    const list = filteredEvents();
    $("#result-count").textContent = copy.count(list.length);
    if (!list.length) {
      eventList.innerHTML = "";
      emptyState.hidden = false;
      emptyState.removeAttribute("role");
      emptyState.querySelector(".empty-code").textContent = copy.emptyCode;
      emptyState.querySelector("h3").textContent = copy.emptyTitle;
      emptyState.querySelector("p").textContent = copy.emptyBody;
      emptyState.querySelector("button").textContent = copy.clear;
      return;
    }
    emptyState.hidden = true;
    const monthGroups = new Map();
    for (const event of list) {
      const month = event.releaseDate.slice(0, 7);
      if (!monthGroups.has(month)) monthGroups.set(month, []);
      monthGroups.get(month).push(event);
    }
    eventList.innerHTML = [...monthGroups.entries()].map(([monthKey, monthEvents]) => {
      const monthNumber = Number(monthKey.slice(5));
      const dateGroups = new Map();
      for (const event of monthEvents) {
        if (!dateGroups.has(event.releaseDate)) dateGroups.set(event.releaseDate, []);
        dateGroups.get(event.releaseDate).push(event);
      }
      const dates = [...dateGroups.entries()].map(([date, dateEvents]) => `<section class="date-group${dateEvents.length > 1 ? " is-paired" : ""}"><div class="date-label"><strong>${escapeHtml(formatDate(date))}</strong><span>${dateEvents.length > 1 ? escapeHtml(copy.sameDate(dateEvents.length)) : escapeHtml(dateEvents[0].id)}</span></div>${dateEvents.map(eventRow).join("")}</section>`).join("");
      return `<section class="month-group" id="month-${monthNumber}"><div class="month-band"><strong>${escapeHtml(MONTHS[state.lang][monthNumber - 1])}</strong><span>${monthEvents.length} ${state.lang === "zh" ? "条事件" : "release events"}</span></div>${dates}</section>`;
    }).join("");
  }

  function detailRows(pairs) {
    return pairs.map(([key, value]) => `<dt>${escapeHtml(textFor(key))}</dt><dd>${escapeHtml(textFor(value))}</dd>`).join("");
  }

  function renderLedger(event) {
    const copy = COPY[state.lang];
    const isDecision = event.family === "FOMC";
    $("#ledger-type").textContent = isDecision ? copy.decisionLedger : copy.eventLedger;
    $("#ledger-title").textContent = `${titleFor(event)} · ${referenceFor(event)}`;
    $("#ledger-boundary").textContent = copy.reviewBoundary;
    const identity = [
      [copy.eventId, event.id], [copy.date, formatDate(event.releaseDate)], [copy.time, `${dateParts(event).time} ET`],
      [copy.reference, referenceFor(event)], [copy.status, `${statusLabel(event)}${event.review ? ` · ${copy.pending}` : ""}`]
    ];
    const factRows = event.facts?.length ? detailRows(event.facts) : detailRows([[copy.result, copy.notReleased]]);
    const chainData = event.gdpChain ? gdpChains[event.gdpChain] : null;
    const selectedIndex = chainData?.findIndex(step => step.eventId === event.id) ?? -1;
    const chain = chainData ? `<section class="ledger-section"><h3>${escapeHtml(copy.revisions)}</h3><ol class="revision-chain">${chainData.map((step, index) => {
      const relation = index === selectedIndex ? copy.selectedStage : index < selectedIndex ? copy.priorStage : copy.laterStage;
      const gdpDelta = step.gdpDelta == null ? copy.baselineStage : textFor(step.gdpDelta);
      const salesDelta = step.salesDelta == null ? copy.baselineStage : textFor(step.salesDelta);
      return `<li class="revision-step${index === selectedIndex ? " is-selected" : index > selectedIndex ? " is-later" : ""}"><div><span>${escapeHtml(textFor(step.stage))}</span><b>${escapeHtml(relation)}</b></div><strong>GDP ${escapeHtml(step.gdp)} SAAR · ${state.lang === "zh" ? "私人国内最终销售" : "private final sales"} ${escapeHtml(step.sales)} SAAR</strong><small>${escapeHtml(copy.gdpRevision)}: ${escapeHtml(gdpDelta)}<br>${escapeHtml(copy.privateSalesRevision)}: ${escapeHtml(salesDelta)}</small></li>`;
    }).join("")}</ol></section>` : "";
    const qualifier = event.qualifier ? textFor(event.qualifier) : (event.state === "scheduled" ? copy.notReleased : copy.snapshotBoundary);
    const sourceKind = event.sourceUrl === scheduleSources[event.family] ? copy.officialSchedule : copy.officialRelease;
    $("#ledger-body").innerHTML = `
      <section class="ledger-section"><h3>${escapeHtml(copy.releaseIdentity)}</h3><dl class="identity-grid">${detailRows(identity)}</dl></section>
      <section class="ledger-section"><h3>${escapeHtml(copy.officialRecord)}</h3><dl class="fact-grid">${factRows}</dl></section>
      ${chain}
      <section class="ledger-section"><h3>${escapeHtml(copy.method)}</h3><div class="qualifier-box">${escapeHtml(qualifier)}</div></section>
      <section class="ledger-section"><h3>${escapeHtml(copy.sources)}</h3><a class="source-link" href="${escapeHtml(event.sourceUrl)}" target="_blank" rel="noopener noreferrer" title="${escapeHtml(`${sourceKind} · ${event.sourceAgency}`)}">${escapeHtml(sourceKind)} · ${escapeHtml(event.sourceAgency)}<small>${escapeHtml(event.sourceUrl)}</small></a>${event.sourceRestricted ? `<div class="source-link source-note">${escapeHtml(copy.restricted)}<small>${escapeHtml(copy.accessBoundary)}</small></div>` : ""}</section>
      <section class="ledger-section"><details><summary>${escapeHtml(copy.visualNote)}</summary><div class="detail-content">${escapeHtml(state.lang === "zh" ? "本页不展示市场共识、beat/miss、surprise score、交易信号、自动新闻流或自动周期更新。" : "No consensus, beat/miss, surprise score, trading signal, automated news flow or automatic regime update is represented.")}</div></details></section>`;
  }

  function buildLocationUrl(eventId = null) {
    const params = new URLSearchParams();
    if (state.lang === "en") params.set("lang", "en");
    if (state.view !== "released") params.set("view", state.view);
    if (state.family !== "all") params.set("family", state.family);
    if (state.year !== 2026) params.set("year", state.year);
    if (state.preview) params.set("state", state.preview);
    if (state.a11ySpacing) params.set("a11y", "spacing");
    if (state.reduceMotion) params.set("motion", "reduce");
    return `${location.pathname}${params.size ? `?${params}` : ""}${eventId ? `#${encodeURIComponent(eventId)}` : ""}`;
  }

  function applyLocationState(parsed) {
    for (const key of ["lang", "view", "family", "year", "preview", "a11ySpacing", "reduceMotion", "eventId"]) state[key] = parsed[key];
  }

  function openEvent(id, trigger, updateHistory = true) {
    const event = events.find(item => item.id === id);
    if (!event) {
      if (ledger.open) ledger.close();
      $("#invalid-link").hidden = false;
      return;
    }
    $("#invalid-link").hidden = true;
    if (trigger) {
      state.lastTrigger = trigger;
      state.lastTriggerId = trigger.dataset.openEvent || id;
    }
    renderLedger(event);
    if (!ledger.open) ledger.showModal();
    requestAnimationFrame(() => $("#ledger-close").focus());
    state.eventId = id;
    if (updateHistory) {
      history.pushState({ kind: "detail", event: id }, "", buildLocationUrl(id));
      state.detailHistoryPushed = true;
    }
  }

  function closeLedger(updateHistory = true) {
    if (ledger.open) ledger.close();
    $("#invalid-link").hidden = true;
    state.eventId = null;
    if (updateHistory && location.hash) {
      if (state.detailHistoryPushed) {
        state.detailHistoryPushed = false;
        history.back();
      } else {
        history.replaceState({ kind: "filter" }, "", buildLocationUrl());
      }
    }
    const currentTrigger = state.lastTrigger && document.contains(state.lastTrigger)
      ? state.lastTrigger
      : state.lastTriggerId && ($(`.event-row[data-open-event="${state.lastTriggerId}"]`) || $(`[data-open-event="${state.lastTriggerId}"]`));
    if (currentTrigger) {
      state.lastTrigger = currentTrigger;
      currentTrigger.focus();
    }
  }

  function pushFilterState() {
    state.eventId = null;
    state.detailHistoryPushed = false;
    history.pushState({ kind: "filter" }, "", buildLocationUrl());
    render();
  }

  function updateControls() {
    $$("[data-view]").forEach(button => {
      const active = button.dataset.view === state.view;
      button.classList.toggle("is-active", active); button.setAttribute("aria-pressed", String(active));
    });
    $$("[data-family]").forEach(button => {
      const active = button.dataset.family === state.family;
      button.classList.toggle("is-active", active); button.setAttribute("aria-pressed", String(active));
    });
    $("#year-select").value = String(state.year);
    $$("[data-lang]").forEach(button => {
      const active = button.dataset.lang === state.lang;
      button.classList.toggle("is-active", active); button.setAttribute("aria-pressed", String(active));
    });
  }

  function renderChrome() {
    const copy = COPY[state.lang];
    const zh = state.lang === "zh";
    const setText = (selector, value) => { const node = $(selector); if (node) node.textContent = value; };
    document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
    document.documentElement.classList.toggle("a11y-spacing", state.a11ySpacing);
    document.documentElement.classList.toggle("reduce-motion", state.reduceMotion);
    $$('[data-i18n="product"]').forEach(node => node.textContent = copy.product);
    $$('[data-i18n="title"]').forEach(node => node.textContent = copy.title);
    $$('[data-i18n="cutoff"]').forEach(node => node.textContent = copy.cutoff);
    $$('[data-i18n="boundary"]').forEach(node => node.textContent = copy.boundary);
    $$('[data-i18n="observatory"]').forEach(node => node.textContent = copy.observatory);
    $$('[data-i18n="footer-boundary"]').forEach(node => node.textContent = copy.footerBoundary);
    $$('[data-i18n="footer-source"]').forEach(node => node.textContent = copy.footerSource);
    $$('[data-i18n="footer-home"]').forEach(node => node.textContent = copy.footerHome);
    $(".skip-link").textContent = zh ? "跳到事件流" : "Skip to event stream";
    $(".brand-lockup").setAttribute("aria-label", zh ? "返回 Kairos 首页" : "Back to Kairos home");
    $(".language-switch").setAttribute("aria-label", zh ? "页面语言" : "Page language");
    $(".context-grid").setAttribute("aria-label", copy.contextAria);
    $(".timeline-legend").setAttribute("aria-label", copy.timelineLegendAria);
    setText("#controls-title", zh ? "日历控制" : "Calendar controls");
    $(".view-control").setAttribute("aria-label", zh ? "事件视图" : "Event view");
    $(".family-control").setAttribute("aria-label", zh ? "事件类别" : "Event family");
    setText(".eyebrow", zh ? "官方事件账本 · 固定截止" : "OFFICIAL EVENT LEDGER · FIXED CUTOFF");
    setText(".view-control [data-view='upcoming']", zh ? "未来事件" : "Upcoming");
    setText(".view-control [data-view='released']", zh ? "已发布" : "Released");
    setText(".view-control [data-view='fed']", zh ? "美联储决策" : "Fed Decisions");
    setText(".family-control [data-family='all']", zh ? "全部" : "All");
    setText(".family-control [data-family='EMP']", zh ? "就业" : "Employment");
    setText(".year-control span", zh ? "年份" : "Year");
    $("#year-select option[value='2027']").textContent = zh ? "2027 · 暂无清单" : "2027 · no inventory";
    setText("#clear-filters", copy.clear);
    const invalid = $("#invalid-link div");
    if (invalid) invalid.innerHTML = `<strong>${escapeHtml(copy.invalidTitle)}</strong> ${escapeHtml(copy.invalidBody)}`;
    setText("#dismiss-invalid", copy.dismiss);
    const context = $$(".context-cell");
    if (context.length === 4) {
      const rows = zh ? [
        ["最近发布", "消费者价格指数", "8月12日 · 2026年7月", "总体 +0.1% 月率 / 3.4% 年率"],
        ["就业", "就业形势报告", "8月7日 · 2026年7月", "非农 −23k · 失业率 4.1%"],
        ["美联储", "维持 · 3.50%–3.75%", "7月29日 · 声明表决 9–3", "9 票维持 / 3 票倾向加息"],
        ["复核", "37 个已发布事件", "全部仍为待复核", "不改变 Current Regime"]
      ] : [
        ["LATEST RELEASE", "Consumer Price Index", "12 Aug · July 2026", "Headline +0.1% MoM / 3.4% YoY"],
        ["EMPLOYMENT", "Employment Situation", "07 Aug · July 2026", "Payrolls −23k · unemployment 4.1%"],
        ["FED", "Hold · 3.50%–3.75%", "29 Jul · 9–3 statement vote", "9 hold / 3 hike preference"],
        ["REVIEW", "37 released events", "All remain review pending", "Does not change Current Regime"]
      ];
      context.forEach((cell, index) => {
        const [key, strong, span, small] = rows[index];
        cell.querySelector(".context-key").textContent = key;
        cell.querySelector("strong").textContent = strong;
        cell.querySelector("span:not(.context-key)").textContent = span;
        if (small != null) cell.querySelector("small").textContent = small;
      });
    }
    setText(".timeline-section .section-index", zh ? "年度位置" : "ANNUAL POSITION");
    setText("#timeline-title", zh ? "年度时间线" : "Annual Timeline");
    setText(".timeline-section .section-heading > p", zh ? "58 个发布事件 · cutoff 前已发布 37 个 · 共 38 条观察记录" : "58 release events · 37 released before cutoff · 38 observation rows");
    const legend = $$(".timeline-legend span");
    const legendLabels = zh ? ["已发布", "已排期", "曾改期", "快照已被取代", "Kairos 待复核"] : ["Released", "Scheduled", "Rescheduled", "Superseded snapshot", "Kairos review pending"];
    legend.forEach((node, index) => {
      const marker = node.firstElementChild?.outerHTML || "";
      node.innerHTML = `${marker} ${legendLabels[index]}`;
    });
    setText(".stream-section .section-index", zh ? "官方事实流" : "OFFICIAL FACT FLOW");
    setText("#stream-title", zh ? "事件流" : "Event Stream");
    setText(".timeline-equivalent", zh ? "时间线的 DOM 等价内容：下方是完整、可键盘访问、按月分组的事件流。节点位置与大小不表达重要性、评分或转折预测。" : "Timeline equivalent: the complete keyboard-readable, month-grouped Event Stream follows below. Node position and size do not score importance or predict turning points.");
    setText("#ledger-boundary", copy.reviewBoundary);
    $("#ledger-close").setAttribute("aria-label", zh ? "关闭事件账本" : "Close event ledger");
    $("#ledger-close").setAttribute("title", zh ? "关闭事件账本" : "Close event ledger");
    $$('[data-local-time]').forEach(node => {
      const date = new Date(node.dataset.localTime);
      const zone = Intl.DateTimeFormat().resolvedOptions().timeZone || (zh ? "本地时区" : "local zone");
      node.textContent = `${new Intl.DateTimeFormat(zh ? "zh-CN" : "en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", timeZoneName: "short" }).format(date)} · ${zone}`;
    });
  }

  function render() {
    renderChrome(); updateControls(); renderTimeline(); renderStream();
  }

  document.addEventListener("click", event => {
    const open = event.target.closest("[data-open-event]");
    if (open) return openEvent(open.dataset.openEvent, open);
    const view = event.target.closest("[data-view]");
    if (view) {
      if (state.view === view.dataset.view && !state.preview) return;
      state.view = view.dataset.view; state.preview = null; return pushFilterState();
    }
    const family = event.target.closest("[data-family]");
    if (family) {
      if (state.family === family.dataset.family && !state.preview) return;
      state.family = family.dataset.family; state.preview = null; return pushFilterState();
    }
    const lang = event.target.closest("[data-lang]");
    if (lang) {
      if (state.lang === lang.dataset.lang) return;
      state.lang = lang.dataset.lang; return pushFilterState();
    }
    const jump = event.target.closest("[data-jump-month]");
    if (jump) {
      const target = $(`#month-${jump.dataset.jumpMonth}`);
      if (target) target.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      return;
    }
  });

  $("#year-select").addEventListener("change", event => { state.year = Number(event.target.value); state.preview = null; pushFilterState(); });
  function clearFilters() {
    const alreadyClear = state.view === "released" && state.family === "all" && state.year === 2026 && !state.preview;
    if (alreadyClear) return;
    state.view = "released"; state.family = "all"; state.year = 2026; state.preview = null; pushFilterState();
  }
  $("#clear-filters").addEventListener("click", clearFilters);
  $("#empty-clear").addEventListener("click", clearFilters);
  $("#dismiss-invalid").addEventListener("click", () => { $("#invalid-link").hidden = true; });
  $("#ledger-close").addEventListener("click", () => closeLedger());
  ledger.addEventListener("cancel", event => { event.preventDefault(); closeLedger(); });
  ledger.addEventListener("click", event => { if (event.target === ledger) closeLedger(); });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && ledger.open) { event.preventDefault(); closeLedger(); }
    const opener = event.target.closest?.("[data-open-event]");
    if (opener && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      openEvent(opener.dataset.openEvent, opener);
    }
  });
  window.addEventListener("popstate", event => {
    const parsed = parseLocationState();
    applyLocationState(parsed);
    state.detailHistoryPushed = event.state?.kind === "detail";
    render();
    if (parsed.eventId) openEvent(parsed.eventId, null, false);
    else closeLedger(false);
  });

  applyResponsiveSectionOrder();
  mobilePrimaryQuery.addEventListener("change", applyResponsiveSectionOrder);
  history.replaceState({ kind: initialLocationState.eventId ? "direct-detail" : "filter" }, "", buildLocationUrl(initialLocationState.eventId));
  render();
  if (initialLocationState.eventId) openEvent(initialLocationState.eventId, null, false);

  window.KAIROS_MACRO_CALENDAR = {
    inventoryCount: events.length,
    releasedCount: events.filter(event => event.state !== "scheduled").length,
    scheduledCount: events.filter(event => event.state === "scheduled").length,
    releasedStructuredFacts,
    families: Object.fromEntries(Object.keys(FAMILY).map(family => [family, events.filter(event => event.family === family).length])),
    fixedCutoff: CUTOFF
  };
})();

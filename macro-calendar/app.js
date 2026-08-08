(() => {
  "use strict";

  const CUTOFF = "2026-08-07T04:00:00Z";
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
      cutoff: "Data cutoff · 07 Aug 2026 · 00:00 ET",
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
      result: "Released observation snapshot", minutes: "Minutes", noValue: "No separate structured headline is listed for this record; review the official source and revision chain.",
      visualNote: "Timeline node size and position do not encode importance, score, or forecast.",
      clear: "Clear filters",
      footerBoundary: "Semi-static · human-reviewed · event-driven · no automatic regime update",
      footerSource: "Source scope: Federal Reserve · BLS · BEA official records",
      footerHome: "Back to Macro Cycle Observatory"
    },
    zh: {
      product: "宏观日历", title: "记录宏观事件，不制造虚假的确定性。",
      observatory: "周期天象图",
      cutoff: "数据截止 · 2026年8月7日 · 美东时间 00:00",
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
      result: "已发布观察快照", minutes: "会议纪要", noValue: "此记录未另列结构化 headline；请查看官方来源与修订链。",
      visualNote: "时间线节点大小与位置不表达重要性、评分或预测。",
      clear: "清除筛选",
      footerBoundary: "半静态 · 人工复核 · 事件驱动 · 不自动改变周期判断",
      footerSource: "来源范围：Federal Reserve · BLS · BEA 官方记录",
      footerHome: "返回周期天象图"
    }
  };

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
    "CPI-2026-01": "https://www.bls.gov/news.release/archives/cpi_01132026.htm",
    "CPI-2026-02": "https://www.bls.gov/news.release/archives/cpi_02132026.htm",
    "CPI-2026-03": "https://www.bls.gov/news.release/archives/cpi_03112026.htm",
    "CPI-2026-04": "https://www.bls.gov/news.release/archives/cpi_04102026.htm",
    "CPI-2026-05": "https://www.bls.gov/news.release/archives/cpi_05122026.htm",
    "CPI-2026-06": "https://www.bls.gov/news.release/archives/cpi_06102026.htm",
    "CPI-2026-07": "https://www.bls.gov/news.release/archives/cpi_07142026.htm",
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

  const snapshots = {
    "FOMC-2026-01": { summary: "Hold 3.50%–3.75% · statement vote 10–2", facts: [["Statement vote", "10–2"], ["Rate preference", "10 hold / 2 cut 25bp"]] },
    "FOMC-2026-02": { summary: "Hold 3.50%–3.75% · statement vote 11–1", facts: [["Statement vote", "11–1"], ["Rate preference", "11 hold / 1 cut 25bp"], ["SEP", "Available"]] },
    "FOMC-2026-03": { summary: "Hold 3.50%–3.75% · statement vote 8–4", facts: [["Statement vote", "8–4"], ["Rate preference", "11 hold / 1 cut 25bp"]] },
    "FOMC-2026-04": { summary: "Hold 3.50%–3.75% · statement vote 12–0", facts: [["Statement vote", "12–0"], ["Rate preference", "12 hold"], ["SEP", "Available"]] },
    "FOMC-2026-05": { summary: "Hold 3.50%–3.75% · statement vote 9–3", facts: [["Target range", "3.50%–3.75%"], ["Change", "0 bp"], ["Statement vote", "9–3"], ["Rate preference", "9 hold / 3 hike 25bp"], ["Dissenters", "Hammack, Kashkari and Logan preferred a 25bp increase"], ["Minutes", "Pending at fixed cutoff"]], qualifier: "The statement vote and rate-preference split are distinct fields; neither is a Kairos regime signal." },
    "EMP-2026-07": { summary: "Payrolls +57k · unemployment 4.2%", facts: [["Payrolls · initial / latest at cutoff", "+57k / +57k"], ["Unemployment rate", "4.2%"], ["Participation", "61.5%"], ["Average hourly earnings", "+0.3% MoM / +3.5% YoY"], ["Average weekly hours", "34.3h"]], sourceRestricted: true, qualifier: "Batch source access was restricted; the release was verified in a browser. This is an access state, not a missing-release claim." },
    "CPI-2026-02": { summary: "Headline +0.2% MoM / 2.4% YoY · rescheduled", facts: [["Headline CPI", "+0.2% MoM / 2.4% YoY"], ["Core CPI", "+0.3% MoM / 2.5% YoY"], ["Food", "+0.2%"], ["Energy", "−1.5%"], ["Shelter", "+0.2%"]], state: "rescheduled", qualifier: "Originally scheduled for 11 Feb 2026; released 13 Feb 2026 after an official schedule change." },
    "CPI-2026-07": { summary: "Headline −0.4% MoM / 3.5% YoY", facts: [["Headline CPI", "−0.4% MoM / 3.5% YoY"], ["Core CPI", "0.0% MoM / 2.6% YoY"], ["Energy", "−5.7%"], ["Shelter", "+0.1%"]] },
    "PCE-2026-01": { summary: "Combined release · two observation rows", facts: [["October headline PCE", "+0.2% MoM / 2.7% YoY"], ["October core PCE", "+0.2% MoM / 2.7% YoY"], ["November headline PCE", "+0.2% MoM / 2.8% YoY"], ["November core PCE", "+0.2% MoM / 2.8% YoY"]], qualifier: "One release event contains two child observations. It counts once in the release calendar and twice in the observation ledger." },
    "PCE-2026-08": { summary: "Headline −0.1% MoM / 3.7% YoY", facts: [["Headline PCE", "−0.1% MoM / 3.7% YoY"], ["Core PCE", "+0.1% MoM / 3.3% YoY"], ["Nominal PCE", "+0.3%"], ["Real PCE", "+0.4%"], ["Personal saving rate", "2.7%"]], state: "superseded", qualifier: "This first-release snapshot is preserved for audit but marked superseded by later official NIPA revisions; the release event itself remains valid." },
    "GDP-2026-08": { summary: "Real GDP +1.5% SAAR · private final sales +3.9%", facts: [["Real GDP", "+1.5% SAAR"], ["Revision", "Advance estimate · no prior Q2 estimate"], ["Private final sales to domestic purchasers", "+3.9%"], ["GDI / corporate profits", "Not available in advance estimate"], ["Next scheduled estimate", "26 Aug 2026"]], qualifier: "Headline GDP and private-demand measures remain separate observations. The release does not itself authorize a regime change." }
  };
  const q1Chain = [
    { label: "Advance · 30 Apr", result: "GDP +2.0% · private final sales +2.5%", delta: "baseline" },
    { label: "Second · 28 May", result: "GDP +1.6% · private final sales +2.4%", delta: "−0.4pp" },
    { label: "Third · 25 Jun", result: "GDP +2.1% · private final sales +1.7%", delta: "+0.5pp" }
  ];

  for (const event of events) {
    const snap = snapshots[event.id];
    if (snap) Object.assign(event, snap);
    if (event.state === "released" && !event.summary) event.summary = "Official release recorded · structured values remain in the source ledger";
    if (event.state === "scheduled") event.summary = COPY.en.notReleased;
  }

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

  function titleFor(event) {
    if (event.family === "FOMC") return state.lang === "zh" ? "联邦公开市场委员会利率决策" : "Federal Open Market Committee decision";
    return FAMILY[event.family][state.lang];
  }

  function referenceFor(event) {
    if (state.lang === "en") return event.reference;
    return event.reference
      .replace("January", "1月").replace("February", "2月").replace("March", "3月").replace("April", "4月")
      .replace("May", "5月").replace("June", "6月").replace("July", "7月").replace("August", "8月")
      .replace("September", "9月").replace("October", "10月").replace("November", "11月").replace("December", "12月")
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
      ? (state.lang === "zh" ? "58 个发布事件 · cutoff 前已发布 35 个 · 共 36 条观察记录" : "58 release events · 35 released before cutoff · 36 observation rows")
      : (state.lang === "zh" ? `${state.year} 年没有固定公开事件清单` : `No fixed public inventory for ${state.year}`);
    timeline.innerHTML = MONTHS[state.lang].map((month, index) => {
      const inMonth = yearEvents.filter(event => dateParts(event).month === index + 1);
      return `<section class="timeline-month${state.year === 2026 && index === 7 ? " is-cutoff" : ""}" aria-label="${escapeHtml(month)}"><div class="month-label"><strong>${escapeHtml(month.slice(0, 3))}</strong><span>${inMonth.length}</span></div><div class="timeline-nodes">${inMonth.map(timelineNode).join("")}</div></section>`;
    }).join("");
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
      <span class="event-snapshot">${event.state === "scheduled" ? escapeHtml(copy.notReleased) : escapeHtml(event.summary)}</span>
      <span class="event-status"><span class="status-label ${event.state}">${escapeHtml(statusLabel(event))}</span>${reviewState}${sourceState}</span>
    </button>`;
  }

  function renderStatePreview(kind) {
    const copy = COPY[state.lang];
    eventList.innerHTML = "";
    emptyState.hidden = false;
    emptyState.querySelector(".empty-code").textContent = kind === "loading" ? "LOCAL DATASET · LOADING" : "RENDER FAILURE · SAFE STOP";
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
      emptyState.querySelector(".empty-code").textContent = "NO MATCHING INVENTORY";
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
    return pairs.map(([key, value]) => `<dt>${escapeHtml(key)}</dt><dd>${escapeHtml(value)}</dd>`).join("");
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
    const factRows = event.facts?.length ? detailRows(event.facts) : `<dt>${escapeHtml(copy.result)}</dt><dd>${escapeHtml(event.state === "scheduled" ? copy.notReleased : copy.noValue)}</dd>`;
    const chain = event.family === "GDP" && /2026 Q1/.test(event.reference) ? `<section class="ledger-section"><h3>${escapeHtml(copy.revisions)}</h3><ol class="revision-chain">${q1Chain.map(step => `<li class="revision-step"><span>${escapeHtml(step.label)}</span><strong>${escapeHtml(step.result)}</strong><em>${escapeHtml(step.delta)}</em></li>`).join("")}</ol></section>` : "";
    const qualifier = event.qualifier || (event.state === "scheduled" ? copy.notReleased : "First-release or decision-time snapshot preserved separately from any later official revision and from Kairos interpretation.");
    $("#ledger-body").innerHTML = `
      <section class="ledger-section"><h3>${escapeHtml(copy.releaseIdentity)}</h3><dl class="identity-grid">${detailRows(identity)}</dl></section>
      <section class="ledger-section"><h3>${escapeHtml(copy.officialRecord)}</h3><dl class="fact-grid">${factRows}</dl></section>
      ${chain}
      <section class="ledger-section"><h3>${escapeHtml(copy.method)}</h3><div class="qualifier-box">${escapeHtml(qualifier)}</div></section>
      <section class="ledger-section"><h3>${escapeHtml(copy.sources)}</h3><a class="source-link" href="${escapeHtml(event.sourceUrl)}" target="_blank" rel="noopener noreferrer" title="${escapeHtml(`${event.sourceKind} · ${event.sourceAgency}`)}">${escapeHtml(event.sourceKind)} · ${escapeHtml(event.sourceAgency)}<small>${escapeHtml(event.sourceUrl)}</small></a>${event.sourceRestricted ? `<div class="source-link source-note">${escapeHtml(copy.restricted)}<small>Access limitation is kept distinct from release and review state.</small></div>` : ""}</section>
      <section class="ledger-section"><details><summary>${escapeHtml(copy.visualNote)}</summary><div class="detail-content">No consensus, beat/miss, surprise score, trading signal, automated news flow or automatic regime update is represented.</div></details></section>`;
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
    setText(".eyebrow", zh ? "官方事件账本 · 固定截止" : "OFFICIAL EVENT LEDGER · FIXED CUTOFF");
    setText(".view-control [data-view='upcoming']", zh ? "未来事件" : "Upcoming");
    setText(".view-control [data-view='released']", zh ? "已发布" : "Released");
    setText(".view-control [data-view='fed']", zh ? "美联储决策" : "Fed Decisions");
    setText(".family-control [data-family='all']", zh ? "全部" : "All");
    setText(".family-control [data-family='EMP']", zh ? "就业" : "Employment");
    setText(".year-control span", zh ? "年份" : "Year");
    setText("#clear-filters", copy.clear);
    const context = $$(".context-cell");
    if (context.length === 4) {
      const rows = zh ? [
        ["CUTOFF 时点下一项", "就业形势报告", "8月7日 · 08:30 ET", context[0].querySelector("small")?.textContent],
        ["最近同日组", "GDP + PCE", "7月30日 · 两条独立记录", "Q2 首次估算 / 2026年6月"],
        ["美联储", "维持 · 3.50%–3.75%", "7月29日 · 声明表决 9–3", "9 票维持 / 3 票倾向加息"],
        ["复核", "35 个已发布事件", "全部仍为待复核", "不改变 Current Regime"]
      ] : [
        ["NEXT AT CUTOFF", "Employment Situation", "07 Aug · 08:30 ET", context[0].querySelector("small")?.textContent],
        ["LATEST GROUP", "GDP + PCE", "30 Jul · two independent records", "Q2 Advance / Jun 2026"],
        ["FED", "Hold · 3.50%–3.75%", "29 Jul · 9–3 statement vote", "9 hold / 3 hike preference"],
        ["REVIEW", "35 released events", "All remain review pending", "Does not change Current Regime"]
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
    setText(".timeline-section .section-heading > p", zh ? "58 个发布事件 · cutoff 前已发布 35 个 · 共 36 条观察记录" : "58 release events · 35 released before cutoff · 36 observation rows");
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

  $$('[data-local-time]').forEach(node => {
    const date = new Date(node.dataset.localTime);
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone || "local zone";
    node.textContent = `${new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", timeZoneName: "short" }).format(date)} · ${zone}`;
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
    families: Object.fromEntries(Object.keys(FAMILY).map(family => [family, events.filter(event => event.family === family).length])),
    fixedCutoff: CUTOFF
  };
})();

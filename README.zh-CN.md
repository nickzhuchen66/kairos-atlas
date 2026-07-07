# Kairos · 周期天象图

**Kairos** 是一个公开的宏观周期观测网站，用于展示当前宏观 regime、长波背景、观察清单、资产含义和证据门控复盘。

中文名：**周期天象图**  
英文副标题：**Macro Cycle Observatory**

公开仓库名：**kairos-atlas**  
计划官网域名：**kairos-atlas.com**

`kairos-atlas` 用作公开仓库和域名身份；`Macro Cycle Observatory` 继续作为产品英文副标题，因为当前网站更接近一个“宏观周期观测仪表盘”，而 Atlas 更适合作为公开入口和 Long Wave Atlas 的命名锚点。

Kairos 的目标是把宏观周期判断做成可点击、可复盘、可证伪的观测仪，而不是把复杂判断包装成单一预测。

## Kairos 展示什么

- **Current Regime**：当前宏观周期天气图。
- **Cycle Stack**：宏观时钟、金融周期、流动性 / 政策、全球美元、长波背景、市场验证六层结构。
- **Long Wave Atlas**：K4 / K5 历史阶段和 K6 Candidate Watch。
- **Watchlist**：可能改变当前判断的观察项。
- **Asset Behavior Map**：不同资产在当前 regime 下的含义。
- **Evidence Ledger**：已支持、有争议、未确认、待补证和复盘记录。

## Kairos 不是什么

Kairos 不是：

- 日期预言机；
- 交易信号系统；
- 投资建议；
- 对 K6 已确认的声明；
- 自动根据新闻流更新宏观判断的网站。

## 产品护栏

- **K6 仍然是 Candidate Watch**，不是 confirmed K6。
- Watchlist 是观察项，不是 confirmed fact。
- 有争议判断必须保留争议状态。
- 部分核验 / 来源补核中的内容不能展示成 fully supported。
- 宏观读数应保留证据状态、置信度、观察项和证伪条件。

## 公开发布范围

这个公开发布包是刻意整理过的。

包含：

- 公开网站入口；
- 面向全球用户的 README；
- 中文 README；
- 公开发布 manifest；
- 内容授权说明草案。

不包含：

- 私有研究工作区；
- 内部 BRD；
- 理论笔记；
- 原始 Evidence Packs；
- AI 协作上下文；
- 内部 build log。

## 本地预览

在当前目录运行：

```bash
python3 -m http.server 8765
```

打开：

```text
http://127.0.0.1:8765/index.html
http://127.0.0.1:8765/index.html?lang=en
```

## 目录结构

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

## 授权

Kairos 采用拆分授权：

- **网站实现代码**：MIT License，见 `LICENSE-CODE-MIT`。
- **Kairos 内容与研究框架**：保留全部权利，见 `CONTENT_LICENSE.md`。

由于 `index.html` 同时包含实现代码和 Kairos 内容，MIT License 只适用于实现代码部分，不授权他人商业复用或重新发布 Kairos 名称、周期天象图名称、宏观周期框架、网站文案、regime 描述、Watchlist 语言、Evidence Ledger 表达或研究解释内容。

## 语言策略

网站支持中文和英文。GitHub 仓库默认使用英文，方便全球用户理解；中文说明放在 `README.zh-CN.md`。

---
title: "WPO: Web Performance Optimization"
description: Exploring web optimization improvement with AI using core web vitals
pubDate: 2025-08-26T00:00:00.000Z
tags:
  - javascript
  - wpo
  - google-core-web-vitals
categories:
  - javascript
  - best-practices
  - core-web-vitals
  - wpo
draft: true
heroImage: /blog-placeholder-14.jpg
---

## Initial Exploration

After creating this web app [erades.com](https://erades.com), I'm going to focus on Google's core web vitals.

For this task, I will concentrate on Lighthouse.

The initial results are these:

### 2025-08-12

#### Desktop

- [Home](../../../../assets/lighthouse/2025-08-12-HOME.html)
- [Post](../../../../assets/lighthouse/2025-08-12-POST.html)
- [Search](../../../../assets/lighthouse/2025-08-12-SEARCH.html)
- [Tags](../../../../assets/lighthouse/2025-08-12-TAGS.html)
- [Blog](../../../../assets/lighthouse/2025-08-12-BLOG.html)

#### Mobile

- [Home](../../../../assets/lighthouse/2025-08-12-HOME-mobile.html)
- [Post](../../../../assets/lighthouse/2025-08-12-POST-mobile.html)
- [Search](../../../../assets/lighthouse/2025-08-12-SEARCH-mobile.html)
- [Tags](../../../../assets/lighthouse/2025-08-12-TAGS-mobile.html)
- [Blog](../../../../assets/lighthouse/2025-08-12-BLOG-mobile.html)

## Initial thoughts

The data yields good results due in part to the used technology stack (Server-side rendering and static site generation) and the selected meta-framework Astro.

But to achieve acceptable data, the developer has to be an expert and have fought a lot on frontend battles to understand the best practices.

Still, things always escape, and there should be a way to control the core web vitals from the beginning to keep improving the numbers.

On the other hand, to achieve this, we would have to include these checks programmatically.

Today, unit tests and e2e or functional tests are already part of developers' DNA. However, I see that automatic visual regression tests and performance tests do not quite catch on developers. Partly, I believe it is due to the increased time to run the pipelines.

However, I consider that the automatic visual regression tests are essential. In fact, if I had to choose between unit or component tests and visual regression tests, I would opt for regression ones.

In the case of the tests for WPO, I think developers do not realize the value these tests represent for the business. They think more about the work that these tests entail than about the benefit.

## Work Approach

- To be able to extract statistics programmatically, I'm going to find a way to implement Lighthouse or similar tools.

### Attack Plan (synthesis)

1. Automated lab metrics (synthetic): Local and CI Lighthouse CI, with performance budgets and assertions that break the build when you go over. HTML/JSON reports stored as artifacts and/or on a LHCI server.
2. Field Metrics (RUM): real LCP/INP/CLS in production via web-vitals, sent to your backend/GA4. This keeps you from optimizing blindly.
3. Public benchmarks: PSI/CrUX in CI to see how Google measures you (Lighthouse + aggregated real data).
4. Optional power-up: sitespeed.io to track multiple URLs, record videos/filmstrips, and more precise budgets; upload results to S3/GCS.

### Lighthouse

Installed Lighthouse

Quick alternative to run:

```bash
npx unlighthouse --site https://erades.com
```

This gives you the metrics of the entire site.

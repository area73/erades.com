module.exports = {
  ci: {
    collect: {
      startServerCommand: "pnpm preview --port 4321 --host",
      url: [
        "http://localhost:4321/es",
        "http://localhost:4321/es/blog",
        "https://erades.com/es/about",
        "http://localhost:4321/es/tags",
        "https://erades.com/es/search?q=func",
        "https://erades.com/es/blog/ai-take-aways/i18n/",
      ],
      numberOfRuns: 3,
      settings: {
        formFactor: "desktop",
        screenEmulation: {
          mobile: false,
          width: 1350,
          height: 940,
          deviceScaleFactor: 1,
          disabled: false,
        },
        budgets: [
          {
            path: "/*",
            resourceSizes: [
              { resourceType: "script", budget: 300 },
              { resourceType: "stylesheet", budget: 120 },
              { resourceType: "image", budget: 800 },
              { resourceType: "font", budget: 400 },
              { resourceType: "third-party", budget: 150 },
            ],
            resourceCounts: [
              { resourceType: "script", budget: 20 },
              { resourceType: "stylesheet", budget: 8 },
              { resourceType: "image", budget: 40 },
              { resourceType: "font", budget: 8 },
              { resourceType: "third-party", budget: 15 },
            ],
            timings: [
              { metric: "first-contentful-paint", budget: 1500 },
              { metric: "largest-contentful-paint", budget: 2000 },
              { metric: "total-blocking-time", budget: 150 },
              { metric: "cumulative-layout-shift", budget: 0.1 },
              { metric: "interactive", budget: 2500 },
            ],
          },
        ],
      },
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["warn", { minScore: 0.95 }],
        "categories:seo": ["warn", { minScore: 0.95 }],
        "first-contentful-paint": [
          "error",
          { maxNumericValue: 1500, aggregationMethod: "median" },
        ],
        "largest-contentful-paint": [
          "error",
          { maxNumericValue: 2000, aggregationMethod: "median" },
        ],
        "total-blocking-time": [
          "error",
          { maxNumericValue: 150, aggregationMethod: "median" },
        ],
        "cumulative-layout-shift": [
          "error",
          { maxNumericValue: 0.1, aggregationMethod: "median" },
        ],
      },
    },
    upload: {
      target: "lhci",
      serverBaseUrl: "http://localhost:9001",
      token: process.env.LHCI_BUILD_TOKEN,
    },
  },
};

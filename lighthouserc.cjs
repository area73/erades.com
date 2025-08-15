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
        formFactor: "mobile",
        budgets: [
          {
            path: "/*",
            resourceSizes: [
              { resourceType: "script", budget: 200 },
              { resourceType: "stylesheet", budget: 80 },
              { resourceType: "image", budget: 500 },
              { resourceType: "font", budget: 300 },
              { resourceType: "third-party", budget: 100 },
            ],
            resourceCounts: [
              { resourceType: "script", budget: 15 },
              { resourceType: "stylesheet", budget: 5 },
              { resourceType: "image", budget: 30 },
              { resourceType: "font", budget: 6 },
              { resourceType: "third-party", budget: 10 },
            ],
            timings: [
              { metric: "first-contentful-paint", budget: 2000 },
              { metric: "largest-contentful-paint", budget: 2500 },
              { metric: "total-blocking-time", budget: 200 },
              { metric: "cumulative-layout-shift", budget: 0.1 },
              { metric: "interactive", budget: 3500 },
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
          { maxNumericValue: 2000, aggregationMethod: "median" },
        ],
        "largest-contentful-paint": [
          "error",
          { maxNumericValue: 2500, aggregationMethod: "median" },
        ],
        "total-blocking-time": [
          "error",
          { maxNumericValue: 200, aggregationMethod: "median" },
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

import { describe, it, expect } from "vitest";

// Mock function to simulate NoResults component logic
const createNoResultsProps = (query?: string, onResetHref?: string) => {
  return {
    query: query || "",
    onResetHref: onResetHref || "?category=all",
    hasQuery: !!(query && query.trim()),
    queryText: query ? `Buscando "${query}"...` : "",
  };
};

describe("NoResults", () => {
  it("should handle empty query", () => {
    const props = createNoResultsProps();

    expect(props.query).toBe("");
    expect(props.onResetHref).toBe("?category=all");
    expect(props.hasQuery).toBe(false);
    expect(props.queryText).toBe("");
  });

  it("should handle query with text", () => {
    const props = createNoResultsProps("javascript");

    expect(props.query).toBe("javascript");
    expect(props.hasQuery).toBe(true);
    expect(props.queryText).toBe('Buscando "javascript"...');
  });

  it("should handle query with whitespace", () => {
    const props = createNoResultsProps("  react  ");

    expect(props.query).toBe("  react  ");
    expect(props.hasQuery).toBe(true);
    expect(props.queryText).toBe('Buscando "  react  "...');
  });

  it("should handle custom reset href", () => {
    const props = createNoResultsProps("test", "/blog");

    expect(props.query).toBe("test");
    expect(props.onResetHref).toBe("/blog");
    expect(props.hasQuery).toBe(true);
  });

  it("should handle empty string query", () => {
    const props = createNoResultsProps("");

    expect(props.query).toBe("");
    expect(props.hasQuery).toBe(false);
    expect(props.queryText).toBe("");
  });

  it("should handle undefined query", () => {
    const props = createNoResultsProps(undefined);

    expect(props.query).toBe("");
    expect(props.hasQuery).toBe(false);
    expect(props.queryText).toBe("");
  });

  it("should handle special characters in query", () => {
    const props = createNoResultsProps("react & typescript");

    expect(props.query).toBe("react & typescript");
    expect(props.hasQuery).toBe(true);
    expect(props.queryText).toBe('Buscando "react & typescript"...');
  });

  it("should handle long query text", () => {
    const longQuery =
      "a very long search query that might be used to test the component";
    const props = createNoResultsProps(longQuery);

    expect(props.query).toBe(longQuery);
    expect(props.hasQuery).toBe(true);
    expect(props.queryText).toBe(`Buscando "${longQuery}"...`);
  });
});

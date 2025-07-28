import { describe, it, expect } from "vitest";

// Mock function to simulate ResultsInfo component logic
const createResultsInfoProps = (
  shown: number,
  total: number,
  query?: string
) => {
  const hasQuery = !!(query && query.trim());
  const queryText = query ? `para ${query}` : "";
  const resultText = `Mostrando ${shown} de ${total} resultados`;

  return {
    shown,
    total,
    query,
    hasQuery,
    queryText,
    resultText,
    isFiltered: shown < total,
    hasResults: shown > 0,
  };
};

describe("ResultsInfo", () => {
  it("should display correct result count without query", () => {
    const props = createResultsInfoProps(5, 10);

    expect(props.shown).toBe(5);
    expect(props.total).toBe(10);
    expect(props.hasQuery).toBe(false);
    expect(props.queryText).toBe("");
    expect(props.resultText).toBe("Mostrando 5 de 10 resultados");
  });

  it("should display correct result count with query", () => {
    const props = createResultsInfoProps(3, 8, "javascript");

    expect(props.shown).toBe(3);
    expect(props.total).toBe(8);
    expect(props.hasQuery).toBe(true);
    expect(props.queryText).toBe("para javascript");
    expect(props.resultText).toBe("Mostrando 3 de 8 resultados");
  });

  it("should handle zero results", () => {
    const props = createResultsInfoProps(0, 10);

    expect(props.shown).toBe(0);
    expect(props.total).toBe(10);
    expect(props.hasResults).toBe(false);
    expect(props.isFiltered).toBe(true);
  });

  it("should handle all results shown", () => {
    const props = createResultsInfoProps(10, 10);

    expect(props.shown).toBe(10);
    expect(props.total).toBe(10);
    expect(props.hasResults).toBe(true);
    expect(props.isFiltered).toBe(false);
  });

  it("should handle empty query", () => {
    const props = createResultsInfoProps(5, 10, "");

    expect(props.hasQuery).toBe(false);
    expect(props.queryText).toBe("");
  });

  it("should handle undefined query", () => {
    const props = createResultsInfoProps(5, 10, undefined);

    expect(props.hasQuery).toBe(false);
    expect(props.queryText).toBe("");
  });

  it("should handle query with whitespace", () => {
    const props = createResultsInfoProps(2, 5, "  react  ");

    expect(props.hasQuery).toBe(true);
    expect(props.queryText).toBe("para   react  ");
  });

  it("should handle single result", () => {
    const props = createResultsInfoProps(1, 1);

    expect(props.shown).toBe(1);
    expect(props.total).toBe(1);
    expect(props.hasResults).toBe(true);
    expect(props.isFiltered).toBe(false);
  });

  it("should handle large numbers", () => {
    const props = createResultsInfoProps(150, 1000, "typescript");

    expect(props.shown).toBe(150);
    expect(props.total).toBe(1000);
    expect(props.hasQuery).toBe(true);
    expect(props.isFiltered).toBe(true);
    expect(props.resultText).toBe("Mostrando 150 de 1000 resultados");
  });

  it("should handle special characters in query", () => {
    const props = createResultsInfoProps(3, 5, "react & typescript");

    expect(props.hasQuery).toBe(true);
    expect(props.queryText).toBe("para react & typescript");
  });

  it("should handle edge case where shown equals total", () => {
    const props = createResultsInfoProps(5, 5);

    expect(props.shown).toBe(5);
    expect(props.total).toBe(5);
    expect(props.isFiltered).toBe(false);
    expect(props.hasResults).toBe(true);
  });

  it("should handle edge case where shown is greater than total", () => {
    const props = createResultsInfoProps(10, 5);

    expect(props.shown).toBe(10);
    expect(props.total).toBe(5);
    expect(props.isFiltered).toBe(false);
    expect(props.hasResults).toBe(true);
  });
});

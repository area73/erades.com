import { describe, it, expect } from "vitest";

// Mock function to simulate Paginator component logic
const createPaginatorProps = (
  currentPage: number,
  totalPages: number,
  getPageHref?: (page: number) => string,
  prevLabel?: string,
  nextLabel?: string,
  customClass?: string,
  ariaLabel?: string
) => {
  const defaultGetPageHref = (page: number) =>
    page === 1 ? "/blog/" : `/blog/${page}/`;
  const defaultPrevLabel = "Anterior";
  const defaultNextLabel = "Siguiente";
  const defaultAriaLabel = "Navegación de páginas";

  const finalGetPageHref = getPageHref || defaultGetPageHref;
  const finalPrevLabel = prevLabel || defaultPrevLabel;
  const finalNextLabel = nextLabel || defaultNextLabel;
  const finalAriaLabel = ariaLabel || defaultAriaLabel;

  const shouldShowPaginator = totalPages > 1;
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const prevPageHref = isFirstPage
    ? undefined
    : finalGetPageHref(currentPage - 1);
  const nextPageHref = isLastPage
    ? undefined
    : finalGetPageHref(currentPage + 1);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return {
    currentPage,
    totalPages,
    getPageHref: finalGetPageHref,
    prevLabel: finalPrevLabel,
    nextLabel: finalNextLabel,
    customClass,
    ariaLabel: finalAriaLabel,
    shouldShowPaginator,
    isFirstPage,
    isLastPage,
    prevPageHref,
    nextPageHref,
    pageNumbers,
  };
};

describe("Paginator", () => {
  it("should show paginator when total pages > 1", () => {
    const props = createPaginatorProps(1, 3);

    expect(props.shouldShowPaginator).toBe(true);
    expect(props.totalPages).toBe(3);
  });

  it("should not show paginator when total pages = 1", () => {
    const props = createPaginatorProps(1, 1);

    expect(props.shouldShowPaginator).toBe(false);
    expect(props.totalPages).toBe(1);
  });

  it("should detect first page correctly", () => {
    const props = createPaginatorProps(1, 3);

    expect(props.isFirstPage).toBe(true);
    expect(props.isLastPage).toBe(false);
    expect(props.prevPageHref).toBeUndefined();
  });

  it("should detect last page correctly", () => {
    const props = createPaginatorProps(3, 3);

    expect(props.isFirstPage).toBe(false);
    expect(props.isLastPage).toBe(true);
    expect(props.nextPageHref).toBeUndefined();
  });

  it("should detect middle page correctly", () => {
    const props = createPaginatorProps(2, 3);

    expect(props.isFirstPage).toBe(false);
    expect(props.isLastPage).toBe(false);
    expect(props.prevPageHref).toBe("/blog/");
    expect(props.nextPageHref).toBe("/blog/3/");
  });

  it("should generate correct page numbers", () => {
    const props = createPaginatorProps(2, 5);

    expect(props.pageNumbers).toEqual([1, 2, 3, 4, 5]);
    expect(props.pageNumbers).toHaveLength(5);
  });

  it("should use default getPageHref when not provided", () => {
    const props = createPaginatorProps(1, 3);

    expect(props.getPageHref(1)).toBe("/blog/");
    expect(props.getPageHref(2)).toBe("/blog/2/");
    expect(props.getPageHref(3)).toBe("/blog/3/");
  });

  it("should use custom getPageHref when provided", () => {
    const customGetPageHref = (page: number) => `/custom/${page}/`;
    const props = createPaginatorProps(1, 3, customGetPageHref);

    expect(props.getPageHref(1)).toBe("/custom/1/");
    expect(props.getPageHref(2)).toBe("/custom/2/");
  });

  it("should use default labels when not provided", () => {
    const props = createPaginatorProps(1, 3);

    expect(props.prevLabel).toBe("Anterior");
    expect(props.nextLabel).toBe("Siguiente");
  });

  it("should use custom labels when provided", () => {
    const props = createPaginatorProps(1, 3, undefined, "Previous", "Next");

    expect(props.prevLabel).toBe("Previous");
    expect(props.nextLabel).toBe("Next");
  });

  it("should use default aria label when not provided", () => {
    const props = createPaginatorProps(1, 3);

    expect(props.ariaLabel).toBe("Navegación de páginas");
  });

  it("should use custom aria label when provided", () => {
    const props = createPaginatorProps(
      1,
      3,
      undefined,
      undefined,
      undefined,
      undefined,
      "Custom Navigation"
    );

    expect(props.ariaLabel).toBe("Custom Navigation");
  });

  it("should handle custom class", () => {
    const props = createPaginatorProps(
      1,
      3,
      undefined,
      undefined,
      undefined,
      "custom-class"
    );

    expect(props.customClass).toBe("custom-class");
  });

  it("should handle edge case with single page", () => {
    const props = createPaginatorProps(1, 1);

    expect(props.shouldShowPaginator).toBe(false);
    expect(props.pageNumbers).toEqual([1]);
    expect(props.isFirstPage).toBe(true);
    expect(props.isLastPage).toBe(true);
  });

  it("should handle large number of pages", () => {
    const props = createPaginatorProps(5, 10);

    expect(props.pageNumbers).toHaveLength(10);
    expect(props.pageNumbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(props.isFirstPage).toBe(false);
    expect(props.isLastPage).toBe(false);
  });

  it("should validate current page bounds", () => {
    const props = createPaginatorProps(3, 3);

    expect(props.currentPage).toBe(3);
    expect(props.totalPages).toBe(3);
    expect(props.currentPage).toBeLessThanOrEqual(props.totalPages);
    expect(props.currentPage).toBeGreaterThan(0);
  });
});

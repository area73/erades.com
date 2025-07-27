import { describe, it, expect } from "vitest";

// Mock function to simulate BlogFilters component logic
const createBlogFiltersProps = (
  categories: string[],
  selectedCategory: string,
  sortBy: string,
  viewMode: string,
  tag?: string,
  getCategoryHref?: (cat: string) => string
) => {
  function getCategoryHrefLocal(cat: string) {
    if (!tag) return getCategoryHref ? getCategoryHref(cat) : "#";
    if (cat === "Todas") {
      return `/tags/${tag}/` + (sortBy ? `?sortBy=${sortBy}` : "");
    }
    return `/tags/${tag}/${cat}/` + (sortBy ? `?sortBy=${sortBy}` : "");
  }

  return {
    categories,
    selectedCategory,
    sortBy,
    viewMode,
    tag,
    getCategoryHrefLocal,
    isCategorySelected: (category: string) =>
      selectedCategory.trim().toLowerCase() === category.trim().toLowerCase(),
  };
};

describe("BlogFilters", () => {
  it("should generate category href without tag", () => {
    const getCategoryHref = (cat: string) => `/blog/category/${cat}/`;
    const props = createBlogFiltersProps(
      ["Technology", "Programming"],
      "Technology",
      "date-desc",
      "grid",
      undefined,
      getCategoryHref
    );

    expect(props.getCategoryHrefLocal("Technology")).toBe(
      "/blog/category/Technology/"
    );
  });

  it("should generate category href with tag and sortBy", () => {
    const props = createBlogFiltersProps(
      ["Technology", "Programming"],
      "Technology",
      "title",
      "grid",
      "javascript"
    );

    expect(props.getCategoryHrefLocal("Technology")).toBe(
      "/tags/javascript/Technology/?sortBy=title"
    );
  });

  it("should generate 'Todas' category href with tag", () => {
    const props = createBlogFiltersProps(
      ["Todas", "Technology"],
      "Todas",
      "date-desc",
      "grid",
      "javascript"
    );

    expect(props.getCategoryHrefLocal("Todas")).toBe(
      "/tags/javascript/?sortBy=date-desc"
    );
  });

  it("should generate category href without sortBy when not provided", () => {
    const props = createBlogFiltersProps(
      ["Technology"],
      "Technology",
      "",
      "grid",
      "javascript"
    );

    expect(props.getCategoryHrefLocal("Technology")).toBe(
      "/tags/javascript/Technology/"
    );
  });

  it("should detect selected category correctly", () => {
    const props = createBlogFiltersProps(
      ["Technology", "Programming"],
      "Technology",
      "date-desc",
      "grid"
    );

    expect(props.isCategorySelected("Technology")).toBe(true);
    expect(props.isCategorySelected("Programming")).toBe(false);
  });

  it("should handle case-insensitive category selection", () => {
    const props = createBlogFiltersProps(
      ["Technology", "Programming"],
      "technology",
      "date-desc",
      "grid"
    );

    expect(props.isCategorySelected("Technology")).toBe(true);
    expect(props.isCategorySelected("TECHNOLOGY")).toBe(true);
  });

  it("should handle whitespace in category names", () => {
    const props = createBlogFiltersProps(
      ["Technology", "Programming"],
      " Technology ",
      "date-desc",
      "grid"
    );

    expect(props.isCategorySelected("Technology")).toBe(true);
    expect(props.isCategorySelected(" Programming ")).toBe(false);
  });

  it("should return default href when no getCategoryHref provided", () => {
    const props = createBlogFiltersProps(
      ["Technology"],
      "Technology",
      "date-desc",
      "grid"
    );

    expect(props.getCategoryHrefLocal("Technology")).toBe("#");
  });

  it("should handle empty categories array", () => {
    const props = createBlogFiltersProps([], "", "date-desc", "grid");

    expect(props.categories).toEqual([]);
    expect(props.isCategorySelected("Any")).toBe(false);
  });

  it("should handle empty selected category", () => {
    const props = createBlogFiltersProps(
      ["Technology", "Programming"],
      "",
      "date-desc",
      "grid"
    );

    expect(props.isCategorySelected("Technology")).toBe(false);
    expect(props.isCategorySelected("Programming")).toBe(false);
  });
});

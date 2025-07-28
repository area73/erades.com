import { describe, it, expect } from "vitest";

// Mock function to simulate the component logic
const createViewModeToggleProps = (viewMode: string) => {
  const currentUrl = new URL("http://localhost:4321/blog");
  const gridUrl = new URL(currentUrl);
  const listUrl = new URL(currentUrl);

  gridUrl.searchParams.set("viewMode", "grid");
  listUrl.searchParams.set("viewMode", "list");

  return {
    gridUrl: gridUrl.toString(),
    listUrl: listUrl.toString(),
    isGridActive: viewMode === "grid",
    isListActive: viewMode === "list",
  };
};

describe("ViewModeToggle", () => {
  it("should highlight grid when viewMode is 'grid'", () => {
    const props = createViewModeToggleProps("grid");
    expect(props.isGridActive).toBe(true);
    expect(props.isListActive).toBe(false);
  });

  it("should highlight list when viewMode is 'list'", () => {
    const props = createViewModeToggleProps("list");
    expect(props.isListActive).toBe(true);
    expect(props.isGridActive).toBe(false);
  });

  it("should generate correct URLs with viewMode", () => {
    const props = createViewModeToggleProps("grid");
    expect(props.gridUrl).toContain("viewMode=grid");
    expect(props.listUrl).toContain("viewMode=list");
  });

  it("should not highlight any when viewMode is unknown", () => {
    const props = createViewModeToggleProps("unknown");
    expect(props.isGridActive).toBe(false);
    expect(props.isListActive).toBe(false);
  });
});

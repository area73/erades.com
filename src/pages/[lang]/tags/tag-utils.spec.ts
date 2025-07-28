import { describe, it, expect } from "vitest";
import {
  getTagCounts,
  getSortedTags,
  getFontSize,
  filterPostsByTag,
} from "./tag-utils";

describe("Tag Cloud Logic", () => {
  const posts = [
    { data: { tags: ["a", "b", "a"] } },
    { data: { tags: ["b", "c"] } },
    { data: { tags: ["a"] } },
    { data: { tags: undefined } },
  ];

  it("counts tags correctly", () => {
    const tagCounts = getTagCounts(posts);
    expect(tagCounts).toEqual({ a: 3, b: 2, c: 1 });
  });

  it("sorts tags by count descending", () => {
    const tagCounts = getTagCounts(posts);
    const sorted = getSortedTags(tagCounts);
    expect(sorted).toEqual(["a", "b", "c"]);
  });

  it("calculates font size proportionally", () => {
    const tagCounts = { a: 3, b: 2, c: 1 };
    const minCount = Math.min(...Object.values(tagCounts));
    const maxCount = Math.max(...Object.values(tagCounts));
    expect(getFontSize(3, minCount, maxCount)).toBe("2.5em");
    expect(getFontSize(2, minCount, maxCount)).toBe("1.75em");
    expect(getFontSize(1, minCount, maxCount)).toBe("1em");
  });

  it("returns default font size if all counts are equal", () => {
    expect(getFontSize(2, 2, 2)).toBe("1.5em");
  });
});

describe("Tag Details Page Logic", () => {
  const posts = [
    { id: "1", data: { tags: ["a", "b"] } },
    { id: "2", data: { tags: ["b", "c"] } },
    { id: "3", data: { tags: ["a"] } },
    { id: "4", data: { tags: undefined } },
  ];

  it("filters posts by tag", () => {
    expect(filterPostsByTag(posts, "a").map((p) => p.id)).toEqual(["1", "3"]);
    expect(filterPostsByTag(posts, "b").map((p) => p.id)).toEqual(["1", "2"]);
    expect(filterPostsByTag(posts, "c").map((p) => p.id)).toEqual(["2"]);
    expect(filterPostsByTag(posts, "d").map((p) => p.id)).toEqual([]);
  });
});

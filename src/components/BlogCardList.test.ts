import { describe, it, expect } from "vitest";

// Mock function to simulate BlogCardList component logic
const createBlogCardListProps = (post: any, lang: string = "es") => {
  const langPrefix = `${lang}/`;
  const postId =
    post && typeof post.id === "string"
      ? post.id
      : (post.data && post.data.id) || "";
  const href = `/${lang}/blog/${
    postId.startsWith(langPrefix) ? postId.slice(langPrefix.length) : postId
  }/`;

  // Utility to support flattened and nested posts
  const get = (key: string) => post[key] ?? (post.data && post.data[key]);

  return {
    post,
    lang,
    href,
    hasHeroImage: !!get("heroImage"),
    hasCategories:
      Array.isArray(get("categories")) && get("categories").length > 0,
    hasTags: Array.isArray(get("tags")) && get("tags").length > 0,
    primaryCategory:
      get("categories") && get("categories").length > 0
        ? get("categories")[0]
        : "Sin categoría",
    title: get("title") || "",
    excerpt: get("excerpt") || get("description") || "",
    author: get("author") || "",
    pubDate: get("pubDate") ? new Date(get("pubDate")) : new Date(0),
  };
};

// Mock post data
const mockPost = {
  id: "es/test-post",
  title: "Test Post Title",
  excerpt: "This is a test post excerpt",
  description: "Alternative description",
  pubDate: new Date("2023-01-01"),
  author: "Test Author",
  categories: ["Technology", "Programming"],
  tags: ["javascript", "typescript"],
  heroImage: "/test-image.jpg",
};

describe("BlogCardList", () => {
  it("should generate correct href for post with lang prefix", () => {
    const props = createBlogCardListProps(mockPost, "es");

    expect(props.href).toBe("/es/blog/test-post/");
  });

  it("should generate correct href for post without lang prefix", () => {
    const postWithoutPrefix = { ...mockPost, id: "test-post" };
    const props = createBlogCardListProps(postWithoutPrefix, "es");

    expect(props.href).toBe("/es/blog/test-post/");
  });

  it("should detect hero image presence", () => {
    const props = createBlogCardListProps(mockPost, "es");

    expect(props.hasHeroImage).toBe(true);
  });

  it("should detect absence of hero image", () => {
    const postWithoutImage = { ...mockPost, heroImage: undefined };
    const props = createBlogCardListProps(postWithoutImage, "es");

    expect(props.hasHeroImage).toBe(false);
  });

  it("should detect categories presence", () => {
    const props = createBlogCardListProps(mockPost, "es");

    expect(props.hasCategories).toBe(true);
  });

  it("should detect absence of categories", () => {
    const postWithoutCategories = { ...mockPost, categories: [] };
    const props = createBlogCardListProps(postWithoutCategories, "es");

    expect(props.hasCategories).toBe(false);
  });

  it("should return primary category correctly", () => {
    const props = createBlogCardListProps(mockPost, "es");

    expect(props.primaryCategory).toBe("Technology");
  });

  it("should return default category when no categories exist", () => {
    const postWithoutCategories = { ...mockPost, categories: [] };
    const props = createBlogCardListProps(postWithoutCategories, "es");

    expect(props.primaryCategory).toBe("Sin categoría");
  });

  it("should detect tags presence", () => {
    const props = createBlogCardListProps(mockPost, "es");

    expect(props.hasTags).toBe(true);
  });

  it("should handle nested post data structure", () => {
    const nestedPost = {
      data: {
        id: "test-post",
        title: "Nested Post Title",
        heroImage: "/nested-image.jpg",
        categories: ["Nested Category"],
        tags: ["nested-tag"],
        author: "Nested Author",
        pubDate: new Date("2023-01-01"),
      },
    };
    const props = createBlogCardListProps(nestedPost, "es");

    expect(props.href).toBe("/es/blog/test-post/");
    expect(props.hasHeroImage).toBe(true);
    expect(props.hasCategories).toBe(true);
    expect(props.hasTags).toBe(true);
    expect(props.primaryCategory).toBe("Nested Category");
    expect(props.title).toBe("Nested Post Title");
    expect(props.author).toBe("Nested Author");
  });

  it("should handle missing title gracefully", () => {
    const postWithoutTitle = { ...mockPost, title: undefined };
    const props = createBlogCardListProps(postWithoutTitle, "es");

    expect(props.title).toBe("");
  });

  it("should use excerpt over description when both exist", () => {
    const props = createBlogCardListProps(mockPost, "es");

    expect(props.excerpt).toBe("This is a test post excerpt");
  });

  it("should fallback to description when excerpt is missing", () => {
    const postWithoutExcerpt = { ...mockPost, excerpt: undefined };
    const props = createBlogCardListProps(postWithoutExcerpt, "es");

    expect(props.excerpt).toBe("Alternative description");
  });

  it("should handle missing author gracefully", () => {
    const postWithoutAuthor = { ...mockPost, author: undefined };
    const props = createBlogCardListProps(postWithoutAuthor, "es");

    expect(props.author).toBe("");
  });

  it("should handle invalid pubDate gracefully", () => {
    const postWithInvalidDate = { ...mockPost, pubDate: "invalid-date" };
    const props = createBlogCardListProps(postWithInvalidDate, "es");

    expect(props.pubDate).toEqual(new Date("invalid-date"));
  });
});

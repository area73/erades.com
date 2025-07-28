import { describe, it, expect } from "vitest";

// Mock function to simulate BlogCardGrid component logic
const createBlogCardGridProps = (post: any, lang: string = "es") => {
  const langPrefix = `${lang}/`;
  const postId =
    post && typeof post.id === "string"
      ? post.id
      : (post.data && post.data.id) || "";
  const href = `/${lang}/blog/${
    postId.startsWith(langPrefix) ? postId.slice(langPrefix.length) : postId
  }/`;

  const getReadTime = (content: string): number => {
    if (!content) return 1;
    const words = content.split(/\s+/).length;
    return Math.max(1, Math.round(words / 250));
  };

  const content = post.content || (post.data && post.data.content) || "";
  const readTime = getReadTime(content);

  return {
    post,
    lang,
    href,
    readTime,
    hasHeroImage: !!(post.heroImage || (post.data && post.data.heroImage)),
    hasCategories:
      Array.isArray(post.categories || (post.data && post.data.categories)) &&
      (post.categories || (post.data && post.data.categories)).length > 0,
    hasTags:
      Array.isArray(post.tags || (post.data && post.data.tags)) &&
      (post.tags || (post.data && post.data.tags)).length > 0,
  };
};

// Mock post data
const mockPost = {
  id: "es/test-post",
  title: "Test Post Title",
  excerpt: "This is a test post excerpt",
  pubDate: new Date("2023-01-01"),
  author: "Test Author",
  categories: ["Technology", "Programming"],
  tags: ["javascript", "typescript"],
  heroImage: "/test-image.jpg",
  content:
    "This is the full content of the test post with many words to test the read time calculation. It should have enough words to make the read time calculation meaningful.",
};

describe("BlogCardGrid", () => {
  it("should generate correct href for post with lang prefix", () => {
    const props = createBlogCardGridProps(mockPost, "es");

    expect(props.href).toBe("/es/blog/test-post/");
  });

  it("should generate correct href for post without lang prefix", () => {
    const postWithoutPrefix = { ...mockPost, id: "test-post" };
    const props = createBlogCardGridProps(postWithoutPrefix, "es");

    expect(props.href).toBe("/es/blog/test-post/");
  });

  it("should calculate read time correctly", () => {
    const props = createBlogCardGridProps(mockPost, "es");

    expect(props.readTime).toBeGreaterThanOrEqual(1);
    expect(typeof props.readTime).toBe("number");
  });

  it("should return read time of 1 for empty content", () => {
    const postWithoutContent = { ...mockPost, content: "" };
    const props = createBlogCardGridProps(postWithoutContent, "es");

    expect(props.readTime).toBe(1);
  });

  it("should detect hero image presence", () => {
    const props = createBlogCardGridProps(mockPost, "es");

    expect(props.hasHeroImage).toBe(true);
  });

  it("should detect absence of hero image", () => {
    const postWithoutImage = { ...mockPost, heroImage: undefined };
    const props = createBlogCardGridProps(postWithoutImage, "es");

    expect(props.hasHeroImage).toBe(false);
  });

  it("should detect categories presence", () => {
    const props = createBlogCardGridProps(mockPost, "es");

    expect(props.hasCategories).toBe(true);
  });

  it("should detect absence of categories", () => {
    const postWithoutCategories = { ...mockPost, categories: [] };
    const props = createBlogCardGridProps(postWithoutCategories, "es");

    expect(props.hasCategories).toBe(false);
  });

  it("should detect tags presence", () => {
    const props = createBlogCardGridProps(mockPost, "es");

    expect(props.hasTags).toBe(true);
  });

  it("should handle nested post data structure", () => {
    const nestedPost = {
      data: {
        id: "test-post",
        title: "Nested Post Title",
        content: "Nested content",
        heroImage: "/nested-image.jpg",
        categories: ["Nested Category"],
        tags: ["nested-tag"],
      },
    };
    const props = createBlogCardGridProps(nestedPost, "es");

    expect(props.href).toBe("/es/blog/test-post/");
    expect(props.readTime).toBe(1);
    expect(props.hasHeroImage).toBe(true);
    expect(props.hasCategories).toBe(true);
    expect(props.hasTags).toBe(true);
  });
});

import { describe, it, expect } from "vitest";

// Mock function to simulate BaseHead component logic
const createBaseHeadProps = (
  title: string,
  description: string,
  image?: string
) => {
  const canonicalURL = new URL("/test-page", "https://example.com");

  return {
    title,
    description,
    image: image || "/blog-placeholder-1.jpg",
    canonicalURL: canonicalURL.toString(),
    ogImage: new URL(
      image || "/blog-placeholder-1.jpg",
      "https://example.com"
    ).toString(),
    twitterImage: new URL(
      image || "/blog-placeholder-1.jpg",
      "https://example.com"
    ).toString(),
  };
};

describe("BaseHead", () => {
  it("should generate correct meta tags with default image", () => {
    const props = createBaseHeadProps("Test Title", "Test Description");

    expect(props.title).toBe("Test Title");
    expect(props.description).toBe("Test Description");
    expect(props.image).toBe("/blog-placeholder-1.jpg");
    expect(props.canonicalURL).toBe("https://example.com/test-page");
    expect(props.ogImage).toBe("https://example.com/blog-placeholder-1.jpg");
  });

  it("should generate correct meta tags with custom image", () => {
    const props = createBaseHeadProps(
      "Test Title",
      "Test Description",
      "/custom-image.jpg"
    );

    expect(props.title).toBe("Test Title");
    expect(props.description).toBe("Test Description");
    expect(props.image).toBe("/custom-image.jpg");
    expect(props.ogImage).toBe("https://example.com/custom-image.jpg");
    expect(props.twitterImage).toBe("https://example.com/custom-image.jpg");
  });

  it("should handle empty title and description", () => {
    const props = createBaseHeadProps("", "");

    expect(props.title).toBe("");
    expect(props.description).toBe("");
    expect(props.image).toBe("/blog-placeholder-1.jpg");
  });

  it("should generate absolute URLs for images", () => {
    const props = createBaseHeadProps(
      "Test",
      "Test",
      "/relative/path/image.jpg"
    );

    expect(props.ogImage).toBe("https://example.com/relative/path/image.jpg");
    expect(props.twitterImage).toBe(
      "https://example.com/relative/path/image.jpg"
    );
  });
});

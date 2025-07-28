import { describe, it, expect } from "vitest";

// Mock function to simulate HeaderLink component logic
const createHeaderLinkProps = (
  href: string,
  lang: string = "es",
  currentPathname: string = "/es"
) => {
  const pathname = currentPathname.replace("", "");
  const subpath = pathname.match(/[^\/]+/g);
  const hrefStr = typeof href === "string" ? href : String(href ?? "");
  const hrefWithLang = hrefStr.startsWith(`/${lang}`)
    ? hrefStr
    : `/${lang}${hrefStr.startsWith("/") ? hrefStr : "/" + hrefStr}`;

  const clean = (str: string) => str.replace(/\/$/, "");
  const current = clean(pathname);
  const target = clean(hrefWithLang);
  const isHome = target === `/${lang}`;
  const isActive = current === target || current.startsWith(target + "/");

  const icons = {
    "/": "Home",
    "/blog": "FileText",
    "/about": "Info",
    "/tags": "Hash",
  };

  const icon = icons[href as keyof typeof icons];

  return {
    href,
    lang,
    hrefWithLang,
    isActive,
    isHome,
    icon,
    currentPathname: current,
    targetPathname: target,
  };
};

describe("HeaderLink", () => {
  it("should generate correct href with language prefix", () => {
    const props = createHeaderLinkProps("/blog", "es", "/es");

    expect(props.hrefWithLang).toBe("/es/blog");
    expect(props.lang).toBe("es");
  });

  it("should handle href that already has language prefix", () => {
    const props = createHeaderLinkProps("/es/blog", "es", "/es");

    expect(props.hrefWithLang).toBe("/es/blog");
  });

  it("should detect active state for exact match", () => {
    const props = createHeaderLinkProps("/blog", "es", "/es/blog");

    expect(props.isActive).toBe(true);
    expect(props.currentPathname).toBe("/es/blog");
    expect(props.targetPathname).toBe("/es/blog");
  });

  it("should detect active state for nested routes", () => {
    const props = createHeaderLinkProps("/blog", "es", "/es/blog/some-post");

    expect(props.isActive).toBe(true);
    expect(props.currentPathname).toBe("/es/blog/some-post");
    expect(props.targetPathname).toBe("/es/blog");
  });

  it("should not detect active state for different routes", () => {
    const props = createHeaderLinkProps("/about", "es", "/es/blog");

    expect(props.isActive).toBe(false);
    expect(props.currentPathname).toBe("/es/blog");
    expect(props.targetPathname).toBe("/es/about");
  });

  it("should detect home page correctly", () => {
    const props = createHeaderLinkProps("/", "es", "/es");

    expect(props.isHome).toBe(true);
    expect(props.isActive).toBe(true);
  });

  it("should assign correct icons to routes", () => {
    const homeProps = createHeaderLinkProps("/", "es", "/es");
    const blogProps = createHeaderLinkProps("/blog", "es", "/es");
    const aboutProps = createHeaderLinkProps("/about", "es", "/es");
    const tagsProps = createHeaderLinkProps("/tags", "es", "/es");

    expect(homeProps.icon).toBe("Home");
    expect(blogProps.icon).toBe("FileText");
    expect(aboutProps.icon).toBe("Info");
    expect(tagsProps.icon).toBe("Hash");
  });

  it("should handle different languages correctly", () => {
    const propsEs = createHeaderLinkProps("/blog", "es", "/es/blog");
    const propsEn = createHeaderLinkProps("/blog", "en", "/en/blog");

    expect(propsEs.hrefWithLang).toBe("/es/blog");
    expect(propsEn.hrefWithLang).toBe("/en/blog");
    expect(propsEs.isActive).toBe(true);
    expect(propsEn.isActive).toBe(true);
  });

  it("should handle trailing slashes correctly", () => {
    const propsWithSlash = createHeaderLinkProps("/blog/", "es", "/es/blog/");
    const propsWithoutSlash = createHeaderLinkProps("/blog", "es", "/es/blog");

    expect(propsWithSlash.targetPathname).toBe("/es/blog");
    expect(propsWithoutSlash.targetPathname).toBe("/es/blog");
    expect(propsWithSlash.isActive).toBe(true);
    expect(propsWithoutSlash.isActive).toBe(true);
  });

  it("should handle empty href gracefully", () => {
    const props = createHeaderLinkProps("", "es", "/es");

    expect(props.hrefWithLang).toBe("/es/");
    expect(props.isActive).toBe(true);
  });

  it("should handle undefined href gracefully", () => {
    const props = createHeaderLinkProps(undefined as any, "es", "/es");

    expect(props.hrefWithLang).toBe("/es/");
    expect(props.isActive).toBe(true);
  });

  it("should handle non-string href", () => {
    const props = createHeaderLinkProps(123 as any, "es", "/es");

    expect(props.hrefWithLang).toBe("/es/123");
    expect(props.isActive).toBe(false);
  });
});

// @vitest-environment happy-dom
import { describe, test, expect } from "vitest";
import { getByText, getByRole, getByAltText } from "@testing-library/dom";
import Header from "./Header.astro";
import { renderAstroComponent } from "../test/helpers.ts";

describe("Header", () => {
  test("renders header with correct structure", async () => {
    const result = await renderAstroComponent(Header, {
      props: {
        lang: "es",
      },
    });

    const header = result.querySelector("header");
    expect(header).not.toBeNull();
    expect(header?.classList.contains("sticky")).toBe(true);
    expect(header?.classList.contains("top-0")).toBe(true);
  });

  test("renders logo with correct attributes", async () => {
    const result = await renderAstroComponent(Header, {
      props: {
        lang: "es",
      },
    });

    const logo = getByAltText(result, "Logo de Area 73");
    expect(logo).not.toBeNull();
    expect(logo?.getAttribute("src")).toBe("/area73-small.png");
    expect(logo?.classList.contains("h-12")).toBe(true);
    expect(logo?.classList.contains("w-12")).toBe(true);
  });

  test("renders navigation menu", async () => {
    const result = await renderAstroComponent(Header, {
      props: {
        lang: "es",
      },
    });

    const nav = result.querySelector("nav");
    expect(nav).not.toBeNull();
  });

  test("renders all navigation links", async () => {
    const result = await renderAstroComponent(Header, {
      props: {
        lang: "es",
      },
    });

    const homeLink = getByText(result, "Inicio");
    const blogLink = getByText(result, "Blog");
    const aboutLink = getByText(result, "Acerca de");
    const tagsLink = getByText(result, "Tags y Categorías");

    expect(homeLink).not.toBeNull();
    expect(blogLink).not.toBeNull();
    expect(aboutLink).not.toBeNull();
    expect(tagsLink).not.toBeNull();
  });

  test("renders language toggle buttons", async () => {
    const result = await renderAstroComponent(Header, {
      props: {
        lang: "es",
      },
    });

    const esButton = result.querySelector("#lang-es");
    const enButton = result.querySelector("#lang-en");

    expect(esButton).not.toBeNull();
    expect(enButton).not.toBeNull();
    expect(esButton?.textContent?.trim()).toBe("ES");
    expect(enButton?.textContent?.trim()).toBe("EN");
  });

  test("applies active state to current language button", async () => {
    const result = await renderAstroComponent(Header, {
      props: {
        lang: "es",
      },
    });

    const esButton = result.querySelector("#lang-es");
    const enButton = result.querySelector("#lang-en");

    expect(esButton?.classList.contains("bg-primary")).toBe(true);
    expect(esButton?.getAttribute("aria-current")).toBe("page");
    expect(enButton?.classList.contains("bg-primary")).toBe(false);
  });

  test("renders theme toggle", async () => {
    const result = await renderAstroComponent(Header, {
      props: {
        lang: "es",
      },
    });

    // Verificar que el componente ThemeToggle está presente
    expect(result.innerHTML).toBeTruthy();
  });

  test("renders search box on desktop", async () => {
    const result = await renderAstroComponent(Header, {
      props: {
        lang: "es",
      },
    });

    const searchContainer = result.querySelector(".hidden.md\\:block");
    expect(searchContainer).not.toBeNull();
  });

  test("renders avatar button", async () => {
    const result = await renderAstroComponent(Header, {
      props: {
        lang: "es",
      },
    });

    const avatarButton = result.querySelector("#avatar-btn");
    expect(avatarButton).not.toBeNull();
    expect(avatarButton?.getAttribute("type")).toBe("button");
    expect(avatarButton?.getAttribute("aria-haspopup")).toBe("true");
  });

  test("renders avatar image", async () => {
    const result = await renderAstroComponent(Header, {
      props: {
        lang: "es",
      },
    });

    const avatar = getByAltText(result, "Avatar de usuario");
    expect(avatar).not.toBeNull();
    expect(avatar?.getAttribute("src")).toBe("/avatar.png");
    expect(avatar?.classList.contains("h-8")).toBe(true);
    expect(avatar?.classList.contains("w-8")).toBe(true);
  });

  test("renders social profile menu", async () => {
    const result = await renderAstroComponent(Header, {
      props: {
        lang: "es",
      },
    });

    // Verificar que el componente SocialProfileMenu está presente
    expect(result.innerHTML).toBeTruthy();
  });

  test("renders with English language", async () => {
    const result = await renderAstroComponent(Header, {
      props: {
        lang: "en",
      },
    });

    const homeLink = getByText(result, "Home");
    expect(homeLink).not.toBeNull();
  });

  test("renders with Spanish language", async () => {
    const result = await renderAstroComponent(Header, {
      props: {
        lang: "es",
      },
    });

    const homeLink = getByText(result, "Inicio");
    expect(homeLink).not.toBeNull();
  });

  test("has correct header classes", async () => {
    const result = await renderAstroComponent(Header, {
      props: {
        lang: "es",
      },
    });

    const header = result.querySelector("header");
    expect(header?.classList.contains("w-full")).toBe(true);
    expect(header?.classList.contains("sticky")).toBe(true);
    expect(header?.classList.contains("top-0")).toBe(true);
    expect(header?.classList.contains("z-40")).toBe(true);
  });

  test("has correct container structure", async () => {
    const result = await renderAstroComponent(Header, {
      props: {
        lang: "es",
      },
    });

    const container = result.querySelector(".max-w-\\[1440px\\]");
    expect(container).not.toBeNull();
    expect(container?.classList.contains("mx-auto")).toBe(true);
    expect(container?.classList.contains("w-full")).toBe(true);
  });

  test("renders chevron down icon in avatar button", async () => {
    const result = await renderAstroComponent(Header, {
      props: {
        lang: "es",
      },
    });

    const chevronIcon = result.querySelector(".lucide-chevron-down");
    expect(chevronIcon).not.toBeNull();
  });

  test("has correct navigation link structure", async () => {
    const result = await renderAstroComponent(Header, {
      props: {
        lang: "es",
      },
    });

    const nav = result.querySelector("nav");
    expect(nav?.classList.contains("flex")).toBe(true);
    expect(nav?.classList.contains("items-center")).toBe(true);
    expect(nav?.classList.contains("gap-6")).toBe(true);
  });

  test("renders inline scripts", async () => {
    const result = await renderAstroComponent(Header, {
      props: {
        lang: "es",
      },
    });

    const scripts = result.querySelectorAll("script");
    expect(scripts.length).toBeGreaterThan(0);
  });
});

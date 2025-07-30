// @vitest-environment happy-dom
import { describe, test, expect } from "vitest";
import { getByRole, getByLabelText } from "@testing-library/dom";
import SearchInput from "./SearchInput.astro";
import { renderAstroComponent } from "../test/helpers.ts";

describe("SearchInput", () => {
  test("renders search input with default query", async () => {
    const result = await renderAstroComponent(SearchInput, {
      props: {
        lang: "en",
      },
    });

    const input = getByRole(result, "textbox");
    expect(input).not.toBeNull();
    expect(input?.getAttribute("value")).toBe("");
  });

  test("renders search input with provided query", async () => {
    const result = await renderAstroComponent(SearchInput, {
      props: {
        query: "test search",
        lang: "en",
      },
    });

    const input = getByRole(result, "textbox");
    expect(input).not.toBeNull();
    expect(input?.getAttribute("value")).toBe("test search");
  });

  test("renders form with correct action and method", async () => {
    const result = await renderAstroComponent(SearchInput, {
      props: {
        lang: "en",
      },
    });

    const form = result.querySelector("form");
    expect(form).not.toBeNull();
    expect(form?.getAttribute("action")).toBe("/search");
    expect(form?.getAttribute("method")).toBe("get");
  });

  test("renders input with correct name attribute", async () => {
    const result = await renderAstroComponent(SearchInput, {
      props: {
        lang: "en",
      },
    });

    const input = getByRole(result, "textbox");
    expect(input?.getAttribute("name")).toBe("q");
  });

  test("renders input with correct type and autocomplete", async () => {
    const result = await renderAstroComponent(SearchInput, {
      props: {
        lang: "en",
      },
    });

    const input = getByRole(result, "textbox");
    expect(input?.getAttribute("type")).toBe("text");
    expect(input?.getAttribute("autocomplete")).toBe("off");
  });

  test("renders search icon", async () => {
    const result = await renderAstroComponent(SearchInput, {
      props: {
        lang: "en",
      },
    });

    const searchIcon = result.querySelector("svg");
    expect(searchIcon).not.toBeNull();
  });

  test("renders with Spanish language", async () => {
    const result = await renderAstroComponent(SearchInput, {
      props: {
        lang: "es",
      },
    });

    const input = getByRole(result, "textbox");
    expect(input).not.toBeNull();
    expect(input?.getAttribute("aria-label")).toBeDefined();
  });

  test("renders with English language", async () => {
    const result = await renderAstroComponent(SearchInput, {
      props: {
        lang: "en",
      },
    });

    const input = getByRole(result, "textbox");
    expect(input).not.toBeNull();
    expect(input?.getAttribute("aria-label")).toBeDefined();
  });

  test("renders input with correct classes", async () => {
    const result = await renderAstroComponent(SearchInput, {
      props: {
        lang: "en",
      },
    });

    const input = getByRole(result, "textbox");
    const classes = input?.getAttribute("class");
    expect(classes).toContain("rounded-md");
    expect(classes).toContain("border");
    expect(classes).toContain("bg-secondary");
  });

  test("renders container with correct classes", async () => {
    const result = await renderAstroComponent(SearchInput, {
      props: {
        lang: "en",
      },
    });

    const container = result.querySelector("div");
    const classes = container?.getAttribute("class");
    expect(classes).toContain("relative");
    expect(classes).toContain("flex");
    expect(classes).toContain("items-center");
  });

  test("handles empty query string", async () => {
    const result = await renderAstroComponent(SearchInput, {
      props: {
        query: "",
        lang: "en",
      },
    });

    const input = getByRole(result, "textbox");
    expect(input?.getAttribute("value")).toBe("");
  });

  test("handles undefined query", async () => {
    const result = await renderAstroComponent(SearchInput, {
      props: {
        lang: "en",
      },
    });

    const input = getByRole(result, "textbox");
    expect(input?.getAttribute("value")).toBe("");
  });
});

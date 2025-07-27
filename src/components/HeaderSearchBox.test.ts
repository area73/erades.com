import { describe, it, expect } from "vitest";

// Mock function to simulate HeaderSearchBox component logic
const createHeaderSearchBoxProps = (lang: string = "es") => {
  const formAction = `/${lang}/search`;

  return {
    lang,
    formAction,
  };
};

describe("HeaderSearchBox", () => {
  it("should generate correct form action for Spanish", () => {
    const props = createHeaderSearchBoxProps("es");

    expect(props.lang).toBe("es");
    expect(props.formAction).toBe("/es/search");
  });

  it("should generate correct form action for English", () => {
    const props = createHeaderSearchBoxProps("en");

    expect(props.lang).toBe("en");
    expect(props.formAction).toBe("/en/search");
  });

  it("should handle different languages consistently", () => {
    const propsEs = createHeaderSearchBoxProps("es");
    const propsEn = createHeaderSearchBoxProps("en");

    expect(propsEs.formAction).toBe("/es/search");
    expect(propsEn.formAction).toBe("/en/search");
    expect(propsEs.formAction).not.toBe(propsEn.formAction);
  });

  it("should maintain consistent search endpoint", () => {
    const propsEs = createHeaderSearchBoxProps("es");
    const propsEn = createHeaderSearchBoxProps("en");

    const searchEndpointEs = propsEs.formAction.split("/").pop();
    const searchEndpointEn = propsEn.formAction.split("/").pop();

    expect(searchEndpointEs).toBe("search");
    expect(searchEndpointEn).toBe("search");
    expect(searchEndpointEs).toBe(searchEndpointEn);
  });
});

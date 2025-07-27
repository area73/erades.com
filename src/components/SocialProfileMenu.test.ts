import { describe, it, expect } from "vitest";

// Mock function to simulate SocialProfileMenu component logic
const createSocialProfileMenuProps = (
  name: string,
  email: string,
  linkedinUrl: string,
  xUrl: string,
  lang: string = "es"
) => {
  const linkedinLabel =
    lang === "es" ? "Perfil de LinkedIn" : "LinkedIn Profile";
  const xLabel = lang === "es" ? "Perfil de X" : "X Profile";

  return {
    name,
    email,
    linkedinUrl,
    xUrl,
    lang,
    linkedinLabel,
    xLabel,
    hasValidEmail: email.includes("@"),
    hasValidLinkedinUrl: linkedinUrl.startsWith("http"),
    hasValidXUrl: xUrl.startsWith("http"),
  };
};

describe("SocialProfileMenu", () => {
  it("should handle valid social profile data", () => {
    const props = createSocialProfileMenuProps(
      "Rodrigo Erades",
      "rerades@siete3.com",
      "https://linkedin.com/in/rerades",
      "https://x.com/rerades",
      "es"
    );

    expect(props.name).toBe("Rodrigo Erades");
    expect(props.email).toBe("rerades@siete3.com");
    expect(props.linkedinUrl).toBe("https://linkedin.com/in/rerades");
    expect(props.xUrl).toBe("https://x.com/rerades");
    expect(props.lang).toBe("es");
  });

  it("should generate correct labels for Spanish", () => {
    const props = createSocialProfileMenuProps(
      "Test User",
      "test@example.com",
      "https://linkedin.com/test",
      "https://x.com/test",
      "es"
    );

    expect(props.linkedinLabel).toBe("Perfil de LinkedIn");
    expect(props.xLabel).toBe("Perfil de X");
  });

  it("should generate correct labels for English", () => {
    const props = createSocialProfileMenuProps(
      "Test User",
      "test@example.com",
      "https://linkedin.com/test",
      "https://x.com/test",
      "en"
    );

    expect(props.linkedinLabel).toBe("LinkedIn Profile");
    expect(props.xLabel).toBe("X Profile");
  });

  it("should validate email format", () => {
    const validProps = createSocialProfileMenuProps(
      "Test User",
      "test@example.com",
      "https://linkedin.com/test",
      "https://x.com/test"
    );

    const invalidProps = createSocialProfileMenuProps(
      "Test User",
      "invalid-email",
      "https://linkedin.com/test",
      "https://x.com/test"
    );

    expect(validProps.hasValidEmail).toBe(true);
    expect(invalidProps.hasValidEmail).toBe(false);
  });

  it("should validate LinkedIn URL format", () => {
    const validProps = createSocialProfileMenuProps(
      "Test User",
      "test@example.com",
      "https://linkedin.com/test",
      "https://x.com/test"
    );

    const invalidProps = createSocialProfileMenuProps(
      "Test User",
      "test@example.com",
      "linkedin.com/test",
      "https://x.com/test"
    );

    expect(validProps.hasValidLinkedinUrl).toBe(true);
    expect(invalidProps.hasValidLinkedinUrl).toBe(false);
  });

  it("should validate X URL format", () => {
    const validProps = createSocialProfileMenuProps(
      "Test User",
      "test@example.com",
      "https://linkedin.com/test",
      "https://x.com/test"
    );

    const invalidProps = createSocialProfileMenuProps(
      "Test User",
      "test@example.com",
      "https://linkedin.com/test",
      "x.com/test"
    );

    expect(validProps.hasValidXUrl).toBe(true);
    expect(invalidProps.hasValidXUrl).toBe(false);
  });

  it("should handle empty name", () => {
    const props = createSocialProfileMenuProps(
      "",
      "test@example.com",
      "https://linkedin.com/test",
      "https://x.com/test"
    );

    expect(props.name).toBe("");
    expect(props.hasValidEmail).toBe(true);
  });

  it("should handle empty email", () => {
    const props = createSocialProfileMenuProps(
      "Test User",
      "",
      "https://linkedin.com/test",
      "https://x.com/test"
    );

    expect(props.email).toBe("");
    expect(props.hasValidEmail).toBe(false);
  });

  it("should handle different URL formats", () => {
    const propsHttp = createSocialProfileMenuProps(
      "Test User",
      "test@example.com",
      "http://linkedin.com/test",
      "http://x.com/test"
    );

    const propsHttps = createSocialProfileMenuProps(
      "Test User",
      "test@example.com",
      "https://linkedin.com/test",
      "https://x.com/test"
    );

    expect(propsHttp.hasValidLinkedinUrl).toBe(true);
    expect(propsHttp.hasValidXUrl).toBe(true);
    expect(propsHttps.hasValidLinkedinUrl).toBe(true);
    expect(propsHttps.hasValidXUrl).toBe(true);
  });

  it("should handle special characters in name", () => {
    const props = createSocialProfileMenuProps(
      "José María García-López",
      "test@example.com",
      "https://linkedin.com/test",
      "https://x.com/test"
    );

    expect(props.name).toBe("José María García-López");
  });

  it("should handle different email formats", () => {
    const validEmails = [
      "test@example.com",
      "user.name@domain.co.uk",
      "test+tag@example.org",
    ];

    validEmails.forEach((email) => {
      const props = createSocialProfileMenuProps(
        "Test User",
        email,
        "https://linkedin.com/test",
        "https://x.com/test"
      );
      expect(props.hasValidEmail).toBe(true);
    });
  });
});

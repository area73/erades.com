import en from "./locales/en.json";
import es from "./locales/es.json";

const translations = { en, es };

/**
 * Retrieves a translation string for the given language and key.
 * Returns the key itself if the translation is not found.
 */
export function t(lang: keyof typeof translations, key: string): string {
  const keys = key.split(".");
  let result: unknown = translations[lang];

  for (const part of keys) {
    if (result && typeof result === "object" && part in result) {
      result = (result as Record<string, unknown>)[part];
    } else {
      return key;
    }
  }

  return typeof result === "string" ? result : key;
}

/**
 * Retrieves a translation string with interpolation for the given language and key.
 * Supports replacing placeholders like {variable} with provided values.
 */
export function tWithInterpolation(
  lang: keyof typeof translations,
  key: string,
  variables: Record<string, string>
): string {
  let translation = t(lang, key);

  for (const [variable, value] of Object.entries(variables)) {
    translation = translation.replace(new RegExp(`{${variable}}`, "g"), value);
  }

  return translation;
}

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

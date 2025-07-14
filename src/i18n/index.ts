import Layout from "../layouts/BlogPost.astro";
import en from "./locales/en.json";
import es from "./locales/es.json";

const translations = { en, es } as const;

export function t(lang: keyof typeof translations, key: string): string {
  return (
    key.split(".").reduce((acc, part) => acc?.[part], translations[lang]) ?? key
  );
}

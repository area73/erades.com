/**
 * Permite usar la propiedad `test` en la configuración de Vite
 * cuando se integra con Vitest desde `astro/config`.
 */
declare module "vite" {
  interface UserConfig {
    /** Configuración de Vitest embebida en Vite */
    test?: Record<string, unknown>;
    /** Ajustes de resolución para alias, etc., usados via getViteConfig */
    resolve?: Record<string, unknown>;
    /** Plugins de Vite permitidos desde la config de Astro */
    plugins?: unknown[];
  }

  interface InlineConfig extends UserConfig {}
}

import type { Page, Locator } from "@playwright/test";

/**
 * Utilidades para tests de regresión visual
 */

/**
 * Espera a que una página esté completamente cargada para screenshots consistentes
 */
export const waitForPageReady = async (page: Page): Promise<void> => {
  // Esperar a que la red esté inactiva
  await page.waitForLoadState("networkidle");

  // Esperar a que las fuentes se carguen
  await page.waitForFunction(() => document.fonts.ready);

  // Asegurar que todas las imágenes (incluyendo lazy) estén visibles y decodificadas
  await ensureAllImagesLoaded(page);
};

/**
 * Deshabilita animaciones y transiciones para screenshots consistentes
 */
export const disableAnimations = async (page: Page): Promise<void> => {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
        scroll-behavior: auto !important;
      }

      @media (prefers-reduced-motion: reduce) {
        *,
        ::before,
        ::after {
          animation-delay: -1ms !important;
          animation-duration: 1ms !important;
          animation-iteration-count: 1 !important;
          background-attachment: initial !important;
          scroll-behavior: auto !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      }
    `,
  });
};

/**
 * Configuración común para screenshots de página completa
 */
export const fullPageScreenshotOptions = {
  fullPage: true,
  animations: "disabled" as const,
};

/**
 * Configuración común para screenshots de componentes
 */
export const componentScreenshotOptions = {
  animations: "disabled" as const,
};

/**
 * Espera a que un elemento específico esté visible y listo
 */
export const waitForElement = async (
  page: Page,
  selector: string,
  options?: { timeout?: number }
): Promise<Locator> => {
  const element = page.locator(selector);
  await element.waitFor({ state: "visible", timeout: options?.timeout });
  return element;
};

/**
 * Simula el estado de hover para tests visuales
 */
export const hoverAndWait = async (
  element: Locator,
  waitTime: number = 200
): Promise<void> => {
  await element.hover();
  await element.page().waitForTimeout(waitTime);
};

/**
 * Configuraciones de viewport comunes
 */
export const VIEWPORTS = {
  mobile: { width: 375, height: 667 }, // iPhone SE
  mobileLarge: { width: 414, height: 896 }, // iPhone 11 Pro
  tablet: { width: 768, height: 1024 }, // iPad
  desktop: { width: 1280, height: 720 }, // Desktop estándar
  desktopLarge: { width: 1920, height: 1080 }, // Desktop grande
} as const;

/**
 * Establece un viewport específico
 */
export const setViewport = async (
  page: Page,
  viewport: keyof typeof VIEWPORTS
): Promise<void> => {
  await page.setViewportSize(VIEWPORTS[viewport]);
};

/**
 * Intercepta y mockea requests para tests visuales consistentes
 */
export const mockExternalRequests = async (page: Page): Promise<void> => {
  // Bloquear requests a recursos externos que podrían causar inconsistencias
  await page.route("**/*", (route) => {
    const url = route.request().url();

    // Permitir recursos del propio sitio
    if (url.includes("localhost") || url.includes("127.0.0.1")) {
      route.continue();
      return;
    }

    // Bloquear analytics, ads, etc.
    const blockedDomains = [
      "google-analytics",
      "googletagmanager",
      "facebook.com/tr",
      "doubleclick.net",
    ];

    const shouldBlock = blockedDomains.some((domain) => url.includes(domain));
    if (shouldBlock) {
      route.abort();
      return;
    }

    // Continuar con otros requests
    route.continue();
  });
};

/**
 * Fuerza que todas las imágenes usen carga "eager" desde el inicio de la navegación
 * y reconcilia posibles atributos `data-src` usados por librerías de lazy-load.
 * Debe añadirse ANTES de `page.goto`, por eso se incluye dentro de `setupPageForVisualTest`.
 */
export const forceEagerImagesOnInit = async (page: Page): Promise<void> => {
  await page.addInitScript(() => {
    const makeImagesEager = (): void => {
      const images = Array.from(
        document.querySelectorAll<HTMLImageElement>("img")
      );
      for (const img of images) {
        if (img.getAttribute("loading") === "lazy") {
          img.setAttribute("loading", "eager");
        }
        const dataSrc = img.getAttribute("data-src");
        if (dataSrc && !img.getAttribute("src")) {
          img.setAttribute("src", dataSrc);
        }
      }
    };

    // Al parsear el DOM
    document.addEventListener("DOMContentLoaded", makeImagesEager);

    // Y también observar cambios dinámicos
    const observer = new MutationObserver(() => makeImagesEager());
    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["loading", "src", "data-src"],
    });
  });
};

/**
 * Recorre la página para disparar cualquier lazy-load basado en viewport,
 * y espera a que TODAS las imágenes estén decodificadas y listas para pintar.
 * No usa esperas arbitrarias; se apoya en `HTMLImageElement.decode()` y estados `complete/naturalWidth`.
 */
export const ensureAllImagesLoaded = async (page: Page): Promise<void> => {
  // Desplazamiento incremental por la página para activar observadores de intersección o native lazy
  await page.evaluate(async () => {
    const total = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );
    const viewport = window.innerHeight || 800;
    const step = Math.max(1, Math.floor(total / 8));
    for (let y = 0; y <= total + viewport; y += step) {
      window.scrollTo(0, y);
      // ceder el hilo un frame para que el browser procese intersecciones
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, 0));
    }
    window.scrollTo(0, 0);
  });

  // Esperar a que todas las imágenes estén decodificadas o, al menos, completas
  await page.waitForFunction(() => {
    const decodePromises: Array<Promise<unknown>> = [];
    const imgs = Array.from(document.images) as HTMLImageElement[];
    for (const img of imgs) {
      // Normalizar: si alguna librería usa data-src, asegúrate de moverlo a src
      const dataSrc = img.getAttribute("data-src");
      if (dataSrc && !img.getAttribute("src")) {
        img.setAttribute("src", dataSrc);
      }

      if (img.complete && img.naturalWidth > 0) {
        continue;
      }
      // `decode` fuerza la descarga si es necesario y espera a la decodificación
      if (typeof (img as any).decode === "function") {
        decodePromises.push((img as any).decode().catch(() => undefined));
      } else {
        decodePromises.push(
          new Promise((resolve) => {
            img.addEventListener("load", () => resolve(undefined), {
              once: true,
            });
            img.addEventListener("error", () => resolve(undefined), {
              once: true,
            });
          })
        );
      }
    }
    return Promise.all(decodePromises).then(() => {
      return imgs.every((img) => img.complete && img.naturalWidth > 0);
    });
  });

  // Asegurar que ya no quedan transferencias en vuelo
  await page.waitForLoadState("networkidle");
};

/**
 * Prepara una página para tests visuales con configuración estándar
 */
export const setupPageForVisualTest = async (page: Page): Promise<void> => {
  await disableAnimations(page);
  await forceEagerImagesOnInit(page);
  await mockExternalRequests(page);
};

/**
 * Toma un screenshot de un componente específico con configuración óptima
 */
export const screenshotComponent = async (
  locator: Locator,
  name: string,
  options?: {
    mask?: Locator[];
    clip?: { x: number; y: number; width: number; height: number };
  }
): Promise<void> => {
  const { expect } = await import("@playwright/test");
  if (options?.clip) {
    const image = await locator.page().screenshot({
      clip: options.clip,
    });
    await expect(image).toMatchSnapshot(name);
    return;
  }

  await expect(locator).toHaveScreenshot(name, {
    ...componentScreenshotOptions,
    mask: options?.mask,
  });
};

/**
 * Toma un screenshot de página completa con configuración óptima
 */
export const screenshotPage = async (
  page: Page,
  name: string,
  options?: {
    mask?: Locator[];
    clip?: { x: number; y: number; width: number; height: number };
  }
): Promise<void> => {
  const { expect } = await import("@playwright/test");
  if (options?.clip) {
    const image = await page.screenshot({
      fullPage: false,
      clip: options.clip,
    });
    await expect(image).toMatchSnapshot(name);
    return;
  }

  await expect(page).toHaveScreenshot(name, {
    ...fullPageScreenshotOptions,
    mask: options?.mask,
  });
};

/**
 * Utilidad para tests de diferentes estados de un componente
 */
export const testComponentStates = async (
  page: Page,
  selector: string,
  states: Array<{
    name: string;
    setup: (element: Locator) => Promise<void>;
  }>,
  screenshotPrefix: string
): Promise<void> => {
  const element = await waitForElement(page, selector);

  for (const state of states) {
    await state.setup(element);
    await screenshotComponent(element, `${screenshotPrefix}-${state.name}.png`);
  }
};

/**
 * Utilidad para tests responsive de un componente
 */
export const testResponsiveComponent = async (
  page: Page,
  selector: string,
  screenshotPrefix: string,
  viewportsToTest: Array<keyof typeof VIEWPORTS> = [
    "mobile",
    "tablet",
    "desktop",
  ]
): Promise<void> => {
  for (const viewport of viewportsToTest) {
    await setViewport(page, viewport);
    await waitForPageReady(page);

    const element = await waitForElement(page, selector);
    await screenshotComponent(element, `${screenshotPrefix}-${viewport}.png`);
  }
};

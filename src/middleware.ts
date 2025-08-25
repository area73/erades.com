import type { MiddlewareHandler } from "astro";

export const onRequest: MiddlewareHandler = async (context, next) => {
  const response = await next();

  const url = new URL(context.request.url);
  const pathname = url.pathname;

  // Configuración base para Cloud Run
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");

  // Cache-Control específico por tipo de contenido
  if (pathname.startsWith("/api/")) {
    response.headers.set("Cache-Control", "no-cache, must-revalidate");
  } else if (
    pathname.includes(".json") ||
    pathname.includes(".xml") ||
    pathname === "/feed" ||
    pathname === "/rss" ||
    pathname === "/en/rss"
  ) {
    response.headers.set("Cache-Control", "max-age=300, must-revalidate");
  } else if (pathname.startsWith("/blog/")) {
    response.headers.set("Cache-Control", "max-age=3600, must-revalidate");
  } else if (
    pathname.startsWith("/assets/") ||
    pathname.includes(".css") ||
    pathname.includes(".js")
  ) {
    response.headers.set("Cache-Control", "max-age=31536000, immutable");
  } else if (pathname.startsWith("/fonts/")) {
    response.headers.set("Cache-Control", "max-age=31536000, immutable");
  } else if (pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|ico)$/)) {
    response.headers.set("Cache-Control", "max-age=2592000, must-revalidate");
  } else {
    response.headers.set("Cache-Control", "max-age=600, must-revalidate");
  }

  return response;
};

# Runner de tests E2E/visual.
# Imagen oficial multi-arch de Playwright con deps/navegadores.
ARG PLAYWRIGHT_TAG=mcr.microsoft.com/playwright:v1.55.0-jammy
FROM ${PLAYWRIGHT_TAG}

# 1) PNPM via Corepack con versión fija (evita claves TUF antiguas)
#    Elige una versión de pnpm que tengas validada con tu lockfile
ARG PNPM_VERSION=10.15.0

# Habilita corepack y activa pnpm en esa versión
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate
ENV COREPACK_ENABLE_DOWNLOADS=0
# (Opcional) Congela descargas de corepack para que NO intente tocar nada más
# ENV COREPACK_ENABLE_DOWNLOADS=0

WORKDIR /tests


# 2) Instala deps del runner (node_modules aislado del host)
COPY package.json pnpm-lock.yaml ./
RUN pnpm --version && pnpm install --frozen-lockfile

# Copiamos manifest para cachear deps del runner de tests
COPY package.json pnpm-lock.yaml ./
# Instala solo lo necesario para ejecutar los tests dentro del contenedor
# (esto crea su propio node_modules separado del host)
RUN pnpm install --frozen-lockfile

# Copiamos el resto (tests, config, etc.). Si prefieres bind-mount, este COPY es opcional.
COPY . .

# No exponemos puertos; el servidor vive FUERA.
# Entrypoint/command se define desde docker compose o CLI.

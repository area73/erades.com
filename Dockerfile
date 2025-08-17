FROM node:22-bookworm-slim AS base
WORKDIR /app
RUN corepack enable

# --- Install deps
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# --- Build
FROM deps AS build
COPY . .
RUN pnpm run build

# --- Runtime image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=8080
EXPOSE 8080

# Install only production dependencies for runtime (e.g., sharp for /_image)
FROM base AS prod-deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

FROM runner AS final

# Copy runtime deps and built app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
# Copy source assets needed by astro:assets runtime and public files
COPY --from=build /app/public ./public
COPY --from=build /app/src/assets ./src/assets

# Run as non-root for security
RUN useradd -m -u 1001 nodeuser
USER nodeuser

CMD ["node", "./dist/server/entry.mjs"]



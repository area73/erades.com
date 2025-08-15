# Lighthouse CI Server - Configuración Local

Este documento explica cómo configurar y usar el Lighthouse CI Server en local para monitorear el rendimiento de tu sitio web.

## 🚀 Configuración Rápida

### 1. Instalar dependencias

```bash
pnpm install
```

### 2. Construir el proyecto

```bash
pnpm build
```

### 3. Ejecutar pruebas de Lighthouse

```bash
pnpm lhci:ci:mobile
```

O para escritorio:

```bash
pnpm lhci:ci:desktop
```

## 📊 Resultados

Los resultados de las pruebas se generan en `coverage-lighthouse/`:

- `coverage-lighthouse/mobile/` para reportes móviles
- `coverage-lighthouse/desktop/` para reportes de escritorio

Estos reportes son los que se subirán manualmente al servidor si lo deseas.

## 🐳 Lighthouse CI Server con Docker

Basado en la guía oficial de LHCI Server [documentación](https://googlechrome.github.io/lighthouse-ci/docs/server.html):

### Estructura y persistencia

- La base de datos SQLite se persiste en `db/lighthouse/` (bajo control de versiones).
- Se utiliza la imagen `patrickhulce/lhci-server` y se monta el volumen en `/data`.

Archivo `docker-compose.lhci.yml`:

```yaml
version: "3.8"
services:
  lhci-server:
    image: patrickhulce/lhci-server
    container_name: lhci-server
    ports:
      - "9001:9001"
    volumes:
      - ./db/lighthouse:/data
    restart: unless-stopped
```

Scripts útiles en `package.json`:

```json
{
  "scripts": {
    "lhci:server:up": "docker compose -f docker-compose.lhci.yml up -d",
    "lhci:server:down": "docker compose -f docker-compose.lhci.yml down",
    "lhci:server:logs": "docker compose -f docker-compose.lhci.yml logs -f",
    "lhci:server:ps": "docker compose -f docker-compose.lhci.yml ps"
  }
}
```

### Pasos para levantar el servidor

1. Crear directorio de base de datos si no existe: `mkdir -p db/lighthouse`
2. Arrancar el servidor: `pnpm lhci:server:up`
3. Abrir `http://localhost:9001` en el navegador

Sin autenticación ni reglas de firewall, accesible localmente.

### Inicializar el primer proyecto (persistente)

Cuando visites `http://localhost:9001/app/projects` verás el mensaje para correr el asistente. Para dejar la configuración persistida en `db/lighthouse/lhci.db` usa:

```bash
pnpm lhci:wizard:db
```

Este comando ejecuta el wizard de LHCI apuntando a la misma base de datos SQLite persistida por Docker.

Alternativa con Docker (usa el contenedor del servidor):

```bash
docker exec -it lhci-server node /usr/src/lhci/node_modules/.bin/lhci wizard \
  --storage.storageMethod=sql \
  --storage.sqlDialect=sqlite \
  --storage.sqlDatabasePath=/data/lhci.db
```

Ambos métodos escriben en `db/lighthouse/lhci.db`, dejando tokens y proyecto configurados de forma permanente.

### Ejecutar auditorías y subir automáticamente al servidor

Con la configuración actual, `lhci autorun` sube directamente al servidor local (SQLite persistente):

```bash
pnpm lhci:server:up  # asegurarse que el server está corriendo
pnpm lhci:ci:mobile  # móvil (usa LHCI_BUILD_TOKEN de .env)
pnpm lhci:ci:desktop # escritorio (usa LHCI_BUILD_TOKEN de .env)
```

Los resultados quedarán en `db/lighthouse/lhci.db` y visibles en `http://localhost:9001`.

#### Importar reportes existentes desde `coverage-lighthouse/` (opcional)

1. Asegúrate de tener el token de proyecto (build token). Si no lo tienes, ejecútalo con el wizard y copia el token.
2. Exporta el token en el entorno para evitar exponerlo en los scripts (se usa `LHCI_BUILD_TOKEN`):

```bash
export LHCI_BUILD_TOKEN=TU_BUILD_TOKEN
```

3. Sube los reportes ya generados:

```bash
pnpm lhci:upload:desktop
pnpm lhci:upload:mobile
```

O todo junto:

```bash
pnpm lhci:upload:all
```

Esto leerá los ficheros en `coverage-lighthouse/desktop` y `coverage-lighthouse/mobile` y los subirá a `http://localhost:9001`, quedando almacenados en la base de datos persistente `db/lighthouse/lhci.db`.

## 🔧 Scripts Disponibles

### Lighthouse CI

- `pnpm lhci:ci:mobile` - Ejecuta pruebas en modo móvil
- `pnpm lhci:ci:desktop` - Ejecuta pruebas en modo escritorio
- `pnpm lhci:upload` - Sube los resultados al directorio de métricas

## 📁 Estructura de Archivos

```
├── lighthouserc.cjs           # Configuración para móvil
├── lighthouserc.desktop.cjs   # Configuración para escritorio
├── metrics/
│   └── lighthouse/            # Resultados de las pruebas
└── docs/
    └── lighthouse-server.md   # Esta documentación
```

## ⚙️ Configuración

### Configuración de Lighthouse CI

Los archivos de configuración contienen:

- **lighthouserc.cjs**: Configuración para pruebas móviles
- **lighthouserc.desktop.cjs**: Configuración para pruebas de escritorio
- **URLs de prueba**: Páginas principales del sitio
- **Presupuestos**: Límites de rendimiento
- **Aserciones**: Umbrales de calidad

## 📈 Métricas Monitoreadas

### Core Web Vitals

- **First Contentful Paint (FCP)**: < 1500ms
- **Largest Contentful Paint (LCP)**: < 2000ms
- **Total Blocking Time (TBT)**: < 150ms
- **Cumulative Layout Shift (CLS)**: < 0.1

### Categorías

- **Performance**: Mínimo 90%
- **Accessibility**: Mínimo 95%
- **SEO**: Mínimo 95%

### Recursos

- **Scripts**: Máximo 300KB, 20 archivos
- **Stylesheets**: Máximo 120KB, 8 archivos
- **Images**: Máximo 800KB, 40 archivos
- **Fonts**: Máximo 400KB, 8 archivos
- **Third-party**: Máximo 150KB, 15 archivos

## 🔍 Análisis de Resultados

### Reportes Generados

Los resultados se guardan en `metrics/lighthouse/` con:

- **Reportes HTML**: Visualización completa de resultados
- **Datos JSON**: Información estructurada para análisis
- **Métricas**: Puntuaciones por categoría y Core Web Vitals

### Interpretación

- **Performance**: Puntuación de rendimiento (0-100)
- **Accessibility**: Puntuación de accesibilidad (0-100)
- **SEO**: Puntuación de SEO (0-100)
- **Best Practices**: Puntuación de mejores prácticas (0-100)

## 🛠️ Solución de Problemas

### Errores de construcción

```bash
# Limpiar caché
rm -rf dist/ .astro/

# Reinstalar dependencias
pnpm install

# Reconstruir
pnpm build
```

### Problemas con Lighthouse CI

```bash
# Limpiar resultados anteriores
rm -rf metrics/lighthouse/

# Reinstalar dependencias de Lighthouse
pnpm install @lhci/cli
```

## 🔄 Integración con CI/CD

Para integrar con GitHub Actions, agrega este job:

```yaml
- name: Lighthouse CI
  run: |
    pnpm build
    pnpm lhci:ci:mobile
    pnpm lhci:ci:desktop
```

## 📚 Recursos Adicionales

- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
- [Lighthouse Scoring](https://web.dev/performance-scoring/)
- [Core Web Vitals](https://web.dev/vitals/)
- [Performance Budgets](https://web.dev/performance-budgets-101/)

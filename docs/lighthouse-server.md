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

### 3. Ejecutar Lighthouse (mobile + desktop en un único build)

```bash
pnpm lhci:server:up       # asegúrate de que el server está levantado
pnpm lhci:ci:both         # hace 2 collect (mobile y desktop aditivo) y 1 upload
```

## 📊 Resultados

Los resultados se suben automáticamente al servidor LHCI local y quedan
persistidos en la base de datos SQLite: `db/lighthouse/lhci.db`. Puedes
visualizarlos en `http://localhost:9001`.

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

Con la configuración actual, se recomienda ejecutar dos `collect` (mobile y desktop con `--additive`) y un único `upload` por hash de commit:

```bash
pnpm lhci:server:up  # asegurarse que el server está corriendo
pnpm lhci:ci:both    # 2 collects (uno mobile, otro desktop aditivo) + 1 upload
```

Notas:

- El servidor rechaza uploads duplicados para el mismo hash.
- Desktop se distingue en el dashboard usando `?device=desktop` en las URLs de `lighthouserc.desktop.cjs`.

## 🔧 Scripts Disponibles

### Lighthouse CI

- `pnpm lhci:ci:both` - Ejecuta mobile + desktop (aditivo) y realiza un único upload
- `pnpm lhci:ci:mobile` - (opcional) Solo móvil
- `pnpm lhci:ci:desktop` - (opcional) Solo escritorio

## 📁 Estructura de Archivos

```
├── lighthouserc.cjs           # Configuración para móvil (URLs base)
├── lighthouserc.desktop.cjs   # Configuración para escritorio (emulación + ?device=desktop)
├── db/
│   └── lighthouse/
│       └── lhci.db            # Base de datos persistente del servidor LHCI
└── docs/
    └── lighthouse-server.md   # Esta documentación
```

## ⚙️ Configuración

### Configuración de Lighthouse CI

Los archivos de configuración contienen:

- **lighthouserc.cjs**: Configuración para pruebas móviles (preset por defecto)
- **lighthouserc.desktop.cjs**: Configuración para escritorio (emulación de pantalla, `formFactor: desktop` y URLs con `?device=desktop`)
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

Para integrar con GitHub Actions, agrega este job (un único upload por commit):

```yaml
- name: Lighthouse CI
  run: |
    pnpm build
    pnpm lhci:server:up
    pnpm lhci:ci:both
```

## 📚 Recursos Adicionales

- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
- [Lighthouse Scoring](https://web.dev/performance-scoring/)
- [Core Web Vitals](https://web.dev/vitals/)
- [Performance Budgets](https://web.dev/performance-budgets-101/)

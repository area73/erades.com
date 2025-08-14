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

### 3. Iniciar el servidor

```bash
pnpm lhci:server:start
```

### 4. Ejecutar pruebas

```bash
pnpm lhci:autorun:server
```

## 📊 Acceso al Dashboard

Una vez que el servidor esté corriendo, puedes acceder al dashboard en:

- **URL**: http://localhost:9001
- **Puerto**: 9001

## 🔧 Scripts Disponibles

### Servidor

- `pnpm lhci:server` - Inicia el servidor en modo básico
- `pnpm lhci:server:start` - Inicia el servidor con configuración SQL
- `pnpm lhci:collect:server` - Ejecuta solo la recolección de datos
- `pnpm lhci:assert:server` - Ejecuta solo las aserciones
- `pnpm lhci:upload:server` - Sube los resultados al servidor
- `pnpm lhci:autorun:server` - Ejecuta todo el flujo completo

### Script de Automatización

```bash
./scripts/run-lighthouse-server.sh
```

Este script automatiza todo el proceso:

1. Construye el proyecto
2. Inicia el servidor
3. Ejecuta las pruebas
4. Mantiene el servidor corriendo

## 📁 Estructura de Archivos

```
├── lighthouserc.server.js     # Configuración del servidor
├── .lighthouseci/             # Directorio de datos del servidor
│   └── server.db              # Base de datos SQLite
├── scripts/
│   └── run-lighthouse-server.sh  # Script de automatización
└── docs/
    └── lighthouse-server.md   # Esta documentación
```

## ⚙️ Configuración

### Variables de Entorno (Opcional)

Crea un archivo `.env.lighthouse` con:

```env
LHCI_SERVER_PORT=9001
LHCI_SERVER_DB_PATH=./.lighthouseci/server.db
LHCI_SERVER_STORAGE_METHOD=sql
LHCI_COLLECT_NUMBER_OF_RUNS=3
LHCI_ASSERT_PERFORMANCE_MIN_SCORE=0.9
LHCI_ASSERT_ACCESSIBILITY_MIN_SCORE=0.95
LHCI_ASSERT_SEO_MIN_SCORE=0.95
```

### Configuración del Servidor

El archivo `lighthouserc.server.js` contiene:

- **Puerto**: 9001
- **Almacenamiento**: SQLite
- **URLs de prueba**: Páginas principales del sitio
- **Configuración de escritorio**: 1350x940
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

## 🔍 Uso del Dashboard

### Vista General

- **Timeline**: Historial de ejecuciones
- **Trends**: Tendencias de rendimiento
- **Comparisons**: Comparación entre ejecuciones

### Detalles de Ejecución

- **Scores**: Puntuaciones por categoría
- **Metrics**: Métricas detalladas
- **Opportunities**: Oportunidades de mejora
- **Diagnostics**: Diagnósticos técnicos

### Exportación

- **JSON**: Datos estructurados
- **CSV**: Datos tabulares
- **HTML**: Reportes completos

## 🛠️ Solución de Problemas

### Servidor no inicia

```bash
# Verificar puerto disponible
lsof -i :9001

# Cambiar puerto
pnpm lhci:server --port=9002
```

### Base de datos corrupta

```bash
# Eliminar base de datos
rm .lighthouseci/server.db

# Reiniciar servidor
pnpm lhci:server:start
```

### Errores de construcción

```bash
# Limpiar caché
rm -rf dist/ .astro/

# Reinstalar dependencias
pnpm install

# Reconstruir
pnpm build
```

## 🔄 Integración con CI/CD

Para integrar con GitHub Actions, agrega este job:

```yaml
- name: Lighthouse CI Server
  run: |
    pnpm build
    pnpm lhci:autorun:server
  env:
    LHCI_SERVER_PORT: 9001
```

## 📚 Recursos Adicionales

- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
- [Lighthouse Scoring](https://web.dev/performance-scoring/)
- [Core Web Vitals](https://web.dev/vitals/)
- [Performance Budgets](https://web.dev/performance-budgets-101/)

# Tests de Regresión Visual 🎨

## Introducción

Este proyecto utiliza **Playwright** para tests automáticos de regresión visual que detectan cambios visuales no deseados en la interfaz de usuario.

## Archivos de Tests Visuales

- `visual-regression.spec.ts` - Tests de páginas completas y flujos principales
- `component-visual.spec.ts` - Tests de componentes individuales y estados específicos

## Comandos Disponibles

```bash
# Ejecutar todos los tests visuales
pnpm test:visual

# Ejecutar tests visuales con interfaz gráfica
pnpm test:visual:ui

# Ejecutar tests visuales en modo headed (visible)
pnpm test:visual:headed

# Actualizar snapshots de referencia (primera vez o cuando hay cambios intencionales)
pnpm test:visual:update
```

## Primer Uso

### 1. Generar snapshots de referencia

```bash
# Asegúrate de que el servidor esté corriendo
pnpm dev

# En otra terminal, genera los snapshots iniciales
pnpm test:visual:update
```

### 2. Ejecutar tests visuales

```bash
pnpm test:visual
```

## Estructura de Tests

### Tests de Páginas Completas (`visual-regression.spec.ts`)

- ✅ Homepage (ES/EN)
- ✅ Blog Landing (ES/EN)
- ✅ Search Page
- ✅ About Page
- ✅ Tags Page
- ✅ Blog Post Detail
- ✅ Mobile responsive tests
- ✅ Tablet responsive tests
- ✅ Dark mode tests

### Tests de Componentes (`component-visual.spec.ts`)

- ✅ BlogCard (estados normal y hover)
- ✅ BlogFilters
- ✅ SearchInput (vacío y con texto)
- ✅ ThemeToggle (claro y oscuro)
- ✅ Paginator
- ✅ ViewModeToggle
- ✅ SocialProfileMenu
- ✅ FormattedDate
- ✅ NoResults
- ✅ ResultsInfo
- ✅ Tests responsive por componente
- ✅ Estados de error y carga

## Configuración

### Tolerancia de Diferencias

En `playwright.config.ts`:

```typescript
expect: {
  toHaveScreenshot: {
    threshold: 0.2,        // 20% tolerancia para diferencias menores
    maxDiffPixels: 1000    // Máximo píxeles diferentes permitidos
  }
}
```

### Viewports Configurados

- **Desktop**: 1280x720
- **Mobile**: 375x667 (iPhone SE)
- **Tablet**: 768x1024 (iPad)

## Flujo de Trabajo

### Desarrollo Normal

1. Hacer cambios en el código
2. Ejecutar `pnpm test:visual`
3. Si fallan, revisar los diffs generados
4. Si los cambios son intencionales, ejecutar `pnpm test:visual:update`

### Cambios Intencionales en UI

```bash
# Después de cambios intencionales en estilos/componentes
pnpm test:visual:update

# Verificar que los nuevos snapshots son correctos
pnpm test:visual
```

### Debugging Visual

```bash
# Ver tests en navegador con interfaz gráfica
pnpm test:visual:ui

# Ver tests ejecutándose en tiempo real
pnpm test:visual:headed
```

## Resultados de Tests

### Ubicación de Snapshots

```
tests/
├── visual-regression.spec.ts-snapshots/
│   ├── homepage-es-chromium-darwin.png
│   ├── blog-landing-es-chromium-darwin.png
│   └── ...
└── component-visual.spec.ts-snapshots/
    ├── blog-card-default-chromium-darwin.png
    ├── theme-toggle-light-chromium-darwin.png
    └── ...
```

### Resultados de Fallos

Cuando un test visual falla, Playwright genera:

- **Actual**: Screenshot actual
- **Expected**: Screenshot de referencia
- **Diff**: Imagen que muestra las diferencias

Estos archivos se guardan en `test-results/` y se pueden ver en el reporte HTML.

## Mejores Prácticas

### ✅ DO

- Ejecutar tests visuales antes de hacer commits importantes
- Actualizar snapshots solo cuando los cambios son intencionales
- Revisar los diffs cuidadosamente antes de actualizar
- Ejecutar en ambiente consistente (mismo OS si es posible)
- Deshabilitar animaciones para consistencia

### ❌ DON'T

- Ignorar fallos de tests visuales sin revisar
- Actualizar snapshots automáticamente sin revisar cambios
- Ejecutar tests visuales con el servidor en modo development inestable
- Hacer tests visuales de contenido dinámico sin mockearlo

## Integración con CI/CD

Para CI/CD, considera:

```yaml
# Ejemplo para GitHub Actions
- name: Run Visual Tests
  run: |
    pnpm build
    pnpm preview &
    pnpm test:visual
```

## Resolución de Problemas

### Tests Fallan por Diferencias Menores

Ajusta la tolerancia en `playwright.config.ts`:

```typescript
toHaveScreenshot: {
  threshold: 0.3,        // Aumentar tolerancia
  maxDiffPixels: 2000    // Permitir más píxeles diferentes
}
```

### Inconsistencias entre Ambientes

- Usar mismas fuentes y configuración
- Asegurar carga completa de recursos
- Considerar usar Docker para consistencia

### Snapshots Obsoletos

```bash
# Limpiar snapshots existentes y regenerar
rm -rf tests/*-snapshots/
pnpm test:visual:update
```

## Monitoreo Continuo

Considera integrar herramientas adicionales para regresión visual continua:

- **Chromatic** (Storybook)
- **Percy** (Browserstack)
- **Applitools** (AI-powered)

Pero con Playwright ya tienes una base sólida y gratuita para regresión visual efectiva.

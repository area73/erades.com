# CI/CD Pipeline

Este directorio contiene la configuración de GitHub Actions para el proyecto erades.com.

## Workflows

### 1. CI (`ci.yml`)

El workflow principal que se ejecuta en cada push y pull request:

- **Lint**: Verifica el código con ESLint (timeout: 10min)
- **Unit Tests**: Ejecuta tests unitarios con Vitest y coverage (timeout: 15min)
- **E2E Tests**: Ejecuta tests end-to-end con Playwright en contenedor (timeout: 30min)
- **Visual Tests**: Ejecuta tests de regresión visual en contenedor (timeout: 20min)
- **Build**: Construye la aplicación (timeout: 15min)

**Características:**

- Concurrency para cancelar runs anteriores automáticamente
- Cache de buildx con GHCR para optimizar construcción de imagen Docker
- Estrategia "todo dentro del contenedor" para tests E2E y visuales

### 2. Update Visual Snapshots (`update-snapshots.yml`)

Workflow manual para actualizar snapshots de regresión visual:

- Se puede ejecutar manualmente desde GitHub Actions
- Permite elegir entre ambiente "enhanced" o "basic"
- Crea automáticamente un PR con los snapshots actualizados
- Usa el mismo cache de buildx que el CI principal (timeout: 30min)

### 3. Security (`security.yml`)

Escaneo de seguridad y dependencias:

- Ejecuta `pnpm audit` semanalmente
- Revisión de dependencias en PRs
- Escaneo automático de vulnerabilidades

### 4. Auto Merge (`automerge.yml`)

Workflow automático para merge de PRs:

- Se ejecuta cuando se añade la etiqueta "automerge"
- Espera a que todos los checks pasen antes de hacer merge
- Usa squash merge como método predeterminado

### 5. Label Auto Merge (`label-automerge.yml`)

Workflow que etiqueta automáticamente PRs para auto-merge:

- Se ejecuta cuando el CI pasa exitosamente
- Añade la etiqueta "automerge" a PRs hacia master

## Configuración

### Secrets Requeridos

Para el despliegue, necesitas configurar estos secrets en tu repositorio:

- `DEPLOY_KEY`: Clave SSH para el servidor
- `DEPLOY_HOST`: Hostname del servidor
- `DEPLOY_PATH`: Ruta en el servidor
- `SNYK_TOKEN`: Token de Snyk (opcional)
- `CODECOV_TOKEN`: Token de Codecov para coverage (opcional)

### Configuración de Ramas

El proyecto usa `master` como rama principal. Todos los workflows están configurados para:

- Ejecutarse en pushes a `master`
- Ejecutarse en pull requests hacia `master`
- Desplegar automáticamente solo desde `master`

### Configuración de Dependabot

El archivo `dependabot.yml` está configurado para:

- Actualizar dependencias npm semanalmente
- Actualizar GitHub Actions semanalmente
- Ignorar actualizaciones mayores de paquetes críticos
- Asignar automáticamente PRs a @rerades

## Estrategia de Contenedores

### Jobs Node vs Jobs Docker

**Jobs Node** (lint, test, build):

- Usan cache de pnpm en el host
- Instalan dependencias localmente
- Ejecutan en el runner de GitHub

**Jobs Docker** (E2E, Visual):

- Construyen imagen `erades-com-e2e` con cache de buildx
- Ejecutan tests dentro del contenedor
- Usan volúmenes nombrados para persistencia

### Cache Optimizado

- **Cache de pnpm**: Para jobs Node (lint, test, build)
- **Cache de buildx**: Para construcción de imagen Docker en GHCR
- **Volúmenes Docker**: Para navegadores, node_modules y store de pnpm

## Artifacts

Los workflows generan estos artifacts:

- `playwright-report`: Reportes HTML de tests E2E
- `visual-test-results`: Resultados de tests de regresión visual
- `build-output`: Build de la aplicación

## Troubleshooting

### Tests Visuales Fallan

Si los tests de regresión visual fallan:

1. Ejecuta el workflow "Update Visual Snapshots" manualmente
2. Revisa los cambios en el PR generado
3. Acepta los cambios si son correctos

### Tests E2E Fallan

Si los tests E2E fallan:

1. Verifica que la aplicación se construya correctamente
2. Revisa los logs del contenedor Docker
3. Confirma que el webServer esté configurado con `--host 0.0.0.0`

### Build Falla

Si el build falla:

1. Verifica que todas las dependencias estén instaladas
2. Revisa los logs de linting
3. Asegúrate de que el TypeScript compile correctamente

### Cache de Buildx No Funciona

Si el cache de buildx no funciona:

1. Verifica que el token de GitHub tenga permisos para GHCR
2. Confirma que el repositorio esté configurado correctamente
3. Revisa los logs de construcción de Docker

### Timeouts

Si los jobs fallan por timeout:

- **Lint**: 10 minutos (normalmente suficiente)
- **Unit Tests**: 15 minutos (incluye coverage)
- **Visual Tests**: 20 minutos (construcción + tests)
- **E2E Tests**: 30 minutos (construcción + tests)
- **Build**: 15 minutos (construcción de aplicación)
- **Update Snapshots**: 30 minutos (construcción + tests + PR)

## Optimizaciones Implementadas

- **Concurrency**: Evita colas infinitas cancelando runs anteriores
- **Cache de buildx**: Reduce tiempo de construcción de imagen Docker
- **Timeouts**: Previene jobs zombis y uso excesivo de recursos
- **Volúmenes nombrados**: Coherencia entre local y CI
- **Estrategia unificada**: Todo dentro del contenedor para tests E2E/visuales

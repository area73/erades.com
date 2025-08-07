# CI/CD Pipeline

Este directorio contiene la configuración de GitHub Actions para el proyecto erades.com.

## Workflows

### 1. CI (`ci.yml`)

El workflow principal que se ejecuta en cada push y pull request:

- **Lint**: Verifica el código con ESLint
- **Unit Tests**: Ejecuta tests unitarios con Vitest
- **E2E Tests**: Ejecuta tests end-to-end con Playwright
- **Visual Tests**: Ejecuta tests de regresión visual
- **Build**: Construye la aplicación
- **Deploy**: Despliega a producción (solo en main)

### 2. Update Visual Snapshots (`update-snapshots.yml`)

Workflow manual para actualizar snapshots de regresión visual:

- Se puede ejecutar manualmente desde GitHub Actions
- Permite elegir entre ambiente "enhanced" o "basic"
- Crea automáticamente un PR con los snapshots actualizados

### 3. Security (`security.yml`)

Escaneo de seguridad y dependencias:

- Ejecuta `npm audit` semanalmente
- Escaneo con Snyk (requiere token)
- Revisión de dependencias en PRs

## Configuración

### Secrets Requeridos

Para el despliegue, necesitas configurar estos secrets en tu repositorio:

- `DEPLOY_KEY`: Clave SSH para el servidor
- `DEPLOY_HOST`: Hostname del servidor
- `DEPLOY_PATH`: Ruta en el servidor
- `SNYK_TOKEN`: Token de Snyk (opcional)

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

## Caché

Los workflows utilizan caché de pnpm para optimizar los tiempos de ejecución:

- Cache de dependencias de pnpm
- Cache de navegadores de Playwright

## Artifacts

Los workflows generan estos artifacts:

- `playwright-report`: Reportes de tests E2E
- `visual-test-results`: Resultados de tests visuales
- `build-output`: Build de la aplicación

## Troubleshooting

### Tests Visuales Fallan

Si los tests de regresión visual fallan:

1. Ejecuta el workflow "Update Visual Snapshots" manualmente
2. Revisa los cambios en el PR generado
3. Acepta los cambios si son correctos

### Build Falla

Si el build falla:

1. Verifica que todas las dependencias estén instaladas
2. Revisa los logs de linting
3. Asegúrate de que el TypeScript compile correctamente

### Deploy Falla

Si el deploy falla:

1. Verifica que los secrets estén configurados
2. Confirma que el servidor esté accesible
3. Revisa los permisos de la clave SSH

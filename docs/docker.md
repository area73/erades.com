# Errores posibles

**FALLO IMAGEN DOCKER:**
El error se debe a que la versión de Playwright en tu proyecto (@playwright/test 1.55.0) no coincide con la versión de la imagen Docker que usas (mcr.microsoft.com/playwright:v1.54.0-jammy). Para evitar estos problemas, siempre debes alinear la versión de la imagen con la de tu dependencia Playwright. La solución recomendada es actualizar el tag de la imagen Docker a la misma versión que tu dependencia, o viceversa, y reconstruir el contenedor.
También se explica cómo parametrizar la versión con variables de entorno para facilitar futuras actualizaciones.

- No se recomienda mantener versiones desincronizadas: **Mantener imagen y lib desincronizadas es pedirte bugs el mes que viene.**

- **DECISIÓN TOMADA:** tomaré como referencia la versión del docker file y modificaré mi package.json para coincidir porque las imágenes se actualizan con menos frecuencia que los paquetes (posiblemente tenga que hacer un downgrade del package.json), de vez en cunado ir actualizando la versión del docker file y hacer el match con el package.json

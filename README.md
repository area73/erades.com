# Astro Starter Kit: Blog

Para crear un nuevo proyecto basado en este kit, ejecuta el siguiente comando en tu terminal:

```sh
pnpm create astro@latest -- --template blog
```

Alternativamente, puedes abrir este starter kit en StackBlitz, CodeSandbox o GitHub Codespaces haciendo clic en uno de los siguientes botones:

[![Abrir en StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/blog)
[![Abrir con CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/blog)
[![Abrir en GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/blog/devcontainer.json)

> 🧑‍🚀 ¿Eres un astronauta experimentado? Entonces puedes eliminar este archivo. ¡Que te diviertas!

![blog](https://github.com/withastro/astro/assets/2244813/ff10799f-a816-4703-b967-c78997e8323d)

Este proyecto viene con las siguientes características:

- ✅ Estilo minimalista (¡personalízalo a tu gusto!)
- ✅ Rendimiento 100/100 en Lighthouse 
- ✅ Optimizado para SEO con URLs canónicas y datos OpenGraph
- ✅ Soporte para Sitemap
- ✅ Soporte para RSS Feed
- ✅ Soporte para Markdown & MDX

## 🚀 Estructura del Proyecto

Dentro de tu proyecto Astro, encontrarás los siguientes directorios y archivos:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro busca archivos `.astro` o `.md` en el directorio `src/pages/`. Cada página se expone como una ruta basada en su nombre de archivo.

No hay nada especial en `src/components/`, pero es donde nos gusta poner cualquier componente Astro/React/Vue/Svelte/Preact.

El directorio `src/content/` contiene "colecciones" de documentos relacionados en Markdown y MDX. Usa `getCollection()` para recuperar publicaciones de `src/content/blog/`, y verifica el tipo de tu frontmatter con un esquema opcional. Consulta [la documentación de Astro sobre Colecciones de Contenido](https://docs.astro.build/en/guides/content-collections/) para aprender más.

Puedes colocar cualquier activo estático, como imágenes, en el directorio `public/`.

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto, desde una terminal:

| Comando                   | Acción                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Instala dependencias                             |
| `pnpm dev`             | Inicia el servidor de desarrollo local en `localhost:4321` |
| `pnpm build`           | Construye tu sitio de producción en `./dist/`    |
| `pnpm preview`         | Previsualiza tu construcción localmente antes de desplegar |
| `pnpm astro ...`       | Ejecuta comandos de la CLI de Astro como `astro add`, `astro check` |
| `pnpm astro -- --help` | Obtén ayuda para usar la CLI de Astro            

## 👀 ¿Quieres aprender más?

Revisa [nuestra documentación](https://docs.astro.build) o únete a nuestro [servidor de Discord](https://astro.build/chat).

## Créditos

Este tema se basa en el encantador [Bear Blog](https://github.com/HermanMartinus/bearblog/).
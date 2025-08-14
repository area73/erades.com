---
title: "WPO: Web Performance Optimization"
description: "Expolorando la mejora de la optimización web con AI con los core web vitals"
pubDate: 2025-08-26
tags:
  - javascript
  - wpo
  - google-core-web-vitals
categories:
  - javascript
  - best-practices
  - core-web-vitals
  - wpo
draft: true
heroImage: /blog-placeholder-14.jpg
---

## Exploración inicial

Después de crear esta web app [erades.com](https://erades.com) , me voy a centrar el los core web vitals de google.

Para esta tare me voy a centrar en lighthouse.

Los primeros resultados son estos:

### 2025-08-12

#### Desktop

- [Home](../../../../assets/lighthouse/2025-08-12-HOME.html)
- [Post](../../../../assets/lighthouse/2025-08-12-POST.html)
- [Search](../../../../assets/lighthouse/2025-08-12-SEARCH.html)
- [Tags](../../../../assets/lighthouse/2025-08-12-TAGS.html)
- [Blog](../../../../assets/lighthouse/2025-08-12-BLOG.html)

#### mobile

- [Home](../../../../assets/lighthouse/2025-08-12-HOME-mobile.html)
- [Post](../../../../assets/lighthouse/2025-08-12-POST-mobile.html)
- [Search](../../../../assets/lighthouse/2025-08-12-SEARCH-mobile.html)
- [Tags](../../../../assets/lighthouse/2025-08-12-TAGS-mobile.html)
- [Blog](../../../../assets/lighthouse/2025-08-12-BLOG-mobile.html)

## Primeros pensamientos

Los datos arrojan buenos resultados en parte se debe al stack tecnológico utilizado (Server side rendering y static site generation) y el meta-framework seleccionado Astro.

Pero para conseguir unos datos aceptables el desarrollador tiene que ser experto y haber peleado mucho en batallas de front para entender las mejores prácticas.

Aun así siempre se escapan cosas y se debería de tener una forma de controlar los core web vitals desde el principio para poder ir mejorando los números.

Por otro lado para conseguir esto habría que incluir estas comprobaciones de forma programática.

Hoy en día los test unitarios y los e2e o funcionales forman parte ya del ADN de los desarrolladores, sin embargo veo que los test automáticos de regresión visual y los test de performance no acaban de calar en los desarrolladores , en parte creo que es por el aumento del tiempo al para ejecutar las pipelines.

Sin embargo considero que de los test automáticos de regresión visual son esenciales, de hecho si tuviera que elegir entre test unitarios o de componentes y test de regresión visual optaría por los de regresión.

En el caso de los test para WPO los desarrolladores creo que no se dan cuenta el valor que suponen estos test para negocio y piensan más en el trabajo que les supone realizar esos test que en el beneficio

## Planteamiento del trabajo

- Para poder sacar estadísticas de forma programática voy a buscar la forma de implementar lighthouse o herramientas parecidas

### Plan de ataque (síntesis)

1. Métricas de laboratorio automatizadas (synthetic): Lighthouse CI en local y en CI, con presupuestos de rendimiento y aserciones que rompen el build cuando te pasas. Reportes HTML/JSON almacenados como artefactos y/o en un servidor LHCI. ￼ ￼
2. Métricas de campo (RUM): web-vitals en producción para LCP/INP/CLS reales, enviados a tu backend/GA4. Esto te evita optimizar a ciegas. ￼ ￼
3. Benchmarks públicos: PSI/CrUX en CI para ver cómo te mide Google (Lighthouse + datos reales agregados). ￼ ￼
4. Opcional power-up: sitespeed.io para rastrear múltiples URLs, grabar vídeos/filmstrips y presupuestos más finos; sube resultados a S3/GCS. ￼

### Lighthouse

Instalado lighthouse

Alternativa rápida ejecutar:

```bash
npx unlighthouse --site https://erades.com
```

Esto te da las métricas de todo el site.

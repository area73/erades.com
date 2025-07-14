---
title: "declaración de ramificación Vs micro-ramificación"
description:
  " Comparando la bifurcación de declaraciones tradicionales con técnicas de
  micro-bifurcación en JavaScript para un código más mantenible y funcional"
pubDate: "2018-06-06"
tags: ["statement brnaching", "micro-branching strategies"]
categories: ["javascript", "functional"]
draft: false
heroImage: "/blog-placeholder-21.jpg"
---

# ramificación de sentencias

Cualquier estructura que altera la secuencia de ejecución dentro del ámbito global o funcional. <br>
Esto incluye:<br>

```
if
else
switch
for
while
```

Las sentencias están diseñadas para ejecutarse de forma no lineal. Además del evidente efecto de hinchazón, la ramificación de sentencias tiende a volverse poco intuitiva a medida que avanza.

## micro-ramificación

Lógica condicional contenida dentro de una sentencia que no afecta a la secuencia de ejecución de la sentencia.<br>
Los siguientes operadores facilitan la micro-ramificación: <br>

```
ternary (<cond> ? a : b)
&&
||
```

La lógica fluye secuencialmente de arriba a abajo e incluso de izquierda a derecha. No hay bifurcaciones en el camino. Solo hay una sentencia de retorno y está al final, donde esperamos que esté. Lo mejor de todo es que es corto. Nada se desperdicia. De hecho, es lo suficientemente conciso como para ser apenas procedimental en absoluto.

Las alternativas a la ramificación de sentencias se dividen en dos amplias categorías: **micro-ramificación** y **sin ramificación en absoluto**

## Estrategias de micro-ramificación

### Guardias (&&) y valores predeterminados (||)

```javascript
//invocar callback si hay uno
callback && callback();
//retrasar por argumento o 20
delayBy(delay || 20);
//eliminar el nodo de su padre
node && node.parent && node.parent.removeChild(node);
//registrar una prueba en la consola si tenemos una
window.console && console.log("test");
```

<br>

<blockquote> Algunas cosas tienen un lugar natural. Los pájaros en el cielo, los peces en el mar y una declaración de retorno al final de una función.</blockquote>

<br>

Bibliografía:<br>
https://javascriptweblog.wordpress.com/2010/07/26/no-more-ifs-alternatives-to-statement-branching-in-javascript/

---
title: "Ámbito léxico y dinámico"
description:
  " Entendiendo el ámbito léxico y dinámico en JavaScript, incluyendo la palabra
  clave eval y sus implicaciones en el rendimiento"
pubDate: "2018-01-14"
tags: ["scope", "eval", "javascript", "declarative"]
categories: ["javascript"]
draft: false
heroImage: "/blog-placeholder-18.jpg"
---

# Alcance léxico

## Eval malvado

Podemos hacer trampa con el alcance léxico usando la palabra clave eval. <br>
La palabra clave eval, toma cualquier cadena dada y la trata como si fuera un código

```javascript
var bar = "foo";
function foo(str) {
  eval(str);
  console.log("bar"); // 42 !!!!
}

foo("var bar = 42");
```

El problema de hacer esto es que el rendimiento se verá afectado porque, como sabemos, JS primero asigna el LHS (lado izquierdo), lo cual significa que leerá todas las asignaciones en el lado izquierdo y luego hará el lado derecho del código. En el caso de la función eval estamos utilizando un RHS que contiene una declaración LHS y RHS y eso significa que el compilador de JS no podrá hacer una optimización de código porque el motor no puede asumir que el alcance léxico será inalterable. Entonces, incluso si declaramos un eval y no lo usamos para hacer una declaración, tendrá un efecto secundario en el rendimiento de nuestro código. <br>
Así que para resumir en general no deberíamos usar la clave eval

## with with

También podemos saltarnos el alcance léxico haciendo algo aún peor, y eso es usar la declaración with

## Nota sobre LHS y RHS

La búsqueda de LHS se realiza cuando una variable aparece en el lado izquierdo de una operación de asignación, y una búsqueda de RHS se realiza cuando una variable aparece en el lado derecho de una operación de asignación.

Lo pienso de la siguiente manera: <br>
la búsqueda de lhs es una búsqueda de contenedor <br>
la búsqueda de rhs es una búsqueda de valor <br>

## Alcance dinámico

El alcance dinámico se refiere a un mecanismo de alcance donde las variables se resuelven buscando en la pila de llamadas, en lugar de por la estructura del código (como ocurre con el alcance léxico). En el alcance dinámico, el contexto en el que se llama a una función determina las vinculaciones de las variables, no el lugar donde la función fue definida.

JavaScript utiliza alcance léxico (estático), pero algunos comportamientos—como el valor de `this`—pueden parecerse al alcance dinámico porque `this` se determina por cómo se invoca una función, no por dónde está escrita.

### Ejemplo: Simulando alcance dinámico con `this`

```javascript
var name = "global";

function printName() {
  console.log(this.name);
}

var obj = {
  name: "object",
  printName: printName,
};

printName(); // "global" (this se refiere al objeto global)
obj.printName(); // "object" (this se refiere a obj)
```

En el ejemplo anterior, el valor de `this` dentro de `printName` depende de cómo se llama a la función, no de dónde fue definida. Esto es similar al alcance dinámico.

### Diferencias clave

- **Alcance léxico**: La resolución de variables se basa en dónde se escriben las funciones y los bloques en el código.
- **Alcance dinámico**: La resolución de variables se basa en la pila de llamadas en tiempo de ejecución.

JavaScript no tiene un alcance dinámico real para las variables, pero entender cómo funcionan `this` y ciertos constructos puede ayudar a evitar confusiones.

<div class="bibliography">
Bibliografía: <br>

https://stackoverflow.com/questions/36383795/javascript-lhs-and-rhs-lookup
Curso de Plural sight: Javascript avanzado, por Kyle Simpson

</div>

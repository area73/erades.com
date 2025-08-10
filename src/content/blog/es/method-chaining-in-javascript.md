---
title: "Encadenamiento de métodos en javascript"
description: "Comprendiendo el encadenamiento de métodos en JavaScript para crear interfaces fluidas y mejorar la legibilidad del código a través de llamadas a métodos secuenciales"
pubDate: 2018-01-08
tags:
  - javascript
  - method chaining
categories:
  - javascript
draft: false
heroImage: /blog-placeholder-20.jpg
---

# Encadenamiento de métodos en Javascript

de [wikipedia](https://en.wikipedia.org/wiki/Method_chaining) <br>
El encadenamiento de métodos, también conocido como idiom de parámetro nombrado, es una sintaxis común para invocar múltiples llamadas a métodos en lenguajes de programación orientados a objetos.

La clave para lograr esto es que cada método devuelve un objeto, permitiendo que las llamadas se encadenen en una sola declaración sin requerir variables para almacenar los resultados intermedios.

Una sintaxis similar es el cascading de métodos, donde después de la llamada al método, la expresión se evalúa al objeto actual, no al valor de retorno del método. El cascading puede implementarse usando el encadenamiento de métodos al hacer que el método devuelva el propio objeto actual. El cascading es una técnica clave en las interfaces fluidas, y dado que el encadenamiento está ampliamente implementado en lenguajes orientados a objetos mientras que el cascading no, esta forma de "cascading mediante encadenamiento al devolver this" a menudo se denomina simplemente como "encadenamiento". Ambos, el encadenamiento y el cascading provienen del lenguaje Smalltalk.

Mientras que el encadenamiento es sintaxis, tiene consecuencias semánticas, a saber, que requiere que los métodos devuelvan un objeto, y si se implementa el cascading mediante encadenamiento, este debe ser el objeto actual. Esto evita que el valor de retorno se utilice para algún otro propósito, como devolver un valor de error.

Para ver un ejemplo primero definamos nuestro caso de uso:

Imagina que tenemos una clase persona que tiene algunos métodos (o funciones), estos son:

```javascript
setName();
setEyeColor();
setHairColor();
setHeight();
```

Y esta es la definición de nuestra clase

```javascript
// Definición de la clase
// ------------------------
class Person {
  constructor() {
    console.log("persona creada");
  }

  setName(name) {
    this.name = name;
    return this;
  }

  setEyeColor(eyeColor) {
    this.eyeColor = eyeColor;
    return this;
  }

  setHairColor(hairColor) {
    this.HairColor = hairColor;
    return this;
  }

  setHeight(height) {
    this.height = height;
    return this;
  }
}
```

Y ahora podemos hacer encadenamiento de métodos.

```javascript
console.log(
  new Person()
    .setName("Dina")
    .setEyeColor("black")
    .setHairColor("brown")
    .setHeight("1.85")
);

// Person {HairColor:"brown", eyeColor:"black", height:"1.85", name:"Dina"}
```

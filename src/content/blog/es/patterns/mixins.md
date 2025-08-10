---
title: Mixins
description: Entendiendo los mixins en JavaScript como una solución para la multi-herencia, incluyendo los patrones de delegación, concatenación y herencia funcional
pubDate: 2018-11-18
tags:
  - design patterns
  - mixins
  - functional mixins
  - inherence
categories:
  - design patterns
draft: false
heroImage: /blog-placeholder-7.jpg
---

En JavaScript solo podemos heredar de un único objeto. Solo puede haber un **[[Prototype]]** para
un objeto.
Y una clase puede extender solamente una otra clase.

**Para resolver el uso de la múltiple herencia usamos mixins**.

En lenguajes de programación orientada a objetos, un Mixin es una clase que contiene métodos para uso de
otras clases sin necesidad de ser la clase padre de esas otras clases.

Un mixin también puede ser visto como una **interfaz con métodos implementados**.
Este patrón es un ejemplo de la aplicación del [**principio de inversión de dependencia**](https://en.wikipedia.org/wiki/Dependency_inversion_principle).

## Heredando "métodos"

JavaScript no tiene métodos en la forma en que los lenguajes basados en clases los definen.
**En JavaScript, cualquier función puede ser agregada a un objeto en la forma de una propiedad**.
Una función heredada actúa igual que cualquier otra propiedad, incluyendo la sombra de propiedad

Existen más de un tipo de herencia prototípica:

- **Delegación** (es decir, la cadena de prototipo).
- **Concatenativa** (es decir, mixins, `Object.assign()`).
- **Funcional** (No confundir con programación funcional. Una función utilizada para crear un
  cierre para el estado privado/encapsulación).

Cada tipo de herencia prototípica tiene su propio conjunto de casos de uso, pero todos ellos son igualmente
útiles en su capacidad para habilitar la composición, que crea relaciones **tiene-un** o **usa-un** o **puede-hacer**
en lugar de la relación es-un creada con la herencia de clase.

## Delegación

Podemos trabajar con delegación usando apply, bind o call para heredar de otro objeto. Veamos
un ejemplo: <br>

```javascript
function Producto(nombre, precio) {
  this.nombre = nombre;
  this.precio = precio;
}

function Comida(nombre, precio) {
  Producto.call(this, nombre, precio);
  this.categoria = "comida";
}

function Juguete(nombre, precio) {
  Producto.call(this, nombre, precio);
  this.categoria = "juguete";
}

var queso = new Comida("feta", 5);
var diversion = new Juguete("robot", 40);
```

<a href="../testing-protoype-inheritance/" target="_self">Este es otro ejemplo "complicado"
</a>

## Concatenativa

**Usando Object.assign() como mixin**

```javascript
// mixin
let decirHolaMixin = {
  decirHola() {
    alert(`Hola ${this.nombre}`);
  },
  decirAdios() {
    alert(`Adiós ${this.nombre}`);
  },
};

// uso:
const Usuario = function (nombre) {
  this.nombre = nombre;
};

// copiamos los métodos
Object.assign(Usuario.prototype, decirHolaMixin);
// ahora Usuario puede decir hola
new Usuario("Chico").decirHola(); // ¡Hola Chico!
```

**o si estuvieras utilizando clases podrías hacer algo como esto:**

```javascript
class Usuario extends Persona {
  // ...
}

Object.assign(Usuario.prototype, decirHolaMixin);
```

### Mixins Funcionales

Si las funciones definidas por los mixins están pensadas solamente para el uso de otros objetos,
¿por qué molestarse en crear mixins como objetos regulares en absoluto? Dicho de otra manera, un **mixin debería ser un
proceso no un objeto**.

La conclusión lógica es hacer nuestros mixins en funciones en las que los objetos consumidores se inyecten
a sí mismos por delegación, eliminando así al intermediario (la función extend) por completo.

```javascript
var comoCírculo = function () {
  this.area = function () {
    return Math.PI * this.radio * this.radio;
  };
  this.crecer = function () {
    this.radio++;
  };
  this.encoger = function () {
    this.radio--;
  };
  return this;
};

var Círculo = function (radio) {
  this.radio = radio;
};

comoCírculo.call(Círculo.prototype);

var circulo1 = new Círculo(5);
circulo1.area(); //78.54
```

**Mixins como verbos en lugar de sustantivos**

### Añadir opciones

Esta estrategia funcional también permite que los comportamientos prestados sean parametrizados mediante
un argumento de opciones.

```javascript
var comoÓvalo = function ({ crecerPor, encogerPor }) {
  this.area = function () {
    /* ... */
  };
  this.ratio = function () {
    /* ...*/
  };
  this.crecer = function () {
    this.radioCorto += crecerPor / this.ratio();
    this.radioLargo += crecerPor;
  };
  // ...
  return this;
};

var BotónÓvalo = function (/*...*/) {
  //...
};
// ...
comoÓvalo.call(BotónÓvalo.prototype, { crecerPor: 2, encogerPor: 2 });
```

**Lectura adicional [Traits](https://github.com/traitsjs/traits.js)**

<div class="bibliography">

## Bibliografía:

[Angus Croll](https://javascriptweblog.wordpress.com/2011/05/31/a-fresh-look-at-javascript-mixins/?blogsub=confirming%23subscribe-blog]) <br/>
[javascript.info](https://javascript.info/mixins)<br/>
[Wikipedia](https://es.wikipedia.org/wiki/Mixin)<br/>
[Eric Elliott](https://medium.com/javascript-scene/10-interview-questions-every-javascript-developer-should-know-6fa6bdf5ad95)<br/>
[developer.mozilla](https://developer.mozilla.org/es/docs/Web/JavaScript/Herencia_y_la_cadena_de_protipos)<br/>

</div>

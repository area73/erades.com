---
title: "Las variables globales son malas"
description:
  "Explorando los peligros de las variables globales en JavaScript, incluyendo la contaminación del alcance, problemas de concurrencia y mejores prácticas para
  la declaración de variables"
pubDate: "2018-06-14"
tags: ["javascript", "globals"]
categories: ["javascript"]
draft: false
heroImage: "/blog-placeholder-14.jpg"
---

## Extraído de un Gist, una explicación muy bien hecha

```javascript
// Es importante declarar tus variables.

(function () {
  var foo = "Hola, mundo!";
  print(foo); //=> Hola, mundo!
})();
print(foo); // De ninguna manera José !!

// Porque si no lo haces, ellas se convierten en variables globales.

(function () {
  foo = "Hola, mundo!";
  print(foo); //=> Hola, mundo!
})();

print(foo); //=> WTF, devuelve "Hola, mundo!"

// Cuando las variables globales se infiltran en tu código pueden causar problemas.
// Especialmente en aplicaciones con concurrencia.

var contar = function () {
  for (i = 0; i < 10; i += 1) {
    print(i);
  }
};

contar(); //=> 0 1 2 3 4 5 6 7 8 9

var contarSilenciosamente = function () {
  for (i = 0; i < 10; i += 1) {
    // no imprime nada;
  }
};

// Ambos bucles incrementan i al mismo tiempo, lo que causa un comportamiento extraño.
window.setTimeout(contarSilenciosamente, 10);
window.setTimeout(contar, 10); //=> 2 3 7 8 9

// Puedes usar 'this' en las definiciones de métodos para referirte a los atributos de
// el objeto del método.

var obj = {
  nombre: "foo",
  presentarse: function () {
    print(this.nombre);
  },
};

obj.presentarse(); //=> foo

// Pero 'this' no sigue las reglas normales de alcance en JavaScript. Uno
// podría esperar que 'this' esté disponible con el mismo valor a través del cierre en el
// callback definido dentro del método aquí.

var obj = {
  nombre: "foo",
  presentarse: function () {
    window.setTimeout(function () {
      print(this.nombre);
    }, 3000);
  },
};

obj.presentarse(); //=> *pausa* undefined

// De hecho, esto se ligó al objeto global en el callback. Para evitarlo,
// asigna la referencia del objeto a una variable regular que tendrá el
// mismo valor dentro de la definición del callback.

var obj = {
  nombre: "foo",
  presentarse: function () {
    var eso = this;
    window.setTimeout(function () {
      print(eso.nombre);
    }, 3000);
  },
};

obj.presentarse(); //=> *pausa* foo

// La palabra clave 'this' en realidad se asigna dinámicamente siempre que se
// invoca una función. Cuando una función es invocada como un método, es decir, obj.method(), 'this'
// se liga a 'obj'. Pero cuando una función es invocada por sí misma 'this' se liga
// al objeto global.

var frase = "Hola, mundo!";
var imprimirFrase = function () {
  print(this.frase);
};

imprimirFrase(); //=> Hola, mundo!

// Esto es cierto incluso en funciones que fueron definidas como un método.

var obj = {
  nombre: "foo",
  presentarse: function () {
    print(this.nombre);
  },
};

// Cuando la función se invoca sin 'obj.' delante de ella, 'this' se convierte
// en el espacio de nombres global.

var presentarse = obj.presentarse;
presentarse(); //=> undefined

// La invocación de método y la invocación de función son dos de los patrones de invocación
// en JavaScript. Un tercero es la invocación de apply, que nos da control sobre qué
// 'this' se asignará durante la ejecución de la función.

presentarse.apply(obj, null); //=> foo

// 'apply' es un método en Function. El primer argumento es el valor que 'this'
// será unido. Los argumentos sucesivos a apply se pasan como argumentos a
// la función que se está invocando.

var hablador = function (repetirVeces) {
  var i;
  for (i = 0; i < repetirVeces; i += 1) {
    print(this.nombre + " ");
  }
};
hablador.apply(obj, 3); //=> foo foo foo

// El cuarto y último patrón de invocación en JavaScript es la invocación de constructor
// Este patrón fue diseñado para proporcionar una forma de crear nuevos objetos
// que parecerían familiares a los programadores que están acostumbrados a programar con
// clases.

var Gato = function (nombre) {
  this.nombre = nombre;
};
Gato.prototype = {
  pregunta: function () {
    print(this.nombre + ' dice, "miau"');
  },
};

// Cuando una función es llamada con la palabra clave 'new' delante de ella, un nuevo
// objeto es creado y se une a 'this' cuando la función se ejecuta. Las funciones de constructor especiales usan esta característica para personalizar nuevos objetos a medida que son
// creados.

var bigotes = new Gato("bigotes");
bigotes.pregunta(); //=> bigotes dice "miau"

// Cuando un nuevo objeto es creado con 'new', el prototipo del nuevo objeto es
// establecido al prototipo de la función constructora. Así que el nuevo objeto hereda
// todos los atributos del valor del prototipo del constructor. En este caso,
// los nuevos objetos gato heredan el método 'pregunta' de Gato.prototype.

var masticador = new Gato("masticador");
masticador.pregunta(); //=> masticador dice "miau"

// Si una función constructora es llamada sin la palabra clave 'new', se invoca
// con el patrón ordinario de invocación de funciones.

var atrapado = Gato("atrapado!");
atrapado.pregunta(); //=> typein:165: TypeError: atrapado no tiene propiedades

// Así que 'this' se asigna al objeto global en lugar de a un objeto recién creado. Eso significa que cualquier atributo asignado al nuevo objeto por la función constructora se convierte en variables globales!

print(nombre); //=> atrapado!

// La invocación del constructor es bastante complicada y propensa a la creación de variables globales desastrosas. Aquí hay una forma más limpia de crear nuevos objetos que hereden
// de otros objetos.

// Esto define Object.create, un método que simplifica el comportamiento de la
// palabra clave 'new'. Este método fue inventado por Douglas Crockford.
// http://javascript.crockford.com/prototypal.html
if (typeof Object.create !== "function") {
  Object.create = function (o) {
    var F = function () {};
    F.prototype = o;
    return new F();
  };
}

// Object.create(obj) devuelve un nuevo objeto que hereda todos los atributos
// de obj. El objeto prototipo 'gato' aquí define un método 'clonar' que envuelve
// Object.create para personalizar nuevos objetos 'gato' a medida que se crean.

var gato = {
  pregunta: function () {
    print(this.nombre + ' dice "miau"');
  },
  clonar: function (nombre) {
    var nuevoGato = Object.create(this);
    nuevoGato.nombre = nombre;
    return nuevoGato;
  },
};

var peludo = gato.clonar("peludo");
peludo.pregunta(); //=> peludo dice "miau"

// Además de heredar 'pregunta', los nuevos gatos también heredan 'clonar'.

var peludo2 = peludo.clonar("peludo2");
peludo2.pregunta(); //=> peludo2 dice "miau"

// Los métodos y atributos se heredan, no se copian. Si cambias la
// definición de 'clonar' en 'gato' en este punto, el cambio se reflejará
// en objetos gato que ya han sido creados.

peludo2.hasOwnProperty("clonar"); //=> false
peludo.hasOwnProperty("clonar"); //=> false
gato.hasOwnProperty("clonar"); //=> true
```

<br>
Bibliografía:<br>
https://gist.github.com/hallettj/64478

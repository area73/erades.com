# Lo que nos espera con la IA es lo mismo que nos pasó con el CSS y el HTML

Tengo esta idea loca, nosotros ya trabajábamos con la IA antes, pero no antes hace un año o dos si no antes, antes, mucho antes, antes de que existiera open AI, antes de la llegada de Angular , react o cualquier otro framework moderno.

Nosotros empezamos a trabajar con la IA en cuanto empezamos a usar CSS y la form,a de trabajar que se impuso, porque en la mayoría de los casos, para trabajar con CSS nosotros los humanos eramos la IA.

Pero para explicar mi razonamiento voy a empezar a explicar en mi opinión lo que la IA nos aporta a día de hoy.
Creo que de estas afirmaciones sobre la IA, mayoría de las personas podrían coincidir conmigo

- La IA nos permite una forma infinitamente más rápida de iteración
- la IA conoce el fin de la tarea que se le asigna (porque se lo hemos dicho)
- conoce todas las instrucciones a usar o las puede buscar
- Sin contexto es incluso capaz de darte una respuesta (aunque esa respuesta sea una mierda o una falacia)
- Es ideal para hacer prototipos pero muy complicado que mantenga aplicaciones en producción
- Aumenta el código base sin sentido, añadiendo complejidad
- hace suposiciones y aplica cambios que son en muchos casos perjudiciales para el mantenimiento
- tiene una base de conocimiento pero no tiene experiencia (todavía), esto podría ser las ventanas de los LLM
- Todos tenemos ejemplos de personas (no técnicas) que ha utilizado bive coding e incluso han sacado productos a producción y que en un determinado punto la IA no ha podido continuar dándole respuesta de forma coherente y provocando el colapso

Si esto está dentro de lo razonable, de lo que podríamos pensar que nos ofrece la IA a día de hoy, vamos a analizar ahora un poco la similitud que puede existir con un desarrollador cuando se enfrenta con el CSS.

- Los que aplicaban cambios en los CSS (hasta la entrada de la IA), éramos nosotros, los humanos, nosotros hacíamos esas funciones que hace ahora la IA, pero no como ingenieros si no como desarrolladores (AKA IA humana) y me explico.

Para simplificar podríamos decir que existen los ingenieros (los que aplicaban el ingenio, de ahí viene la palabra y no los que tenía una carrera universitaria) y los desarrolladores que como su nombre indica desarrollaban (fundamentales para las empresas)

A diferencia del desarrollo de back o aplicaciones javascript que se delegaba a los ingenieros , el HTML y el CSS se relegaba a los desarrolladores o en su caso a tareas secundarias de los ingenieros.

Eso se hacía por el siguiente motivo.

- La programación con CSS es una forma muy rápida de iteración, cualquier cambio que hagas lo puedes ver en el momento y no necesitas tener una infraestructura de código previa, para cambiar el color de un texto sólo necesitas saber el elemento en donde aplicar la regla , sin embargo para poder borrar un dato de una base de datos necesitas tener un conector a la base de datos y una serie de infraestrucura de código para simplemente probar ese cambio

- Los programadores conocen con bastante exactitud el fin de la tarea de CSS que se les encomienda, por ejemplo "añade espacio entre un párrafo y otro"

- Conocer tola mayoría de las reglas a usar de CSS es relativamente sencillo, más teniendo en cuenta que sólo se deben de usar de forma general menos de 100, y si en un momento dado no se conoce se puede buscar fácilmente, existe una [fuente de verdad](https://developer.mozilla.org/en-US/docs/Web/CSS/Properties)

- Yo me he encontrado a muchos desarrolladores que tocaban CSS que no entendían la especificidad, ni el orden de la cascada, ni el modelo de caja y sin embargo podían darte respuesta a una tarea de CSS (aunque la solución fuera una mierda)

- Los desarrolladores CSS podían estilizar sitios , más o menos parecidos a lo que les demandaban los compañeros de UI (como hace ahora la IA), pero no igual por eso no nos cansamos de ver en las ofertas frases como "... con especial interés en los detalles", "pixel perfect" y cosas así.
  El problema no está en que no sean perfeccionistas, el problema está en que no entienden CSS y para llegar a la perfección tienen que invertir numerosas horas (como cunado ahora llega un punto con la IA que se encuentra en un bucle infinito).

- El "time to market" del CSS es bajo para un desarrollador, e infinito para mantenerlo si no sabe lo que está haciendo

- Como añadir reglas es muy fácil, los desarrolladores añaden reglas como si no hubiera mañana, están enfocados en terminar la tarea no en mantenerla, aumentan el código base sin sentido pisando reglas con la misma especificidad y elevándola entrando en la "guerra de la especificidad".

- Suponen que para crear una regla tienen que atacar a un elemento del DOM específico y si no, lo aplican también al padre , y al padre del padre por si acaso y le metemos un `!important` que eso siempre funciona

- Se les ha explicado que la C de CSS viene de cascada pero no entienden los beneficios que aporta y lo que pasa por su mal uso y se enfocan en eliminar la cascada (AKA CSS in JS, CSS modules, etc)

El CSS es como Siberia, todo el mundo sabe donde está pero nadie quiere ir allí, pero esto se debe al enfoque que le hemos dado como industria yo espero que hayamos aprendido algo y que no cometamos el mismo error con la IA, y si no siempre está el viejo proverbio chino que dice: "porqué preocuparse por un problema si tiene solución, y porque preocuparse si no la tiene

<div class="bibliography">
[The HTTP Archive](https://almanac.httparchive.org/en/2022/css)
[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Properties)
[css-tricks: a specificity battle](https://css-tricks.com/a-specificity-battle/)
</div>

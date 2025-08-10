---
title: "Lexical and Dynamic scope"
description: "Understanding lexical and dynamic scoping in JavaScript, including the eval keyword and its performance implications"
pubDate: "2018-01-14"
tags:
  - scope
  - eval
  - javascript
  - declarative
categories:
  - javascript
draft: false
heroImage: "/blog-placeholder-18.jpg"
---

## Evil eval

We can cheat on lexical scoping using eval keywod. <br>
The eval keyword, takes any given strings and it treats as it was a code

```javascript
var bar = "foo";
function foo(str) {
  eval(str);
  console.log("bar"); // 42 !!!!!
}

foo("var bar = 42");
```

The problem of doing this is that performance will be afected because as we know JS first assign the LHS (left hand side), witch means that it will read all the assigments on the left and lator will do the right hand side of the code. In the case of the eval function we are using a RHS that contains a LHS and RHS statement and that means that JS compiler will not be able to do a code optimization because the engine cannot assume the lexical scoping to be unchange. So even if we declare an eval and not using it to do a declaration it will have a side effect on perfomance in our code.<br>
So to summarize in general we should not use eval key

## with with

We can also skeep lexical scope by doing even a worse thing and that is using the with statement

## A note about LHS and RHS

LHS look-up is done when a variable appears on the left-hand side of an assignment operation, and an RHS look-up is done when a variable appears on the right-hand side of an assignment operation.

I think of it as follows :<br>
lhs lookup is a container lookup <br>
rhs lookup is a value lookup<br>

## Dynamic scope

Dynamic scope refers to a scoping mechanism where variables are resolved by searching up the call stack, rather than by the structure of the code (as in lexical scope). In dynamic scoping, the context in which a function is called determines the variable bindings, not where the function was defined.

JavaScript uses lexical (static) scoping, but some behaviors—such as the value of `this`—can resemble dynamic scope because `this` is determined by how a function is invoked, not where it is written.

### Example: Simulating Dynamic Scope with `this`

```javascript
var name = "global";

function printName() {
  console.log(this.name);
}

var obj = {
  name: "object",
  printName: printName,
};

printName(); // "global" (this refers to global object)
obj.printName(); // "object" (this refers to obj)
```

In the example above, the value of `this` inside `printName` depends on how the function is called, not where it was defined. This is similar to dynamic scoping.

### Key Differences

- **Lexical scope**: Variable resolution is based on where functions and blocks are written in the code.
- **Dynamic scope**: Variable resolution is based on the call stack at runtime.

JavaScript does not have true dynamic scope for variables, but understanding how `this` and certain constructs work can help avoid confusion.

---

<div class="bibliography">

## Bibliografía:

https://stackoverflow.com/questions/36383795/javascript-lhs-and-rhs-lookup<br>
Plural sight course: Advanced javascript, by kyle Simpson

</div>

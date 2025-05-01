---
title: "Lexical and Dynamic scope"
description: "Understanding lexical and dynamic scoping in JavaScript, including the eval keyword and its performance implications"
pubDate: "2018-01-14"
tags: ["scope", "eval", "javascript"]
categories: ["javascript"]
draft: false
heroImage: "/blog-placeholder-18.jpg"
---

# Lexical scoping

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

# Dynamic scope

### Bibliograpy:<br>

https://stackoverflow.com/questions/36383795/javascript-lhs-and-rhs-lookup
Plural sight course: Advanced javascript, by kyle Simpson

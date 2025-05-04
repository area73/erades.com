---
title: "monads"
description: "Exploring monads as specialized functors for handling null data and streamlining error handling in functional programming"
pubDate: "2019-11-11"
tags: ["declarative", "Pure functions", "Inmutable", "currying", "functors"]
categories: ["functional"]
draft: true
heroImage: "/blog-placeholder-8.jpg"
---

So let's remember first what's a functor:

    1. It is a wrapper object to contain our data
    2. had a map function to iterate over its own data
    3. preserves identity
    4. can be composable

But functors by themselves aren't compelling, because they're not expected to
know how to handle cases with **null data**.<br> `Ramda's R.compose`, for instance,
will break if a null function reference is passed into it. This isn't a flaw
in the design; it's intentional.

- Functors map functions of one type to another.

- More-specialized behavior can be found in functional data types called monads.

- Among other things, monads can streamline error handling in your code,allowing
  you to write fluent function compositions.

- What's their relationship to functors? **Monads are the containers
  that functors "reach into."**

---
title: Check if any key exists in javascript object
author: David Wells
date: 2019-06-10
layout: post
category: snippets
tags:
  - javascript
  - script
---

This snippet will check an object against an array of strings and return `true` if one of the keys (strings) is found.

> A.k.a. Does this object have one of these keys?

If a match is found, it will return early because we are using `.some` array method. This makes `.some` superior for lookup vs `.reduce` or other array methods that will loop the entire array.

```js
/* Find the keys! */
const anyKeyExists = (object, keys) => {
  return Object.keys(object).some((key) => {
    return keys.includes(key))
  }
}

const keys = ['track', 'page', 'identify']
const object = {
  hello: 'there',
  track: 'exists'
}

if (anyKeyExists(object, keys) {
  /* One of the keys exists. Do stuff */
}

const findOneOfThese = ['lol', 'hi', 'wow']
const secondObject = {
  hello: 'there',
  cool: true,
  haha: 'wowza'
}

anyKeyExists(secondObject, findOneOfThese)
// false
```

This is useful for verifying objects contain at least one required key.

It came in handy in my [analytics library](https://www.npmjs.com/package/analytics) to detect plugins being passed into the library.

Hope this helps ya! 🎉

Also, it can be a one liner... but I prefer `return`'s... call me old fashioned.

```js
const anyKeyExists = (object, keys) => Object.keys(object).some((key) => keys.includes(key))
```

^ just not as easy to parse IMO.

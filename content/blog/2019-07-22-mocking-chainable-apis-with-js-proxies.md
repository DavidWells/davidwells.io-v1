---
title: "Mocking chainable APIs with ES6 JavaScript Proxies"
description: "How to stub out chainable APIs using ES6 Javascript Proxies"
author: DavidWells
date: 2019-07-22 09:30:00
layout: post
category: dev
tags:
  - node
  - javascript
  - proxies
---

ES6 proxies are pretty crazy.

Proxies give you the ability to intercept object calls and do pretty much whatever you want with them 🤯.

I highly recommend checking out this video from [Michel Weststrate](https://twitter.com/mweststrate), the creator of `immer`, for a super deep dive on ES6 proxies and everything you can do with them.

<iframe width="560" height="315" src="https://www.youtube.com/embed/4Nb9Gwp2L24" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Beware of proxies he warns, they are cool but can potentially lead to some back debugging issues.

Anywho, onto the use case...

## How to mock a chainable API

I came across the need for replacing a chainable API inside the `netlify-cli` for the `chalk` module.

We needed a global mechanism for disabling terminal colors made with `chalk`.

There is a [setting for this](https://github.com/chalk/chalk/tree/1f77953f1a358fa8f626f0fd872792d63da6d58a#chalklevel) in chalk but that's the easy road out. We are a developer, and we **must** re-invent the wheel. Also, wasn't working for my version of chalk...

So... Let's try some proxies!

First, what is a chainable API?

```js
// Methods can chain together in any order
chalk.blue.bgRed.bold('Hello world!')
```

There are lots of libraries out there that allow for this type of flexibility.

You can actually [use proxies to create chainable APIs](https://www.keithcirkel.co.uk/metaprogramming-in-es6-part-3-proxies/)

## Proxy time

Thanks to [safe-object-proxy](https://github.com/ktsn/safe-object-proxy), I found a proxy implementation that ensures that objects never throw errors if the keys on that object don't exist.

So no more this:

```js
whatever.haha.yolo()
// Uncaught TypeError: Cannot read property 'yolo' of undefined
```

Instead, the proxy will magically make the function return `null`.

**Pretty cool**

There is a similar project out there called [nevernull](https://www.npmjs.com/package/nevernull) that comes packed with polyfills if you are running proxies in the browser.

With a little tweaking, console logging, & scratching my head on WTF proxies do, I managed to have the chainable API return my values no matter what.

Success 🎉

```js
// safeChalk.js
const chalk = require('chalk')

/**
 * Chalk instance for CLI
 * @param  {boolean} noColors - disable chalk colors
 * @return {object} - chalk instance or proxy noOp
 */
module.exports = function safeChalk(noColors) {
  // if no colors return chainable "noOp" API
  if (noColors) {
    return NeverNull(chalk)
  }
  // else return normal chalk library
  return chalk
}

/* Chalk NoOp proxy */
function NeverNull(obj) {
  function match(some, none = noOp) {
    return obj != null ? some(obj) : none()
  }
  return new Proxy((some, none) => {
    /* Here was my tweak to make this work with chalks chainable API */
    if (some) return some

    if (!some && !none) return obj
    return match(some, none)
  }, {
    get: (target, key) => {
      const obj = target()
      if (obj !== null && typeof obj === 'object') {
        return NeverNull(obj[key])
      } else {
        return NeverNull()
      }
    },
    set: (target, key, val) => {
      const obj = target()
      if (obj !== null && typeof obj === 'object') {
        obj[key] = val
      }
      return true
    }
  })
}

function noOp() {}
```

And then using it

```js
const safeChalk = require('./safeChalk')
/**
 * Usage
 */
const disableChalkColors = true
const myChalk = safeChalk(disableChalkColors)

console.log(myChalk.blue.bgRed.bold('Hello world!'))
// 'Hello world!' no coloring

const normalChalk = safeChalk()

console.log(normalChalk.blue.bgRed.bold('Hello world!'))
// 'Hello world!' blue text with red BG that is BOLD
```

**We did it!** The chainable API works no matter what!

## Wrapping up

As you can see, the proxy is tiny and pretty powerful.

I'd recommend heeding Michael's word of warning with proxies. They are a bit "magical" and debugging proxies looks like a bad time.

**What other use cases for proxies have you seen?**  Leave a comment below

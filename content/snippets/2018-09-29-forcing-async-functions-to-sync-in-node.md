---
title: Forcing async functions to run sync in node.js
author: David Wells
date: 2018-09-29
layout: post
category: snippets
tags:
  - javascript
---

Handy snippet for forcing an asynchronous promised based library/function to run synchronously.

This works by spawning a `child_process` using `spawnSync`.

The `sync-rpc` module, will handle this for us in node.

**Note: You shouldn't use this for production server side code**. Forcing sync functions will block the event loop and can result in much slower programs. In some cases, like in a CLI or in a simple script you are writing, this doesn't matter much.

Sometimes, you just need things to work without an entire refactor of a script/library to get it working. This is a quick and easy way to force async to sync.

## 1. Install the module

```bash
npm install sync-rpc
```

## 2. Put your async code into a new file.

```javascript
// async-thing.js file
function asyncFunction() {
  return (paramOne, paramTwo) => {
    // Your async code here
    return delay(2000).then(() => {
      return {
        one: `${paramOne}-value`,
        two: `${paramTwo}-value`,
      }
    })
  }
}

// Simulate a async promise delay
function delay(t, v) {
  return new Promise((resolve) => {
    setTimeout(resolve.bind(null, v), t)
  })
}

module.exports = asyncFunction
```


## 3. Import your async code and wrap it.

Import the `./async-thing` file and wrap with `sync-rpc` module.

This will pause execution and make the async code block and run sync.

```javascript
const forceSync = require('sync-rpc')
const syncFunction = forceSync(require.resolve('./async-thing'))

// inside your thing that needs to be sync (for whatever reason)
const paramOne = 'foo'
const paramTwo = 'bar'
console.log('start')
const syncReturn = syncFunction(paramOne, paramTwo)
console.log('syncReturn', syncReturn)
// result after 2 seconds
// { one: `foo-value`, two: `bar-value` }

// Do the rest of your stuff with `syncReturn` value
```

## Live example

https://repl.it/@DavidWells1/SecondaryUnnaturalArguments

---
title: Sequentially resolve array of promises using async/await in Javascript
author: David Wells
date: 2019-06-24
layout: post
category: snippets
tags:
  - javascript
  - promises
  - async
  - await
---

`Promise.all` is cool but doesn't resolve the promises in exact order. This makes chaining values together impossible with an undetermined amount of promises/array items/plugins.

Using `Array.reduce` we can sequentially run & resolve an array of promises.

Below is an example of resolving a sequential promise chain that loops over an array of data and combines the values together in the correct order.

This is a working plugins system that will resolve values in order, just replace the `/* Business logic here */` section and you have a pluggable call chain. ✌️

> Aside, this is how the [analytics plugin system](https://github.com/davidwells/analytics#analytic-plugins) operates

```js
/**
 * sequentialPromiseChains
 * @param  {Array} arrayOfData - Array of data to loop over
 * @return {Any}
 */
async function sequentialPromiseChain(arrayOfData) {
  const initialValue = {
    foo: 'start'
  }

  const returnData = await arrayOfData.reduce(async (promiseChain, arrayItem) => {
    /* wait for previous promise to finish */
    const currentData = await promiseChain
    /* Business logic here */
    console.log('Do stuff with arrayItem')
    const { run } = arrayItem
    if (run && typeof run === 'function') {
      /* run the sync or async method on the array item */
      const newValue = await run()
      /* combine foo values & return promise to continue the chain */
      return Promise.resolve(Object.assign({}, currentData, {
        foo: `${currentData.foo}${newValue}`
      }))
    }
    /* Return a new promise as the accumulator to continue the promise chain */
    return Promise.resolve(currentData)
  }, Promise.resolve(initialValue))
  return returnData
}


/* Usage */
const dataArray = [
  {
    foo: 'bar',
    cool: true,
    // Sync return value
    run: () => {
      return 'lololo'
    }
  },
  {
    foo: 'baz',
    cool: false,
    // Async return value
    run: async () => {
      return 'woooot'
    }
  }
]

// sequentialPromiseChain a.k.a run plugins in order
sequentialPromiseChain(dataArray).then((d) => {
  console.log('Hooray!', d)
  // Hooray! {foo: "startlololowoooot"}
})
```

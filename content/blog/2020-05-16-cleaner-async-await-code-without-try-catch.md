---
title: "Cleaner async JavaScript code without the try/catch mess."
description: "How to use safeAwait to wrap promises for better error handling in async await JavaScript code"
author: DavidWells
date: 2020-05-16 09:30:00
layout: post
category: dev
---

`async` & `await` in Javascript is awesome; it helps remove many issues with callback nesting and various other problems when working with promises.

It's not without its drawbacks, though.

One issue I find using `async` and `await` it can get quite messy with many `try/catch` blocks in your code.

Because of block scoping, code often ends up looking like this:

```js
async function thing() {
  let x
  try {
    x = await fooBar()
  } catch (err) {
    console.log(err)
  }
  return x
}
```

This is okay... but dangling `let` statements are kind of annoying... Also, it quickly gets unwieldy when working with multiple promises and nested try/catch blocks.

Here's an example:

```js
async function thing() {
  let x
  let y
  try {
    x = await fooBar()
  } catch (err) {
    console.log('handle fooBar error', err)
    try {
      y = await otherThing()
    } catch (e) {
      console.log('handle otherThing error', e)
    }
  }
  return x
}
```

It is possible to have 1 `try/catch` block, but it becomes increasingly difficult to handle all errors thrown at 1 location. Switching on different error types can be challenging, and sometimes we may want to completely ignore certain errors.

Example:

```js
async function thing() {
  let x
  let y
  try {
    x = await fooBar()
    y = await otherThing()
  } catch (err) {
    console.log(`what actually threw error?`, err)
    // insert if else mess
  }
  return { x, y }
}
```

There are also limitations here if we wanted to ignore a specific error or handle it in a specific way.

So there must be a cleaner way...

## A cleaner way for async/await

Good news, there is a much cleaner way to deal with multiple `async/await` promises.

We can wrap our promises in an error handler that returns an array of `error, data`, much like the error first callback pattern in Node.js.

I call this pattern **`safeAwait`**.

Here is the implementation:

```js
/* Native Error types https://mzl.la/2Veh3TR */
const nativeExceptions = [
  EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError
].filter((except) => typeof except === 'function')

/* Throw native errors. ref: https://bit.ly/2VsoCGE */
function throwNative(error) {
  for (const Exception of nativeExceptions) {
    if (error instanceof Exception) throw error
  }
}

/* Helper buddy for removing async/await try/catch litter */
function safeAwait(promise, finallyFunc) {
  return promise.then(data => {
    if (data instanceof Error) {
      throwNative(data)
      return [ data ]
    }
    return [ undefined, data ]
  }).catch(error => {
    throwNative(error)
    return [ error ]
  }).finally(() => {
    if (finallyFunc && typeof finallyFunc === 'function') {
      finallyFunc()
    }
  })
}
```

Using this `safeAwait` wrapper looks like this:

```js
async function fooBar() {
  const [ error, data ] = await safeAwait(myPromiseXyz())
  if (error) {
    // handle error, retry, ignore etc.
  }
  return data
}
```

`safeAwait` will wrap your promise and return any errors in the first element of the array and the data in the second element. This is modeled after error handling in go.

Using this pattern, you can decide precisely how your flow control should work and which errors you would like to handle and handle them without a bunch of `let` and `try/catch` statements.

The `safeAwait` utility will also throw normal errors when there are any [native errors](https://bit.ly/2VsoCGE).

So for example, if you have a syntax error, you don't need to check for this as well in your code. Instead, a normal error will be thrown, and you can handle it somewhere top level.

Here's an example of a native error bubbling up to the top:

```js
// function with native syntax error
function foo() {
  console.log(not.real.thing)
}
async function fooBar() {
  const [ fooErr, fooData ] = await safe(foo())

  // This next line won't get hit because native error is already thrown
  if (fooErr) {
    // ...
  }
}

// throws native syntax error
fooBar().catch((e) => {
  console.log(e)
  // Uncaught ReferenceError: not is not defined
})
```

This is great! Now in our logic, we only need to handle errors we care about in the domain, and we can handle any native errors top level.

## Safe await package

This utility helper is packaged up in the `safe-await` package on npm.

```
npm install safe-await
```

Then in your frontend or backend JavaScript code, you can use it like this:

```js
const safe = require('safe-await')

async function fooBar() {
  const [ fooErr, fooData ] = await safe(foo())

  if (fooErr) {
    // handle error, retry, ignore etc.
  }

  const [ bizzErr, bizzData ] = await safe(bizz(fooData))
  const [ tangoErr, tangoData ] = await safe(tango())

  if (bizzErr || tangoErr) {
    // handle case if either promise failed or ignore
  }

  // Handle empty data & set defaults
  const tData = tangoData || { default: 'stuff' }

  if (fooErr && bizzErr && tangoErr) {
      // All promises failed, do something special/retry
      return fooBar(diffParams)
      // Optionally rethrow error to handle upstream
      // throw new Error(fooErr)
  }

  return {
      fooData,
    bizzData,
    tangoData: tData
  }
}

// Promise 1
function foo(simulateError) {
  return new Promise((resolve, reject) => {
    if (simulateError) {
      return reject('error happened')
    }
    return resolve('data here')
  })
}
// Promise 2
function bizz() {
  return Promise.resolve('stuff')
}
// Promise 3
function tango() {
  return Promise.resolve('more stuff')
}

/* Usage: */
fooBar().then((allData) => {
  console.log('allData', allData)
}).catch((e) => {
  console.log('rethrown error', e)
})

/* Try catch still works if you want it! */
async function thing() {
  let x
  try {
    x = await fooBar()
  } catch (err) {
    console.log('rethrown error', err)
  }
  return x
}
thing()
```

And here is another example using `let` to re-assign the `error` for each call.

```js
const safe = require('safe-await')

async function asyncTask() {
   let error, user, savedTask;

   [error, user] = await safe(getUser('user-123'));
   if (!user) {
     // handle / retry / ignore / or re-throw etc
     throw new Error('No user found')
   }

   [error, userPosts] = await safe(getUserPosts({ userId: user.id }))
   if (err) {
     // handle / retry / ignore / or re-throw etc
     throw new Error('Error occurred while saving task');
   }

  if (userPosts.posts && userPosts.posts.length) {
    const [ err ] = await safe(Notifications.send(user.id, 'Posts Fetched'))
    if (err) {
      console.log('Just log the error and continue flow')
      console.log(err)
    }
  }
  // more stuff
}
```

## Research and credits

For more information on this pattern, see these helpful links:

- https://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
- http://jessewarden.com/2017/11/easier-error-handling-using-asyncawait.html
- https://github.com/majgis/catchify
- https://github.com/scopsy/await-to-js
- https://medium.freecodecamp.org/avoiding-the-async-await-hell-c77a0fb71c4c
- https://medium.com/@dominic.mayers/async-await-without-promises-725e15e1b639
- https://medium.com/@dominic.mayers/on-one-hand-the-async-await-framework-avoid-the-use-of-callbacks-to-define-the-main-flow-in-812317d19285
- https://dev.to/sadarshannaiynar/capture-error-and-data-in-async-await-without-try-catch-1no2
- https://medium.com/@pyrolistical/the-hard-error-handling-case-made-easy-with-async-await-597fd4b908b1
- https://gist.github.com/woudsma/fe8598b1f41453208f0661f90ecdb98b

## Wrapping up

I hope you find this pattern useful and let me know if you have any other ideas on how to improve upon it!

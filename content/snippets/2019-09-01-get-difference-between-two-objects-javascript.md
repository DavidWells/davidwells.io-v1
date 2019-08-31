---
title: Get the difference between two objects in JavaScript
author: David Wells
date: 2019-09-01
layout: post
category: snippets
tags:
  - javascript
  - compare
---

Deeply calculate the difference between two objects.

This function deeply compares object values and returns the differences between the two objects.

This is quite handy for determining to do something if a value you care about in an object has changed.

```js
const { inspect } = require('util')
const transform = require('lodash.transform')
const isEqual = require('lodash.isequal')
const isArray = require('lodash.isarray')
const isObject = require('lodash.isobject')

/**
 * Find difference between two objects
 * @param  {object} origObj - Source object to compare newObj against
 * @param  {object} newObj  - New object with potential changes
 * @return {object} differences
 */
function difference(origObj, newObj) {
  function changes(newObj, origObj) {
    let arrayIndexCounter = 0
    return transform(newObj, function (result, value, key) {
      if (!isEqual(value, origObj[key])) {
        let resultKey = isArray(origObj) ? arrayIndexCounter++ : key
        result[resultKey] = (isObject(value) && isObject(origObj[key])) ? changes(value, origObj[key]) : value
      }
    })
  }
  return changes(newObj, origObj)
}

/* Usage */

const originalObject = {
  foo: 'bar',
  baz: 'fizz',
  cool: true,
  what: {
    one: 'one',
    two: 'two'
  },
  wow: {
    deep: {
      key: ['a', 'b', 'c'],
      values: '123'
    }
  },
  array: ['lol', 'hi', 'there']
}

const newObject = {
  foo: 'bar',
  baz: 'fizz',
  cool: false, // <-- diff
  what: {
    one: 'one',
    two: 'twox' // <-- diff
  },
  wow: {
    deep: {
      key: ['x', 'y', 'c'], // <-- diff
      values: '098' // <-- diff
    }
  },
  array: ['lol', 'hi', 'difference'] // <-- diff
}

// Get the Diff!
const diff = difference(originalObject, newObject)

console.log(inspect(diff, {showHidden: false, depth: null, colors: true}))
/* result:
{
  cool: false,
  what: { two: 'twox' },
  wow: { deep: { key: [ 'x', 'y' ], values: '098' } },
  array: [ 'difference' ]
}
*/

if (diff.cool) {
  console.log('Coolness changed to', diff.cool)
}
```

Combine with `deepmerge` if you want to merge the changes together.

```js
const merge = require('deepmerge')

const combinedObject = merge(originalObject, newObject)
```

If you are just looking for a deep equals check and don't care about what's different, use something like [fast-deep-equal](https://github.com/epoberezkin/fast-deep-equal).

**Happy coding!**

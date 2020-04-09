---
title: Flatten & unflatten javascript objects by path
author: David Wells
date: 2019-09-14
layout: post
category: snippets
tags:
  - javascript
  - compare
---

Convert a nested object into a flat structure. A.k.a Flatten an object by its keys. This is handy for fast object lookups by value path in certain scenarios.

```js
// Convert a nested object
{
  here: {
    is: 'my',
    object: 'with',
    stuff: 'in it'
  },
  containing: {
    many: ['things', 'inside'],
  }
}

// Into a flat structure
{
  here.is: "my"
  here.object: "with"
  here.stuff: "in it"
  containing.many[0]: "things"
  containing.many[1]: "inside"
}
```

Here is the code:

```js
function flatten(data) {
  const result = {}
  function recurse(cur, prop) {
    if (Object(cur) !== cur) {
      result[prop] = cur
    } else if (Array.isArray(cur)) {
      for (var i = 0, l = cur.length; i < l; i++) { // eslint-disable-line
        recurse(cur[i], `${prop}[${i}]`)
      }
      if (l == 0) { // eslint-disable-line
        result[prop] = []
      }
    } else {
      let isEmpty = true
      for (const p in cur) { // eslint-disable-line
        isEmpty = false
        recurse(cur[p], prop ? `${prop}.${p}` : p)
      }
      if (isEmpty && prop) {
        result[prop] = {}
      }
    }
  }
  recurse(data, '')
  return result
}

function unflatten(data) {
  if (Object(data) !== data || Array.isArray(data)) {
    return data
  }
  let regex = /\.?([^.\[\]]+)|\[(\d+)\]/g
  let resultholder = {}
  for (const p in data) {
    let cur = resultholder
    let prop = ''
    let m
    while (m = regex.exec(p)) { // eslint-disable-line
      // console.log('m[1]', m[1])
      // console.log('m[2]', m[2])
      // cur = cur[prop] || (cur[prop] = ((m[2] || !isNaN(m[1])) ? [] : {}))
      cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}))
      prop = m[2] || m[1]
      // remove placeholder
      prop = prop.replace(/XPERIOD/g, '.')
    }
    cur[prop] = data[p]
  }
  return resultholder[''] || resultholder
}


var object = {
 here: {
   is: 'my',
   object: 'with',
   stuff: 'in it'
 },
 containing: {
  many: ['things', 'inside'],
 }
}

var flat = flatten(object)
console.log('flat', flat)


var returnToObject = unflatten(flat)
console.log('returnToObject', returnToObject)
```

Let me know if you have a better way 😃

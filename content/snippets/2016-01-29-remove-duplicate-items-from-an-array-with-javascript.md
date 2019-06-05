---
title: Remove Duplicate Items from an Array with JavaScript
author: David Wells
date: 2016-01-29
layout: post
category: snippets
tags:
  - javascript
---

Have an array with duplicated you need to remove?

Array `filter` is your friend.

```js
var arrayWithDuplicates = ['hi', 'yo', 'whatup', 'bye', 'lol', 'yo', 'hi', 'bye'];
var deDupedArray = arrayWithDuplicates.filter(function (arrayItem, index) {
                       return arrayWithDuplicates.indexOf(arrayItem) === index;
                   });
console.log(deDupedArray); // ["hi", "yo", "whatup", "bye", "lol"]
```

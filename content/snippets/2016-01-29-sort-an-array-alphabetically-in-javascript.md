---
title: Sort an Array Alphabetically in Javascript
author: David Wells
date: 2016-01-29
layout: post
category: snippets
tags:
  - javascript
---

Sort items in an array alphabetically with Array `sort`

```js
var nonSortedArray = ['hi', 'yo', 'whatup', 'bye', 'lol'];
var sortedArray = nonSortedArray.sort(function (a, b) {
      if (a < b) return -1;
      else if (a > b) return 1;
      return 0;
    });
console.log(sortedArray); // ["bye", "hi", "lol", "whatup", "yo"]
```

Sort items in reverse alphabetical order like so:

```js
var nonSortedArray = ['hi', 'yo', 'whatup', 'bye', 'lol'];
var reverseSortedArray = nonSortedArray.sort(function (a, b) {
      if (a > b) return -1;
      else if (a < b) return 1;
      return 0;
    });
console.log(reverseSortedArray); // ["yo", "whatup", "lol", "hi", "bye"]
```

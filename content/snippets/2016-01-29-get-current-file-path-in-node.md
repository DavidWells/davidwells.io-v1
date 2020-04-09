---
title: Get Current File Path in Node.js
author: David Wells
date: 2016-01-29
layout: post
category: snippets
tags:
  - javascript
  - node
---

The `__filename` constant will print out the current file path in NodeJS

```js
console.log(__filename); // /location/on/computer/or/server/filename.js
```

More info on node globals can be found here: [Node Globals](https://nodejs.org/api/globals.html)

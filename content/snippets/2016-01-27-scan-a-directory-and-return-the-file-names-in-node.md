---
title: Scan a directory and return the file names in Node
author: David Wells
date: 2016-01-27
layout: post
category: snippets
tags:
  - javascript
  - node
---

This will scan a given directory and return a list of files in that directory.

```js
var fs = require('fs'); // core node file system module
var listOfFilesInDirectory = fs.readdirSync('path/to/directory').filter(function(x) {
  return x !== '.DS_Store' && x !== 'ignore-other-file.js';
});
```

I'm excluding files that match `.DS_Store` and `ignore-other-file.js`.

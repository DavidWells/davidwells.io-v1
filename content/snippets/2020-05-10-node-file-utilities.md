---
title: 'Promisified node.js file system utilities'
author: David Wells
date: 2020-05-10
layout: post
category: snippets
tags:
  - javascript
  - node
---

Node introduced the `promisify` utilities in back in version 8.

Using `promisify` you can use the node.js file system utilities with `async/await` and `promises.`

There are a couple bits missing from the core node.js filesystem.

Below is the promisified file system calls I use a bunch in projects.

I've added `createDir`, `fileExists`, and `deleteDir` to smooth over some of the core `fs` methods that can be a little awkward to work with.

```js
/* ./utils/fs.js */
const fs = require('fs')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')
const { promisify } = require('util')

const fileExists = (s) => new Promise(r => fs.access(s, fs.F_OK, e => r(!e)))

module.exports = {
  // Check if file exists
  fileExists: fileExists,
  // Read file
  readFile: promisify(fs.readFile),
  // Write file
  writeFile: promisify(fs.writeFile),
  // Copy file
  copyFile: promisify(fs.copyFile),
  // Recursively create directory
  createDir: mkdirp,
  // Read directory file names
  readDir: promisify(fs.readdir),
  // Recursively delete directory & contents
  deleteDir: promisify(rimraf),
}
```

Install `mkdirp` and `rimraf` npm packages for `deleteDir` & `createDir`

```
npm install mkdirp rimraf
```

Then you can use it in your project

```js
const path = require('path')
const { fileExists, readFile } = require('./utils/fs')

async function doIt(filePath) {
  const exists = await fileExists(filePath)  
  let contents
  if (exists) {
    contents = await readFile(filePath)
  }
  return contents
}

const file = path.resolve('foo-bar.json')
doIt(file).then((contents) => {
  console.log('Yay 🎉', contents)
})
```

Hope this helps!

Let me know if you have other file system utilities you like to use in the comments below.

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

// Recursive read dir
async function readDir(dir, allFiles = []) {
  const files = (await fs.readdir(dir)).map((file) => path.join(dir, file))
  allFiles.push(...files)
  await Promise.all(files.map(async (file) => (await fs.stat(file)).isDirectory() && readDir(file, allFiles)))
  return allFiles
}

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

  readDirResurvsive
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

## Update

Below is an example of using `require('fs').promises` instead of `promisify` from `utils.

```js
/* ./utils/fs.js */
const path = require('path')
const rimraf = require('rimraf')
const { promises, constants } = require('fs')
const { promisify } = require('util')

const fs = promises

const deleteDir = promisify(rimraf)

const deleteFile = (s) => fs.unlink(s).catch((e) => {
  if (e.code === 'ENOENT') return // ignore already deleted files
  throw e
})

const fileExists = (s) => fs.access(s, constants.F_OK).then(() => true).catch(() => false)

// Recursive read dir
async function readDir(dir, recursive = true, allFiles = []) {
  const files = (await fs.readdir(dir)).map((file) => path.join(dir, file))
  if (!recursive) return files
  allFiles.push(...files)
  await Promise.all(files.map(async (file) => {
    return (await fs.stat(file)).isDirectory() && readDirResurvsive(file, recursive, allFiles)
  }))
  return allFiles
}

async function createDir(directoryPath, recursive = true) {
  // ignore errors - throws if the path already exists
  return fs.mkdir(directoryPath, { recursive: recursive }).catch((e) => {})
}

async function copyDir(src, dest, recursive = true) {
  await createDir(dest, recursive) // Ensure directory exists

  const filePaths = await fs.readdir(src)
  await Promise.all(filePaths.map(async (item) => {
    const srcPath = path.join(src, item)
    const destPath = path.join(dest, item)
    const itemStat = await fs.lstat(srcPath)

    if (itemStat.isFile()) {
      return fs.copyFile(srcPath, destPath)
    }
    // Return early if recursive false
    if (!recursive) return
    // Copy child directory
    return copyDir(srcPath, destPath, recursive)
  }))
}

module.exports = {
  // Check if file exists
  fileExists: fileExists,
  // Write file
  writeFile: fs.writeFile,
  // Read file
  readFile: fs.readFile,
  // Copy file
  copyFile: fs.copyFile,
  // Delete file
  deleteFile: deleteFile,
  // Check if directory exists
  directoryExists: fileExists,
  // Recursively create directory
  createDir: createDir,
  // Recursively get file names in dir
  readDir: readDir,
  // Recursively copy directory
  copyDir: copyDir,
  // Recursively delete directory & contents
  deleteDir: deleteDir,
}
```

Let me know if you have other file system utilities you like to use in the comments below.

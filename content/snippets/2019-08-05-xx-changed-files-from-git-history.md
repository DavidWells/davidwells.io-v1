---
title: Get files changed from Git history
author: David Wells
date: 2019-08-05
layout: post
category: snippets
#tags:
#  - git
#  - github
#  - ci
#  - devops
---


```js
const execa = require('execa')

function getChangedFiles() {
  let data
  try {
    data = await execa.command('git diff --name-only')
  } catch (e) {
    console.log(e)
  }
  if (!data.stdout) {
    return
  }
  const changedFiles = data.stdout.split('\n').map((file) => {
    return {
      path: file,
      fullPath: path.resolve(file)
    }
  })
  console.log('changedFiles', changedFiles)
  return changedFiles
}

```


For a more robust module checkout [run-if-diff](https://github.com/jameslnewell/run-if-diff)

---
title: Find all Javascript files in a project & count line numbers
author: David Wells
date: 2016-05-15
layout: post
category: snippets
tags:
  - bash
  - cli
---

Find all javascript files in a project, excluding `node_modules` and output their line number length

Useful for seeing what files might need refactoring.

```bash
# javascript-line-length.sh
find ./ -type f -name "*.js" -not -path "*/node_modules/*" -print0 | xargs -0 wc -l | sort -n >> files.txt | echo 'Done. See files.txt for stats'
```

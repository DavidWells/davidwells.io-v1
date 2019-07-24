---
title: Regex pattern to match markdown links
author: David Wells
date: 2019-07-24
layout: post
category: snippets
tags:
  - markdown
  - javascript
  - regex
---

Here is a handy regex for parsing markdown links.

Markdown links look likes

```md
[View the analytics docs](https://getanalytics.io/)
```

Quite often we need to render out the links from these, like in a [gatbsy site](https://getanalytics.io/)

To parse markdown links programmatically with a regular expression you can use this pattern:

```js
const regex = /^\[([\w\s\d]+)\]\((https?:\/\/[\w\d./?=#]+)\)$/

const string = "[View the analytics docs](https://getanalytics.io/)"

const myMatch = string.match(regex)

console.log(myMatch)
/* ["[View the analytics docs](https://getanalytics.io/)", "View the analytics docs", "https://getanalytics.io/", index: 0, input: "[View the analytics docs](https://getanalytics.io/)", groups: undefined] */

// de-structure the array
const [ full, text, url ] = myMatch

console.log(text)
// View the analytics docs

console.log(url)
// https://getanalytics.io/
```

See the demo on [regex101](https://regex101.com/r/m9dndl/1)

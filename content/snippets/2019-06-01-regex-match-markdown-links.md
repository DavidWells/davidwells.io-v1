---
title: Regex to match markdown links
author: David Wells
date: 2019-06-01
layout: post
category: snippets
tags:
  - javascript
  - regex
---

Handy little regular expression to parse links from markdown files.

Background: Markdown links look like:

```md
[View the analytics docs](https://getanalytics.io/)
```

Quite often we need to render out the links from these, like in a [gatsby site](https://getanalytics.io/)

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

## Parsing all links out of file

```js
var regexMdLinks = /\[([^\[]+)\](\(.*\))/gm
var mdContents = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit..

[hello link](/admin/table_edit/table_edit.cfm?action=edit&table_name=organizationsXcategories)

Lorem ipsum dolor sit amet, consectetur adipiscing elit..

[otherLink](https://google.com)

Lorem ipsum dolor sit amet, consectetur adipiscing elit..

[third link](https://google.com)
`

var matches = mdContents.match(regexMdLinks)
console.log('links', matches)

var singleMatch = /\[([^\[]+)\]\((.*)\)/
for (var i = 0; i < matches.length; i++) {
  var text = singleMatch.exec(matches[i])
  console.log('Link #' + i, text)
}
```

Comment below if you have any questions or updates to this snippet!

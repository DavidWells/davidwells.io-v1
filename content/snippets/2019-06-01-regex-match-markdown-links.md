---
title: Regex to match markdown links
author: David Wells
date: 2019-06-01
layout: post
category: "Snippets"
tags:
  - javascript
  - regex
---

Handy little regular expression to parse links from markdown files.

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

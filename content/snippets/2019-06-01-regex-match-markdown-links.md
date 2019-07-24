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

Links in markdown look like this:

```md
[View the analytics docs](https://getanalytics.io/)
```

To parse `.md` links programmatically with a regular expression use this pattern:

```js
/* Match only links that are fully qualified with https */
const fullLinkOnlyRegex = /^\[([\w\s\d]+)\]\((https?:\/\/[\w\d./?=#]+)\)$/

/* Match full links and relative paths */
const regex = /^\[([\w\s\d]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#]+)\)$/

const string = "[View the analytics docs](https://getanalytics.io/)"

const myMatch = string.match(regex)

console.log(myMatch)
/* ["[View the analytics docs](https://getanalytics.io/)", "View the analytics docs", "https://getanalytics.io/", index: 0, input: "[View the analytics docs](https://getanalytics.io/)", groups: undefined] */

// de-structure the array
const [ full, text, url ] = myMatch

console.log(text)
// 'View the analytics docs'

console.log(url)
// 'https://getanalytics.io/'
```

See the demo on [regex101](https://regex101.com/r/m9dndl/1)

## Parsing all links out of file

To grab all the links of of a file, you can use this:

```js
const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm

// Example md file contents
const mdContents = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit..

[hello link](/admin/table_edit/table_edit.cfm?action=edit&table_name=organizationsXcategories)

Lorem ipsum dolor sit amet, consectetur adipiscing elit..

[otherLink](https://google.com)

Lorem ipsum dolor sit amet, consectetur adipiscing elit..

[third link](https://google.com)
`

const matches = mdContents.match(regexMdLinks)
console.log('links', matches)

const singleMatch = /\[([^\[]+)\]\((.*)\)/
for (var i = 0; i < matches.length; i++) {
  var text = singleMatch.exec(matches[i])
  console.log(`Match #${i}:`, text)
  console.log(`Word  #${i}: ${text[1]}`)
  console.log(`Link  #${i}: ${text[2]}`)
}
```

Comment below if you have any questions or updates to this snippet!

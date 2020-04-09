---
title: 'Regex Pattern: Match outer single & double quote pairs'
author: David Wells
date: 2019-09-15
layout: post
category: snippets
tags:
  - javascript
  - regex
---

Here are a couple regular expressions for matching quote pairs in a string.

This pattern can be quite handy for attempting to fix malformed JSON.

## Match outer `'` single quotes

Matching all outer **single** quotes in a given string:

```js
/(?:')(?=(?:[^']|'[^]*')*$)/g
```

Given this string:

```
this is my string 'foo bar 'baz lol hi'
```

The regex will only match `'foo` + `hi'` & ignore the inner quote in `'baz` (minus the words of course)

This is quite handy for trying to fix malformed JSON that contains single `'` vs the required double `"`

```js
const matchSingleQuotesRegex = /(?:')(?=(?:[^']|'[^]*')*$)/g

const malformedJSON = `{'lol': 'wh'atevr'}`

const fixedJSON = malformedJSON.replace(matchSingleQuotesRegex, '"')
console.log(fixedJSON)
/* Yay fixed */
// {"lol": "wh'atevr"}
```

[Try it yourself](https://regex101.com/r/BdU2nF/1)

## Match outer  `"` double quotes

Matching all outer **double** quotes in a given string:

```js
/(?:")(?=(?:[^"]|"[^]*")*$)/g
```

Given this string:

```
this is my string "with stuff " in quotes"
```

The regex will only match `"with` + `quotes"` & ignore the inner quote in `stuff " in`.

Usage in code:

```js
const matchDoubleQuotesRegex = /(?:")(?=(?:[^"]|"[^]*")*$)/g

const original = `
newX {"lol": "whatevr"}
str {"lol": "hey"'there"}
`

const newStringWithSingleQuotes = original.replace(matchDoubleQuotesRegex, "'")
console.log(newStringWithSingleQuotes)
/*
newX {'lol': 'whatevr'}
str {'lol': 'hey"'there'}
*/
```

[Try it yourself](https://regex101.com/r/fpgWmW/1)


## Match everying inside outer quotes

```js
/'[^\\']*(\\'[^\\']*)*'/g
```


https://regex101.com/r/WWrRQF/1

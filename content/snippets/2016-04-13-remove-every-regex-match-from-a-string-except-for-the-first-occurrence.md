---
title: Remove every regex match from a string except for the first occurrence with JavaScript
author: David Wells
date: 2016-04-13
layout: post
category: snippets
tags:
  - javascript
  - regex
---

Remove every regular expression match from a string except for the first occurrence.

This is handy for removing or replacing matches in a string after the first one.

```js
function removeDuplicateRegexMatchesExceptFirst (string, regex) {
  var count = 0
  var replaceWith = ''
  return string.replace(regex, function (match) {
    count++
    if (count === 1) {
      return match
    } else {
      return replaceWith
    }
  })
}

var string = 'Button__button___2a549 myprefix-action-button-component Button__action___3EoEX myprefix-button-component'
var regex = /myprefix-[a-zA-Z0-9-]*-component/gm
removeDuplicateRegexMatchesExceptFirst(string, regex)
// "Button__button___2a549 myprefix-action-button-component Button__action___3EoEX "
```

Regex for the win!

---
title: Convert Number to Comma Separated Thousands String
author: David Wells
date: 2016-03-15
layout: post
category: snippets
tags:
  - javascript
---

Handy little function to turn large numbers into a more human readable format

```js
function insertCommasInNumber(number) {
  var num = Math.abs(number)
  var prefix = (number < 0) ? '-' : ''
  var output = ''
  var chars = String(num).split('').reverse()
  var commas = Math.floor((chars.length - 1) / 3)

  for (var i = 0; i < commas; i++) {
    output = output + chars.slice(0, 3).join('') + ','
    chars = chars.slice(3)
  }

  output = output + chars.join('')
  return prefix + output.split('').reverse().join('')
}

insertCommasInNumber(10000000); // 10,000,000
```

---
title: Set visible text color based on a dynamic background color
author: David Wells
date: 2016-07-01
layout: post
category: snippets
tags:
  - javascript
  - node
---

This will test the contrast of the background color to determine what text color to use.

This is handy for changing text colors for stuff with dynamic background colors so the text will always be readable.

Example: if the background is black, make the text light so it's visible.

Example2: if the background is white, make the text dark so it's visible.

```js
var contrast = require('contrast')
// set correct text color based on background color
function setVisibleTextColor(bgColor) {
  var textColor = '#000' // default
  if (contrast(bgColor) === 'light') {
    textColor = '#000' // make text color black so it's visible on light BG
  } else if (contrast(bgColor) === 'dark') {
    textColor = '#fff' // make text color white so it's visible on dark BG
  }
  return textColor
}

var textColor = setVisibleTextColor('#333') // it's dark, text color will be #fff
```

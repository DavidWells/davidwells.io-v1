---
title: Pixel Perfect Custom Fonts with CSS
author: David Wells
date: 2016-04-01
layout: post
category: snippets
tags:
  - css
---

Sometimes when using custom fonts, they don't quite render correctly in the browser.

Adding these css properties will fix that in chrome and firefox. In the future hopefully [font smooth](https://www.w3.org/TR/css-fonts-3/#font-smooth-prop) will solve this for us

```css
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

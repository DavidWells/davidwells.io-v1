---
title: 'Calm.js & Form Validation for Angry, Irate, Shouting People'
author: David Wells
date: 2015-04-04 01:13:26
layout: post
category: dev
tags:
  - frontend
  - projects
---
Just whipped together <a href="https://github.com/DavidWells/calm.js">calm.js</a>

It primary use is to check if people are typing in a civilized calm fashion.

It will check for people abusing capslock and validate the text. Are they calm or not?

Handy for making your support system nicer, or toss it on your comments form to teach people manners.

```js
// real world example:
var isNegativeNancy = isCalm("I AM TALKING LIKE AN ANGRY PERSON");
if (isNegativeNancy) {
  alert("WOAH CHILL OUT MAN");
}
```

## Install

```bash
npm install calm.js
```

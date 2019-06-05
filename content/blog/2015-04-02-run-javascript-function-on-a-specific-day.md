---
title: How to run JavaScript function on a specific day of the year
author: David Wells
date: 2015-04-02 21:08:24
layout: post
category: snippets
permalink: >
  http://davidwells.io/run-javascript-function-on-a-specific-day/
---

This snippet will run a specific function on April 1st. AKA april fools day.

Make sure you incorporate it into your site and replace all your site links with links to the rick roll video!

```js
/* Check if it is april fools day */
var aprilFools = {
  month: 3,
  date: 1
}

function isItAprilFoolDay() {
  var now = new Date();
  return (now.getMonth() == aprilFools.month && now.getDate() == aprilFools.date);
}

if(isItAprilFoolDay()){
  // fuck with people
} else {
  // there is less fake stuff today
}
```

[Link to gist](https://gist.github.com/DavidWells/10708a5be3e5b5e29f13)

---
title: Loop up through DOM node parents and look for a matches
author: David Wells
date: 2016-04-26
layout: post
category: snippets
tags:
  - javascript
---

Sometimes you need to grab a specific DOM node from an event or third party function but are not able to grab the element using it's class or ID because there could be multiple copies of the node on the page.

For example, if you have a variable number of charts on a page, you can't simply look for `document.querySelectorAll('.chart')` because there could be many and you won't know which order they render in.

So we need to loop up through parentNodes to find our exact dom node.

This script will loop up through it's parent nodes until it finds a matching class or it will find nothing and return `null`

```js
function findMatchingParentNode (element) {
  while (element) {
    // if target is DOCUMENT_NODE bail
    if(element.nodeType === 9) {
      return null
    }
    // In this instance I am looking up matching classes but you can check for whatever
    var classes = element && element.getAttribute("class")
    // look for my matching class of 'this-is-my-non-unique-class'
    if (classes && classes.indexOf('this-is-my-non-unique-class') > -1) {
      // Its a match! give me back the element
      return element
    }
    // not found yet, reset element to it's parent and look there
    element = element.parentNode
  }
  return true
}
```

I needed this for some D3 charting stuff I've been working on to reposition a tooltip dynamically and I needed parent chart node's width.

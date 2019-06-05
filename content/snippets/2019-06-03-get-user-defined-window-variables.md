---
title: Get user defined window global variables with javascript
author: David Wells
date: 2019-06-03
layout: post
category: snippets
tags:
  - javascript
  - script
---

This snippet will return user defined properties on the window object.

This is useful for seeing what globals are being exposed to the window.

It works by creating an iframe and comparing the window element of the empty iframe.

```js
function getWindowVars() {
  // create an iframe and append to body to load a clean window object
  const iframe = document.createElement('iframe')
  // hide iframe
  iframe.style.display = 'none'
  // add iframe to page
  document.body.appendChild(iframe)

  // get the current list of properties on window
  const currentWindow = Object.getOwnPropertyNames(window)

  // filter the list against the properties that exist in the clean window
  const results = currentWindow.filter(function(prop) {
    return !iframe.contentWindow.hasOwnProperty(prop);
  })

  // Clean up iframe
  document.body.removeChild(iframe)

  return results
}

// usage:
const userDefinedVars = getWindowVars()
console.log(userDefinedVars)
```

For example you might want to see if browser extensions are polluting the global window or what analytics tools a site has installed.

---
title: Generate DOM Fragments with JavaScript
author: David Wells
date: 2016-04-12
layout: post
category: snippets
tags:
  - javascript
---

[XT.js](https://gist.github.com/plugnburn/07c383da5f151a54d0b2) is a crazy small script to generate DOM fragments

```js
// XT.js source
(function(d) {
  function nodeRender (tplArr, parent, k, o) {
    for (;(o=tplArr.shift())!=null;) {
      if (''+o === o || +o === o) // scalar
        parent.appendChild(d.createTextNode(o))
      else if (''+o === '[object Object]') // object
        for (k in o) parent.setAttribute(k, o[k])
      else { // array
        nodeRender(o, k = d.createElement(o.shift()))
        parent.appendChild(k)
      }
    }
  }
  // assign function to window
  window.XT = function (tplArr, docFrag) {
    nodeRender(tplArr.slice(), docFrag = d.createDocumentFragment())
    return docFrag
  }
})(document)
```

Usage:

```js
var div = XT([
    ['div', {'data-attr1': 23},
        ['a', {href: 'http://example.com'}, 'Example text',
            ['span', ' (additional span)']
        ]
    ]
])
// append div to body
document.body.appendChild(div);
```

Very cool script when you need some DOM nodes on the fly

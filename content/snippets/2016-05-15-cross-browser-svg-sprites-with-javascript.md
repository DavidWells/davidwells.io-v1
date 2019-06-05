---
title: Cross Browser SVG Sprites with JavaScript
author: David Wells
date: 2016-05-15
layout: post
category: snippets
tags:
  - javascript
  - svg
---

Inline SVGs are great for icons in your applications.

They much smaller than font icons and far more accessible.

This snippet will create an SVG sprite from a string.

It will let you avoid dealing with CORS/Browser security issues with SVGs serving from different domains.

It also means you won't need to ajax your sprite into the page after it loads.

```js
function createSVGSprite(svgString){
  // create SVG
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  // set namespaces
  svg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink')
  svg.setAttribute('width', '0')
  svg.setAttribute('height', '0')
  svg.setAttribute('style', 'display: none')
  // Create a dummy div
  var div = document.createElement('div');
  // Wrap the svg string to a svg object (string)
  var svgfragment = '<svg>' + svgString + '</svg>'
  // Add fragment to the div
  div.innerHTML = '' + svgfragment
  // Splice the children of the SVG and append into the real SVG
  Array.prototype.slice.call(div.childNodes[0].childNodes).forEach(function (el) {
      svg.appendChild(el)
  });
  return svg
}

/* usage: */
// stringified SVG
var svgPathString = "<svg style=\"position:absolute; width: 0; height: 0\"><symbol viewBox=\"0 0 26 26\" id=\"back\"><path d=\"M23.954 14H5.144l5.6 8h-2.44l-6.302-9 6.301-9h2.442l-5.601 8h18.81a11.121 11.121 0 0 1 0 2z\"></path></symbol></svg>"
// create sprite
var svg = createSVGSprite(svgPathString)
// insert sprite into the DOM
document.body.appendChild(svg)
```

```html
<!-- in your html reference the symbol with the id 'back' -->
<svg>
  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#back"></use>
</svg>
```

# Demo

<p data-height="265" data-theme-id="0" data-slug-hash="gryPYL" data-default-tab="js,result" data-user="DavidWells" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/DavidWells/pen/gryPYL/">Cross Browser SVG Sprites</a> by David Wells (<a href="http://codepen.io/DavidWells">@DavidWells</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

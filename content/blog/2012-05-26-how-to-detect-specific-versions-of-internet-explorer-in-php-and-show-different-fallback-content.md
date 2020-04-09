---
title: How to Detect Specific Versions of Internet Explorer in PHP and Show Different Fallback Content
author: David Wells
date: 2012-05-26 02:01:33
layout: post
category: dev
permalink: >
  http://davidwells.io/how-to-detect-specific-versions-of-internet-explorer-in-php-and-show-different-fallback-content/
---

I needed to detect the specific version of IE people were using for a specific tool I'm building.

The javascript I'm using, <a href="http://popcornjs.org/documentation">popcorn.js</a>, doesn't work in internet explorer 8, 7, and 6. (sad face)

I found a number of different snippets out there to detect if they were using Internet Explorer but nothing that let you see what specific version the visitor was using.

So I put this together. Here is a the script:

```php
<?php $IE6 = (ereg('MSIE 6',$_SERVER['HTTP_USER_AGENT'])) ? true : false;
    $IE7 = (ereg('MSIE 7',$_SERVER['HTTP_USER_AGENT'])) ? true : false;
    $IE8 = (ereg('MSIE 8',$_SERVER['HTTP_USER_AGENT'])) ? true : false;

if (($IE6 == 1) || ($IE7 == 1) || ($IE8 == 1)) {
 // Do fallback stuff that old browsers can do here
   echo "Shit its ie!";

} else { ?>
// do stuff that real browsers can handle here
<?php } ?>
```

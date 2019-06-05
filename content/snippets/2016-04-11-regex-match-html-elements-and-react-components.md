---
title: Regex to match HTML elements & React Components including attributes
author: David Wells
date: 2016-04-11
layout: post
category: snippets
tags:
  - javascript
  - regex
---

Handy little regular expression to parse HTML content and return all the tags from the string.

The loop below will run through all the matched HTML tags (or React components) and output an array with the `match` in index0, the `tagname` in index1, and the `attributes` at index2 and the `innerHTML` at index3.

I've modified the regular expression to accept capitalised Elements for usage with React components as well.

```js
  var regexAllTags = /<([a-zA-Z1-6]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)/gim
  var html = '<h3 class="any" id="hey">Test</h3> raw text here <a href="http://google.com">hehe</a><Button onClick={this.handleClick}>React Button</Button>'

  var htmlTags = html.match(regexAllTags)
  // ["<h3 class="any" id="hey">Test</h3>", "<a href="http://google.com">hehe</a>"]

  var regexSingleTag = /<([a-zA-Z1-6]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)/
  for (var i = 0; i < htmlTags.length; i++) {
    var text = regexSingleTag.exec(htmlTags[i])
    console.log('Tag #' + i, text)
  }
  // Tag #0 ["<h3 class="any" id="hey">Test</h3>", "h3", " class="any" id="hey"", "Test", index: 0, input: "<h3 class="any" id="hey">Test</h3>"]
  // Tag #1 ["<a href="http://google.com">hehe</a>", "a", " href="http://google.com"", "hehe", index: 0, input: "<a href="http://google.com">hehe</a>"]
  // Tag #2 ["<Button onClick={this.handleClick}>React Button</Button>", "Button", " onClick={this.handleClick}", "React Button", index: 0, input: "<Button onClick={this.handleClick}>React Button</Button>"]

```

Works for most cases I have tested.

Comment below if you have any questions or updates to this snippet!

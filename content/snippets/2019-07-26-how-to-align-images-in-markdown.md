---
title: How to align images in markdown
author: David Wells
date: 2019-07-26
layout: post
category: snippets
tags:
  - markdown
  - github
---

Markdown is awesome. It's a fantastic way to write content quickly without the overhead of formatting with a WYSIWYG editor. If you are unfamiliar with `.md` files checkout the basics [here](https://guides.github.com/features/mastering-markdown/) & [here](https://daringfireball.net/projects/markdown/).

Writing text in markdown is super quick and easy, but **what about aligning images**?

Read on to learn how! The full code can be found in this [github gist](https://gist.github.com/DavidWells/7d2e0e1bc78f4ac59a123ddf8b74932d/)

# Image alignment in markdown

Normal markdown image tags don't allow for any alignment properties and thats a bummer when you are trying to make your `README.md` file pretty on github.

```md
<!-- No alignment options -->
![GitHub Logo](/images/logo.png)
```

Luckily, we can use `html` image tags to make enhance our docs.

```html
<!-- Alignment options!!!!! -->
<img align="left" width="100" height="100" src="http://www.fillmurray.com/100/100">
```

## Left alignment

This is the code you need to align images to the left:

```html
<img align="left" width="100" height="100" src="http://www.fillmurray.com/100/100">
```

## Right alignment

This is the code you need to align images to the right:

```html
<img align="right" width="100" height="100" src="http://www.fillmurray.com/100/100">
```

## Center alignment example

Wrap images in a `p` or `div` to center.

```html
<p align="center">
  <img width="460" height="300" src="http://www.fillmurray.com/460/300">
</p>
```

## Markdown Formatting on steroids

If you like this, you might enjoy [markdown-magic](https://github.com/davidwells/markdown-magic). I built it to automatically format markdown files and allow folks to sync docs/code/data from external sources.

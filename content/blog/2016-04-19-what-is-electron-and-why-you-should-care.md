---
title: 'What is Electron & What can developers do with it?'
author: DavidWells
date: 2016-04-19 06:50:28
layout: post
category: dev
tags:
  - electron
  - desktop
---

Quite simply put, Electron is a way for developers to use HTML, CSS, and JS to create cross-platform (Mac, PC, & Linux) desktop applications.

But it's much much more than this.

To me, Electron opens the door to building applications where the browser falls short.

Electron gives you access to everything you are used to in the browser AND grants access to the lower level operating system through NodeJS.

#  Why it matters

<img src="https://s3-us-west-2.amazonaws.com/assets.davidwells.io/legacy/2016/04/IMG_2864-300x300.jpg" alt="electron desktop" width="300" height="300" class="right size-medium wp-image-5244" />Electron grants some serious power that the browser simply will not provide.

There are certain limitations a browser has due to security concerns. Imagine any website having read/write/delete access on your machine. That would be bad news bears.

Electron marries the browser with your system's Node instance and gives you, the developer, some pretty powerful tools to create fantastic app experiences.

#  Use cases
Don't like your browser? Build a new one like [brave](http://brave.com)

Don't like your git client? Build a new one.

Don't like your text editor? Build a new one.

Need nontechnical folk to use your CLI tool? Build a GUI on top of it with Electron.

**The possibilities are endless.**

- Read/write files
- run custom binaries
- run shell scripts
- run AppleScripts
- ... you get the idea

# An example app

I've been working on some electron applications recently, and I am insanely impressed with how straightforward it is to use coming from a web and node background.

I needed a [video picture in picture app](https://github.com/DavidWells/video-app) that stays on top of all windows for some video tutorials I am creating.

So I [built it](https://github.com/DavidWells/video-app)!

The final app is around 100 lines of code.

[10 lines of React](https://github.com/DavidWells/video-app/blob/master/app/app.jsx) to render the built-in browser webcam.

[100ish lines for running the main electron process & window](https://github.com/DavidWells/video-app/blob/master/index.js#L102) (which could be smaller but I left some comments in there for teaching others some electron goodies.)

[and the index.html file](https://github.com/DavidWells/video-app/blob/master/dev.html) which loads the React App and runs the webcam script

Clone it down, `npm install`, and `npm start` to run it!

If you'd like to build the actual application run `npm run build`

<img src="https://s3-us-west-2.amazonaws.com/assets.davidwells.io/legacy/2016/04/video-app.jpg" alt="video-app" width="625" height="400" class="aligncenter size-full wp-image-5243" />

----

# What will you build?

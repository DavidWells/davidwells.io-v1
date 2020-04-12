---
title: 'React, the UI library that renders everywhere*'
author: DavidWells
date: 2016-05-02 08:52:39
layout: post
category: dev
tags:
  - "frontend"
  - react
---

<img src="https://s3-us-west-2.amazonaws.com/assets.davidwells.io/legacy/2016/04/React-JS-150x150.png" alt="React-JS" width="150" height="150" class="right size-thumbnail wp-image-5265" />React is pretty amazing.

It's a great way to create declarative easy to understand user interfaces.

It's pretty easy to learn with very little DSL (domain-specific language) and a [tiny API surface](https://facebook.github.io/react/docs/component-specs.html).

That's all well and good but, what makes React very interesting and **insanely** compelling is its ability to render outside of the DOM.

# What does this mean for frontend developers?

Well, for starters, if you know JavaScript, you can now build native iOS and Android applications.

You are no longer bound to the browser. You no longer need to support IE8 (well, no promises there).

So, scratch-off "web developer" from your resume and replace it with **DEVELOPER GOD**

# Where can React render?

Thanks to the hard work of the community, and the foresight of the React core team, a huge amount of React render targets (or bridges) exist:

1. [DOM](http://facebook.github.io/react/)
1. [Desktop](http://electron.atom.io/)
1. [iOS](https://facebook.github.io/react-native/)
1. [Android](https://facebook.github.io/react-native/docs/android-setup.html)
1. [Canvas](https://github.com/Flipboard/react-canvas)
1. [WebGL](https://github.com/Izzimach/react-pixi)
1. [WebVR](https://github.com/clayallsopp/react-vr)
1. [Watches](https://github.com/garbles/react-pebble-demo)
1. [TVs](https://www.youtube.com/watch?v=eNC0mRYGWgc)
1. [Hardware](http://iamdustan.com/2015/12/16/react-hardware/)
1. [Terminal](https://github.com/Yomguithereal/react-blessed#demo)
1. [ART Drawing Library](https://github.com/reactjs/react-art)
1. [DOM, but using Web Workers](https://github.com/web-perf/react-worker-dom)
1. [Windows Desktop and mobile phones](https://github.com/ReactWindows/react-native-windows)
1. Children's Coloring books... (ok this one is fake)

# Disclaimer

This doesn't mean you will necessarily be able to write one code base and have it run on all of these targets.

**Bummer dude!**

But it does allow for code sharing across platforms.  

**Awesome man!**

Check out some [open source react-native projects](https://react.rocks/tag/ReactNative) for how they handle this.

# Did I miss any bridges?

If you know of any other React bridges, let me know in the comments below, and I can add them to the list.

Happy coding!

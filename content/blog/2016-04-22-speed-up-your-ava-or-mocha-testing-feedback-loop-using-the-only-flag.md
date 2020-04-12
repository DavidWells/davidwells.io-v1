---
title: Speed up your AVA (or Mocha) testing feedback loop using the .only flag
author: DavidWells
date: 2016-04-22 06:30:26
layout: post
category: dev
tags:
  - tools
  - testing
---

Setting up testing and debugging testing can be a real pain in the keister.

As the number of tests you have starts to grow, things get slower and it can be hard to debug certain tests because your terminal output is rather large.

To help mitigate slow tests and speed up your feedback/debug loop simply run the `.only` flag on your test.

This is a quick tip for the [AVA](https://github.com/sindresorhus/ava) test runner. (it will also work if you are using mocha for testing)

By using the `.only` flag on your tests you tell it to ignore all other tests and just run that single test instance.

This is handy for debugging objects and expected values that you are writing your assertions on.

```js
// HoverContent.spec.js
import React from 'react' // dope frontend library
import test from 'ava' // awesome test runner
import HoverContent from './HoverContent' // react component
import { mount, shallow } from 'enzyme' // great react testing helper lib

// this test won't run because .only is used on the test below
test('HoverContent is <div> tag', (t) => {
  var hovercontent = shallow(<HoverContent />)
  t.is(hovercontent.type(), 'div')
})

// this test will be the .only one to run! Huzzah!
test.only('shows content on mouseEnter', (t) => {
  const wrapper = mount(
    <HoverContent content={<span>content here</span>}>
       Visible before hover
    </HoverContent>
  )
  console.log('what the heck is in this', wrapper)
  wrapper.simulate('mouseenter')
  t.true(wrapper.state('visible') === true)
})
```

https://www.youtube.com/watch?v=tAymDbi7HSw

[Information on how to using .only with mocha](http://jaketrent.com/post/run-single-mocha-test/)

Hope this helps you! Happy testing!

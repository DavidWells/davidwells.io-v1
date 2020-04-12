---
title: React PropType Best Practices
author: DavidWells
date: 2016-05-06 06:00:14
layout: post
category: dev
tags:
  - "react"
---

**Preface:** This is an opinionated guide on creating a clear and concise API for people consuming your React Components.

AKA **PropTypes conventions**.

These conventions have served me well, and I hope they help you.

1. Keep things minimal
2. Mirror DOM where possible
3. Follow Good Naming Conventions
4. Add JSDoc Comments above propTypes
5. Avoid Prop Sprawl
6. No unnecessary abstractions

## 1. Minimalism FTW

Keep propTypes as minimal as possible.

```
// bad
longAssPropNameThatEveryoneMustTypeForever

// good
propName
```

Long, long prop names are bad news.

Try and make props as minimal as possible **while still retaining semantic meaning**

Don't make things short for the sake of making things short.

The prop should still convey meaning to the consumer of the component.

```
// Bad
p

// Good
profileData
```

# 2. Mirror DOM wherever possible

Listen, buddy, React doesn't give you a license to reinvent the DOM API.

If your prop is applying directly down to a native DOM API, call it with the same API.

This will help new users of your component not to wonder, "WTF does this prop do?" they will know because they know HTML.

```
// Bad
themeType
// Good
className

// Bad
whenClicked
// Good
onClick
```

This one might be controversial, but my reasoning here is that far more developers are familiar with DOM than with native iOS/Andriod/Whatever conventions.

This means more folks will be able to grok what the component props are doing without fumbling through your docs (if you have docs)

# 3. PropType naming conventions

`camelCase` your propTypes. Many camels died to give you their case. Use it.

For boolean props, use **is**Open, **has**Value, **can**Execute etc.

```pseudo
// Bad
loading
// Good
isLoading
```

For function props, use **on**Click, or **on**CustomEventName.

For custom events being fired use on prefix and use a descriptive name for what is happening under the hood. Inside the component, `onCustomEventName` should have a matching `handleCustomEventName` like:

```js
// inside the component Class
handleCustomEventName () {
  const { onCustomEventName } = this.props
  if (onCustomEventName) {
    onCustomEventName()
  }
}
```

For array props, use plurals.

```pseudo
// Bad
list
// Good
items
```

# 4. Add comments

By adding comments above prop types, you achieve two things.

1. You give people looking at your source more context on what the prop controls
2. You can now [automagically generate documentation](https://github.com/reactjs/react-docgen) from your src.

This is a no brainer. Automatic doc generation FTW.

# 5. Avoid Prop Sprawl

When creating configurable components, a natural gut reaction is to expose all the things!

<img src="https://s3-us-west-2.amazonaws.com/assets.davidwells.io/legacy/2016/05/props.jpg" alt="props" width="400" height="300" class="aligncenter size-full wp-image-5272" />

However, **I must warn you:**

Once you expose props, you can't ever remove them in a backward-compatible way. You will need to support and map deprecated props to new ones or risk breaking consumer's UIs.

Only add props for use cases that exist today (and those that are right around the corner)

If you allow for sprawl to occur, your component API will be massive, and the consumer of the component will need to read your "prop manual" every time they use it.

Be diligent around this one.

# 6. Avoid Unnecessary Abstractions

When wrapping third party libraries (like charts, maps, SDKs, etc.) in React components, try your hardest not to write new prop abstractions.

If the third party library has a standard API and heaps of documentation, why reinvent the wheel?

Leverage the already written documentation and examples so you don't need to create and maintain your 'better' abstraction.

**Take this one with a grain of salt.**

There are use cases where you DO, in fact, want to limit the underlying libraries' functionality or remap some of the underlying API with more convenient props.

But remember:

> There is nothing so useless as doing efficiently that which should not be done at all.
> – Peter Drucker

Don't try and reinvent conventions and make people learn your newly invented DSL.

Keep things simple!

# An Example Component

```js
// Clean Prop Types Example
import React, { PropTypes, Component } from 'react'

class MyRadComponent extends Component {
  static propTypes = {
    /** @type {string} this does XYZ */
    propName: PropTypes.string, // simple
    /** @type {object} This is the profile data containing user data */
    profileData: PropTypes.object, // nice!
    /** @type {bool} If true, the component should be in a loading state */
    isLoading: PropTypes.bool, // looks like a bool to me!
    /** @type {array} items being passed in as an array */
    items: PropTypes.array, // it's plural, looks like an array
    /** @type {function} Function triggered when component is clicked */
    onClick: PropTypes.function, // on nice, this is DOM. I know this
    /** @type {function} Function triggered when CustomAction fired inside component */
    onCustomAction: PropTypes.function, // looks like a custom event that takes a handler!
  }
  constructor (props, context) {
    super(props, context)
    this.handleOnClick = this.handleOnClick.bind(this)
  }
  handleOnClick(e) {
    const { onClick } = this.prop
    onClick && onClick(e)
  }
  render () {
    <div onClick={handleOnClick}>
      Wow nice component dude!
      {/* Do other stuff */}
    </div>
  }
}
```

# Happy Component Building!

Do you have any other conventions you like to follow?

Do you disagree with any of the conventions mentioned in this post?

Let me know (in a nice way) in the comments or on [Twitter](http://twitter.com/DavidWells)

---
title: "How to Respect Visitor \"Do Not Track\" settings with your Analytics tools"
description: "Using the do not track spec to disable web analytics on your website or app"
author: DavidWells
date: 2019-07-12 09:30:00
layout: post
category: dev
tags:
  - analytics
  - javascript
---

Privacy is at the forefront of many conversations about the web these days.

Did you know there is a [**Do Not Track spec**](https://www.w3.org/TR/tracking-dnt/) for the web?

Most folks don't know this exists or how to work with it (including myself until recently).

> **TLDR;** "Do Not Track" refers to browser settings (and server request headers) that tell a website owner whether or not the person wants to be tracked

Groovy, but how do we use it?

## Using "Do Not Track"

Like most browser specs, the implementation differs across browsers.

There are 4 different settings to check:

1. `window.doNotTrack`
2. `navigator.doNotTrack`
3. `navigator.msDoNotTrack`
4. `window.external.msTrackingProtectionEnabled()`

And the valid values can be '1', 'yes', or boolean...

(╯°□°)╯︵ ┻━┻  &nbsp;&nbsp; *shite*

But not to worry, I've pulled together a handy function to help.

You can use this code to wrap your client-side analytic calls and respect your visitor's privacy.

```js
function isDoNotTrackEnabled() {
  if (typeof window === 'undefined') return false
  const { doNotTrack, navigator } = window
  // Do Not Track Settings across browsers
  const dnt = (doNotTrack || navigator.doNotTrack || navigator.msDoNotTrack || msTracking())

  if (!dnt) return false

  if (dnt === true || dnt === 1 || dnt === 'yes' || (typeof dnt === 'string' && dnt.charAt(0) === '1')) {
    return true
  }
  return false
}

function msTracking() {
  const { external } = window
  return 'msTrackingProtectionEnabled' in external &&
  typeof external.msTrackingProtectionEnabled === 'function' &&
  window.external.msTrackingProtectionEnabled()
}

/* Usage in your site */
if (isDoNotTrackEnabled()) {
  // dont fire your tracking
} else {
  // fire tracking
}
```

I've bundled up this function in the [analytics-plugin-do-not-track](https://www.npmjs.com/package/analytics-plugin-do-not-track) package on npm.

Install the module:

```
npm install analytics-plugin-do-not-track
```

Here's how to implement in your app:

```js
import { doNotTrackEnabled } from 'analytics-plugin-do-not-track'

const isDNT = doNotTrackEnabled()
if (!isDNT) {
  // run tracking stuff
}
```

Manually instrumenting every single analytics call in your app to respect the global DNT setting might be **a lot of work**. But it doesn't have to be.

I'd recommend checking out the [analytics](https://www.npmjs.com/package/analytics) module.

```
npm install analytics
```

[**Analytics**](https://www.npmjs.com/package/analytics) is a lightweight, extendable analytics library designed to work with any third-party analytics provider to track page views, custom events, & identify users.

Because it's pluggable, we can simply add the `analytics-plugin-do-not-track` plugin and all page views, events tracked, & identify calls will respect the users setting. They automatically `noOp` and do not call the remote analytics tool.

**Pretty neat** 😁

Here's how you can use it with `analytics`

```js
import Analytics from 'analytics'
import googleAnalytics from 'analytics-plugin-ga'
import doNotTrack from 'analytics-plugin-do-not-track'

const analytics = Analytics({
  app: 'my-app',
  plugins: [
    doNotTrack(),
    googleAnalytics({
      trackingId: 'UA-1111222233',
    }),
    // ... other analytic tools. See http://bit.ly/2NU8z1H
  ]
})

/*
  If a visitor has "do not track" set in their browser,
  all tracking will noOp, and no data will be sent to Google Analytics
*/

// Simulate an Opted out user
window.doNotTrack = '1'

// does nothing if "do not track" on
analytics.page()

// does nothing if "do not track" on
analytics.track('buttonClick')

// does nothing if "do not track" on
analytics.identify('bob-lazar')

/*
  The above `page`, `track`, & `identify` calls noOp.
  Hooray, 🎉 privacy protected!

  You can verify this in the networks tab or if you turn on analytics debug mode.
  More on debug mode here: http://bit.ly/2GbKsVE
*/
```

See the [analytics demo](https://analytics-demo.netlify.com/) & [docs](https://github.com/davidwells/analytics#table-of-contents) for more details.

I hope this helps! Leave a comment below if you have any questions.

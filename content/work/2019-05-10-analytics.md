---
title: Analytics
description: Lightweight analytics library for tracking events, page views, & identifying users
thumbnail: https://s3-us-west-2.amazonaws.com/assets.davidwells.io/work/analytics-project.png
date: 2019-05-10
layout: portfolio
---

A lightweight, extendable analytics library designed to work with **any** third party analytics provider to track page views, custom events, & identify users.

[Docs site](https://getanalytics.io) | [Github Repo](https://github.com/davidwells/analytics)

<a href="https://getanalytics.io">
  <img src="https://user-images.githubusercontent.com/532272/61419845-ab1e9a80-a8b4-11e9-8fd1-18b9e743bb6f.png" width="450" />
</a>

This is the 4th iteration of an analytics library I've rebuilt over the years.

See the [API docs](https://getanalytics.io/api/) for everything it can do 🌈

```
npm install analytics
```

![how analytics works](https://user-images.githubusercontent.com/532272/68093602-42036880-fe4c-11e9-8bb9-008045da8a32.gif)

Example usage:

```js
import Analytics from 'analytics'
import googleAnalyticsPlugin from '@analytics/google-analytics'
import customerIOPlugin from '@analytics/customerio'

/* Initialize analytics */
const analytics = Analytics({
  app: 'my-app-name',
  version: 100,
  plugins: [
    googleAnalyticsPlugin({
      trackingId: 'UA-121991291',
    }),
    customerIOPlugin({
      siteId: '123-xyz'
    })
  ]
})

/* Track a page view */
analytics.page()

/* Track a custom event */
analytics.track('userPurchase', {
  price: 20
  item: 'pink socks'
})

/* Identify a visitor */
analytics.identify('user-id-xyz', {
  firstName: 'bill',
  lastName: 'murray',
  email: 'da-coolest@aol.com'
})
```

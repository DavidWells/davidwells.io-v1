---
title: "Using analytic naming conventions to keep data clean"
descriptions: "How to keep analytics data nice and clean for use in downstream marketing & data science tools"
author: DavidWells
date: 2019-05-09 09:30:00
draft: true
layout: post
tags:
  - analytics
---

Collecting clean company wide metrics is hard.

When every app/site/tool your company produces is instrumented at a different time, in a different way, the downstream effects can be rather troublesome.

It’s the classic case of garbage in, garbage out.

This document outlines a proposal for a clean approach to metric collection across all projects of an organization.

This approach has worked quite well at both Serverless & Netlify for a number of data science, product, and marketing activities.

Let’s jump into it!

## Why Standardize?

As companies & product grow, it’s critical that instrumentation is in place to track KPIs.

The first step towards accurate numbers, is standardizing around a naming convention and getting the right tooling in place to enforce these conventions.

When using a standardized naming convention from the offset you can ensure that data is reliable, readable, & will scale to changes in product direction.

These naming conventions for analytics are important for:

1. Programmatically dealing with data
2. Organizing data in analytics UI
3. Data consistency & reliability
4. Ensuring event names scale to diverging product lines
5. Streamlining onboarding for new members on the team

## Key Benefits:

1. **Consistency** — The biggest benefit of using a clear framework is data consistency. If your data is named the same way in each tool, it’s easier for you to use those tools. One framework. No questions.
2. **Convenience** — You’re likely going to continue to add new tracking throughout the lifetime of your product. Having a standard naming convention means that each time a developer implements a new call, they won’t have to think about how to do it.
3. **Clarity** — Your team will easily understand what each event means if you enforce a standard. Teammates won’t have to go ask whoever implemented the tracking what’s going on, and everyone can quickly run ad hoc analyses because your data is organized and easy to find.

## Standardized events requirements:

1. The pattern established must scale to fit multiple products/touch-points
2. The pattern must be parseable by humans and machines
3. All products/touch-points must adhere to the pattern

Validation + enforcement are also quite important. We’ll cover that in the implementation section below.

## Event Naming Conventions

After quite a bit of research on what “sane” naming conventions might look, what shook out was a slightly modified version of from [segment’s guide for clean data](https://segment.com/academy/collecting-data/naming-conventions-for-clean-data/)

`Product => Object => Action`

This format answers these questions:

- Where is the event from?
- What is the event effecting?
- What was the action taken?

Some event examples:

- App => site => deployed
- App => function => invoked
- Site => docs => rated
- Site => docs => searched
- CLI => user => loggedIn
- API => user => passwordReset

### Format/Syntax

The syntax for how product, object, action are represented is, of course, up to you.

In our case, all events are formatted like:

```
/* product : object _ action */
productName:objectName_actionName

/* everyThing camelCased */
camelCase:camelCase_camelCase
```

Here are some examples:

- `site:newsletter_subscribed`
- `app:site_deployed`
- `cli:user_login`
- `api:site_created`

The above syntax achieves a couple things. First and foremost, it’s human readable and easy for folks to tell exactly where an event originated. `app:user_emailChanged` for example happened in the main app, effected the user, and tells me exactly what they did.

Prefixing the context also makes it much easier to digest data in downstream marketing tools. It’s easy to filter down to all events that originated in your site, in your app, CLI, whatever. This gives product & marketing folks a very clear picture of what data is available for activation & retention activities.

### Conventions

These are recommended conventions to follow:

- Prefix with all events with the product name
- camelCase everything
- Separate product name & the Object/Action with `:`
- Separate the Object and Action with `_`
- i.e. `productName:objectName_actionName`
- Don’t abbreviate unnecessarily
- Avoid programmatically create event names
- For page loads, use “viewed”, not “visited”, “loaded”, etc.

## Implementation

First things first, collect and map out objects & actions across properties. What product lines exist? How might things evolve? What critical happy paths & events would be valuable to track?

Then, figure out your naming conventions that make sense for your organization.

Then, talk to other stakeholders and agree on naming conventions.

It’s nice for everyone to say “yes we will do it like this” but even better to bake naming convention validation directly into the code. This will prevent new folks from firing poorly named events and polluting downstream data science efforts. Think of this as “linting” for analytics.

Making it impossible for bad data to get through will make everyone’s life easier as they are trying to do things with it down the line.

Then it’s time to ship!

The [analytics library](https://getanalytics.io/) makes validation easy via its plugin middleware architecture.

Every page view, custom event, and identify call passed through a middelware chain that allows for adding safe guards to events flowing into third party tools.

This is the `track` lifecyle that fires when application code calls `analytics.track()`

<img src="https://s3-us-west-2.amazonaws.com/assets.davidwells.io/blog/analytics-track-lifecycle.png/" />

And this would be an example implementation of a plugin that validates all eventNames before passing them down the chain to go into `google-analytics`, `customerio`, or whatever other third party tracking solution your company uses.

```js
import Analytics from 'analytics'
import googleAnalytics from 'analytics-plugin-ga'

const customValidationPlugin = {
  NAMESPACE: 'company-xyz-event-validation',
  trackStart: ({ payload, abort }) => {
    if (!isEventValid(payload.event)) {
      // Abort the call or throw error in dev mode
      return abort('Event name does not meet validation requirements')
    }
  }
}

const analytics = Analytics({
  app: 'app-name',
  plugins: [
    customValidationPlugin,
    googleAnalytics({
      trackingId: 'UA-121991123',
    })
  ]
})

// valid event
analytics.track('app:user_didStuff')

// invalid event
analytics.track('blahblah bad event name')
// ^ no ops or throws depending on your validation logic in `trackStart`
```

Link to validation plugin

**One note:** It’s super important to optimize these collection points as soon as you can. Retrofitting haphazard analytics is much more of a challenge and requires more investigation what might break downstream of event names are changing.

## Research

There are tons of great resources out there to learn more about advanced analytics.

See below resources for additional analytics information:

- https://segment.com/academy/collecting-data/
- https://segment.com/academy/intro/how-to-create-a-tracking-plan/
- https://segment.com/blog/segment-tracking-plan/
- https://segment.com/academy/collecting-data/naming-conventions-for-clean-data/
- https://mattmazur.com/2015/12/12/analytics-event-naming-conventions/
- http://maddywilliams.com/6-things-to-avoid-when-creating-a-google-analytics-event-naming-strategy/
- http://www.seerinteractive.com/blog/event-tracking-naming-strategy/
- https://www.optimizesmart.com/event-tracking-guide-google-analytics-simplified-version/
- https://support.google.com/analytics/answer/1033068?hl=en
- https://segment.com/academy/collecting-data/naming-conventions-for-clean-data/
- http://www.kristaseiden.com/events-best-practices-for-hierarchies-and-naming-conventions/
- http://drakondigital.com/blog/google-analytics-event-tracking-naming-strategy/

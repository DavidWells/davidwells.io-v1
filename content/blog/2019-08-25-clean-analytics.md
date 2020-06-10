---
title: "Using event naming conventions to keep analytics data clean."
description: "How to keep analytics data nice and clean for use in downstream marketing & data science tools"
author: DavidWells
date: 2019-08-25 09:30:00
layout: post
tags:
  - analytics
---

Collecting clean company-wide metrics is hard.

When every app, site & tool your company makes is instrumented in a different way, by a different developer, the downstream effects can be rather troublesome.

> It's the classic case of garbage in, garbage out.

This document outlines a proposal for a clean approach to metric collection across all projects of an organization.

This approach has worked quite well at both Serverless & Netlify for a number of data science, product, and marketing activities.

Let's jump into it!

## Why Standardize?

As companies & product grow, instrumentation must be in place to track how things are evolving and how things are improving against KPIs.

The first step towards clean data is standardizing around a naming convention and ensuring the right tooling in place to enforce these conventions.

Standardizing from the beginning of a project can help ensure that data is reliable, readable, & will scale to changes in product direction.

These naming conventions for analytics are essential for:

1. Programmatically dealing with data
2. Organizing + searching for data in downstream analytics UI
3. Data consistency & reliability
4. Ensuring event names scale to diverging product lines
5. Streamlining onboarding for new members on the team

## How?

To achieve the benefits listed above, there a couple of considerations to take into account.

1. The pattern established must scale to fit multiple products/touch-points
2. The pattern must be parseable by humans and machines
3. All products/touch-points must adhere to the pattern
4. Validation + enforcement are also quite important. We'll cover that in the implementation section below.

So what's a good naming convention look like?

## Event Naming Conventions

After quite a bit of research on what "sane" naming conventions might look, what shook out was a slightly modified version of from segment's "object-action framework" from their [guide for clean data](https://segment.com/academy/collecting-data/naming-conventions-for-clean-data/).

**Pattern**

`Context => Object => Action`

The format answers these questions:

- Where is the event from? `Context`
- What is the event effecting? `Object`
- What was the action taken? `Action`

Some examples of how this might look in various contexts:

- App => site => deployed
- App => function => invoked
- Site => docs => rated
- Site => docs => searched
- CLI => user => loggedIn
- API => user => passwordReset

The `context` of where the events originate is generically short but still descriptive enough for folks to understand where they originated from.

Some examples of `context` context would be `app` (web ui), `site` (marketing site), `cli` (the command line interface), `api` (the backend api service), etc.

These will vary depending on your application/org structure.

### Format/Syntax

The syntax is, of course, up to you.

In our case, all events are formatted like this with words `camelCased`

```
productName:objectName_actionName
```

Here are some examples:

- `site:newsletter_subscribed`
- `app:site_deployed`
- `cli:user_login`
- `api:site_created`

The above syntax achieves a couple of things. First and foremost, it's human-readable and easy for folks to tell exactly where an event originated.

For example, `app:user_emailChanged` happened in the main app, effected the user, and tells me exactly what they did (changed their email).

Prefixing the context, with product name, also makes it much easier to digest data in downstream marketing tools.

It's easy to filter down to all events that originated in your site, in your app, CLI, whatever. This gives product & marketing folks a very clear picture of what data is available for activation & retention activities.

<img src="https://s3-us-west-2.amazonaws.com/assets.davidwells.io/blog/clean-analytics-list.jpg"/>

### Conventions

These are the recommended conventions to follow:

- Prefix with all events with the product name
- camelCase everything
- Separate product name & the Object/Action with `:`
- Separate the Object and Action with `_`
- i.e. `productName:objectName_actionName`
- Don't abbreviate unnecessarily
- Avoid programmatically create event names
- For page loads, use "viewed", not "visited", "loaded", etc.

## Implementation

It's crucial to optimize these collection points as soon as you can. Retrofitting a haphazard analytics implementation is much more of a challenge. It could require more cross-team coordination & investigative work to make sure downstream systems will still operate as expected.

Here are some practical next steps for getting things in a "cleaner" state:

### 1. Map out existing projects & properties

First things first, collect and map out objects & actions across properties. What product lines exist? How might things evolve? What critical happy paths & events would be valuable to track?

### 2. Decide on naming conventions

Then, figure out your naming conventions that make sense for your organization.

### 3. Communicate changes to org

Then, talk to other stakeholders and agree on naming conventions.

It's nice for everyone to say, "yes, we will do it like this" but even better to bake naming convention validation [directly into the code](https://getanalytics.io/plugins/event-validation/). This will prevent new folks from firing poorly named events and polluting downstream data science efforts. Think of this as "linting" for analytics.

Making it impossible for bad data to get through will make everyone's life easier as they are trying to do things with it down the line.

### 4. Implement & ship

How you enforce these conventions is entirely up to you.

I'd recommend using standard libraries across your organization & leveraging some existing tooling to make this easier.

The [analytics library](https://getanalytics.io/) makes validation easy via its plugin middleware architecture.

Every page view, custom event, and identify call is passed through a middleware chain that allows for adding safeguards to ensure data flowing into third-party tools is clean.

When application code calls `analytics.track()`, the data flows through the middleware chain, and if events are invalid, you can automatically format them to meet standards or warn the developer to conform to the conventions.

**Tracking events flow through this chain**

<img src="https://s3-us-west-2.amazonaws.com/assets.davidwells.io/blog/analytics-track-lifecycle.png" />

Flip on [debug](https://getanalytics.io/debugging/) mode, and you can watch as events flow through as you navigate your application.

## Using analytics plugin

Adding validation checks everywhere you track events can be a **large** task. That's one of the reasons why the analytics library is a nice abstraction layer to help do this in a single spot.

Instead of going into 20 different files and adding `if/else` statements, we can simply add the [events validation plugin](https://getanalytics.io/plugins/event-validation/).

The naming convention described in this post is codified in the plugin and will `noOp` any malformed events.

```js
import Analytics from 'analytics'
import eventValidation from 'analytics-plugin-event-validation'
import customerIOPlugin from 'analytics-plugin-customerio'

const analytics = Analytics({
  app: 'awesome-sauce',
  plugins: [
    eventValidation({
      /* Context of where events are coming from */
      context: 'app',
      /* Allowed objects */
      objects: [
        'sites', // example app:sites_cdConfigured
        'user',  // example app:user_signup
        'widget' // example app:widget_created
      ],
      /* throw on validation errors if using in only dev env */
      // throwOnError: true
    }),
    customerIOPlugin({
      siteId: '123-xyz'
    }),
  ]
})

// Event names must now conform to this format:
analytics.track('app:sites_whatever')
analytics.track('app:user_action')
analytics.track('app:widget_deleted')
```

## Bring your own convention

If you aren't a fan of the proposed event syntax `content:object_action`, you can roll your own analytics plugin and bring your own validation logic.

Here is an example:

```js
import Analytics from 'analytics'
import googleAnalytics from 'analytics-plugin-ga'

/* Bring your own plugins */
const customValidationPlugin = {
  NAMESPACE: 'company-xyz-event-validation',
  trackStart: ({ payload, abort }) => {
    /* Your custom event validation logic */
    if (!payload.event.match(/^foo/)) {
      /* Abort the call or throw error in dev mode */
      return abort('Event name does not meet validation requirements')
    }
  }
}

const analytics = Analytics({
  app: 'app-name',
  plugins: [
    // Attach custom validation plugin
    customValidationPlugin,
    googleAnalytics({
      trackingId: 'UA-121991123',
    })
  ]
})

// valid event
analytics.track('foo button clicked')

// invalid event
analytics.track('blahblah bad event name')
// ^ no ops or throws depending on your validation logic in `trackStart`
```

For more on writing custom plugins see the [docs](https://getanalytics.io/plugins/writing-plugins/)

## Research & links

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

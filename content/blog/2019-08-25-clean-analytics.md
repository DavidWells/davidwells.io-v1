---
title: "Using event naming conventions to keep analytics data clean"
descriptions: "How to keep analytics data nice and clean for use in downstream marketing & data science tools"
author: DavidWells
date: 2019-08-25 09:30:00
layout: post
tags:
  - analytics
---

Collecting clean company wide metrics is hard.

When every app/site/tool your company produces is instrumented at a different time, in a different way, by a different developer, the downstream effects can be rather troublesome.

> It’s the classic case of garbage in, garbage out.

This document outlines a proposal for a clean approach to metric collection across all projects of an organization.

This approach has worked quite well at both Serverless & Netlify for a number of data science, product, and marketing activities.

Let’s jump into it!

## Why Standardize?

As companies & product grow, it’s critical that instrumentation is in place to track how things are evolving and how things are improving against KPIs.

The first step towards clean data is standardizing around a naming convention and ensuring the right tooling in place to enforce these conventions.

Standardizing from the beginning of a project can help ensure that data is reliable, readable, & will scale to changes in product direction.

These naming conventions for analytics are important for:

1. Programmatically dealing with data
2. Organizing + searching for data in downstream analytics UI
3. Data consistency & reliability
4. Ensuring event names scale to diverging product lines
5. Streamlining on-boarding for new members on the team

## How?

In order to achieve the benefits listed above, there there a couple considerations to take into account.

1. The pattern established must scale to fit multiple products/touch-points
2. The pattern must be parseable by humans and machines
3. All products/touch-points must adhere to the pattern
4. Validation + enforcement are also quite important. We’ll cover that in the implementation section below.

So what's a good naming convention look like?

## Event Naming Conventions

After quite a bit of research on what “sane” naming conventions might look, what shook out was a slightly modified version of from segment’s "object-action framework" from their [guide for clean data](https://segment.com/academy/collecting-data/naming-conventions-for-clean-data/).

**Pattern**

`Product => Object => Action`

The format answers these questions:

- Where is the event from?
- What is the event effecting?
- What was the action taken?

**Some event examples:**

- App => site => deployed
- App => function => invoked
- Site => docs => rated
- Site => docs => searched
- CLI => user => loggedIn
- API => user => passwordReset

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

The above syntax achieves a couple things. First and foremost, it’s human readable and easy for folks to tell exactly where an event originated.

For example, `app:user_emailChanged` happened in the main app, effected the user, and tells me exactly what they did (changed their email).

Prefixing the context, with product name, also makes it much easier to digest data in downstream marketing tools.

It’s easy to filter down to all events that originated in your site, in your app, CLI, whatever. This gives product & marketing folks a very clear picture of what data is available for activation & retention activities.

<img src="https://s3-us-west-2.amazonaws.com/assets.davidwells.io/blog/clean-analytics-list.jpg"/>

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

It’s very important to optimize these collection points as soon as you can. Retrofitting a haphazard analytics implementation is much more of a challenge and requires more investigation what might break downstream of if event names are changing.

Here are some practical next steps for getting things in a "cleaner" state:

### 1. Map out existing projects & properties

First things first, collect and map out objects & actions across properties. What product lines exist? How might things evolve? What critical happy paths & events would be valuable to track?

### 2. Decide on naming conventions

Then, figure out your naming conventions that make sense for your organization.

### 3. Communicate changes to org

Then, talk to other stakeholders and agree on naming conventions.

It’s nice for everyone to say “yes we will do it like this” but even better to bake naming convention validation directly into the code. This will prevent new folks from firing poorly named events and polluting downstream data science efforts. Think of this as “linting” for analytics.

Making it impossible for bad data to get through will make everyone’s life easier as they are trying to do things with it down the line.

### 4. Implement & ship

How you enforce these conventions is entirely up you you.

I'd recommend using standard libraries across your organization & leveraging some existing tooling to make this easier.

The [analytics library](https://getanalytics.io/) makes validation easy via its plugin middleware architecture.

Every page view, custom event, and identify call passed through a middelware chain that allows for adding safe guards to events flowing into third party tools.

For example, every `tracking` call flows through a lifecycle that can ensure only clean data is passed on to third party tools. When application code calls `analytics.track()` the data flows through the middleware chain and if events are invalid, you can automatically format them to meet standards or warn the developer to conform to the conventions.

<img src="https://s3-us-west-2.amazonaws.com/assets.davidwells.io/blog/analytics-track-lifecycle.png" />

### An example

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

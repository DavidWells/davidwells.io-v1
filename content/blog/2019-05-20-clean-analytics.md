---
title: "Clean Analytics"
descriptions: "How to keep analytics data nice and clean"
author: DavidWells
date: 2019-05-09 09:30:00
draft: true
layout: post
---

Collecting clean company wide metrics is hard.

When every app/site/tool your company produces is instrumented at a different time or in a different way, the downstream effects can be rather troublesome.

A classic case of garbage in, garbage out.

This document outlines a proposal for a clean approach to metric collection across all projects of an organization.

- [Why](#why)
- [Key Benefits](#key-benefits)
- [Standardized events](#key-requirements)
- [Event Naming Conventions](#event-naming-conventions)
  * [Format/Syntax](#formatsyntax)
  * [Conventions](#conventions)
- [Implementation](#implementation)
- [Research](#research)

## Why

As companies & product grow, it's critical that instrumentation is in place to track KPIs.

The first step towards accurate numbers, is standardizing around a naming convention and getting tooling in place.

Using the standardized naming conventions from the offset of a product can ensure that data is reliable, readable, & will scale to changes in product direction.

Naming conventions for analytics are important for:

1. Programmatically dealing with data
2. Organizing data in analytics UI
3. Data consistency & reliability
4. Ensuring event names scale to diverging product lines

## Key Benefits:

1. **Consistency** — The biggest benefit of using a clear framework is data consistency. If your data is named the same way in each tool, it’s easier for you to use those tools. One framework. No questions.
2. **Convenience** — You’re likely going to continue to add new tracking throughout the lifetime of your product. Having a standard naming convention means that each time a developer implements a new call, they won’t have to think about how to do it.
3. **Clarity** — Your team will easily understand what each event means if you enforce a standard. Teammates won’t have to go ask whoever implemented the tracking what’s going on, and everyone can quickly run ad hoc analyses because your data is organized and easy to find.

## Standardized events requirements:

1. The pattern established must scale to fit multiple products/touch-points
2. The pattern must be parseable by machine + human eye
3. All products/touch-points must adhere to the pattern

## Event Naming Conventions

`Product => Object => Action`

Modified for our needs from [segment's guide for clean data](https://segment.com/academy/collecting-data/naming-conventions-for-clean-data/) and tons of research (see below)

**Contrived Examples:**

- App => site => deployed
- App => function => invoked
- Site => Documentation => viewed
- Site => Documentation => searched
- CLI => user => loggedIn

### Format/Syntax

All events should be formatted like:

```
/* product : object _ action */
productName:objectName_actionName

/* everyThing camelCased */
camelCase:camelCase_camelCase
```

**Examples**

- `site:newsletter_subscribed`
- `app:site_deployed`
- `cli:user_login`
- `api:site_created`

### Conventions

- Prefix with all events with the product name
- camelCase everything
- Separate product name & the Object/Action with `:`
- Separate the Object and Action with `_`
- i.e. `productName:objectName_actionName`
- Don’t abbreviate unnecessarily
- Avoid programmatically create event names
- For page loads, use “viewed”, not “visited”, “loaded”, etc.

## Implementation

1. [x] Collect and map out objects & actions across properties
2. [x] Agree on naming Conventions
3. [x] Codify naming conventions
4. [x] Coordinate with stake holders on Implementation
5. [x] Ship it

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

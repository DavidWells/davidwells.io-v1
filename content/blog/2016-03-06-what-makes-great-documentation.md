---
title: What makes great documentation?
author: DavidWells
date: 2016-03-06 18:55:32
layout: post
category: "Thoughts"
---

Documentation is one of the most critical pieces of any project.

For open-source projects, great docs can mean the difference between the project gaining traction or fading into obscurity.

For products, it can mean the difference between stellar user experience and a confusing maze of clicks.

Here are some ** essential things to consider when creating documentation:**

# Accessibility

Are the docs available where users need them? Most products miss the mark on this one.

If the documentation for a given screen is not available on that given screen in the product... fix that.

Don't assume your users will spend the time hunting for information. They are fickle beings, and you want to keep them in your product using all your sticky features, not frustrated hunting down docs in a separate location.

## Searchability

Related to the previous point on accessibility, can users easily search for information?

Can they search for relevant information from within the context of your product?

Are you tracking what users are searching for? This is a great source of information on what documentation you are lacking.

## Search indexability

Can search engines index your documentation and support requests? This is a no-brainer, yet many companies keep this information being private Zendesk tickets, etc.

Having things indexed, will help customers self-serve support requests and can lower business overhead.

Keep things private that needs to be, but many many tickets can be sources of new documentation.

## Translatablity

Are your docs translated?

Are your build processes set up to allow for your documentation to be easily translated into multiple languages?

## Clarity

This is a given, but are your docs clear and written in plain English?

Never assume your reader knows anything.

Use the 'explain it to me like I'm a five-year-old' approach.

## Living

Your docs are the living source of truth for your product or library.

Are you showing a date last modified? Do you have a way for users to tell you if docs are out of date?

Even better... do you have a way for users to help you update the docs?

## Maintainable

Do your docs reside in a central repository? Are they served from an API?

From my experience, the most maintainable developer docs are those that live directly in the src.

These come in the form of doc blocks, markdown, and live code examples for developers to quickly see and grok how to use your tools.

There are numerous tools available to parse out these in `src` docs and output them into beautiful docs.

See an example: https://getanalytics.io/

One protip on maintainability: video docs go out of date very very quickly. It's hard to keep those in sync with a rapidly moving product.

Instead of video tutorials of a product, lean more toward interactive software walk-thru. They are typically based on the UI of the product and are easier to update and keep in sync.

## Properly Versioned

Are your docs versioned and are previous versions of the documentation available?

This applies more so to developer documentation, but it's something that can often be overlooked.

# In conclusion

Making good documentation that is maintainable doesn't need to suck.

With the proper forethought and tooling in place, documentation can be great and improve the overall user experience of your product.

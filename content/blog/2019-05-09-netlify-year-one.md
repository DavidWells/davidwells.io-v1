---
title: "Happy Netliversary 🎉 - A look back at my first year at Netlify"
description: "A look back on all the things that we've built!"
author: DavidWells
date: 2019-05-09 09:30:00
layout: post
---

It feels like only yesterday... I was building [serverless.com](https://serverless.com) & falling in love with Netlify's truly magical workflow.

Jumpcut to a year ago, I found myself joining the Netlify team in the Dogpatch of San Francisco as a Growth + DX Engineer as employee #26!

**My mission was simple:** Help the company grow, make developer lives better & educate the JAMstack world on all things serverless.

What happened next, no one could have predicted...

## What a year

I've experienced the most prolific year of my professional life.

Wrote a ton of [blog posts](https://www.netlify.com/authors/david-wells/), helped close deals, integrated with partners, gave [talks & workshops](https://davidwells.io/talks/), learned a metric boatload, and [built a whole lot of awesome](#building-the-awesome)!

I also had the opportunity to work with a wide variety of top-notch people in the JAMstack/SaaS world and, of course, the **world-class Netlify team** 🎉!

Working at Netlify has been a phenomenal catalyst for my personal growth over the past year.

But what do you do, David? I'm GLAD YOU ASKED!

Here's the mind map of my world...

<img src="https://s3-us-west-2.amazonaws.com/assets.davidwells.io/work/netlify-mind-map.jpg" width="400" />

Let's unpack this 👆...

If I had to describe my job in a simple Venn diagram, it would look a little something like this:

<img src="https://s3-us-west-2.amazonaws.com/assets.davidwells.io/blog/DX-ven-diagram.jpg" />

On a daily basis, I find myself at the intersection of product, frontend, devOps (serverless of course), devRel, & marketing. Sprinkle in working with various [partners](#integrating-with-partners--netlify-add-ons), and that almost covers the gamut of my world.

It's been great to combine the skills I've acquired over the years into one role!

<img src="https://s3-us-west-2.amazonaws.com/assets.davidwells.io/blog/davids-work-history.jpg" />

Let's dive deeper. Shall we?!?!

---

<br />

## Building the Awesome

The DX team is focused on empowering developers (customers & partners) by making it as easy & streamlined as possible for them to build awesome stuff on top of the expanding Netlify Platform.

We are the internal dog fooders. We stretch, bend, and break the tools we offer to make things better for the ever-expanding group of developers.

This led to a number of interesting projects including:

- [Netlify + Express](https://github.com/netlify-labs/netlify-functions-express)
- [How to create Single Sign On flows with role based access controls](https://github.com/netlify-labs/netlify-gated-sites)
- [How to use Netlify OAuth Applications](https://github.com/netlify-labs/oauth-example)
- [Integrating Intercom login flows with OAuth & functions](https://github.com/netlify-labs/intercom-netlify-oauth)
- [Running headless chrome in serverless functions](https://github.com/netlify-labs/netlify-functions-headless-chrome)
- [Building GraphQL APIs with serverless functions](https://github.com/netlify-labs/functions-and-graphql)
- [Progressive Form enhancement with serverless functions](https://github.com/DavidWells/progressive-enhancement-form-functions)
- [Cache me outside](https://github.com/DavidWells/cache-me-outside)

And then some...

## 👨‍💻 Netlify CLI

One of my favorite projects was re-building the [Netlify CLI](https://github.com/netlify/cli).

A greenfield project is always fun & crafting CLI experiences is a hobby of mine. (Weird hobbies I know)

The wonderful [Bret Comnes](https://twitter.com/bcomnes), [Swyx](https://twitter.com/swyx), and I hacked away at building a new CLI experience that we thought people would love.

<img src="https://s3-us-west-2.amazonaws.com/assets.davidwells.io/work/netlify-cli-docs-site.jpg" />

```bash
# Install the netlify CLI
npm install netlify-cli -g
```

[All of the CLI commands can be seen here](https://cli.netlify.com/)

The CLI is extendable via plugins, and there is much more in store for it in the future.

<br />

## ⚡️ functions.netlify.com

In an effort to educate the world of what's possible with serverless tech, I built out the [functions.netlify.com](https://functions.netlify.com) site.

It's the one-stop shop for all things [Netlify Functions](https://www.netlify.com/docs/functions/)

- [Functions Examples](https://functions.netlify.com/examples)
- [Functions Tutorials](https://functions.netlify.com/tutorials)
- [Repo](https://github.com/netlify-labs/functions-site)

Make sure to checkout the site for all the awesome [examples](https://functions.netlify.com/examples/) & [tutorials](https://functions.netlify.com/tutorials)

<img src="https://s3-us-west-2.amazonaws.com/assets.davidwells.io/work/netlify-functions-site-examples.jpg" />

Shout out to [Gatsby](https://www.gatsbyjs.org/) for the awesome framework the site is built on.

<br />

## ❤️ CodeSandbox + Netlify deploy

This was an integration project with CodeSandbox. We wanted to add a way for CodeSandbox users to be able to one-click deploy from their CodeSandbox project. You can read more about it here in the [blog post](https://www.netlify.com/blog/2019/03/26/deploy-codesandbox-to-netlify/)

<iframe width="560" height="315" src="https://www.youtube.com/embed/S4Nshf2IGmM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

The end result is a nice lil' Deploy to Netlify flow!

<img src="https://s3-us-west-2.amazonaws.com/assets.davidwells.io/work/csb-deploy.jpg" />

It was a true pleasure working closely with [Sara Vieira](https://twitter.com/nikkitaftw) & [Ives van Hoorne](https://twitter.com/CompuIves) on this one!

<br />

## 🚀 AWS CloudFormation + Netlify

In preparation for AWS re:invent, I built a CloudFormation Custom resource to allow AWS users to easily deploy Netlify sites as part of their existing stacks.

This custom resource works with the [serverless framework](https://serverless.com), [SAM](https://aws.amazon.com/serverless/sam/) and vanilla AWS CloudFormation.

The main goal, other than to scratch my own itch, is to allow your Netlify site & build pipeline to become part of your infrastructure as code. 💪

You can read more about it in the [blog post](https://www.netlify.com/blog/2018/11/29/deploying-netlify-sites-with-aws-cloudformation/) and deploy a [ready made example](https://github.com/DavidWells/netlify-site-as-aws-custom-resource-example)

<iframe width="560" height="315" src="https://www.youtube.com/embed/AQ-f-U8Pncc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br />

## 💸 FaunaDB + Netlify Integration

What started out as building a quick example application turned into the first official [Netlify add-on](https://www.netlify.com/docs/partner-add-ons/).

The humble beginnings of this [application](https://faunadb-example.netlify.com/) is using React for the frontend, Netlify Functions for API calls, and FaunaDB as the backing database.

You can read more about the project in the [README](https://github.com/netlify/netlify-faunadb-example/blob/master/README.md) or in the [blog post](https://github.com/netlify/netlify-faunadb-example).

We ended up turning the project & add-on into a [one click Fauna Stack](https://github.com/netlify/fauna-one-click). Seriously, it's one-click for a working FullStack NoSQL backed React application.

The backend is powered by serverless functions and works like so:

<img src="https://user-images.githubusercontent.com/532272/42067494-5c4c2b94-7afb-11e8-91b4-0bef66d85584.png" />

You can install the `faunadb` add-on with the Netlify CLI via:

```bash
# Add a faunaDB to your netlify site
netlify addons:create fauna
```

For more information checkout the [add-on docs](https://www.netlify.com/docs/partner-add-ons/) & the [fauna graphQL demo](https://github.com/sw-yx/netlify-fauna-graphql-todo)

<br />

## Integrating with partners & Netlify Add-ons

I've had a heck of a time keeping up with the various integration partners & companies that want to build on top of the Netlify ecosystem & platform.

Still in it's alpha phase, I've been working tirelessly with companies to help them integrate and build [Netlify add-on extensions](https://github.com/netlify/addons).

- [Building Reference implementations](https://github.com/netlify/addons/tree/master/examples)
- [Writing the docs](https://github.com/netlify/addons#building-add-on-integrations-with-netlify)
- Working with truly awesome partners like [FaunaDB](https://fauna.com/) & [TakeShape](https://www.takeshape.io/)
- and building wonderful ASCII art

<img src="https://user-images.githubusercontent.com/532272/45775428-93c74000-bc04-11e8-9a27-084170353563.png" />

If you are curious about [Netlify add-ons, checkout this deck](https://docs.google.com/presentation/d/1x-pE1-_-eN1kvyITTAHIuIWReUxQulQHoiEBBmB3dsE/edit?usp=sharing) and get in touch with me.

### Super secret upcoming integrations

We have some additional integrations cooking! Stay tuned...

<br />

---

<br />

## Marketing & Growth Ops

On the marketing front, I've been in charge of instrumenting analytics on the various Netlify products from [app.netlify.com](https://app.netlify.com/), [our site](http://netlify.com), API, and wide variety of micro sites.

This data is a crucial part of the product feedback loop and helps us make data-driven decisions on where we head to next.

On the marketing-ops front, I've built a variety of serverless services to help with new user onboarding, sales enablement, usage telemetry & referral tracking. I'm hoping to open source these at some point.

User retention + activation is also a large component of what I have been working on for the past year here at Netlify. You might have seen an email or two for me 🙈. I apologize for that; we try to make them as helpful & actionable as possible!

We are leveraging the all-powerful [customer.io](http://customer.io) platform for fine-grained communications, and I'm **digging it**.

Recently, I built out the [email preference center](https://messages.netlify.com/) for users to manage what kinds of emails they want, or they can opt-out completely! The frontend is a React app, and the backend is a serverless service (do you see a pattern here?).

<img src="https://s3-us-west-2.amazonaws.com/assets.davidwells.io/work/netlify-email-preferences-form.jpg" />

Working close to the numbers & leveraging them for informed decisions is critical for any company. If you're unfamiliar with web analytics/telemetry [holler at me](https://davidwells.io/contact/) and I will point you in the right direction.

<br />

---

<br />

## Teaching people

I'm **insanely passionate** about teaching people the raw superpowers that come when adopting serverless technology.

Scaling, Operating, and Maintaining an application at a massive scale is now well within the grasp of the frontend devs. If you can write javascript, you can build a badass serverless stack.

To that end, most of my content is focused around that.

- [Workshop on serverless functions](https://github.com/DavidWells/netlify-functions-workshop)
- [Building serverless CRUD apps with Netlify Functions & FaunaDB](https://www.netlify.com/blog/2018/07/09/building-serverless-crud-apps-with-netlify-functions--faunadb/)
- [How to setup serverless OAuth Flows with Netlify Functions & Intercom](https://www.netlify.com/blog/2018/07/30/how-to-setup-serverless-oauth-flows-with-netlify-functions--intercom/) [Video](https://www.youtube.com/watch?v=zErvY08uNM0)
- [5 Key Benefits of "Going Serverless"](https://www.netlify.com/blog/2018/08/06/five-key-benefits-of-going-serverless/)
- [Netlify CLI 2.0 now in Beta 🎉 ](https://www.netlify.com/blog/2018/09/10/netlify-cli-2.0-now-in-beta-/)
- [Deploying Netlify Sites with AWS CloudFormation](https://www.netlify.com/blog/2018/11/29/deploying-netlify-sites-with-aws-cloudformation/)
- [Deploy CodeSandbox to Netlify](https://www.netlify.com/blog/2019/03/26/deploy-codesandbox-to-netlify/)
- [Serverless Best Practices with Netlify (Video)](https://fauna.com/blog/webcast-video-serverless-best-practices-with-netlify)
- [Building an app with Netlify OAuth (Video)](https://www.youtube.com/watch?v=LN8cL2yPR3c)
- [What the heck is serverless webinar series](https://github.com/netlify-labs/what-the-heck-is-serverless)
- [What the heck is serverless? (Video)](https://www.youtube.com/watch?v=AEBWLm1L-qI)
- [CSS Tricks: Serverless 101 (Video)](https://www.youtube.com/watch?v=2N_sUmpjzZk)
- [First Steps with Serverless (Video)](https://www.youtube.com/watch?v=h5R_SxV-cFY)
- [Building Your Backend With Serverless Functions](https://www.youtube.com/watch?v=iZrzuUwm-9Y)
- [Netlify Add-ons (deck)](https://docs.google.com/presentation/d/1x-pE1-_-eN1kvyITTAHIuIWReUxQulQHoiEBBmB3dsE/edit?usp=sharing)

If you're curious about other serverless stuff, I highly recommend checking out [this](https://www.manning.com/livevideo/production-ready-serverless) and [this](https://github.com/DavidWells/serverless-workshop) & subscribing to [this](https://www.jeremydaly.com/newsletter/). Also, feel free to drop me a line.

<br />

---

<br />

## How did this happen?

I like to think all these things were made possible by all the wonderful folks on the Netlify team and these guiding principles:

- Be creative
- Experiment, try new things, don't be afraid to fail
- Be data-driven
- Learn from failures
- Relish & repeat success
- **Have fun & build awesome** ✨

Looking back at the past year, Netlify has enabled me to do just that. I had a lot of fun and built some awesome stuff!

It's also been the prolific year of building I've ever had. There are **more** things not even mentioned in this post 🤯. Mamma mia!

<img src="https://s3-us-west-2.amazonaws.com/assets.davidwells.io/blog/success-kid.jpg" />

It's been a wild ride, and I can't wait to see what the next year holds.

Shoutout to [Matt](https://twitter.com/biilmann) & [Chris](https://twitter.com/chr_bach) the two founders of Netlify. They are building an awesome company to work for & are masters at recruiting the best folks (minus myself 😁)

Also, to [Daniel Freeman](https://twitter.com/danielfreeman), who continues to be an awesome mentor & empowers me to build all this awesome shit!

P.S. [We are hiring a bunch of people](https://boards.greenhouse.io/netlify). If this post piqued your interest, please reach out.

P.P.S. Sorry for the Netlify ❤️ fest. (but its true G)

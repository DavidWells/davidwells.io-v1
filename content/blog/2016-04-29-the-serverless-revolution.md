---
title: The Serverless Revolution
author: DavidWells
date: 2016-04-29 10:06:00
layout: post
category: dev
tags:
  - serverless
---

Imagine building an application, deploying it, and having it infinitely scale without managing servers.

**Sounds like a pipe dream right?**

Nope! It's a reality today, in 2016, with a "serverless" setup.

Going "serverless" is a new way of building and scaling your backend architecture without ever having to ever touch or manage a server.

# Real World Example

Let's pretend you are building an app.

- The frontend is written in HTML/CSS and JavaScript.
- The backend is JavaScript running on Node with a noSQL/SQL database

You are expecting to make billions within the first week and want this app to scale to handle all of your new users.

So you toss the frontend on a CDN, which scales nicely. **Great!**

**What about your backend Node logic and database?**

Tossing the node app on a single Linux box won't scale. **Oh no!**

Now you need to figure out how to replicate servers, do load balancing, configure autoscaling, containerize everything with docker... the list goes. You need some serious ninja devOps skills to be sitting pretty for all of your traffic.

Wouldn't it be nice if you didn't need a PHD in devOps kung foo to meet that scale?

Instead, let's split up our backend application into tiny pieces, or "microservices".

These services will be compromised of serverless functions that will handle all inbound requests.

- [user auth](https://github.com/danilop/LambdAuth)
- [emails to users](https://github.com/microapps/MoonMail)
- [API routing](https://aws.amazon.com/api-gateway/)
- Billing
- SMS notifications
- etc

Each one is a just single function (or lambda). They do one thing and do that one thing very well.

<img src="https://s3-us-west-2.amazonaws.com/assets.davidwells.io/legacy/2016/04/aws-lambda-150x150.png" alt="aws-lambda" width="150" height="150" class="right size-thumbnail wp-image-5263" />These tinier functions are run individually via a distributed compute-on-demand service, like [AWS Lambda](https://aws.amazon.com/lambda/).

Now you are asking:

>What's a "lambda"? It sounds delicious
> - You

You are right, they delicious.

A lambda is a function that you can call on demand without needing a server of your own to run the process.

**Think about it like an on-demand NodeJS instance that will run whatever function you want when you hit it's API endpoint or trigger it with a custom event.**

```
POST /lambda-api-gateway/my-api/run-my-custom-node-function
```

Guess what! Now your backend will scale!

There is, obviously, a little more to it than this, but you get the idea. No more managing servers and AWS will scale out function calls for you.

You now have an app out of the box that will scale to millions of requests without you lifting a finger, AWS does the scaling of these lambda functions for you.

**Additional bonus:** If your app is a ghost town, you won't be paying an hourly rate for an EC2 instance. You only pay for invocations of the functions and machine time used per 100ms.

For startups/side projects, this is a dream state.

Low cost, no maintenance, it just works.

I can't tell you how many EC2 or digital ocean boxes I have setup for "my next big thing" only to pay a monthly fee of $20 per server. Those costs stack up quickly.

Going serverless should be far more cost-efficient for you.

# Event-driven computing

Lambda revolves around the idea of an event-driven model.

**When X happens..**

- --> trigger lambda function Y
- --> then trigger Lambda function Z
- --> then save data to my database
- --> then database event log trigger Lambda function A
- --> then send me a email
- --> etc.

# C'mon is this REALLY "Serverless"

How can anything on the web truly be serverless?

Well... The "serverless" isn't without servers. You simply don't need to think about them.

**Instead, focus on the real problems you are solving and where you provide value.**

Focus on how to get more users, marketing, and 20 million other things far more important to your business.

Stop worrying about "how are our server boxes doing? Do we need to update anything? Are we secure? What the hell is heart bleed? Will we scale of we get featured on Oprah? etc."

# Interested in learning more?

Here are some of the resources I've been using to get up to speed AWS lambda.

- [The lambda docs](https://aws.amazon.com/lambda/getting-started/)
- [User Auth example with AWS lambda](https://github.com/danilop/LambdAuth)
- [The Serverless Framework CLI](https://github.com/serverless/serverless/) for a way to manage and deploy your lambda functions
- [Learn Serverless Book](https://gumroad.com/l/learn-serverless-book)
- [AWS Lambda In Action](https://www.manning.com/books/aws-lambda-in-action)
- [Good old github gists](https://gist.github.com/search?l=javascript&q=aws+lambda&utf8=%E2%9C%93)
- [Serverless Workshop](https://github.com/DavidWells/serverless-workshop)
- [Netlify serverless functions workshop](https://github.com/DavidWells/netlify-functions-workshop)

Props to [Austen Collins](https://twitter.com/austencollins) creator of the [serverless framework](https://github.com/serverless) for inspiring this post. I saw him demo the CLI today here in SF, and I'm sold.

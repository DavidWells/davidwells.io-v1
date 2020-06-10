---
title: "Speed up your Netlify deploy workflow with the CLI"
description: "How to speed up your Netlify workflow with faster deploys"
author: DavidWells
date: 2019-06-04 09:30:00
layout: post
category: dev
---

Like Ricky Bobby once said...

> I want to go fast

We all want to move quickly. I'm going to share a quick tip on getting faster Netlify deployments.

Sometimes I just need a preview URL, and I need it **right meow**.

This is where the `netlify deploy` command comes in.

<iframe width="560" height="315" src="https://www.youtube.com/embed/WtZ4bG2K0MA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

`netlify deploy` allows you to quickly pipe up your files into your Netlify site.

The CLI will return a unique preview URL for you to scope out and share with your team etc.

## But why?

Well, Timmy, not every tiny change needs or deserves to be committed into `git` just to get back that **sweet, sweet deploy preview URL**.

## How

If you haven't installed the `netlify-cli` you can do so with `npm`

```bash
npm install netlify-cli -g
```

Then log in to your [Netlify Account](https://app.netlify.com)

```bash
netlify login
```

Then link your local site in your site's `cwd`

```bash
netlify link
```

Then run your local build. This step is important, don't miss it!

```bash
# build your beautiful site
npm run build
```

Then deploy!!!!! 🚀🚀🚀🚀

```bash
netlify deploy
```

This will deploy your site to a draft URL and return back the link. Share this link with your team, your neighbors, and your mom.

```bash
➜  davidwells.io git:(master) ✗ netlify deploy
Deploy path:        /Users/david/David/davidwells.io/public
Configuration path: /Users/david/David/davidwells.io/netlify.toml
Deploying to draft URL...

✔ Finished hashing 3047 files
✔ CDN requesting 2816 files
✔ Finished uploading 2844 assets
✔ Draft deploy is live!

Logs:           https://app.netlify.com/sites/davidwells/deploys/5cf71c46d6e0efd765871a15
Live Draft URL: https://5cf71c46d6e0efd765871a15--davidwells.netlify.com
```

If you want to make this live to the world, add the `-p` or `--prod` flag to publish to your live URL.

```bash
netlify deploy -p
```

Careful with this puppy 👆 and verify your site/app is built AND working before potentially deploying something broken.

## Zoom Zoom

We are now deploying in style with the `netlify-cli` 😎

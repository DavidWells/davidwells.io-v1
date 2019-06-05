---
title: "Speed up your Netlify deploy workflow with the CLI"
descriptions: "How to speed up your Netlify workflow with faster deploys"
author: DavidWells
date: 2019-05-09 09:30:00
draft: true
layout: post
---

Like Ricky Bobby once said...

> I want to go fast

We all want to move quick. I'm going to share a quick tip on getting faster Netlify deployments.

Sometimes I just need a preview URL and I need it **meow**.

This is where the `netlify deploy` command comes in.

<iframe width="560" height="315" src="https://www.youtube.com/embed/WtZ4bG2K0MA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

`netlify deploy` allows you to quickly pipe up your files into Netlify. The CLI will return a unique preview URL for you to scope out and share with your team etc.

**But why?**

Well Timmy, not tiny change needs or deserves to be committed into git just to get back that sweet, sweet deploy preview URL.

If you haven't installed the `netlify-cli` you can do so with `npm`

```bash
npm install netlify-cli -g
```

Then login to your [Netlify Account](https://app.netlify.com)

```bash
netlify login
```

Then link your local site in your site `cwd`

```bash
netlify link
```

Then run your local build. This step is important don't miss it!

```bash
npm run build
```

Then deploy!!!!!

```bash
netlify deploy
```

This will return back your preview URL

```bash
➜  davidwells.io git:(master) ✗ netlify deploy
Deploy path:        /Users/davidwells/David/davidwells.io/public
Configuration path: /Users/davidwells/David/davidwells.io/netlify.toml
Deploying to draft URL...
✔ Finished hashing 3047 files
✔ CDN requesting 2816 files
✔ Finished uploading 2844 assets
✔ Draft deploy is live!

Logs:           https://app.netlify.com/sites/davidwells/deploys/5cf71c46d6e0efd765871a15
Live Draft URL: https://5cf71c46d6e0efd765871a15--davidwells.netlify.com
```

Add the `-p` or `--prod` flag to publish to your live URL.

## Zoom Zoom

We are now deploying in style with the `netlify-cli`

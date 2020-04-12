---
title: How to easily keep project dependencies up to date with greenkeeper.io
author: DavidWells
date: 2016-04-26 06:58:52
layout: post
category: dev
tags:
  - tools
---

The modular nature of the JavaScript ecosystem is vast and truly incredible.

The community has embraced the Unix philosophy:

> Write programs that do one thing and do it well

Having a modular system does, however, come with some drawbacks.

Mainly dependency management.

Instead of maintaining all of your code internally, we leverage the power of the open-source world and pull in a ton of third party (and first-party) modules.

Keeping these modules up to date can be a challenge...

One way to curb the dependency blues is an excellent service call [greenkeeper.io](https://greenkeeper.io/).

https://www.youtube.com/watch?v=COKpAj2sRs4

Greenkeeper will automatically track your project's dependencies and automatically submit pull requests to update anything that is outdated!

The pull requests will be non-breaking if you and your dependencies follow correct [semantic versioning](https://docs.npmjs.com/getting-started/semantic-versioning) rules. Woot!

# Install greenkeeper.io

In your terminal install with these commands:

```bash
npm install -g greenkeeper
# then login
greenkeeper login
# then enable in the root of your project
greenkeeper enable
```

I hope this saves you some time and keeps your projects fresh to def.

Happy coding!

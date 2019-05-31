---
title: Static Site Post Scheduler
description: schedule content & updates for static sites
thumbnail: https://s3-us-west-2.amazonaws.com/assets.davidwells.io/work/serverless-post-scheduler.jpg
date: 2017-04-12
layout: Portfolio
---

# Static Site Post Scheduler

The post scheduler is a [serverless](https://github.com/serverless/serverless) project that gives static site owners the ability to schedule posts (or other site content).

It works with any static site setup (Jekyll, Hugo, Phenomic, Gatsby etc.)

[Video demo](https://www.youtube.com/watch?v=YETxuhexZY4&index=1&list=PLIIjEI2fYC-BubklemD4D51vrXHOcUOpc&t=31s) | [Repo](https://github.com/serverless/post-scheduler)

## How does it work?

<img align="right" width="500" height="313" src="https://cloud.githubusercontent.com/assets/532272/23643861/250f2ca0-02b9-11e7-9a1b-94676043f2aa.gif">

1. A github webhook fires when pull requests (aka new posts) are updated.

2. If the pull request comment has a comment matching `schedule(MM/DD/YYYY H:MM pm)` and the person is a collaborator on the project, the post gets scheduled for you.

3. A serverless cron job runs every hour to check if a post is ready to be published

4. When the post is ready to be published, the cron function automatically merges the branch into `master` and your site, if you have CI/CD built in, will redeploy itself.

To cancel scheduled posts, delete the scheduled comment and it will unschedule the branch.

### Github Webhook Architecture Overview

![cloudcraft - post scheduler webhook](https://cloud.githubusercontent.com/assets/532272/23387076/2e7960b2-fd0f-11e6-88da-49517b27d8ae.png)

### Cron Job Architecture Overview

![cloudcraft - post scheduler cron setup](https://cloud.githubusercontent.com/assets/532272/23388042/e129772e-fd14-11e6-96ca-ff23a019a51e.png)

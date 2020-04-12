---
title: Netlify CLI
description: Netlify's extendable command-line tool
thumbnail: https://s3-us-west-2.amazonaws.com/assets.davidwells.io/work/netlify-cli-image.jpg
date: 2019-02-01
layout: portfolio
---

I rebuilt the [Netlify command-line interface](https://github.com/netlify/cli/).

This project was a revamp of the Go-based Netlify CLI.

The work involved designing the CLI API & interface, managing the project, and building out the [cli docs site](https://cli.netlify.com/).

## Repo

<a href="https://github.com/netlify/cli/">
  <img src='https://s3-us-west-2.amazonaws.com/assets.davidwells.io/work/netlify-cli-repo.jpg' />
</a>

## CLI reference site

<a href="https://cli.netlify.com/">
  <img src="https://s3-us-west-2.amazonaws.com/assets.davidwells.io/work/netlify-cli-docs-site.jpg" />
</a>

## Commands

See the latest commands in the [docs](https://cli.netlify.com/)

```bash
➜  netlify-cli-dir git:(master) netlify

⬥ Netlify CLI
Read the docs: https://www.netlify.com/docs/cli
Support and bugs: https://github.com/netlify/cli/issues

Netlify command-line tool

VERSION
  netlify-cli/2.11.19 darwin-x64 node-v10.4.1

USAGE
  $ netlify [COMMAND]

COMMANDS
  deploy     Create a new deploy from the contents of a folder
  dev        Local dev server
  functions  Manage netlify functions
  help       display help for netlify
  init       Configure continuous deployment for a new or existing site
  link       Link a local repo or project folder to an existing site on Netlify
  login      Login to your Netlify account
  open       Open settings for the site linked to the current folder
  plugins    list installed plugins
  sites      Handle various site operations
  status     Print status information
  unlink     Unlink a local folder from a Netlify site
  watch      Watch for site deploy to finish
```

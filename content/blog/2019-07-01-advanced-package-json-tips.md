---
title: "5 Advanced npm package.json configuration tips"
description: "Advanced patterns for making `npm` scripts & `package.json` even more awesome"
author: DavidWells
date: 2019-07-01 09:30:00
layout: post
category: dev
tags:
  - node
---

Node, npm, and `package.json` are super awesome.

Together they give devs a rich dev environment & build system out of the box.

Over my years as a node dev, I've gathered some advanced patterns for making `npm` scripts & `package.json` even more awesome, so I thought I'd share.

**Hope these help ya**. Also, leave a comment below if you have!

## 1. Using NPM script `pre` & `post` lifecycle

`npm` has built-in lifecycle methods for your package `scripts`. When you use `pre` and `post` with commands, they will run before and after the given script.

**An Example**

```json
{
  "name": "npm-lifecycle-example",
  "scripts": {
    "prefoo": "echo prefoo",
    "foo": "echo foo",
    "postfoo": "echo postfoo"
  }
}
```

Running `npm run foo` will run these three commands in order

1. `prefoo`,
2. `foo`,
3. then `postfoo`

Will result in:

```bash
echo prefoo
echo foo
echo postfoo
```

Use this for `prebuild` and `postbuild` (and whatever else 🌈). This is very handy for baking in deploy processes & chaining npm commands together.

## 2. Passing an argument into a command

You can dynamically pass values into an npm script.

To do this, you need to use the `$npm_config_{key}` value in your command.

**Example:**

```json
{
  "name": "passing-flags-into-command",
  "scripts": {
    "pass-arg": "node scripts/lol.js --name=$npm_config_name",
  }
}
```

Then use it:

```bash
npm run pass-arg --name woot
```

In this example, we are running `lol.js` with the arg.

```js
const argv = require('minimist')(process.argv.slice(2));
console.log(argv.name);
// woot
```

This is super handy for makeshift CLI tools within your projects.

## 3. Using values from package.json `config` key

To avoid repeating configuration in a bunch of different scripts, You can reference values from the `package.json` file `config` field.

```json
{
  "config": {
    "SESSION_ENDPOINT": "my-value"
  },
  "scripts": {
    "set-env": "REACT_APP_ENDPOINT=$npm_package_config_ENDPOINT react-scripts start"
  }
}
```

This is handy for certain occasions.

## 4. Using `cross-env` for cross platform scripts

The setting environment variables in a script is pretty easy; however, they aren't cross-platform compatible (cough cough windows)

The `cross-env` pkg from npm allows you set ENV vars for the command to use so anyone running your scripts will be happy.

**Example:**

```json
{
  "name": "using-cross-env",
  "scripts": {
    "cross-env": "cross-env NODE_ENV=prod OTHERFLAG=xyz webpack --config webpack.js",
  }
}
```

This will set `NODE_ENV=prod` and `OTHERFLAG=xyz` to `process.env` variables for webpack to use (for example).

Props to [kentcdodds](https://twitter.com/kentcdodds) for making this gem.

## 5. Passing arguments to other npm commands

Sometimes we need to pass additional arguments to an existing npm script.

Rather than altering the existing script every time we want the arg, or duplicating the script over and over, we can leverage the `--` separator.

**Example json**

```json
{
  "name": "passing-flags-example",
  "scripts": {
    "my-script": "esw src/components",
    "pass-flags-to-other-script": "npm run my-script -- --watch",
  }
}
```

This example below will pass the `--watch` flag to the `my-script` command.

```bash
npm run pass-flags-to-other-script
```

Will run:

```bash
esw src/components --watch
```

This is super handy for setting up `test` scripts with a normal mode and a `watch` mode.

## Putting it all together

Here is are all the methods combined into a MEGA json.

```json
{
  "name": "advanced-package-json",
  "version": "0.1.0",
  "private": true,
  "config": {
    "SESSION_ENDPOINT": "my-value"
  },
  "dependencies": {
    "react": "^15.6.1",
  },
  "scripts": {
    "pass-arg": "node scripts/lol.js --name=$npm_config_name",
    "set-env": "REACT_APP_ENDPOINT=$npm_package_config_ENDPOINT react-scripts start",
    "cross-env": "cross-env NODE_ENV=prod OTHERFLAG=xyz webpack --config webpack.js",
    "my-script": "esw src/components",
    "pass-flags-to-other-script": "npm run my-script -- --watch",
  },
  "devDependencies": {
    "react-scripts": "^1.1.4",
    "cross-env": "^1.1.4"
  }
}
```

## Do you know any other `package.json` tips?

Let me know in the comments below.

Go forth and

```
npm init
```

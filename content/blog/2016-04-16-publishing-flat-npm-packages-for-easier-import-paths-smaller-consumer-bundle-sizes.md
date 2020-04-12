---
title: 'Publishing flat npm packages for easier import paths & smaller consumer bundle sizes'
author: DavidWells
date: 2016-04-16 20:56:53
layout: post
category: dev
---
I recently published a library on npm named `react-dom-primitives`.

It's a library that abstracts away base DOM nodes from jsx with the future goal on hot-swapping out base DOM nodes for, let's say, react-native components.

For example, you would use the `react-dom-primitives` `<P>` component instead of `<p>` in your render method. Then if you want to render your component in react native, you can swap the `<P>` component for the rn equivalent `<Text>` component under the hood.

Anywho, I was trying to find a way to publish an npm package so consumers could include these DOM primitives easily and not have to include the entire library if they just want a couple of pieces.

Lodash is a good example of this. Where you can include only what you want from the entire library, this keeps your final build smaller.

### Paths before publishing flattly:

```js
import P from 'react-dom-primitives/lib/P'
```

### Paths after publishing flattly:

```js
import P from 'react-dom-primitives/P'
```

## How?

Well, it turns out whatever directory you run `npm publish` from will be the package uploaded NPM. Duh....

So, instead of publishing from the root directory of the project (including your built `dist` or `lib` folder) you just need to copy over your package.json file into the directory of your built output and publish from there.

So my build script `npm run build` will run the normal build process, create the `/lib/` folder with the built output, then copy the current package.json file into the `/lib/` directory.

Then I run `npm run dist` and I `cd` into the `lib` folder and `npm publish` from there.

```json
// package.json
 "scripts": {
    "start": "node server.js",
    "clean-lib": "node_modules/.bin/rimraf ./lib",
    "build": "npm run clean-lib && webpack --config webpack.production.config.js --colors --progress --inline && npm run build:utils && npm run build:index && npm run copypackage",
    "build:utils": "webpack --config webpack.production.utils.config.js --colors --progress --inline",
    "build:index": "babel src/primatives/index.js --out-file lib/index.js",
    "copypackage": "cp -rf package.json lib",
    "dist": "cd lib && npm publish"
  },
```

This provides a much nicer way for developers to include only specific files from your package and will reduce their overall bundle size.

If you have nested dependencies that you also need to be flat, check out [this post](https://medium.com/@jbscript/publishing-flat-modules-to-npm-4367f5e0c10d) for a cool gulp driven way to do that.

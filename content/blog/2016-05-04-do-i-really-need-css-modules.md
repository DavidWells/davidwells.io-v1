---
title: Do I really need CSS modules?
author: DavidWells
date: 2016-05-04 22:48:14
layout: post
category: dev
tags:
  - "frontend"
  - css
---

You might have heard about [PostCSS](http://davidwells.io/blog/what-is-postcss/) and CSS modules, but you are still recovering from the onslaught of 10,000 other frontend build process changes.

**The question you are asking yourself:**

> Do I **REALLY** need CSS modules?
> Aren't they just another frontend hipster fad?
>
> -- You

Let's discuss it!

# Checklist: Do I need CSS modules

1. Is your markup going to be running inside of a third party environment?
2. Are you working on a team?
3. Are you incorporating third party CSS resets or libraries in your CSS?
4. Do you want your styles to look correct no matter what?

If you answered yes to any of these questions, then CSS modules are for you.

**Congratulations!!!! (You get modules & you get modules in Oprah's voice)**

If not, CSS modules might be overkill, and you can revisit them at a later time.

# Let's break it down

Let's run through each of those items on the checklist.

## 1. Third-Party Environments

A third party environment is one that you don't control.

Third-party examples:

- running inside of WordPress (as a plugin or theme)
- running inside of chrome, where extensions can mess up your CSS
- running inside of firefox
- running inside of other projects. a.k.a you are a CSS library author

The truth is, ALLLLLLLLL of your markup and CSS is subject to bad things while living inside the browser. Thanks to extensions and third-party JS running amuck on the web.

## 2. Working on a team

If you are writing CSS with teammates in the global scope, it's incredibly easy to step on each other's toes.

This is why 'rules' like [BEM](https://css-tricks.com/bem-101/) and [SUITCSS](http://suitcss.github.io/) came about to try and enforce CSS naming conventions to help stop CSS clashes.

Unfortunately, even if you do follow one of these methodologies, someone is going to mess up somewhere.

We are humans, after all.

## 3. Using Third-Party CSS in your own

If you are using bootstrap, foundation, skeleton, or any other CSS third party library to achieve some out of the box styling you have probably noticed that styles you write clash with the frameworks quite often.

This is a real bummer.

This can be easily avoided with CSS modules and PostCSS. Yay!

## 4. Do you want your styles to look right?

Some people don't care about these edge cases or are working solo on a project.

Lucky them! But most folks I know aren't in this boat!

They are in the "WTF CSS!" boat, where they need to deal with these quirks of global CSS.

We need our styles to look how they should across all browsers, no matter what the environment (browser plugins, etc.) looks like.

So localizing CSS with CSS modules + webpack/gulp/grunt solves these issues for us.

# CSS Modules Example

This is a contrived example but illustrates what CSS modules do.

Basically, they will take your normal CSS classes that might be generic like `.title` and converts it into a super unique `.FolderName__title_xyz123s` class.

**Input:**

```css
/* style.css before CSS modules and PostCSS */
.className {
  color: green;
}
```

**Output:**

```css
/* style.css after CSS modules and PostCSS */
.FolderName__title_21311hgwjqgqjy {
  color: green;
}
/* Good F&#039;ing luck trying to clash with this internets! */
```

Now your markup is safe(r) from things messing with it.

**Note:** you can minify class names in production for fewer characters shipped to the client.

# Handy CSS Modules Resources

Watch this, then re-watch it.

https://www.youtube.com/watch?v=zR1lOuyQEt8

Links:
- [What are CSS Modules and why do we need them?](https://css-tricks.com/css-modules-part-1-need/)
- [The End of Global CSS](https://medium.com/seek-ui-engineering/the-end-of-global-css-90d2a4a06284)
- [CSS-modules on github](https://github.com/css-modules/css-modules)
- [CSS modules + webpack demo](https://github.com/css-modules/webpack-demo)

# Are you using CSS modules?

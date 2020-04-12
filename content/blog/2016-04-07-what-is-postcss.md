---
title: What is PostCSS?
author: DavidWells
date: 2016-04-07 00:10:22
layout: post
category: dev
tags:
  - tools
  - postcss
  - css
---

I bet you are probably wondering what the heck is this PostCSS thing all about.

> "A post processor? WTF mate. I already have a preprocessor. (LESS/SASS/SCSS)"
>
> -- You

### In a nutshell, PostCSS does the exact same thing as LESS/SASS/SCSS...

<img src="https://s3-us-west-2.amazonaws.com/assets.davidwells.io/legacy/2016/04/postcss-logo.png" alt="postcss-logo" width="149" height="146" class="right size-full wp-image-5227" />But more. Much much more.

PostCSS is much like Babel for JavaScript.

[Babel](http://babeljs.io/) lets you transpile the future specification of JavaScript (ES2015 a.k.a ES6) into browser-friendly ES5 JavaScript. Meaning, you can write future JavaScript today!

PostCSS is very similar. It parses your CSS, turns it into the raw AST (abstract syntax tree) then performs transformations to the CSS that today's browsers will understand and render!

One such transformation, Using the [CSSNext plugin with PostCSS](https://github.com/MoOx/postcss-cssnext), allows you to write CSS4 (the future standard of CSS) today!

Here is an example of css4
```css
/* Your Apps Source Code CSS using CSS4 */
/* css4 custom properties */
:root {
--fontSize: 1rem;
--mainColor: #12345678;
}

/* css4 var() &amp; calc() */
body {
  color: var(--mainColor);
  font-size: var(--fontSize);
  line-height: calc(var(--fontSize) * 1.5);
  padding: calc((var(--fontSize) / 2) + 1px);
}

/* css4 filters */
.blur {
  filter: blur(4px);
}
```
After being run through PostCSS w/ cssnext it will outputs to:
```css
/* output after postCSS processing ready for browsers of today */
body {
  color: rgba(18, 52, 86, 0.47059);
  font-size: 16px;
  font-size: 1rem;
  line-height: 24px;
  line-height: 1.5rem;
  padding: calc(0.5rem + 1px);
}

.blur {
 filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feGaussianBlur stdDeviation="4" /></filter></svg>#filter');
 -webkit-filter: blur(4px);
         filter: blur(4px);
}
```

## That is just the beginning

The above example is barely scratching the surface.

PostCSS has a [massive list of plugins](https://github.com/postcss/postcss/blob/master/docs/plugins.md) you can use to customize your CSS workflow

Don't like the new browser spec for custom CSS variables?

Not to worry you can use your familiar `$variables` in PostCSS just like LESS/SASS/SCSS with [PostCSS-simple-vars](https://github.com/postcss/postcss-simple-vars)

Don't like that syntax either? [Write your own](https://github.com/postcss/postcss-plugin-boilerplate) with a custom plugin.

This is the power of PostCSS. It's completely customizable via plugins.

It can transform your written CSS into pretty much anything you can imagine.

If you want to port over your existing LESS/SASS/SCSS code bases you can use the same syntaxes with [PostCSSLess](https://github.com/gilt/postcss-less) or [PostSCSS](https://github.com/postcss/postcss-scss)

## Some of my favorite things to do with PostCSS:

1. Using CSS4 now [CSSNext](https://github.com/MoOx/postcss-cssnext)
2. Better vender prefixing with [autoprefixer](https://github.com/postcss/autoprefixer)
3. Flexboxify back to IE8 with [postcss-flexibility](https://github.com/7rulnik/postcss-flexibility)
4. Stop third party (or first party... cough) CSS from breaking yours using [PostCSS-initial](https://github.com/maximkoretskiy/postcss-initial) and [css-modules](https://medium.com/seek-ui-engineering/the-end-of-global-css-90d2a4a06284).
5. Use CSS variables and Mixins in Javascript land using webpack
6. Parse CSS for Accessibility issues with [postcss-wcag-contrast](https://github.com/jonathantneal/postcss-wcag-contrast)
7. Making calculation in CSS with math.js [postcss-math](https://github.com/shauns/postcss-math)
8. Using [Australian CSS](https://github.com/dp-lewis/postcss-australian-stylesheets). JK on this one but it is funny =)

That's all for now. I will be writing some posts about each of these in the upcoming weeks. Stay tuned.

Tweet at me [@DavidWells](https://twitter.com/DavidWells) if you have any questions or leave them in the comments down below.

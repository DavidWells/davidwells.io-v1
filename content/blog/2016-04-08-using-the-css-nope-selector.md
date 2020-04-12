---
title: Using the CSS NOPE selector for ultimate specificity
author: DavidWells
date: 2016-04-08 07:30:52
layout: post
category: dev
tags:
  - react
  - css
---

CSS lives in the global namespace, and we don't always have the ability to control happens in the global namespace. Collisions happen quite often.

Collisions from:

1. Third-party CSS from widgets, do-dads, whosZaMaWhatsIts, etc.
2. Browser Addons
3. First party team members
4. Other WordPress plugins/themes
5. The list goes on...

You will eventually run into one of the following scenarios:

1. Some inconsiderate developer added some CSS to a project or a package with the `!important` tag and you would like to change it.
2. You are running your markup/CSS in a third party environment and you want to ensure your styles work, **no matter what**.
3. You need to override some CSS loading after yours, but the CSS loading after is using a super-specific selector that you "can't" override.

Is all hope is lost? Nay good sir.

I'm going to introduce you to what I affectionately call the **NOPE selector**.

It will trump all `!important` rules and CSS specificity and get your CSS working the way it should.

> Disclaimer: "With great power comes great responsibility"
> - Uncle Ben

This trick is meant to get you out of a pinch. Not to be a lazy ass.

If you can fix your CSS problems the correct way, do it. If you can't, use this Jedi CSS hack.

Okay, now that we are on the same page. Here is goes:

The most specific you can get with a CSS selector is prefixing a given selector with `:root:root:root`

`:root:root:root` is the root of the root of the root. Whatever that means...

Let's look at some code.

```css
/* red? For serious? */
.your-selector {
  color: red;
}

/* red and orange suck! Make this color badass */
:root:root:root .your-selector {
  color: #BADA55;
}

/* no more orange, because of specificity level of the NOPE selector */
body .your-selector {
  color: orange;
}
```

The above code will turn `.your-selector` color to `#BADA55` while ignoring `red` and `orange`.

Are other global CSS selectors messing with your code? **NOPE** =)

When getting ultra-specific with selectors you can override third party CSS pretty easily.

## NOPE selector specificity in action

<p data-height="353" data-theme-id="0" data-slug-hash="vGppjr" data-default-tab="css" data-user="DavidWells" class="codepen">See the Pen <a href="http://codepen.io/DavidWells/pen/vGppjr/">Using the NOPE selector</a> by DavidWells (<a href="http://codepen.io/DavidWells">@DavidWells</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

# NOPE Selector vs. !important

<p data-height="382" data-theme-id="0" data-slug-hash="xVppzr" data-default-tab="css" data-user="DavidWells" class="codepen">See the Pen <a href="http://codepen.io/DavidWells/pen/xVppzr/">Using the NOPE selector against !important</a> by DavidWells (<a href="http://codepen.io/DavidWells">@DavidWells</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

Now that you know this trick. Please use it with only the best intentions.

Fixing CSS collisions doesn't need to be a chore.

This will help in your journey to CSS nirvana.

Go forth and CSS.

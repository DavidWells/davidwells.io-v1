---
title: Better Developer Blogging with Easy Markdown
author: DavidWells
date: 2016-05-09 20:27:26
layout: post
category: dev
tags:
  - markdown
  - tools
---

> TLDR; Write posts in WordPress using github flavored markdown without wanting to kill yourself.

<a href="https://github.com/DavidWells/easy-markdown/"><img src="https://s3-us-west-2.amazonaws.com/assets.davidwells.io/legacy/2016/05/easy-markdown-logo-300x110.png" alt="easy-markdown-logo" width="300" height="110" class="size-medium wp-image-5280" /></a>

Blogging about code in WordPress has historically been a **HUGE** pain in the ass.

TinyMCE and the WordPress visual editor garble your code like it's their job.

I've tried every single syntax highlighter plugin in existence.

They all fell short in one way or another.

So like any good developer. I rolled my own.

# Easy Markdown WordPress Plugin

https://www.youtube.com/watch?v=dRMow19g0VU

[Download Easy Markdown Plugin](https://github.com/davidwells/easy-markdown)

I made this with a focus on JavaScript and it supports ES6 javascript syntax highlighting and JSX for React code snippets.

### Languages Supported:

- html
- css
- javascript (ES6)
- applescript
- bash
- git
- json
- less
- markdown
- jsx
- sass
- scss
- yaml

If you don't see your language here, make a custom Prism build and replace the `prism.js` [file](https://github.com/DavidWells/easy-markdown/blob/master/js/prism.js).

# Install:

1. [Download](https://github.com/davidwells/easy-markdown)
2. [Install](http://www.wpbeginner.com/beginners-guide/step-by-step-guide-to-install-a-wordpress-plugin-for-beginners/)
3. Visit profile and check 'Disable the visual editor when writing' in the profile page of WP admin `/wp-admin/profile.php`

# Prior Art

Syntax highlighting is handled by [Prism](http://prismjs.com/).

The Markdown parser was shamelessly gutted from [JetPack](https://wordpress.org/plugins/jetpack/) and [Evan Solomon](https://github.com/evansolomon)'s GitHub flavored markdown script

Thanks! =)

# Examples:

```js
// JavaScript!
var greeting = 'What up G'
alert(greeting)
```

```jsx
// React BABY!
var ProductItem = React.createClass({
  render: function () {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.price}</td>
      </tr>
    );
  }
});
```

```html
// HTML!
<a href="http://davidwells.io">
  Wowza!!!!
</a>
```

```css
/* CSS! */
.ninja {
 visibility: hidden;
}
```

```php
// PHP!
<?php
  echo 'Derp';
?>
```

```bash
# Bash script
mkdir lololol && cd lololol
```

# Customizing it

I'm not supporting custom use cases and styles.

You can fork the plugin and do this yourself!

To change CSS, edit the `prism.css` [file](https://github.com/DavidWells/easy-markdown/blob/master/css/prism.css)

To change/customize prism edit the `prism.js` [file](https://github.com/DavidWells/easy-markdown/blob/master/js/prism.js).

To [add support for more custom post types alter these lines](https://github.com/DavidWells/easy-markdown/blob/master/includes/wpcom-markdown.php#L356-L360).

# Happy Blogging!

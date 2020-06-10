---
title: "Simplify form handling in your app using valid HTML elements"
description: "Using valid HTML form inputs for streamlined form handling in your app"
author: DavidWells
date: 2019-09-04 09:30:00
layout: post
tags:
  - analytics
  - javascript
  - forms
---

If your website or app does something (anything), you most likely have this flow somewhere:

1. The user enters information into a form
2. Run Input validation (optional)
3. User submits form
4. Data sent to the backend for processing 🚀

To handle this flow, we'll need to handle form inputs in our code.

Often times, in the land of JS fatigue, I see devs jump for framework-specific libraries or larger "form state" solutions to address form handling.

There are many many libraries to tackle form problems [formsy React](https://github.com/christianalfoni/formsy-react), [redux-forms](https://redux-form.com/8.2.2/), [final-form](https://github.com/final-form/final-form), [formik](https://jaredpalmer.com/formik/), the list goes on...

> Aside: These libs offer a number of features & support various edge cases etc. Use them if you need them! Kudos to the respective open-source authors for their time & awesomeness 🎉

But... I'm always wondering why folks are not using simple HTML forms & grabbing values from the DOM.

In my experience with building large web apps, these larger **"form state"** solutions have turned out to be more than I need.

This post is about using simple valid HTML form inputs for form handling.

This approach works with any framework or with plain ol' HTML.

## Why you no HTML?

HTML forms have existed since the dawn on the web. Those input nodes are battle-tested and work quite well. In this post, we are going to use them to grab form values and do our interesting app stuff.

Using native [form event listeners](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event) work great to solve this problem but the developer ergonomics around the DOM APIs and grabbing values from different types of inputs is the tricky bit.

```html
<html>
  <body>
    <!-- The awesome app form -->
    <form id="baz" action="/" method="POST">
      <label>
        <span>Email address</span>
        <input name="email"type="email" required />
      </label>

      <button type="submit" name="submit" class="button">
        Submit Form
      </button>
    </form>

    <!-- The codez -->
    <script>
    /* Get form selector */
    const form = document.querySelector('form[id=baz]')

    /* Make awesome app logic function */
    function doStuff(event) {
      // 1. Get event.target
      // 2. Loop over DOM nodes
      // 3. Get current node values
      // 4. Do app logic
    }

    // Attach the listener
    form.addEventListener('submit', doStuff, false)

    // Lastly Remember to remove listener if in SPA
    form.removeEventListener('submit', doStuff, false)
    </script>
  </body>
</html>
```

The code above isn't too bad, but it can be quite cumbersome to loop over form inputs and grab values from different types of form elements.

What if we need to attach to multiple forms? Logic starts to add up.

## How can we simplify?

There are two approaches to solving this.

### 1. Using get-form-data

The first is using [get-form-data](https://github.com/insin/get-form-data), it's very tiny, and lets you grab all values from a valid form element.

```js
const form = document.querySelector('form[id=baz]')

/* Make awesome app logic function */
function doStuff(event) {
  const data = getFormData(form)
  console.log(JSON.stringify(data))
  // Do stuff with the form data
}

// Attach the listener
form.addEventListener('submit', doStuff, false)
```

It's super simple and works well in [react](https://github.com/insin/react-auto-form).

### 2. Using analytics-util-forms

The second is the [form utility library](https://github.com/DavidWells/analytics/tree/master/packages/analytics-util-forms). This takes things 1 step further and will attach the event listeners to one or more forms for you.

Form utilities is a tiny lib (2.6kB) for reading values from valid HTML forms. I created this form-utils library that was created for use in some upcoming [**analytics plugins**](https://getanalytics.io/plugins).

[Form utilities lib](https://www.npmjs.com/package/analytics-util-forms) exposes these methods `onSubmit`, `onChange`, & `listen`.

You can listen to individual input changes, or full-on "user clicked the submit button" events.

Checkout the example HTML for more on how to use:

- [Example HTML one](https://github.com/DavidWells/analytics/blob/master/packages/analytics-util-forms/examples/all-forms.html)
- [Example HTML two](https://github.com/DavidWells/analytics/blob/master/packages/analytics-util-forms/examples/single.html)

And read on to see the API.

### Listening to form submissions with form-utils

Listen to form submissions & do stuff with inputs.

This will incept form submissions & fire a custom callback before submitting the form normally.

```js
import { onSubmit } from 'analytic-util-forms'

// Add to single form
const formOne = document.querySelector("form[id=one]")
onSubmit(formOne, (event, data) => {
  console.log('form', event.target)
  console.log('form data', JSON.stringify(data, null, 2))
})

// Add to single form with options
onSubmit('form[id=two]', {
  /* Turn on debug to disable submissions and see values */
  debug: true,
  /* Turn off sensitive values filter */
  disableFilter: false,
  //* // Exclude field by name or regex pattern of name attribute
  excludeFields: [
    /private/,
    'shhhh'
  ],
  /* Custom filter function. Return false to exclude data */
  filter: (fieldName, value) => {
    if (fieldName === 'hello') {
      return false
    }
    // credit card number
    if (value.match(/^\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}$/)) {
      return false
    }
    return true
  }
}, (event, data) => {
  console.log('form', event.target)
  console.log('form data', JSON.stringify(data, null, 2))
})

// Remove onSubmit listener
const cleanUpFuntion = onSubmit('form[id=three]', (event, data) => {
  console.log('form', event.target)
  console.log('form data', JSON.stringify(data, null, 2))
})
cleanUpFuntion() // <-- call function to clean up listener


// Listen to all forms on page
onSubmit('all', (event, data) => {
  console.log('form', event.target)
  console.log('form data', JSON.stringify(data, null, 2))
})
```

### Listening to form field changes with form-utils

Listen to form changes & do stuff with inputs.

```js
import { onChange } from 'analytic-util-forms'

// Add to single form with no options
const formOne = document.querySelector("form[id=one]")
onChange(formOne, (event, data) => {
  console.log('form', event.target)
  console.log('form data', JSON.stringify(data, null, 2))
})

// Add to single form with options
onChange('form[id=two]', {
  /* Turn on debug to disable submissions and see values */
  debug: true,
  /* Turn off sensitive values filter */
  disableFilter: false,
  //* // Exclude field by name or regex pattern of name attribute
  excludeFields: [
    /private/,
    'shhhh'
  ],
  /* Custom filter function. Return false to exclude data */
  filter: (fieldName, value) => {
    if (fieldName === 'hello') {
      return false
    }
    // credit card number
    if (value.match(/^\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}$/)) {
      return false
    }
    return true
  }
}, (event, data) => {
  console.log('form', event.target)
  console.log('change data', JSON.stringify(data, null, 2))
})

// Remove onChange listener
const cleanUpFuntion = onChange('form[id=three]', (event, data) => {
  console.log('form', event.target)
  console.log('change data', JSON.stringify(data, null, 2))
})
cleanUpFuntion() // <-- call function to clean up listener

// Listen to all forms on page
onChange('all', (event, data) => {
  console.log('form', event.target)
  console.log('form data', JSON.stringify(data, null, 2))
})
```

### Listening to submission & change events with form-utils

Listen will attach `onChange` & `onSubmit` listeners to forms

```js
import { listen } from 'analytic-util-forms'

// Add to single form with no options
const formOne = document.querySelector("form[id=one]")
listen(formOne, (event, data, type) => {
  console.log('listen type', type)
  console.log('listen form', event.target)
  console.log('listen form data', JSON.stringify(data, null, 2))
})

// Listen to all forms with options
listen({
  /* Turn on debug to disable submissions and see values */
  debug: true,
  /* Turn off sensitive values filter */
  disableFilter: false,
  /* Custom functionality handler for onSubmit */
  onSubmit: (event, data) => {
    console.log('submit form', event.target)
    console.log('submit data', JSON.stringify(data, null, 2))
  },
  onChange: (event, data) => {
    console.log('change form', event.target)
    console.log('change data', JSON.stringify(data, null, 2))
  },
  /* Include only specific forms. This negates 'all'
  includeForms: [
    'form[id=content-form]',
    window.document.forms[1]
  ],
  /**/
  /* Exclude forms by selectors or node.
  excludeForms: [
    'form[name=two]',
    window.document.forms[2]
  ],
  /**/
  //* // Exclude field by name or regex pattern of name attribute
  excludeFields: [
    /private/,
    'shhhh'
  ],
  /**/
  //* // Custom filter function
  filter: (fieldName, value) => {
    if (fieldName === 'hello') {
      return false
    }
    // credit card number
    if (value.match(/^\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}$/)) {
      return false
    }
    return true
  }
  /**/
})
```

## Installing

To install the form helpers in your project run

```bash
npm install analytics-util-forms
```

## Keepin' things small

To keep bundle sizes as tiny as possible, I always checkout bundlephobia for respective package sizes.

- https://bundlephobia.com/result?p=final-form
- https://bundlephobia.com/result?p=redux-form
- https://bundlephobia.com/result?p=formik
- https://bundlephobia.com/result?p=formsy-react
- https://bundlephobia.com/result?p=analytics-util-forms

Keep things as small as you can and budget dependencies accordingly!

## Wrapping up

How you handle form values are ultimately up to you. If other libs or abstractions work for you, great! Keep on truckin 🚚. They handle additional things like validation, dirty inputs, and a bunch of other use cases.

Props to [insin](https://github.com/insin), for the [get-form-data](https://github.com/insin/get-form-data) library for inspiration and the `analytics-util-forms` this uses under the hood.

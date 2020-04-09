---
title: Render Children Markup from in Parent Components in React
author: DavidWells
date: 2016-04-09 09:25:13
layout: post
category: dev
tags:
  - react
  - frontend
---

A couple weeks ago I saw [Michael Jackson](https://twitter.com/mjackson) present his new library [http-client](https://github.com/mjackson/http-client) at the ReactJS meetup in SF.

During his live demo, He showed an interesting component rendering pattern where the parent is handling the markup for the child component.

The child component manages it's state and passes that back up to the parent via the `this.props.children` as a function call.

# whatchu talkin bout willis? Watch this

https://www.youtube.com/watch?v=sVHYWZoQ6g8

This pattern comes with pros and cons.

**Pro:** You can easily see exactly what markup your parent component will render.

**Con:** It couples children and parent together.

Is it good or bad? You decide!

I wanted to share because it's definitely an interesting idea and I love seeing experimentation happening in the React community.

```js
// ParentComponent handles the markup rendering of Child via this.props.children
class ParentComponent extends React.Component {
  render () {
    return (
      <div>
        <h1>Render child markup w/ state in parent</h1>
        <Child start={Date.now()}>
          {(elapsed) => {
            <h1>{elapsed}</h1>
          }}
        </Child>
      </div>
    )
  }
}

// Child 'renders' this.props.children as a function call
class Child extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = { elapsed: 0 }
    this.tick = this.tick.bind(this)
  }
  componentDidMount () {
    this.timer = setInterval(this.tick, 1000)
  }
  tick () {
    this.setState({
      elapsed: new Date() - this.props.start
    })
  }
  render () {
    const time = Math.round(this.state.elapsed / 1000)
    // use children as a function call
    return this.props.children(time)
  }
}
```

# Live Demo

<p data-height="542" data-theme-id="0" data-slug-hash="qZpvxE" data-default-tab="js" data-user="DavidWells" class="codepen">See the Pen <a href="http://codepen.io/DavidWells/pen/qZpvxE/">Render Children State from Parent Component</a> by DavidWells (<a href="http://codepen.io/DavidWells">@DavidWells</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

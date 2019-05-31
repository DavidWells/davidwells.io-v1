import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import styles from './styles.css'
import './style.scss'

class Post extends React.Component {
  render() {
    const {
      title,
      date,
      category,
      description,
    } = this.props.data.node.frontmatter
    const { slug, categorySlug } = this.props.data.node.fields
    console.log('titile', title)
    console.log('slug', slug)

    let catLinks
    if (categorySlug) {
      catLinks = (
        <span className="post__meta-category" key={categorySlug}>
          <Link to={categorySlug} className="post__meta-category-link">
            {category}
          </Link>
        </span>
      )
    }

    return (
      <div className={"post " + styles.mo}>
        <div className="post__meta">
          <time
            className="post__meta-time"
            dateTime={moment(date).format('MMMM D, YYYY')}
          >
            {moment(date).format('MMMM YYYY')}
          </time>
          <span className="post__meta-divider" />
          {catLinks}
        </div>
        <h2 className="post__title">
          <Link className="post__title-link" to={slug}>
            {title}
          </Link>
        </h2>
        <p className="post__description">{description}</p>
        <Link className="post__readmore" to={slug}>
          Readx
        </Link>
      </div>
    )
  }
}

export default Post

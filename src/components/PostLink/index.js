import React from 'react'
import { Link } from 'gatsby'
import { format } from 'date-fns'
import styles from './PostLink.css'

class Post extends React.Component {
  render() {
    const {
      title,
      date,
      category,
      description,
      event
    } = this.props.data.node.frontmatter
    const { slug, categorySlug } = this.props.data.node.fields

    let catLinks
    if (categorySlug) {
      catLinks = (
        <span className={styles.categoryLink} key={categorySlug}>
          <Link to={categorySlug} className='post__meta-category-link'>
            {category}
          </Link>
        </span>
      )
    }

    let location
    if (event) {
      location = (
        <span className={styles.location}>
          - {event}
        </span>
      )
    }

    return (
      <div className={styles.postLink}>
        <Link className='post__title-link' to={slug}>
          <h2 className={styles.title}>
            {title}
          </h2>
        </Link>
        <div className={styles.meta}>
          <time
            className='post__meta-time'
            dateTime={format(date, 'MMMM D, YYYY')}
          >
            {format(date, 'MMMM YYYY')}
          </time>
          {location}
          <span className='post__meta-divider' />
          {catLinks}
        </div>
      </div>
    )
  }
}

export default Post

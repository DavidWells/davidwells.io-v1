import React from 'react'
import { Link } from 'gatsby'
import { format } from 'date-fns'
import styles from './PostLink.css'

class Post extends React.Component {
  render() {
    const { data, externalUrl } = this.props
    const node = (data && data.node) ? data.node : {}
    const frontmatter = node.frontmatter || {}
    const fields = node.fields || {}

    const title = frontmatter.title || data.title
    const date = frontmatter.date || data.date
    const category = frontmatter.category || data.category
    const description = frontmatter.description || data.description
    const event = frontmatter.event || data.event

    const { slug, categorySlug } = fields

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

    let extern
    if (externalUrl) {
      const domain = externalUrl
        .replace('http://', '')
        .replace('https://', '').split(/[/?#]/)[0]
        .replace(/^www\./, '')
      extern = (
        <span className={styles.externalLink}>
          on {domain}
        </span>
      )
    }

    let link = (
      <Link className='post__title-link' to={slug}>
        <h2 className={styles.title}>
          {title}
        </h2>
      </Link>
    )
    if (data.url) {
      link = (
        <a className='post__title-link' target='_blank' rel='noopener noreferrer' href={data.url}>
          <h2 className={styles.title}>
            {title}
          </h2>
        </a>
      )
    }

    return (
      <div className={styles.postLink}>
        {link}
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
          {extern}
        </div>
      </div>
    )
  }
}

export default Post

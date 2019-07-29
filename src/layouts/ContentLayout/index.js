import React from 'react'
import { Link } from 'gatsby'
import { format } from 'date-fns'
import Helmet from 'react-helmet'
import Content from '../../fragments/Content'
import disqus from './disqus-script'
import styles from './styles.css'

class ContentLayout extends React.Component {
  render() {
    const { comments, footer, data } = this.props
    const post = data.markdownRemark
    const tags = post.fields.tagSlugs

    const tagsBlock = (
      <div className={styles.tags}>
        <ul>
          {tags &&
            tags.map((tag, i) => (
              <li key={tag}>
                <Link to={tag}>
                  {post.frontmatter.tags[i]}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    )

    let commentsBlock
    if (comments) {
      commentsBlock = (
        <div>
          <hr />
          <Helmet script={[{ type: 'text/javascript', innerHTML: disqus }]} />
          <div className={styles.comments} id='disqus_thread' />
        </div>
      )
    }

    let metaDisplay
    if (footer) {
      metaDisplay = (
        <div className={styles.footer}>
          <div className={styles.postMeta}>
            Published {format(post.frontmatter.date, 'D MMM YYYY')}
          </div>
          {tagsBlock}
        </div>
      )
    }
    /* add prev / next links https://github.com/gaearon/overreacted.io/blob/94cb9455c5f6bc5c3e86c5cb090244a58642e7d8/src/templates/blog-post.js#L222-L239 */
    return (
      <div>
        <Content
          title={post.frontmatter.title}
          html={post.html}
        />
        {metaDisplay}
        {commentsBlock}
      </div>
    )
  }
}

ContentLayout.defaultProps = {
  footer: true
}

export default ContentLayout

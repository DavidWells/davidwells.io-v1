import React from 'react'
import { Link } from 'gatsby'
import { format } from 'date-fns'
import Content from '../../fragments/Content'
import styles from './styles.css'

class ContentLayout extends React.Component {
  render() {
    const { author } = this.props.data.site.siteMetadata
    const { comments, footer } = this.props
    const post = this.props.data.markdownRemark
    const tags = post.fields.tagSlugs

    const homeBlock = (
      <div></div>
    )

    const tagsBlock = (
      <div className='post-single__tags'>
        <ul className='post-single__tags-list'>
          {tags &&
            tags.map((tag, i) => (
              <li className='post-single__tags-list-item' key={tag}>
                <Link to={tag} className='post-single__tags-list-item-link'>
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
          comments
        </div>
      )
    }

    let metaDisplay
    if (footer) {
      metaDisplay = (
        <div className='xxpost-single__footer'>
          <div className={styles.postMeta}>
            <em>
              Published {format(post.frontmatter.date, 'D MMM YYYY')}
            </em>
          </div>
          {tagsBlock}
          <hr />
          <p className='xxpost-single__footer-text'>
            <a
              href={`https://twitter.com/${author.twitter}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <br /> <strong>{author.name}</strong> on Twitterx
            </a>
          </p>
        </div>
      )
    }

    return (
      <div>
        {homeBlock}
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

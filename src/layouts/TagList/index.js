import React from 'react'
import PostLink from '../../components/PostLink'
import styles from './styles.css'

export default class TagTemplateDetails extends React.Component {
  render() {
    const items = []
    const tagTitle = this.props.pageContext.tag
    const posts = this.props.data.allMarkdownRemark.edges
    posts.forEach(post => {
      items.push(<PostLink data={post} key={post.node.fields.slug} />)
    })

    return (
      <div className='content'>
        <div className='content__inner'>
          <div className='page'>
            <h1 className={styles.title}>
              All Posts tagged as &quot;{tagTitle}&quot;
            </h1>
            <div className='page__body'>
              {items}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

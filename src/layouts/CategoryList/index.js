import React from 'react'
import PostLink from '../../components/PostLink'
import styles from './CategoryList.css'

export default class CategoryList extends React.Component {
  render() {
    const { data, pageContext } = this.props
    const { category } = pageContext
    const posts = data.allMarkdownRemark.edges

    const items = posts.map(post => {
      return (
        <PostLink data={post} key={post.node.fields.slug} />
      )
    })

    return (
      <div className='content'>
        <div className='content__inner'>
          <div className='page'>
            <h1 className={styles.title}>
              All Posts in &quot;{category}&quot;
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

import React from 'react'
import PostLink from '../../components/PostLink'
import styles from './CategoryList.css'

export default class CategoryList extends React.Component {
  render() {
    const items = []
    const { category } = this.props.pageContext
    const posts = this.props.data.allMarkdownRemark.edges
    posts.forEach(post => {
      items.push(<PostLink data={post} key={post.node.fields.slug} />)
    })

    return (
      <div className='content'>
        <div className='content__inner'>
          <div className='page'>
            <h1 className={styles.title}>
              All Posts in &quot;{category}&quot; category
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

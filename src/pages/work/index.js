import React, { Component } from 'react'
import { Link, graphql } from 'gatsby'
import SEO from '../../components/SEO'
import Layout from '../../layouts/Default'
import styles from './Work.css'

const numberOfLatestPosts = 40

const Preview = ({ data }) => {
  // console.log('page', data)
  const { fields, frontmatter } = data.node

  const { draft, description, title, thumbnail } = frontmatter
  if (draft) {
    return null
  }
  // const pageDate = page.date ? new Date(page.date) : new Date()
  // const date = new Date(pageDate.getTime() + Math.abs(pageDate.getTimezoneOffset() * 60000))
  // const dateArray = date.toDateString().split(' ')
  // dateArray.shift()
  return (
    <li className={styles.item}>
      <Link to={fields.slug}>
        <span className={styles.thumbnailWrapper}>
          <span className={styles.thumbnailInner}>
            <img className={styles.thumbnail} src={thumbnail} alt={description} />
          </span>
        </span>
        <div className={styles.details}>
          <h3>
            {title}
          </h3>
          <span className={styles.description}>
            {description}
          </span>
        </div>
      </Link>
    </li>
  )
}

export default class Work extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      display: 'list'
    }
  }
  toggleView = (e) => {
    console.log(e.target.dataset)
    this.setState({
      display: e.target.dataset.view
    })
  }
  render() {
    const { location, data } = this.props
    const posts = data.allMarkdownRemark.edges
    const { display } = this.state
    const viewType = styles[display]

    const renderContent = (
      <ul className={styles.postList}>
        {posts.map((page) => (
          <Preview key={page.node.fields.slug} data={page} />
        ))}
      </ul>
    )

    const listActivce = (display === 'list') ? ` ${styles.active}` : ''
    const gridActivce = (display === 'grid') ? ` ${styles.active}` : ''
    return (
      <Layout>
        <SEO
          title='Davids Portfolio of Work & Projects'
          slug={location.pathname}
        />
        <div className={styles.container}>
          <div className={`${styles.switcher} ${viewType}`}>
            <div className={styles.options}>
              <div onClick={this.toggleView} className={styles.listToggle + listActivce} data-view='list'>
                <span data-view='list' className='' />
                <span data-view='list' className='' />
                <span data-view='list' className='' />
              </div>
              <div onClick={this.toggleView} className={styles.gridToggle + gridActivce} data-view='grid'>
                <span data-view='grid' className='active' />
                <span data-view='grid' className='active' />
                <span data-view='grid' className='active' />
                <span data-view='grid' className='active' />
              </div>
            </div>

            {renderContent}

          </div>
        </div>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query PortfolioQuery {
    allMarkdownRemark(
      limit: 1000
      filter: { frontmatter: { layout: { eq: "portfolio" }, draft: { ne: true } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
            categorySlug
          }
          frontmatter {
            title
            date
            category
            description
            thumbnail
          }
        }
      }
    }
  }
`

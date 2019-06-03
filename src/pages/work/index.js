/*eslint-disable */
import React, { PropTypes, Component } from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import PostLink from '../../components/PostLink'
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
            <img className={styles.thumbnail} src={thumbnail} />
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
  constructor (props, context) {
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
    const items = []
    const { title, subtitle } = this.props.data.site.siteMetadata
    const posts = this.props.data.allMarkdownRemark.edges
    const { display } = this.state
    const viewType = styles[display]

    let renderContent = (
      <ul className={styles.postList}>
        {posts.map((page, i) => (
          <Preview key={page.node.fields.slug} data={page} />
        ))}
      </ul>
    )

    const listActivce = (display === 'list') ? ` ${styles.active}` : ''
    const gridActivce = (display === 'grid') ? ` ${styles.active}` : ''
    return (
      <Layout>
        <Helmet>
          <title>{title}</title>
          <meta name='description' content={subtitle} />
        </Helmet>
        <div className={styles.container}>
          <div className={styles.switcher + ' ' + viewType}>
            <div className={styles.options}>
              <div onClick={this.toggleView} className={styles.listToggle + listActivce}  data-view="list">
                <span data-view="list" className=""></span>
                <span data-view="list" className=""></span>
                <span data-view="list" className=""></span>
              </div>
              <div onClick={this.toggleView} className={styles.gridToggle + gridActivce} data-view="grid">
                <span data-view="grid" className="active"></span>
                <span data-view="grid" className="active"></span>
                <span data-view="grid" className="active"></span>
                <span data-view="grid" className="active"></span>
              </div>
            </div>

            {renderContent}

          </div>
        </div>
      </Layout>
    )
  }
  renderx() {
    const { phenomicLoading, isLoading, params } = this.props
    const { display } = this.state
    const viewType = styles[display]
    const pageNumber = (params && params.page) ? parseInt(params.page, 10) : 0
    const pagination = numberOfLatestPosts * pageNumber
    const offset = pagination + numberOfLatestPosts
    const latestPosts = enhanceCollection(this.context.collection, {
      filter: { layout: 'Portfolio' },
      sort: 'date',
      reverse: true,
    })
    .slice(pagination, offset)
    // console.log('latestPosts', latestPosts)

    let renderContent = (
      <ul className={styles.postList}>
        {latestPosts.map((page, i) => (
          <Preview key={i} page={page} />
        ))}
      </ul>
    )

    const listActivce = (display === 'list') ? ` ${styles.active}` : ''
    const gridActivce = (display === 'grid') ? ` ${styles.active}` : ''
    return (
      <Page {...this.props} phenomicLoading={phenomicLoading}>
        <div className={styles.container}>
          <div className={styles.switcher + ' ' + viewType}>
            <div className={styles.options}>
              <div onClick={this.toggleView} className={styles.listToggle + listActivce}  data-view="list">
                <span data-view="list" className=""></span>
                <span data-view="list" className=""></span>
                <span data-view="list" className=""></span>
              </div>
              <div onClick={this.toggleView} className={styles.gridToggle + gridActivce} data-view="grid">
                <span data-view="grid" className="active"></span>
                <span data-view="grid" className="active"></span>
                <span data-view="grid" className="active"></span>
                <span data-view="grid" className="active"></span>
              </div>
            </div>

            {renderContent}

          </div>
        </div>
      </Page>
    )
  }
}



export const pageQuery = graphql`
  query PortfolioQuery {
    site {
      siteMetadata {
        title
        subtitle
        copyright
        menu {
          label
          path
        }
        author {
          name
          email
          telegram
          twitter
          github
          rss
          vk
        }
      }
    }
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

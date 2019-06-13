import React from 'react'
import { graphql } from 'gatsby'
import SEO from '../components/SEO'
import Layout from '../layouts/Default'
import Content from '../fragments/Content'
import styles from './Index.css'

export default class IndexRoute extends React.Component {
  render() {
    const { data, location } = this.props
    const thisPost = data.allMarkdownRemark.edges[0]
    return (
      <Layout>
        <SEO
          title='David Wells - Full Stack Serverless Developer in San Francisco'
          description='David Gregory Wells is full stack serverless developer located in the SF bay area.'
          slug={location.pathname}
        />
        <div className={styles.homeWrapper}>
          <Content html={thisPost.node.html} />
        </div>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(limit: 1, filter: {fields: {slug: {eq: "/"}}}, sort: {order: DESC, fields: [frontmatter___date]}) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
            category
            description
          }
          html
        }
      }
    }
  }
`

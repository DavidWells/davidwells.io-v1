import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../layouts/Default'
import Content from '../fragments/Content'

export default class IndexRoute extends React.Component {
  render() {
    const { data } = this.props
    const { title, subtitle } = this.props.data.site.siteMetadata
    console.log('data', data)
    const thisPost = this.props.data.allMarkdownRemark.edges[0]
    return (
      <Layout>
        <Helmet>
          <title>
            David Wells - Full Stack Serverless Developer in San Francisco
          </title>
          <meta name='description' content={subtitle} />
        </Helmet>
        <div className='content'>
          <Content html={thisPost.node.html} />
        </div>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        subtitle
        copyright
      }
    }
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

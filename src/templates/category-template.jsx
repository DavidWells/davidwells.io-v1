import React from 'react'
import { graphql } from 'gatsby'
import SEO from '../components/SEO'
import Layout from '../layouts/Default'
import CategoryList from '../layouts/CategoryList'

class CategoryTemplate extends React.Component {
  render() {
    const { data, location, pageContext } = this.props
    const { title } = data.site.siteMetadata
    const { category } = pageContext

    return (
      <Layout>
        <SEO
          title={`${category} posts - ${title}`}
          slug={location.pathname}
        />
        <CategoryList {...this.props} />
      </Layout>
    )
  }
}

export default CategoryTemplate

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    site {
      siteMetadata {
        title
        copyright
        author {
          name
          email
          twitter
          github
        }
      }
    }
    allMarkdownRemark(
      limit: 1000
      filter: {
        frontmatter: {
          category: { eq: $category }
          layout: { eq: "post" }
          draft: { ne: true }
        }
      }
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
          }
        }
      }
    }
  }
`

import React from 'react'
import { graphql } from 'gatsby'
import SEO from '../components/SEO'
import Layout from '../layouts/Default'
import TagList from '../layouts/TagList'

class TagTemplate extends React.Component {
  render() {
    const { location, data, pageContext } = this.props
    const { title } = data.site.siteMetadata
    const { tag } = pageContext

    return (
      <Layout>
        <SEO
          title={`All Posts tagged as "${tag}" - ${title}`}
          slug={location.pathname}
        />
        <TagList {...this.props} />
      </Layout>
    )
  }
}

export default TagTemplate

export const pageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
        subtitle
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
          tags: { in: [$tag] }
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

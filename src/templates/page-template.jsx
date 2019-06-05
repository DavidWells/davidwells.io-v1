import React from 'react'
import { graphql } from 'gatsby'
import SEO from '../components/SEO'
import Layout from '../layouts/Default'
import Page from '../layouts/Page'

class PageTemplate extends React.Component {
  render() {
    const { subtitle } = this.props.data.site.siteMetadata
    const page = this.props.data.markdownRemark
    const { title: pageTitle, description: pageDescription } = page.frontmatter
    const description = pageDescription !== null ? pageDescription : subtitle

    return (
      <Layout>
        <SEO
          title={pageTitle}
          description={description}
          slug={page.fields.slug}
        />
        <Page {...this.props} />
      </Layout>
    )
  }
}

export default PageTemplate

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        subtitle
        author {
          name
          email
          twitter
          github
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        tagSlugs
        slug
      }
      frontmatter {
        title
        date
        description
      }
    }
  }
`

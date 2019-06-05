import React from 'react'
import { graphql } from 'gatsby'
import SEO from '../components/SEO'
import Layout from '../layouts/Default'
import Post from '../layouts/Post'

class PostTemplate extends React.Component {
  render() {
    const { title, subtitle } = this.props.data.site.siteMetadata
    const post = this.props.data.markdownRemark
    const { title: postTitle, description: postDescription } = post.frontmatter
    const description = postDescription !== null ? postDescription : subtitle

    return (
      <Layout>
        <SEO
          title={`${postTitle} - ${title}`}
          description={description}
          slug={post.fields.slug}
        />
        <Post {...this.props} />
      </Layout>
    )
  }
}

export default PostTemplate

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        subtitle
        copyright
        author {
          name
          twitter
        }
        disqusShortname
        url
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
        tags
        date
        description
      }
    }
  }
`

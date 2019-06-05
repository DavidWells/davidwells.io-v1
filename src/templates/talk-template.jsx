import React from 'react'
import { graphql } from 'gatsby'
import SEO from '../components/SEO'
import Layout from '../layouts/Default'
import Post from '../layouts/Post'

export default class TalkTemplate extends React.Component {
  render() {
    const { data } = this.props
    const { title, subtitle } = data.site.siteMetadata
    const post = data.markdownRemark
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

export const pageQuery = graphql`
  query TalkBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        subtitle
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
        description,
        event
      }
    }
  }
`

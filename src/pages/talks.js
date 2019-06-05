import React from 'react'
import { graphql } from 'gatsby'
import SEO from '../components/SEO'
import Layout from '../layouts/Default'
import PostLink from '../components/PostLink'

export default class TalksRoute extends React.Component {
  render() {
    const { data } = this.props
    const posts = data.allMarkdownRemark.edges

    const items = posts.map((post, i) => {
      return (
        <PostLink data={post} key={`${post.node.fields.slug}-${i}`} /> // eslint-disable-line
      )
    })

    return (
      <Layout>
        <div>
          <SEO
            title={'David\'s Talks & Workshops'}
            description='Talks and workshops from David'
            slug='/talks'
          />
          <div className='content'>
            {items}
          </div>
        </div>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query TalkQuery {
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
      filter: { frontmatter: { layout: { eq: "talk" }, draft: { ne: true } } }
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
            event
          }
        }
      }
    }
  }
`

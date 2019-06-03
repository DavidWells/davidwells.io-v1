import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../layouts/Default'
import PostLink from '../components/PostLink'
import externalPosts from '../../content/blog/external-posts.json'

function getDate(obj) {
  if (obj.node && obj.node.frontmatter) {
    return obj.node.frontmatter.date
  }
  return obj.date
}

export default class BlogRoute extends React.Component {
  render() {
    const { title, subtitle } = this.props.data.site.siteMetadata
    const posts = this.props.data.allMarkdownRemark.edges

    // merge with external posts
    const allPosts = posts.concat(externalPosts)
    // sort by date
    const sortedPosts = allPosts.sort((date1, date2) => {
      const one = getDate(date1)
      const two = getDate(date2)
      if (one > two) return -1
      if (one < two) return 1
      return 0
    })

    const items = sortedPosts.map((post) => {
      if (post.node) {
        return <PostLink data={post} key={post.node.fields.slug} />
      }
      return <PostLink data={post} key={post.url} />
    })

    return (
      <Layout>
        <Helmet>
          <title>{title}</title>
          <meta name='description' content={subtitle} />
        </Helmet>
        <div className='content'>
          <div className='content__inner'>{items}</div>
        </div>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query BlogQuery {
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
      filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } }
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

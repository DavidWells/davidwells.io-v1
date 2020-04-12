import React from 'react'
import { graphql } from 'gatsby'
import SEO from '../components/SEO'
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
    const { data, location } = this.props
    const posts = data.allMarkdownRemark.edges

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
      return <PostLink data={post} key={post.url} externalUrl={post.url} />
    })

    return (
      <Layout>
        <SEO
          title='Serverless Dev, JavaScript, Node & React tips | David Wells Blog'
          description='Software development tips and tricks in the JavaScript world. Node, React, UI, UX, and startup posts'
          slug={location.pathname}
        />
        <div className='content'>
          {items}
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

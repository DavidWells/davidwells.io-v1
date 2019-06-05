import React from 'react'
import { Link, graphql } from 'gatsby'
import kebabCase from 'lodash/kebabCase'
import SEO from '../components/SEO'
import Content from '../fragments/Content'
import Layout from '../layouts/Default'

export default class TagsRoute extends React.Component {
  render() {
    const { data, location } = this.props
    const tags = data.allMarkdownRemark.group
    return (
      <Layout>
        <SEO title='All Blog Tags' slug={location.pathname} />
        <Content title='All Tags'>
          <div>
            <ul>
              {tags.map(tag => (
                <li key={tag.fieldValue}>
                  <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                    {tag.fieldValue} ({tag.totalCount})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Content>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
        author {
          name
          email
          twitter
          github
        }
      }
    }
    allMarkdownRemark(
      limit: 2000
      filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`

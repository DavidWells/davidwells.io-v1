import kebabCase from 'lodash/kebabCase'
import React from 'react'
import { Link, graphql } from 'gatsby'
import SEO from '../components/SEO'
import Content from '../fragments/Content'
import Layout from '../layouts/Default'

export default class CategoriesRoute extends React.Component {
  render() {
    const { data, location } = this.props
    const categories = data.allMarkdownRemark.group

    return (
      <Layout>
        <SEO
          title='All Blog Categories'
          slug={location.pathname}
        />
        <Content title='All Categories'>
          <div className='categories'>
            <ul className='categories__list'>
              {categories.map(category => (
                <li
                  key={category.fieldValue}
                  className='categories__list-item'
                >
                  <Link
                    to={`/categories/${kebabCase(
                      category.fieldValue
                    )}/`}
                    className='categories__list-item-link'
                  >
                    {category.fieldValue} ({category.totalCount})
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
  query CategoryesQuery {
    site {
      siteMetadata {
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
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`

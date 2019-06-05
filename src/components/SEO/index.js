import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

const query = graphql`
  query GetSiteMetadata {
    site {
      siteMetadata {
        title
        subtitle
        siteUrl
        author {
          name
          twitter
        }
      }
    }
  }
`

function SEO({ meta, image, title, description, slug, lang = 'en' }) {
  return (
    <StaticQuery
      query={query}
      render={data => {
        const { siteMetadata } = data.site
        const metaDescription = description || siteMetadata.subtitle
        const metaImage = image ? `${siteMetadata.siteUrl}/${image}` : null
        const url = `${siteMetadata.siteUrl}${slug}`
        return (
          <Helmet
            htmlAttributes={{ lang }}
            {...(title
              ? {
                  titleTemplate: `%s`,
                  title,
                }
              : {
                  title: `${siteMetadata.title}`,
                })}
            meta={[
              {
                name: 'description',
                content: metaDescription,
              },
              {
                property: 'og:url',
                content: url,
              },
              {
                property: 'og:title',
                content: title || siteMetadata.title,
              },
              {
                property: 'og:description',
                content: metaDescription,
              },
              {
                name: 'twitter:card',
                content: 'summary',
              },
              {
                name: 'twitter:creator',
                content: siteMetadata.author.twitter,
              },
              {
                name: 'twitter:title',
                content: title || siteMetadata.title,
              },
              {
                name: 'twitter:description',
                content: metaDescription,
              },
            ]
              .concat(
                metaImage
                  ? [
                      {
                        property: 'og:image',
                        content: metaImage,
                      },
                      {
                        name: 'twitter:image',
                        content: metaImage,
                      },
                    ]
                  : []
              )
              .concat(meta)}
          />
        )
      }}
    />
  )
}

SEO.defaultProps = {
  meta: [],
  title: '', // eslint-disable-line
  slug: '',
}

SEO.propTypes = {
  description: PropTypes.string,
  image: PropTypes.string,
  meta: PropTypes.array,
  slug: PropTypes.string,
  title: PropTypes.string.isRequired,
}

export default SEO

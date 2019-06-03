const _ = require('lodash')
const path = require('path')
const slash = require('slash')

const dateRegex = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])-/g
const rootDir = path.join(__dirname)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve('./src/templates/post-template.jsx')
    const pageTemplate = path.resolve('./src/templates/page-template.jsx')
    const tagTemplate = path.resolve('./src/templates/tag-template.jsx')
    const talkTemplate = path.resolve('./src/templates/talk-template.jsx')
    const categoryTemplate = path.resolve('./src/templates/category-template.jsx')

    graphql(`
      {
        allMarkdownRemark(
          limit: 1000
          filter: { frontmatter: { draft: { ne: true } } }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                tags
                layout
                category
              }
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        console.log(result.errors)
        reject(result.errors)
      }

      _.each(result.data.allMarkdownRemark.edges, edge => {
        const layout = _.get(edge, 'node.frontmatter.layout')
        if (layout === 'page' || layout === 'portfolio') {
          createPage({
            path: edge.node.fields.slug,
            component: slash(pageTemplate),
            context: { slug: edge.node.fields.slug },
          })
        } else if (layout === 'talk') {
          createPage({
            path: edge.node.fields.slug,
            component: slash(talkTemplate),
            context: { slug: edge.node.fields.slug },
          })
        } else if (layout === 'post') {
          // console.log('edge.node.fields.slug', edge.node.fields.slug)
          createPage({
            path: edge.node.fields.slug,
            component: slash(postTemplate),
            context: { slug: edge.node.fields.slug },
          })

          let tags = []
          if (_.get(edge, 'node.frontmatter.tags')) {
            tags = tags.concat(edge.node.frontmatter.tags)
          }

          tags = _.uniq(tags)
          _.each(tags, tag => {
            const tagPath = `/tags/${_.kebabCase(tag)}/`
            createPage({
              path: tagPath,
              component: tagTemplate,
              context: { tag },
            })
          })

          let categories = []
          if (_.get(edge, 'node.frontmatter.category')) {
            categories = categories.concat(edge.node.frontmatter.category)
          }

          categories = _.uniq(categories)
          _.each(categories, category => {
            const categoryPath = `/categories/${_.kebabCase(category)}/`
            createPage({
              path: categoryPath,
              component: categoryTemplate,
              context: { category },
            })
          })
        }
      })

      resolve()
    })
  })
}

function formatFileName(name) {
  return name
    .replace(dateRegex, '')
    .replace(/^-*/, '')
    .replace(/\.md$/, '')
    .toLowerCase()
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'File') {
    // console.log('node', node)
    const parsedFilePath = path.parse(node.absolutePath)

    const dirPath = path.dirname(node.absolutePath)
    const dirName = path.basename(path.dirname(node.absolutePath))
    const baseFile = path.basename(node.absolutePath)

    // check for files in root content dir
    const reg = new RegExp(`/${dirName}$`)
    const fileBase = dirPath.replace(reg, '')

    let base = baseFile
    if (baseFile === 'index.md') {
      const parentParent = path.basename(path.dirname(parsedFilePath.dir))
      base = `${parentParent}/${formatFileName(path.basename(parsedFilePath.dir))}`
      // account for /content/index.md
      if (fileBase === rootDir) {
        base = ''
      }
    } else {
      base = `${dirName}/${formatFileName(baseFile)}`
    }

    const cleanSlug = `/${formatFileName(base)}`
    if (baseFile.match(/\.md$/)) {
      // console.log('cleanSlug', cleanSlug)
    }

    createNodeField({ node, name: 'slug', value: cleanSlug })
  } else if (
    node.internal.type === 'MarkdownRemark' &&
    typeof node.slug === 'undefined'
  ) {
    const fileNode = getNode(node.parent)
    let slug = fileNode.fields.slug
    // console.log('slug', slug)
    if (typeof node.frontmatter.path !== 'undefined') {
      slug = node.frontmatter.path
    }
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })

    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map(
        tag => `/tags/${_.kebabCase(tag)}/`
      )
      createNodeField({ node, name: 'tagSlugs', value: tagSlugs })
    }

    if (typeof node.frontmatter.category !== 'undefined') {
      const categorySlug = `/categories/${_.kebabCase(
        node.frontmatter.category
      )}/`
      createNodeField({ node, name: 'categorySlug', value: categorySlug })
    }
  }
}

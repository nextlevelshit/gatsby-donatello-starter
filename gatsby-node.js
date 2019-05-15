const path = require(`path`)
const slash = require(`slash`)
const slug = require(`slug`)
const _ = require(`lodash`)
const config = require(`./config/SiteConfig`).default
const { createFilePath } = require(`gatsby-source-filesystem`)

function slugify(raw) {
  return slug(
    raw,
    {
      lower: true
    }
  )
}

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, `src`), `node_modules`],
    },
  })
}

exports.onCreateNode = ({ node, getNodesByType, actions }) => {

  const {
    createNodeField,
    createParentChildLink
  } = actions

  if (node.sourceInstanceName === `work`) {
    // Prepare parent-child-relationship
    const parentDirectory = path.normalize(`${node.dir}/`)
    const parent = getNodesByType(`Directory`).find(
      n => path.normalize(`${n.absolutePath}/`) === parentDirectory
    )
    // Connect work items and categories
    if (node.internal.type === `Directory`) {
      // Append parent-child-relationship
      if (parent) {
        node.parent = parent.id
        createParentChildLink({ child: node, parent: parent })
      }
      // Flag work categories for easier searchability
      if (!node.relativeDirectory) {
        createNodeField({ node, name: `workCategory`, value: true })
      }
      // Flag work items for better searchability
      if (node.relativeDirectory !== `..` && node.relativeDirectory !== ``) {
        createNodeField({ node, name: `slug`, value: `/work/${slugify(node.name)}/` })
        createNodeField({ node, name: `workItem`, value: true })
      }     
    }
    // Connect work pictures
    if (node.internal.type === `File`) {
      if (config.allowedWorkExtensions.find(ext => ext === node.extension)) {
        // Flag work picture for better searchability
        createNodeField({node, name: `workPicture`, value: true })
        // Append parent-child-relationship
        if (parent) {
          createParentChildLink({ child: node, parent: parent })
        }
      }
    }
  }

  if (node.internal.type === `MarkdownRemark` && _.has(node, `frontmatter`) && _.has(node.frontmatter, `title`)) {
    createNodeField({ node, name: `slug`, value: slugify(node.frontmatter.title) });
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  await Promise.all([
    createWorkItemPages({ createPage, graphql }),
    createMarkdownPages({ createPage, graphql })
  ])
}

const createWorkItemPages = ({ createPage, graphql }) => {

  return graphql(
    `
    {
      allDirectory(
        filter: {
          sourceInstanceName: { eq: "work" }
          fields: { workItem: { eq: true }}
        }
      ) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }
    const itemTemplate = path.resolve(`src/templates/WorkItem.template.tsx`)
    const items = result.data.allDirectory.edges

    items.forEach(({ node }, index) => {
      const prev = index === 0 ? items[items.length - 1].node : items[index - 1].node;
      const next = index === items.length - 1 ? items[0].node : items[index + 1].node;

      createPage({
        path: `/work/${slugify(node.name)}/`,
        component: slash(itemTemplate),
        context: {
          id: node.id,
          next,
          prev
        },
      })
    })
  })
}

const createMarkdownPages = async ({ createPage, graphql }) => {

  return await graphql(
    `
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/pages/" } }
        limit: 10000
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            headings {
              value
            }
          }
        }
      }
    }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }
    const pages = result.data.allMarkdownRemark.edges
    const pageTemplate = path.resolve(`src/templates/Page.template.tsx`)

    pages.forEach(({ node }, index) => {
      createPage({
        path: `/${node.fields.slug}/`,
        component: slash(pageTemplate),
        context: {
          id: node.id,
          headings: node.headings.map(({ value }) => ({
            value,
            slug: slugify(value)
          }))
        },
      })
    })
  })
}

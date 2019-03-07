const path = require(`path`)
const slash = require(`slash`)
const slug = require(`slug`)
// const _ = require(`lodash`)
const config = require(`./config/SiteConfig`).default
const { createFilePath } = require(`gatsby-source-filesystem`)


// exports.onCreateNode = ({ node, actions }) => {
//   const { createNodeField } = actions;
//   if (node.internal.type === `MarkdownRemark` && _.has(node, `frontmatter`) && _.has(node.frontmatter, `title`)) {
//     const slug = `${_.kebabCase(node.frontmatter.title)}`;
//     createNodeField({ node, name: `slug`, value: slug });
//   }
// };

// const getPostsByType = (posts, classificationType) => {
//   const postsByType = {};
//   posts.forEach(({ node }) => {
//     const nodeClassificationType = node.frontmatter[classificationType];
//     if (nodeClassificationType) {
//       if (_.isArray(nodeClassificationType)) {
//         nodeClassificationType.forEach(name => {
//           if (!_.has(postsByType, name)) {
//             postsByType[name] = [];
//           }
//           postsByType[name].push(node);
//         });
//       }
//       else {
//         const name = nodeClassificationType;
//         if (!postsByType[name]) {
//           postsByType[name] = [];
//         }
//         postsByType[name].push(node);
//       }
//     }
//   });
//   return postsByType;
// };

// const createClassificationPages = ({ createPage, posts, postsPerPage, numPages }) => {
//   const classifications = [
//     {
//       singularName: `category`,
//       pluralName: `categories`,
//       template: {
//         part: path.resolve(`src/templates/Category.tsx`),
//         all: path.resolve(`src/templates/AllCategory.tsx`),
//       },
//       postsByClassificationNames: getPostsByType(posts, `category`),
//     },
//     {
//       singularName: `tag`,
//       pluralName: `tags`,
//       template: {
//         part: path.resolve(`src/templates/Tag.tsx`),
//         all: path.resolve(`src/templates/AllTag.tsx`),
//       },
//       postsByClassificationNames: getPostsByType(posts, `tags`),
//     },
//   ];

//   classifications.forEach(classification => {
//     const names = Object.keys(classification.postsByClassificationNames);

//     createPage({
//                  path: _.kebabCase(`/${classification.pluralName}`),
//                  component: classification.template.all,
//                  context: {
//                    [`${classification.pluralName}`]: names.sort(),
//                  },
//                });

//     names.forEach(name => {
//       const postsByName = classification.postsByClassificationNames[name];
//       createPage({
//                    path: `/${classification.pluralName}/${_.kebabCase(name)}`,
//                    component: classification.template.part,
//                    context: {
//                      posts: postsByName,
//                      [`${classification.singularName}Name`]: name,
//                    },
//                  });
//     });
//   });
// };

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, `src`), `node_modules`],
    },
  })
}

// const createWorkCategoryNode = async ({
//   key,
//   name,
//   path,
//   createNodeId,
//   createContentDigest,
//   createNode
// }) => {
//   const node = {
//     id: createNodeId(`work-category-${key}`),
//     path,
//     parent: null,
//     children: [],
//     internal: {
//       type: `WorkCategory`,
//       description: `WorkCategory "${name}"`
//     }
//   }

//   node.internal.contentDigest = createContentDigest(node)

//   console.log(`Creating new node`, node)

//   createNode(node)
// }

// const createWorkItemNode = async ({
//   key,
//   name,
//   path,
//   createNodeId,
//   createContentDigest,
//   createNode
// })

// const createWorkCategories = ({
//   createNode, 
//   createNodeId, 
//   createContentDigest
// }) => {
//   const categories = [
//     { 
//       name: `sculpture`,
//       path: `work/scuplture`
//     },
//     { 
//       name: `drawing`,
//       path: `work/drawing`
//     },
//     { 
//       name: `watercolor`,
//       path: `work/watercolor`
//     }
//   ]


//   // console.log(categories)

//   categories.forEach((category, key) => createWorkCategoryNode({
//     name: category.name,
//     key,
//     path: category.path,
//     createNodeId,
//     createContentDigest,
//     createNode
//   }))
// }

// exports.sourceNodes = ({ 
//   actions, 
//   createNodeId, 
//   createContentDigest 
// }) => {
//   const { createNode } = actions

//   createWorkCategories({createNode, createNodeId, createContentDigest})
// }

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
        createNodeField({
          node,   
          name: `workCategory`,
          value: true
        })
      }
      // Flag work items for better searchability
      if (node.relativeDirectory !== `..` && node.relativeDirectory !== ``) {
        createNodeField({
          node,   
          name: `slug`,
          value: `/work/${slug(node.name)}/`
        })
        createNodeField({
          node,   
          name: `workItem`,
          value: true
        })
      }      
    }
    // Connect work pictures
    if (node.internal.type === `File`) {
      if (config.allowedWorkExtensions.find(ext => ext === node.extension)) {
        // Flag work picture for better searchability
        createNodeField({
          node,   
          name: `workPicture`,
          value: true
        })
        // Append parent-child-relationship
        if (parent) {
          createParentChildLink({ child: node, parent: parent })
        }
      }
    }
  }
  // if (node.internal.type === `MarkdownRemark`) {
  //   console.log(createFilePath({ node, getNode, basePath: `pages` }))
  // }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

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

    const workItemTemplate = path.resolve(`src/templates/work-item.tsx`)

    result.data.allDirectory.edges.map(e => e.node).forEach(workItem => {
      createPage({
        path: `/work/${slug(workItem.name)}/`,
        component: slash(workItemTemplate),
        context: {
          id: workItem.id,
        },
      })
    })
  })
}

// exports.createPages = ({ actions, graphql }) => {
//   const { createPage } = actions;

//   const postTemplate = path.resolve(`src/templates/Post.tsx`);

//   return graphql(`{
//     allMarkdownRemark(
//       sort: { order: DESC, fields: [frontmatter___date] }
//       limit: 10000
//     ) {
//       edges {
//         node {
//           excerpt(pruneLength: 250)
//           html
//           id
//           fields {
//             slug
//           }
//           frontmatter {
//             date
//             title
//             category
//             tags
//             banner
//           }
//           timeToRead
//         }
//       }
//     }
//   }`)
//   .then(result => {
//     if (result.errors) {
//       return Promise.reject(result.errors);
//     }
//     const posts = result.data.allMarkdownRemark.edges;
//     const postsPerPage = config.POST_PER_PAGE;
//     const numPages = Math.ceil(posts.length / postsPerPage);

//     Array.from({ length: numPages })
//          .forEach((_, i) => {
//            createPage({
//                         path: i === 0 ? `/blog` : `/blog/${i + 1}`,
//                         component: path.resolve(`./src/templates/Blog.tsx`),
//                         context: {
//                           limit: postsPerPage,
//                           skip: i * postsPerPage,
//                           totalPages: numPages,
//                           currentPage: i + 1
//                         },
//                       });
//          });

//     createClassificationPages({ createPage, posts, postsPerPage, numPages });

//     posts.forEach(({ node }, index) => {
//       const next = index === 0 ? null : posts[index - 1].node;
//       const prev = index === posts.length - 1 ? null : posts[index + 1].node;

//       createPage({
//                    path: `/blog/${_.kebabCase(node.frontmatter.title)}`,
//                    component: postTemplate,
//                    context: {
//                      slug: _.kebabCase(node.frontmatter.title),
//                      prev,
//                      next,
//                    },
//                  });
//     });
//   });
// };

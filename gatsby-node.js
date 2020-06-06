const { fmImagesToRelative } = require("gatsby-remark-relative-images")
const { createFilePath } = require("gatsby-source-filesystem")
const path = require("path")

const makeRequest = (graphql, request) => {
  return new Promise((resolve, reject) => {
    resolve(
      graphql(request).then(result => {
        if (result.errors) {
          reject(result.errors)
        }
        return result
      })
    )
  })
}

exports.createPages = ({ graphql, actions: { createPage } }) => {
  const getProjects = makeRequest(
    graphql,
    `
		{
		  allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "projects-template"}}}, sort: {fields: [frontmatter___date], order: DESC}) {
		    edges {
		      node {
		        id
		        fields {
		          slug
		        }
		      }
		    }
		  }
		}
	 	`
  ).then(res => {
    const projects = res.data.allMarkdownRemark.edges
    projects.forEach(edge => {
      const { id, fields } = edge.node
      createPage({
        path: `/projects${fields.slug}`,
        component: path.resolve("src/templates/projectsPage.js"),
        context: { id },
      })
    })
  })
  return getProjects
}

exports.onCreateNode = ({ node, actions: { createNodeField }, getNode }) => {
  fmImagesToRelative(node)
  if (node.internal.type === "MarkdownRemark") {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  actions: { setWebpackConfig },
}) => {
  setWebpackConfig({
    module: {
      rules:
        stage === "build-html"
          ? [{ test: /ScrollMagic/, use: loaders.null() }]
          : [],
    },
    resolve: {
      alias: {
        ScrollMagic: path.resolve(
          "node_modules",
          "scrollmagic/scrollmagic/uncompressed/ScrollMagic.js"
        ),
      },
    },
  })
}

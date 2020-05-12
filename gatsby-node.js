const { fmImagesToRelative } = require("gatsby-remark-relative-images")
const { createFilePath } = require("gatsby-source-filesystem") 
const path = require("path")

exports.onCreateNode = ({ node, actions: { createNodeField }, getNode}) => {
	fmImagesToRelative(node)
	if(node.internal.type === "MarkdownRemark") {
		const value = createFilePath({ node, getNode })
		createNodeField({
			name: `slug`,
			node,
			value
		})
	}
}

exports.onCreateWebpackConfig = ({ stage, rules, loaders, actions}) => {
	actions.setWebpackConfig({
		module: {
			rules: stage === "build-html" ? [{ test: /ScrollMagic/, use: loaders.null() }] : []
		},
		resolve: {
			alias: {
				ScrollMagic: path.resolve(
					"node_modules",
					"scrollmagic/scrollmagic/uncompressed/ScrollMagic.js"
					)
			}
		}
	})
}
import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import { useLanguages, languageFilter } from "../utils/utils"

const ProjectsPage = ({data}) => {
	const { lang } = useLanguages()
	const { frontmatter } = data.markdownRemark
	const content = languageFilter(frontmatter, lang)

	const { description, intro, type, markdown } = content
	const { title } = frontmatter

	console.log(data)
	return (
		<div>
			<h3>{title}</h3>
			<span>{description}</span>
			<span>{type}</span>
			<p>{intro}</p>
			<div>
				<div dangerouslySetInnerHTML={{__html: markdown}}/>
			</div>
		</div>

		)
}

export default ProjectsPage

export const pageQuery = graphql`
query ProjectByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
      	title
        english {
        	intro
        	type
        	description
        	markdown
        }
        french {
        	intro
        	type
        	description
        	markdown
        }
      }
    }
  }
`
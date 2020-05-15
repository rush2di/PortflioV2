import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { useLanguages, languageFilter } from "../utils/utils"

const Footer = () => {
	const { lang } = useLanguages()
 	const { allMarkdownRemark } = useStaticQuery(graphql`
 	{
  allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "personal-information"}}}) {
    edges {
      node {
        frontmatter {
        	github
        	linkedin
        	email
        	phone
          english {
            aboutHead
            aboutText
          }
          french {
            aboutHead
            aboutText
          }
        }
      }
    }
  }
}
`)
 	
 	const { frontmatter } = allMarkdownRemark.edges[0].node
	const content = languageFilter(frontmatter, lang)

	const { aboutHead, aboutText } = content
	const { github, linkedin, email, phone } = frontmatter

	return (
		<footer>
			<h3>{aboutHead}</h3>
			<p>{aboutText}</p>
		</footer>
		)
}

export default Footer
import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import { useLanguages, languageFilter } from "../utils/utils"

const HomePage = () => {
	const { lang } = useLanguages()
	const { allMarkdownRemark } = useStaticQuery(graphql`
{
  allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "home-template"}}}) {
    edges {
      node {
        frontmatter {
          english {
            title
            speciality
            paragraph
            introduction
          }
          french {
            title
            speciality
            paragraph
            introduction
          }
        }
      }
    }
  }
}
`)
	const { frontmatter } = allMarkdownRemark.edges[0].node
	const content = languageFilter(frontmatter, lang)
	const { title, introduction, paragraph, speciality } = content

	return (
	  <React.Fragment>
	    <h1>{title}</h1>
	    <span>{speciality}</span>
	    <p><span>{introduction}</span>{paragraph}</p>
	    <Link to="/page-2/">Go to page 2</Link>
	  </React.Fragment>
	)
}

export default HomePage
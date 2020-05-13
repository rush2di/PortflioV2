import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import { useLanguages } from "../utils/utils"

const HomePage = () => {
	const { lang } = useLanguages()
	const {allMarkdownRemark} = useStaticQuery(graphql`
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

	// const { frontmatter } = allMarkdownRemark.edges[0].node
	// const languageFilter = frontmatter.filter(obj => Object.keys(obj).includes(lang))

	// console.log([...frontmatter])
	return (
	  <React.Fragment>
	    <h1>Hi people</h1>
	    <p>Welcome to your new Gatsby site.</p>
	    <p>Now go build something great.</p>
	    <Link to="/page-2/">Go to page 2</Link>
	  </React.Fragment>
	)
}

export default HomePage
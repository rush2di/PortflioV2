import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import HomePage from "../templates/homePage"

const IndexPage = () => {
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
            tsheading
            tsparagraph
            psheading
          }
          french {
            title
            speciality
            paragraph
            introduction
            tsheading
            tsparagraph
            psheading
          }
        }
      }
    }
  }
}
`)
  return (
    <HomePage data={allMarkdownRemark} />
    )
}
    


export default IndexPage

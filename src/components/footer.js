import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { useLanguages, languageFilter } from "../utils/utils"
import footerHead from "../assets/footerhead.svg"

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
      <div 
        style={{backgroundImage: `url(${footerHead})`}}
        className="footer-head"
       />
      <div className="footer-wrapper">
        <div className="footer-body container">
           <div className="footer-body-grid">
             <div className="footer-box">
                <h3 className="heading">{aboutHead}</h3>
                <p>{aboutText}</p>
             </div>
             <div className="footer-box"></div>
           </div>
        </div>
      </div>
		</footer>
		)
}

export default Footer
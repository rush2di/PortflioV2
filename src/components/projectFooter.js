import React from "react"
import {useStaticQuery, graphql} from 'gatsby'

const ProjectFooter = ({targetId}) => {
  const { allMarkdownRemark } = useStaticQuery(graphql`
  {
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "projects-template" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date
          }
        }
      }
    }
  }
`)
let index = 0
const projectsArray = allMarkdownRemark.edges.forEach(({node},i) => {
  if(node.id === targetId) index = i+1
})
//ugjyhfvfghcgfwdSn;,njl:hln
  return (
    <div className="project-footer-wrapper">
      <div className="container">
        <div>{index}</div>
      </div>
    </div>
  )
}

export default ProjectFooter

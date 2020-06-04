import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import { useLanguages } from "../utils/utils"

const ProjectFooter = ({ targetId }) => {
  const { lang } = useLanguages()
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
  const data = allMarkdownRemark.edges
  const indexer = nextProjectIndex(data, targetId)
  const backToHomeText =
    lang === "english"
      ? "Go back to home page"
      : "Retournez à la page d'accueil"
  const nextProjectText = lang === "english" ? "Next project" : "Projet suivant"

  return (
    <div className="project-footer-wrapper">
      <div className="container">
        <div className="project-footer-grid">
          <div className="project-footer-box">
            <Link to="/">{backToHomeText}</Link>
          </div>
          <div className="project-footer-box">
            {indexer < data.length && (
              <NextProjectUI {...{ data, indexer, nextProjectText }} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const nextProjectIndex = (data, targetId) => {
  let index = 0
  data.forEach(({ node }, i) => {
    if (node.id === targetId) index = i + 1
  })
  return index
}

const NextProjectUI = ({ indexer, data, nextProjectText }) => (
  <React.Fragment>
    <Link to={`/projects${data[indexer].node.fields.slug}`}>
      {nextProjectText}
    </Link>
    <Link to={`/projects${data[indexer].node.fields.slug}`}>
      <h3 className="footer-title">{data[indexer].node.frontmatter.title}</h3>
    </Link>
  </React.Fragment>
)

export default ProjectFooter

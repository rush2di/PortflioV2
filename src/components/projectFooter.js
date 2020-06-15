import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import { useLanguages, languageFilter, useScreenSpy } from "../utils/utils"

const ProjectFooter = ({ targetId }) => {
  const { dimensions } = useScreenSpy()
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
              english {
                intro
              }
              french {
                intro
              }
            }
          }
        }
      }
    }
  `)

  const data = allMarkdownRemark.edges
  const indexer = nextProjectIndex(data, targetId)

  const nextProjectText = lang === "english" ? "Next project" : "Projet suivant"
  const backToHomeText =
    lang === "english"
      ? "Go back to home page"
      : "Retournez à la page d'accueil"

  return (
    <div className="project-footer-wrapper">
      <div className="container">
        <div className="project-footer-grid">
          <div className="project-footer-box">
            <Link to="/">{backToHomeText}</Link>
          </div>
          {indexer < data.length && (
            <NextProjectUI
              {...{ data, indexer, nextProjectText, lang }}
              isMobile={dimensions < 425}
            />
          )}
        </div>
      </div>
    </div>
  )
}

const NextProjectUI = ({ indexer, data, nextProjectText, lang, isMobile }) => {
  const content = languageFilter(data[indexer].node.frontmatter, lang)
  const { intro } = content

  return isMobile ? (
    <div className="project-footer-box mt-2">
      <Link to={`/projects${data[indexer].node.fields.slug}`}>
        <Link
          className="w-arrow"
          to={`/projects${data[indexer].node.fields.slug}`}
        >
          {nextProjectText}
        </Link>
        <div className="flex-footer">
          <h3 className="footer-title">
            {data[indexer].node.frontmatter.title}
          </h3>
          <span>{intro}</span>
        </div>
      </Link>
    </div>
  ) : (
    <div className="project-footer-box">
      <Link to={`/projects${data[indexer].node.fields.slug}`}>
        {nextProjectText}
      </Link>
      <Link to={`/projects${data[indexer].node.fields.slug}`}>
        <div className="flex-footer">
          <h3 className="footer-title">
            {data[indexer].node.frontmatter.title}
          </h3>
          <span>{intro}</span>
        </div>
      </Link>
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

export default ProjectFooter

import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import { useLanguages, languageFilter, useScreenSpy } from "../../utils/utils"
import { nextProject, backToHome } from "../translations/translations"

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

  return (
    <div className="project-footer-wrapper">
      <div className="container">
        <div className="project-footer-grid">
          <div className="project-footer-box">
            <Link to="/">{backToHome[lang]}</Link>
          </div>
          {indexer < data.length && (
            <NextProjectUI
              data={data}
              indexer={indexer}
              lang={lang}
              isMobile={dimensions < 426}
            />
          )}
        </div>
      </div>
    </div>
  )
}

const NextProjectUI = ({ indexer, data, lang, isMobile }) => {
  const content = languageFilter(data[indexer].node.frontmatter, lang)
  const { intro } = content

  return isMobile ? (
    <div className="project-footer-box mt-2">
      <Link to={`/projects${data[indexer].node.fields.slug}`}>
        <span
          className="w-arrow"
          to={`/projects${data[indexer].node.fields.slug}`}
        >
          {nextProject[lang]}
        </span>
        <div className="flex-footer">
          <h3 className="footer-title">
            {data[indexer].node.frontmatter.title}
          </h3>
          <span>{intro}</span>
        </div>
      </Link>
    </div>
  ) : (
    <div className="project-footer-box mt-2">
      <Link to={`/projects${data[indexer].node.fields.slug}`}>
        {nextProject[lang]}
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

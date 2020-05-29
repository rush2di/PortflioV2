import React from "react"
import { graphql } from "gatsby"

import {
  useLanguages,
  languageFilter,
  useThemes,
  useScreenSpy,
} from "../utils/utils"

const ProjectsPage = ({ data }) => {
  const { textStyle } = useThemes()
  const { lang } = useLanguages()
  const { frontmatter } = data.markdownRemark
  const content = languageFilter(frontmatter, lang)

  const { description, intro, type, markdown, demobtn, githubtn } = content
  const { title, date } = frontmatter

  console.log(data)
  return (
    <div className="section-projects">
      <div className="container">
        <div className="section-hero-wrapper">
          <div className="section-hero">
            <h3 className="heading heading-lg">{title}</h3>
          </div>
        </div>
        <div className="section-hero-grid">
          <div className="project-intro-box">
            <span className={textStyle}>{intro}</span>
            <span>{type}</span>
            <span>{date}</span>
          </div>
          <div className="project-intro-box">
            <p>{description}</p>
            <div>
              <ButtonsRenderer demo={demobtn} github={githubtn} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div dangerouslySetInnerHTML={{ __html: markdown }} />
      </div>
    </div>
  )
}

const ButtonsRenderer = ({ demo, github }) => {
  const { dimensions } = useScreenSpy()
  const demotext = dimensions > 500 ? "Demo" : demo
  const githubText = dimensions > 500 ? "Github" : github
  return (
    <React.Fragment>
      <button>{demotext}</button>
      <button>{githubText}</button>
    </React.Fragment>
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
        date(formatString: "YYYY")
        english {
          intro
          type
          description
          markdown
          demobtn
          githubtn
        }
        french {
          intro
          type
          description
          markdown
          demobtn
          githubtn
        }
      }
    }
  }
`

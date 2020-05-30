import React from "react"
import { graphql } from "gatsby"

import {
  useLanguages,
  languageFilter,
  useThemes,
  useScreenSpy,
} from "../utils/utils"

const ProjectsPage = ({ data }) => {
  const { textStyle, btnStyle } = useThemes()
  const { lang } = useLanguages()
  const { frontmatter } = data.markdownRemark
  const content = languageFilter(frontmatter, lang)

  const { description, intro, type, markdown, demobtn, githubtn } = content
  const { title, date } = frontmatter

  const scrollCTA = lang === "english" ? "scroll" : "défiler"
  // testing purposes vars
  const introTest = "Music player web app"
  const headingTest = "THE TECH BEHIND THE WEBSITE"
  // include tech stack in CMS

  console.log(data)
  return (
    <div className="section">
      <div className="container">
        <div className="section-hero-wrapper">
          <div className="section-hero">
            <h3 className="heading heading-lg">{title}</h3>
          </div>
          <div className="section-hero-grid">
            <div className="project-intro-box">
              <span className={textStyle}>{introTest}</span>
              <p className="paragraph">{type}</p>
              <p className="paragraph">{date}</p>
            </div>
            <div className="project-intro-box">
              <p className="paragraph">{description}</p>
              <div className="buttons-wrapper">
                <ButtonsRenderer
                  demo={demobtn}
                  github={githubtn}
                  styles={btnStyle}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-cta container">
        <span className={textStyle}>{scrollCTA}</span>
      </div>
      <div className="section-main-info">
        <div className="img-wrapper">
          <div className="container">
            <img src="#" alt="screenshot" />
          </div>
        </div>
        <div className="container">
          <div className="text-content">
            <h3 className={textStyle}>{headingTest}</h3>
            <div dangerouslySetInnerHTML={{ __html: markdown }} />
          </div>
        </div>
        <div className="img-wrapper">
          <div className="container">
            <img src="#" alt="laptop-design" />
            <img src="#" alt="mobile-design" />
          </div>
        </div>
      </div>
    </div>
  )
}

const ButtonsRenderer = ({ demo, github, styles }) => {
  const { dimensions } = useScreenSpy()
  const demoTextLogic = dimensions > 500 ? "Demo" : demo
  const githubTextLogic = dimensions > 500 ? "Github" : github
  return (
    <React.Fragment>
      <button className={`btn ${styles}`}>{demoTextLogic}</button>
      <button className={`btn ${styles}`}>{githubTextLogic}</button>
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

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
        <div className="section-hero-wrapper extra-y-margins">
          <div className="section-hero extra-y-margins">
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
        <MobileFirstInfo {...{ textStyle, lang }} />
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

const MobileFirstInfo = ({ lang, textStyle }) => {
  const heading =
    lang === "english"
      ? "A MOBILE FRIENDLY APPROACH"
      : "UNE APPROCHE MOBILE FIRST"
  const paragraph =
    lang === "english"
      ? "In todays digital age, users expect every website to have a mobile version. So companies and developers must try to produce the same if not better experience for users interacting with their site on a mobile device. This project helped me understand how a professional team translates a desktop site into a mobile device."
      : "L'internet dernièrement a été marqué par la forte croissance des populations mobinautes et tablonautes, donc l’importance des mobiles et des tablettes n’est plus à démontrer et les utilisateurs maintenet s'attendent toujours que chaque site Web ait un fonctionnement optimaux et compaptible en version mobile. Les entreprises et les développeurs doivent donc essayer de produire la même ou sinon une meilleure expérience pour ces utilisateurs. Ce projet m'a aidé à comprendre comment une équipe professionnelle se focalise sur l’essentiel utilisation mobile et simplifie la navigation au maximum."
  return (
    <div className="container">
      <div className="text-content">
        <h3 className={textStyle}>{heading}</h3>
        <div>{paragraph}</div>
      </div>
    </div>
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

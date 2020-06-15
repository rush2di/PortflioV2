import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"

import ProjectFooter from "../components/projectFooter"
import MobileBtns from "../components/mobileBtns"
import Image from "../components/image"
import {
  useLanguages,
  languageFilter,
  useThemes,
  useScreenSpy,
} from "../utils/utils"

const ProjectsPage = ({ data: { markdownRemark } }) => {
  const { textStyle, btnStyle } = useThemes()
  const { lang } = useLanguages()

  const { frontmatter, id } = markdownRemark
  const content = languageFilter(frontmatter, lang)

  const scrollCTA = lang === "english" ? "scroll" : "défiler"

  return (
    <React.Fragment>
      <div className="section section-project">
        <div className="container">
          <ProjectHero {...{ frontmatter, content, textStyle, btnStyle }} />
        </div>
        <div className="scroll-cta container">
          <span className={textStyle}>{scrollCTA}</span>
        </div>
        <ProjectSection
          {...{ frontmatter, content, textStyle, lang, btnStyle }}
        />
      </div>
      <ProjectFooter targetId={id} />
    </React.Fragment>
  )
}

const ProjectHero = ({ frontmatter, content, textStyle, btnStyle }) => {
  const { description, intro, type, demobtn, githubtn } = content
  const { title, date, glink, dlink } = frontmatter

  return (
    <div className="section-hero-wrapper extra-y-margins">
      <div className="section-hero extra-y-margins">
        <h3 className="heading heading-lg">{title}</h3>
      </div>
      <div className="section-hero-grid">
        <div className="project-intro-box">
          <span className={textStyle}>{intro}</span>
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
              links={{ glink, dlink }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const ProjectSection = ({
  textStyle,
  lang,
  frontmatter,
  content,
  btnStyle,
}) => {
  const [revealed, setRevealed] = useState(false)
  const [imgHeight, setimgHeight] = useState(0)
  const { dimensions } = useScreenSpy()

  const { markdown } = content
  const { screenshot, laptop, mobile } = frontmatter

  const handleReveal = () => setRevealed(!revealed)

  useEffect(() => {
    let ismounted = true
    let imageHeight = document.querySelector(".gatsby-image-wrapper>img")
      .clientHeight
    if (!imgHeight && ismounted) setimgHeight(imageHeight)
    return () => {
      ismounted = false
    }
  })

  const heading =
    lang === "english"
      ? "THE TECH BEHIND THE WEBSITE"
      : "LA TECHNOLOGIE DERRIÈRE CE SITE"

  const staticHeight = dimensions < 425 ? 220 : 350

  const heightLogic = !revealed
    ? staticHeight
    : imgHeight < staticHeight
    ? staticHeight
    : imgHeight

  return (
    <div className="section-main-info">
      <div className="img-wrapper">
        <div className="container">
          <div className="img-container-screen" style={{ height: heightLogic }}>
            <Image image={screenshot} alt="screenshot" />
          </div>
        </div>
      </div>
      {imgHeight > 350 && (
        <button className={`reveal-btn btn ${btnStyle}`} onClick={handleReveal}>
          {!revealed ? "reveal" : "hide"}
        </button>
      )}
      <div className="container">
        <div className="text-content">
          <h3 className={textStyle}>{heading}</h3>
          <div dangerouslySetInnerHTML={{ __html: markdown }} />
        </div>
      </div>
      <div className="img-wrapper">
        <div className="container img-grid">
          <div className="img-container">
            <Image image={laptop} alt="laptop-design" />
          </div>
          <div className="img-container">
            <Image image={mobile} alt="mobile-design" />
          </div>
        </div>
      </div>
      <MobileFirstInfo {...{ textStyle, lang }} />
    </div>
  )
}

const ButtonsRenderer = ({ demo, github, styles, links }) => {
  const { dimensions } = useScreenSpy()
  const demoTextLogic = dimensions > 425 ? "Demo" : demo
  const githubTextLogic = dimensions > 425 ? "Github" : github
  return dimensions > 425 ? (
    <React.Fragment>
      <a href={links.dlink} target="_blank" rel="noopener noreferrer">
        <button className={`btn ${styles}`}>{demoTextLogic}</button>
      </a>
      <a href={links.glink}>
        <button className={`btn ${styles}`}>{githubTextLogic}</button>
      </a>
    </React.Fragment>
  ) : (
    <MobileBtns
      githubLINK={links.glink}
      demoLINK={links.dlink}
      githubBTN={githubTextLogic}
      demoBTN={demoTextLogic}
    />
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
        screenshot {
          childImageSharp {
            fluid(maxWidth: 900, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
          publicURL
        }
        laptop {
          childImageSharp {
            fluid(maxWidth: 900, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
          publicURL
        }
        mobile {
          childImageSharp {
            fluid(maxWidth: 900, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
          publicURL
        }
        glink
        dlink
        Stack
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

export default ProjectsPage

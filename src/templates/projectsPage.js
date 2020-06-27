import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"

import ProjectFooter from "../components/footers/projectFooter"
import MobileBtns from "../components/buttons"
import Image from "../components/image"
import SEO from "../components/seo"
import {
  useLanguages,
  languageFilter,
  useThemes,
  useScreenSpy,
} from "../utils/utils"
import {
  scrollCTA,
  heading1,
  heading2,
  paragraph,
  coverBtnReveal,
  coverBtnHide,
} from "../components/translations/translations"

const ProjectsPage = ({ data: { markdownRemark } }) => {
  const { textStyle, btnStyle } = useThemes()
  const { lang } = useLanguages()

  const { frontmatter, id } = markdownRemark
  const content = languageFilter(frontmatter, lang)

  return (
    <React.Fragment>
      <SEO
        title={frontmatter.title}
        description={frontmatter.english.intro}
        keywords={frontmatter.Stack}
      />
      <div className="section section-project">
        <div className="container vh-100">
          <ProjectHero {...{ frontmatter, content, textStyle, btnStyle }} />
        </div>
        <div className="scroll-cta container">
          <span className={textStyle}>{scrollCTA[lang]}</span>
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
  const { screenshot, laptop, mobile, Stack } = frontmatter

  const handleReveal = () => setRevealed(!revealed)

  useEffect(() => {
    let ismounted = true
    let imageHeight = document.querySelector(".gatsby-image-wrapper>img")
      .clientHeight
    if (!imgHeight && ismounted) setimgHeight(imageHeight)
    return () => {
      ismounted = false
    }
  }, [imgHeight])

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
          {!revealed ? coverBtnReveal[lang] : coverBtnHide[lang]}
        </button>
      )}
      <div className="container">
        <div className="text-content">
          <h3 className={textStyle}>{heading1[lang]}</h3>
          <div className="text-content-box">
            <div dangerouslySetInnerHTML={{ __html: markdown }} />
            <ul className="text-stack">
              {Stack.map((tech, index) => {
                return (
                  <li className={textStyle} key={index + "-stack"}>
                    {tech}
                  </li>
                )
              })}
            </ul>
          </div>
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
  return (
    <div className="container">
      <div className="text-content">
        <h3 className={textStyle}>{heading2[lang]}</h3>
        <div className="text-content-box">{paragraph[lang]}</div>
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

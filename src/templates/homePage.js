import React, { useState, useEffect, useLayoutEffect, useMemo } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import gsap from "gsap"

import {
  useLanguages,
  languageFilter,
  useThemes,
  useScreenSpy,
  triggerAnimation,
  titleFixer,
} from "../utils/utils"
import SEO from "../components/seo"
import Image from "../components/image"
import HomeFooter from "../components/footers/homeFooter"
import MobileBtns from "../components/buttons"
import reactIcon from "../assets/react.png"
import reduxIcon from "../assets/redux.png"
import sassIcon from "../assets/sass.png"
import gitIcon from "../assets/git.png"
import npmIcon from "../assets/npm.png"
import gulpIcon from "../assets/gulp.png"
import fbIcon from "../assets/firebase.png"
import nodejsIcon from "../assets/nodejs.png"

// Home page template wrapper component ////////////////////////////////
///////////////////////////////////////////////////////////////////////

const HomePage = ({ data }) => {
  const { lang } = useLanguages()
  const { textStyle } = useThemes()
  const { dimensions } = useScreenSpy()
  const { frontmatter } = data.edges[0].node

  const content = languageFilter(frontmatter, lang)

  const { title, tsheading, tsparagraph, psheading } = content
  const { allMarkdownRemark } = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "projects-template" } } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              date
              cover {
                childImageSharp {
                  fluid(maxWidth: 300, quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
                publicURL
              }
              english {
                intro
                type
              }
              french {
                intro
                type
              }
            }
          }
        }
      }
    }
  `)

  return (
    <React.Fragment>
      <SEO title={"Portfolio"} />
      <div className="container">
        <div className="section-hero-wrapper">
          <HeroHeading title={title} dimensions={dimensions} />
          <HeroParagraphs {...{ ...content, textStyle, dimensions }} />
          {dimensions <= 425 && <MobileBtns />}
        </div>
        <div className="section-skills-wrapper">
          <SkillsSection tsheading={tsheading} tsparagraph={tsparagraph} />
        </div>
        <div className="section-projects-wrapper">
          <ProjectsSection
            lang={lang}
            dimensions={dimensions}
            allMarkdownRemark={allMarkdownRemark}
            psheading={psheading}
          />
        </div>
      </div>
      <HomeFooter />
    </React.Fragment>
  )
}

// Hero heading component //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

const HeroHeading = ({ dimensions, title }) => {
  const [titleSliceOne, titleSliceTwo] = titleFixer(dimensions, title)

  useLayoutEffect(() => {
    const defaults = { ease: "power3.out", duration: 1 }
    const animation = gsap
      .timeline({ defaults })
      .from("#title", { y: "100%", stagger: 0.3, display: "block", delay: 1 })
      .from("#paragraph", { y: -10, stagger: 0.3, opacity: 0 }, "+=0.1")
      .pause()
    
    const btnsAnimation = gsap
      .timeline({ defaults })
      .from(".btn-lg", { y: -10, stagger: 0.3, opacity: 0 })

    if (dimensions < 426) animation.add(btnsAnimation)

    triggerAnimation().scene(".heading-xl", 200, () => animation.play())
  }, [])

  return (
    <div className="section-hero">
      <h1 className="heading heading-xl">
        <div className="ohidden">
          <span id="title">{titleSliceOne}</span>
        </div>
        <div className="ohidden">
          <span id="title">{titleSliceTwo}</span>
        </div>
      </h1>
    </div>
  )
}

// Hero paragraphs component ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

const HeroParagraphs = ({ textStyle, speciality, introduction, paragraph, dimensions }) => (
  <div className="section-hero-grid">
    <p id="paragraph">
      <span className={textStyle + " -hm"}>{speciality}</span>
    </p>
    <p id="paragraph">
      <span className={textStyle}>{introduction}</span>
      { dimensions > 1002 ? paragraph : <></br>{paragraph}</>}
    </p>
  </div>
)

// Skills section component ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

const SkillsSection = ({ tsheading, tsparagraph }) => {
  useLayoutEffect(() => {
    const animation = gsap
      .timeline({ defaults: { ease: "power3.out", duration: 0.7 } })
      .from("#stitle", { y: "100%", display: "block" })
      .from("#sparagraph", { y: -15, opacity: 0 })
      .from("#sbox", { opacity: 0, duration: 5 })
      .pause()

    triggerAnimation().scene(".section-skills-grid", 100, () =>
      animation.play()
    )
  }, [])

  return (
    <div className="section-skills-grid">
      <div className="section-skills-box">
        <h3 className="heading heading-md ohidden">
          <span id="stitle">{tsheading}</span>
        </h3>
        <p id="sparagraph">{tsparagraph}</p>
      </div>
      <SkillsAnimatedBoxs />
    </div>
  )
}

// Animated skills cover boxs component ////////////////////////////////
///////////////////////////////////////////////////////////////////////

const SkillsAnimatedBoxs = () => (
  <div id="sbox" className="section-skills-box">
    <div className="box box-pf">
      <img src={sassIcon} alt="" />
    </div>
    <div className="box box-pf">
      <img src={reduxIcon} alt="" />
    </div>
    <div className="box box-pf last">
      <img src={reactIcon} alt="" />
    </div>
    <div className="box box-pm">
      <img src={npmIcon} alt="" />
    </div>
    <div className="box box-pm last">
      <img src={gitIcon} alt="" />
    </div>
    <div className="box box-pl first">
      <img src={gulpIcon} alt="" />
    </div>
    <div className="box box-pl">
      <img src={fbIcon} alt="" />
    </div>
    <div className="box box-pl last">
      <img src={nodejsIcon} alt="" />
    </div>
  </div>
)

// Projects Section wrapper component //////////////////////////////////
///////////////////////////////////////////////////////////////////////

const ProjectsSection = ({
  lang,
  dimensions,
  allMarkdownRemark,
  psheading,
}) => {
  const data = allMarkdownRemark.edges.map(edge => edge.node.frontmatter.cover)
  const [projectIndex, setProjectIndex] = useState(0)

  const indexSetter = index => setProjectIndex(index)

  const indexRetriever = index => {
    const defaults = { duration: 0.15, ease: "power3.out" }
    const onComplete = () => indexSetter(index)
    const fadeOut = gsap
      .timeline({ onComplete, defaults })
      .to(".gatsby-image-wrapper", { opacity: 0 })
    fadeOut.play()
  }

  useEffect(() => {
    const animation = gsap
      .timeline({ defaults: { ease: "power3.out", duration: 0.7 } })
      .from("#ptitle", { y: "100%", display: "block" })
      .from(".list-wrapper", { opacity: 0, duration: 0.35 })
      .from("#projects", { y: -10, opacity: 0, stagger: 0.3, delay: 0.35 })
      .pause()

    triggerAnimation().scene(".section-projects-wrapper", 10, () =>
      animation.play()
    )
    return () => {
      setProjectIndex(0)
    }
  }, [])

  const memorizedUImapper = useMemo(() => {
    return (
      <UImapper
        data={allMarkdownRemark}
        lang={lang}
        indexRetriever={indexRetriever}
        projectIndex={projectIndex}
        isMobile={dimensions < 768}
      />
    )
  }, [dimensions, lang, projectIndex])

  return (
    <React.Fragment>
      <h3 className="heading heading-md ohidden">
        <span id="ptitle">{psheading}</span>
      </h3>
      <div className="section-projects-grid">
        <div className="section-projects-box">
          <div className="list-wrapper">
            <ul>{memorizedUImapper}</ul>
          </div>
        </div>
        {dimensions > 768 && (
          <div id="covers" className="section-projects-box">
            <div className="project-card" />
            <div className="project-card-wrapper">
              <div className="project-card-image">
                <ImageBox {...{ data, projectIndex }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  )
}

// Project list mapper /////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

const UImapper = ({ data, lang, indexRetriever, projectIndex, isMobile }) => {
  return data.edges.map((items, i) => {
    const { slug } = items.node.fields
    const { frontmatter } = items.node

    const content = languageFilter(frontmatter, lang)

    const index = "0" + (i + 1).toString()

    const { intro } = content
    const { title } = frontmatter

    if (isMobile) {
      return (
        <li key={index + title}>
          <Link
            id="projects"
            className="project-cardmodel"
            to={`/projects${slug}`}
          >
            <div className="project-cardmodel-wrapper">
              <div className="project-cardmodel-head">
                <Image
                  image={frontmatter.cover}
                  style={{
                    maxHeight: 145,
                    width: "100%",
                    borderTopLeftRadius: "0.5rem",
                    borderTopRightRadius: "0.5rem",
                  }}
                />
              </div>
              <div className="project-cardmodel-body">
                <span>{index}</span>
                <h3>{title}</h3>
                <span>{intro}</span>
              </div>
            </div>
          </Link>
        </li>
      )
    }

    return (
      <li id="projects" key={title + index}>
        <Link
          to={`/projects${slug}`}
          onMouseOver={() => {
            projectIndex !== i && indexRetriever(i)
          }}
        >
          <div>
            <span>{index}</span>
            <h3>{title}</h3>
            <span>{intro}</span>
          </div>
        </Link>
      </li>
    )
  })
}

// Project cover image renderer component //////////////////////////////
///////////////////////////////////////////////////////////////////////

const ImageBox = ({ data, projectIndex }) => {
  const filterTarget = data.filter(obj => data.indexOf(obj) === projectIndex)

  useEffect(() => {
    const fadeIn = gsap
      .timeline({ defaults: { duration: 0.05, ease: "power3.out" } })
      .to(".gatsby-image-wrapper", { opacity: 1 })
    fadeIn.play()
  })

  return (
    filterTarget && (
      <Image image={filterTarget[0]} costumClass="gatsby-image-wrapper" />
    )
  )
}

export default HomePage

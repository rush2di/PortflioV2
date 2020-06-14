import React, { useState, useEffect } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import gsap from "gsap"

import {
  useLanguages,
  languageFilter,
  useThemes,
  useScreenSpy,
} from "../utils/utils"
import Image from "../components/image"
import HomeFooter from "../components/homeFooter"
import reactIcon from "../assets/react.png"
import reduxIcon from "../assets/redux.png"
import sassIcon from "../assets/sass.png"
import gitIcon from "../assets/git.png"
import nodejsIcon from "../assets/nodejs.png"
import npmIcon from "../assets/npm.png"
import gulpIcon from "../assets/gulp.png"
import fbIcon from "../assets/firebase.png"

// Home page template wrapper component ////////////////////////////////
///////////////////////////////////////////////////////////////////////

const HomePage = ({ data }) => {
  const { lang } = useLanguages()
  const { textStyle } = useThemes()
  const { dimensions } = useScreenSpy()

  const { frontmatter } = data.edges[0].node

  const content = languageFilter(frontmatter, lang)

  const {
    title,
    introduction,
    paragraph,
    speciality,
    tsheading,
    tsparagraph,
    psheading,
  } = content

  return (
    <React.Fragment>
      <div className="container">
        <div className="section-hero-wrapper">
          <div className="section-hero">
            <h1 className="heading heading-xl">
              <HeroHeading title={title} dimensions={dimensions} />
            </h1>
          </div>
          <div className="section-hero-grid">
            <span className={textStyle + " -hm"}>{speciality}</span>
            <p>
              <span className={textStyle}>{introduction} </span>
              {paragraph}
            </p>
          </div>
        </div>
        <div className="section-skills-wrapper">
          <div className="section-skills-grid">
            <div className="section-skills-box">
              <h3 className="heading heading-md">{tsheading}</h3>
              <p>{tsparagraph}</p>
            </div>
            <SkillsAnimatedBoxs />
          </div>
        </div>
        <div className="section-projects-wrapper">
          <h3 className="heading heading-md">{psheading}</h3>
          <ProjectsSection lang={lang} dimensions={dimensions} />
        </div>
      </div>
      <HomeFooter />
    </React.Fragment>
  )
}

// Hero heading component //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

const HeroHeading = ({ dimensions, title }) => {
  const firstHeading = title.substring(0, title.search("Ro"))
  const secondHeading = title.substring(title.search("Ro"))

  const firstHeadingMobile =
    dimensions <= 425 ? title.substring(0, title.search(",") + 1) : firstHeading
  const secondHeadingMobile =
    dimensions <= 425
      ? title.substring(title.search(",") + 1, title.search("Be"))
      : secondHeading

  return (
    <React.Fragment>
      <span>{firstHeadingMobile}</span>
      <br />
      <span>{secondHeadingMobile}</span>
    </React.Fragment>
  )
}

// Animated skills cover boxs component ////////////////////////////////
///////////////////////////////////////////////////////////////////////

const SkillsAnimatedBoxs = () => (
  <div className="section-skills-box">
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

const ProjectsSection = ({ lang, dimensions }) => {
  const [projectIndex, setProjectIndex] = useState(0)

  // GSAP config defaults
  const defaults = { duration: 0.05, ease: "power3.out" }

  const animations = params => params.play()

  const indexSetter = index => setProjectIndex(index)

  const indexRetriever = index => {
    const onComplete = () => indexSetter(index)
    const fadeOut = gsap
      .timeline({ onComplete, defaults })
      .to(".gatsby-image-wrapper", { opacity: 0 })

    animations(fadeOut)
  }

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
                  fluid(maxWidth: 800, quality: 100) {
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

  const data = allMarkdownRemark.edges.map(edge => edge.node.frontmatter.cover)

  return (
    <div className="section-projects-grid">
      <div className="section-projects-box">
        <div className="list-wrapper">
          <ul>
            <UImapper
              data={allMarkdownRemark}
              lang={lang}
              indexRetriever={indexRetriever}
              projectIndex={projectIndex}
              isMobile={dimensions < 768}
            />
          </ul>
        </div>
      </div>
      {dimensions > 768 && (
        <div className="section-projects-box">
          <div className="project-card" />
          <div className="project-card-wrapper">
            <div className="project-card-image">
              <ImageBox {...{ data, projectIndex, defaults }} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Project list mapper /////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

const UImapper = ({ data, lang, indexRetriever, projectIndex, isMobile }) =>
  data.edges.map((items, i) => {
    const { slug } = items.node.fields
    const { frontmatter } = items.node

    const content = languageFilter(frontmatter, lang)

    const index = "0" + (i + 1).toString()

    const { intro } = content
    const { title } = frontmatter

    if (isMobile) {
      return (
        <li key={index + title}>
          <Link className="project-cardmodel" to={`/projects${slug}`}>
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
      <li key={title + index}>
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

// Project cover image renderer component //////////////////////////////
///////////////////////////////////////////////////////////////////////

const ImageBox = ({ data, projectIndex, defaults }) => {
  const filterTarget = data.filter(obj => data.indexOf(obj) === projectIndex)

  useEffect(() => {
    const fadeIn = gsap
      .timeline(defaults)
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

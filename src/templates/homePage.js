import React, { useState, useEffect } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import gsap from "gsap"

import { useLanguages, languageFilter, useThemes } from "../utils/utils"
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

const HomePage = ({ data }) => {
  const { lang } = useLanguages()
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
  const { textStyle } = useThemes()

  const titleFixer = () => (
    <React.Fragment>
      <span>{title.substring(0, title.search("Ro"))}</span>
      <br />
      <span>{title.substring(title.search("Ro"))}</span>
    </React.Fragment>
  )

  return (
    <React.Fragment>
      <div className="container">
        <div className="section-hero-wrapper">
          <div className="section-hero">
            <h1 className="heading heading-xl">{titleFixer()}</h1>
          </div>
          <div className="section-hero-grid">
            <span className={textStyle}>{speciality}</span>
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
          </div>
        </div>
        <div className="section-projects-wrapper">
          <h3 className="heading heading-md">{psheading}</h3>
          <ProjectsSection lang={lang} />
        </div>
      </div>
      <HomeFooter />
    </React.Fragment>
  )
}

const ProjectsSection = ({ lang }) => {
  const [projectIndex, setProjectIndex] = useState(0)

  const defaults = { duration: 0.25, ease: "power3.out" }
  const animations = params => params.play()

  const indexSetter = index => setProjectIndex(index)

  const indexRetriever = index => {
    const onStart = () => indexSetter(index)
    const fadeOut = gsap
      .timeline({ defaults })
      .to(".gatsby-image-wrapper", { opacity: 0 })
    const fadeIn = gsap
      .timeline({ onStart, defaults })
      .to(".gatsby-image-wrapper", { opacity: 1 })

    animations(fadeOut.add(fadeIn))
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
            />
          </ul>
        </div>
      </div>
      <div className="section-projects-box">
        <div className="project-card" />
        <div className="project-card-wrapper">
          <div className="project-card-image">
            <Image
              image={
                allMarkdownRemark.edges[projectIndex].node.frontmatter.cover
              }
              costumClass="gatsby-image-wrapper"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const UImapper = ({ data, lang, indexRetriever, projectIndex }) =>
  data.edges.map((items, i) => {
    const { slug } = items.node.fields
    const { frontmatter } = items.node

    const content = languageFilter(frontmatter, lang)
    const index = "0" + (i + 1).toString()

    const { type } = content
    const { title } = frontmatter

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
            <span>{type}</span>
          </div>
        </Link>
      </li>
    )
  })

export default HomePage

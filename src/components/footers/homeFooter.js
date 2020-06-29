import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { useLanguages, languageFilter } from "../../utils/utils"
import footerHead from "../../assets/footerhead.svg"
import emailIcon from "../../assets/email.png"
import phoneIcon from "../../assets/phone.png"
import githubIcon from "../../assets/github.png"
import linkedinIcon from "../../assets/linkedin.png"
import Formy from "../form"

const HomeFooter = () => {
  const { lang } = useLanguages()
  const { allMarkdownRemark } = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "personal-information" } } }
      ) {
        edges {
          node {
            frontmatter {
              github
              linkedin
              email
              phone
              english {
                aboutHead
                aboutText
                contactHead
              }
              french {
                aboutHead
                aboutText
                contactHead
              }
            }
          }
        }
      }
    }
  `)

  const { frontmatter } = allMarkdownRemark.edges[0].node
  const content = languageFilter(frontmatter, lang)

  const { aboutHead, aboutText, contactHead } = content
  const { github, linkedin, phone, email } = frontmatter

  return (
    <footer>
      <div
        style={{ backgroundImage: `url(${footerHead})` }}
        className="footer-head"
      />
      <div className="footer-wrapper">
        <div className="footer-body container">
          <div className="footer-body-grid">
            <div className="footer-box">
              <h3 className="heading heading-md">{aboutHead}</h3>
              <p className="paragraph">{aboutText}</p>
              <div className="footer-box-subgrid">
                <div className="contact-info">
                  <img src={githubIcon} alt="github" />
                  <a
                    href={`http://${github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    github
                  </a>
                </div>
                <div className="contact-info">
                  <img src={emailIcon} alt="phone" />
                  <a href={`mailto:${email}`} className="dark-spans">
                    Email
                  </a>
                </div>
                <div className="contact-info">
                  <img src={linkedinIcon} alt="linkedin" />
                  <a
                    href={`http://${linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    linkedin
                  </a>
                </div>
                <div className="contact-info">
                  <img src={phoneIcon} alt="phone" />
                  <span className="dark-spans">+{phone}</span>
                </div>
              </div>
            </div>
            <div className="footer-box">
              <h3 className="heading heading-md no-mb">{contactHead}</h3>
              <Formy lang={lang} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default HomeFooter

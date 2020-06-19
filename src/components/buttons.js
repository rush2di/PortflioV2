import React from "react"
import scrollTo from "gatsby-plugin-smoothscroll"
import { useLanguages } from "../utils/utils"

const MobileBtns = ({ githubBTN, demoBTN, githubLINK, demoLINK }) => {
  const { lang } = useLanguages()

  const firstText = lang === "english" ? "view my work" : "voir mes projets"
  const secondText = lang === "english" ? "connect with me" : "me contactez"

  const redButton = !!demoBTN ? demoBTN : firstText
  const grayButton = !!githubBTN ? githubBTN : secondText

  const firstLinkLogic = !!githubLINK || {
    onClick: () => scrollTo(".section-projects-wrapper"),
  }
  const secondLinkLogic = !!demoLINK || {
    onClick: () => scrollTo(".no-mb"),
  }

  return (
    <div className="mobile-btns-wrapper">
      <button {...firstLinkLogic} className="btn-lg btn-red">
        {!!demoLINK ? (
          <a href={demoLINK} target="_blank" rel="noopener noreferrer">
            {redButton}
          </a>
        ) : (
          redButton
        )}
      </button>
      <button {...secondLinkLogic} className="btn-lg btn-gray">
        {!!githubLINK ? (
          <a href={githubLINK} target="_blank" rel="noopener noreferrer">
            {grayButton}
          </a>
        ) : (
          grayButton
        )}
      </button>
    </div>
  )
}

export default MobileBtns

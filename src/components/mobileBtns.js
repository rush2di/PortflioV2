import React from "react"
import scrollTo from "gatsby-plugin-smoothscroll"

const MobileBtns = ({ githubBTN, demoBTN, githubLINK, demoLINK }) => {
  const redButton = !!demoBTN ? demoBTN : "view my work"
  const grayButton = !!githubBTN ? githubBTN : "connect with me"

  const firstLinkLogic = !!githubLINK || {
    onClick: () => scrollTo(".section-projects-wrapper"),
  }
  const secondLinkLogic = !!demoLINK || {
    onClick: () => scrollTo(".no-mb"),
  }

  return (
    <div className="mobile-btns-wrapper">
      <button {...firstLinkLogic} className="btn-lg btn-red">
        {!!githubLINK ? (
          <a href={githubLINK} target="_blank" rel="noopener noreferrer">
            {redButton}
          </a>
        ) : (
          redButton
        )}
      </button>
      <button {...secondLinkLogic} className="btn-lg btn-gray">
        {!!demoLINK ? (
          <a href={demoLINK} target="_blank" rel="noopener noreferrer">
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

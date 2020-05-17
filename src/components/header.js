import React from "react"
import { Link } from "gatsby"

import { useThemes, useLanguages } from "../utils/utils"

const Header = (props) => {
  const { iconStyle, logoStyle, handleThemeToggle } = useThemes()
  const { setEnglish, setFrench } = useLanguages()

  return ( 
    <header className="container">
      <nav className="nav--wrapper">
        <div className="nav--logo">
          <Link to="/" >
            <img src={logoStyle} alt=""/>
          </Link>
        </div>
        <div className="nav--btns-wrapper">
          <div className="btn-box">
            <button onClick={() => setEnglish()}>en</button>
            <span>|</span>
            <button onClick={() => setFrench()}>fr</button>
          </div>
          <div className="btn-box">
            <button onClick={() => handleThemeToggle()}>
              <img src={iconStyle} alt=""/>
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
export default Header

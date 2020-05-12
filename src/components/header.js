import React from "react"
import { Link } from "gatsby"

import LogoLight from "../assets/logo-light.svg"
import LogoDark from "../assets/logo-dark.svg"
 
const Header = ({ siteTitle }) => {
  const themeLogic = LogoLight
  return ( 
    <header>
      <nav>
        <div className="nav--logo">
          <Link to="/" >
            <img src={themeLogic} alt=""/>
          </Link>
        </div>
      </nav>
    </header>
  )
}
export default Header

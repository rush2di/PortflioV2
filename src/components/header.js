import React from "react"
import { Link } from "gatsby"

import { useThemes } from "../utils/utils"

const Header = () => {
  const configs = useThemes()

  console.log(configs)

  return ( 
    <header>
      <nav>
        <div className="nav--logo">
          <Link to="/" >
            <img src="" alt=""/>
          </Link>
        </div>
      </nav>
    </header>
  )
}
export default Header

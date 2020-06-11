import React from "react"

import { useThemes } from "../utils/utils"
import Transition from "./transition"
import Providers from "./providers"
import Header from "./header"
import "../styles/styles.scss"

const Layout = ({ children, location }) => (
  <Providers>
    <AppWrapper>
      <Transition location={location}>
        <main className="section">{children}</main>
      </Transition>
    </AppWrapper>
  </Providers>
)

const AppWrapper = ({ children }) => {
  const { backgroundStyle } = useThemes()

  return (
    <div className={backgroundStyle}>
      <Header />
      {children}
    </div>
  )
}

export default Layout

import React from "react"

import {
  ThemeContextProvider,
  LangContextProvider,
  ScreenSpyProvider,
  useThemes,
} from "../utils/utils"
import Header from "./header"
import Transition from "./transition"
import "../styles/styles.scss"

const Layout = ({ children, location }) => {
  return (
    <LangContextProvider>
      <ThemeContextProvider>
        <ScreenSpyProvider>
          <Transition location={location}>
            <AppWrapper>
              <main className="section">{children}</main>
            </AppWrapper>
          </Transition>
        </ScreenSpyProvider>
      </ThemeContextProvider>
    </LangContextProvider>
  )
}

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

import React from "react"

import { ThemeContextProvider, LangContextProvider } from "../utils/utils"
import Header from "./header"
import Footer from "./footer"

const Layout = ({ children }) => {
  return (
    <LangContextProvider>
      <ThemeContextProvider>
       <Header/>
       <main>{children}</main>
       <Footer />
      </ThemeContextProvider>
    </LangContextProvider>
  )
}

export default Layout
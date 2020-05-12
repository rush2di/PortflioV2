import React from "react"

import { ThemeContextProvider } from "../utils/utils"
import Header from "./header"


const Layout = ({ children }) => {
  return (
    <ThemeContextProvider>
      <Header />
      <main>{children}</main>
    </ThemeContextProvider>
  )
}

export default Layout
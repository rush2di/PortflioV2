import React from "react"

import { ThemeContextProvider, LangContextProvider } from "../utils/utils"
import Header from "./header"

const Layout = ({ children }) => {
  return ( 
    <div>
    <LangContextProvider>
      <ThemeContextProvider>
       <Header/>
       <main>{children}</main>
      </ThemeContextProvider>
    </LangContextProvider>
    </div>
  )
}

export default Layout
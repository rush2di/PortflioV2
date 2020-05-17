import React from "react"

import { ThemeContextProvider, LangContextProvider, useThemes } from "../utils/utils"
import Header from "./header"
import Footer from "./footer"
import "../styles/styles.scss"

const Layout = ({children}) => {
  return (
    <LangContextProvider>
      <ThemeContextProvider>
	      <AppWrapper>      
		     <main className="section">
		     	{children}
		     </main>
		    </AppWrapper>
      </ThemeContextProvider>
    </LangContextProvider>
  )
}

const AppWrapper = ({children}) => {
  const { backgroundStyle } = useThemes()

	return (
	  <div className={backgroundStyle}>
	     <Header/>
	     {children}
	     <Footer />
	  </div>
	)
}

export default Layout
import React, { createContext, useContext, useRef, useEffect, useState} from "react"

import logoLight from "../assets/logo-light.svg"
import logoDark from "../assets/logo-dark.svg"
import moonIcon from "../assets/moon.svg"
import sunIcon from "../assets/sun.svg"


/*
 useScreenSpy hook checks the window screen width on first 
 mount and after every window resize event and returns it value
*/

const ScreenSpy = createContext<number>(500)

export const ScreenSpyProvider = ({ children }) => {
  const [dimensions, setDimensions] = useState(0)

  useEffect(() => {
    const handleResize = () => setDimensions(window.innerWidth)

    if (dimensions === 0) handleResize()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <ScreenSpy.Provider value={dimensions}>{children}</ScreenSpy.Provider>
}

export const useScreenSpy = () => useContext(ScreenSpy)

/*
useThemeSet hook passes the theme configs to child elements 
of themeContextProvider
*/

const themeContext = createContext<any>(null)

export const ThemeContextProvider = ({children}) => {
	const [ isDark, setIsDark ] = useState<boolean>(false)

	const paragraphStyles = isDark ? "pp-light" : "pp-dark"
	const logoStyles = isDark ? logoLight : logoDark
	const iconStyles = isDark ? moonIcon : sunIcon

	const handleThemeToggle = ():void => (
			isDark ? setIsDark(false) : setIsDark(true)
		)

	return (
		<themeContext.Provider value={{logoStyles, paragraphStyles, iconStyles, handleThemeToggle}}>
			{children}
		</themeContext.Provider>
		)
}

type Config = {
	paragraphStyles: string,
	logoStyles: string,
	iconStyles: string
	handleThemeToggle: void
}

export const useThemes = ():Config  => useContext(themeContext)
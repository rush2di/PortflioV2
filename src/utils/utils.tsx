import { createContext, useContext, useRef, useEffect, useState} from "react"

import logoLight from "../assets/logo-light.svg"
import logoDark from "../assets/logo-dark.svg"

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

	const handleThemeToggle = ():void => (
			isDark ? setIsDark(false) : setIsDark(true)
		)

	return (
		<themeContext.Provider value={{logoStyles, paragraphStyles, handleThemeToggle}}>
			{children}
		</themeContext.Provider>
		)
}

export const useThemes = () => useContext(themeContext)
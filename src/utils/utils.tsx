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
const themeContext = createContext(null)

export const ThemeContextProvider = ({children}) => {
	const [ isDark, setIsDark ] = useState<boolean>(false)

	const paragraphStyle = isDark ? "pp-light" : "pp-dark"
	const logoStyle = isDark ? logoLight : logoDark
	const iconStyle = isDark ? moonIcon : sunIcon

	const handleThemeToggle = ():void => (
			isDark ? setIsDark(false) : setIsDark(true)
		)

	return (
		<themeContext.Provider value={{logoStyle, paragraphStyle, iconStyle, handleThemeToggle}}>
			{children}
		</themeContext.Provider>
		)
}

type themeConfig = {
	paragraphStyle: string,
	logoStyle: string,
	iconStyle: string
	handleThemeToggle: any
}

export const useThemes = ():themeConfig  => useContext(themeContext)

/*
useThemeSet hook passes the theme configs to child elements 
of themeContextProvider
*/
const langContext = createContext(null)


export const LangContextProvider = ({children}) => {
	const [ lang, setLang ] = useState<string>("english")
	const setEnglish = ():void => lang === "french" && setLang("english")
	const setFrench = ():void => lang === "english" && setLang("french")

	return (
		<langContext.Provider value={{lang, setEnglish, setFrench}}>
			{children}
		</langContext.Provider>
		)
}

type langConfig = {
	lang: string,
	setEnglish: any,
	setFrench: any
}

export const useLanguages = ():langConfig  => useContext(langContext)

/*
function to transform query results to an array and returns 
a filtred one depending on the selected language
*/
export const languageFilter = (obj: object,lang: string):object => {
	const toArray = Object.keys(obj).map((key) => ({[key]: obj[key]}))
	const filtred = toArray.filter( val => Object.keys(val).includes(lang))

	return filtred[0][lang]
}
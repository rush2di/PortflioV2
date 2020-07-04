import React, { createContext, useContext, useEffect, useState } from "react"
import ScrollMagic from "ScrollMagic"

import logoLight from "../assets/logo-light.svg"
import logoDark from "../assets/logo-dark.svg"
import moonIcon from "../assets/moon.svg"
import sunIcon from "../assets/sun.svg"

/*
helper function uses scrollmagic to trigger the right animatiom
passed to it as an argument and accordingly to it's configs
*/
export const triggerAnimation = (): object => {
  const controller = new ScrollMagic.Controller()

  const scene = (trigger: string, offset: number, callback: any) => {
    new ScrollMagic.Scene({
      triggerElement: trigger,
      duration: 0,
      triggerHook: 0.85,
      offset: offset,
    })
      .on("enter", callback)
      .addTo(controller)
  }

  return { scene }
}

// helper function to slice the hero title and trim it on mobile view
export const titleFixer = (
  dimensions: number,
  title: string
): Array<string> => {
  const firstHeading = title.substring(0, title.search("Ro"))
  const secondHeading = title.substring(title.search("Ro"))

  const firstHeadingMobile =
    dimensions <= 425 ? title.substring(0, title.search(",") + 1) : firstHeading
  const secondHeadingMobile =
    dimensions <= 425
      ? title.substring(title.search(",") + 1, title.search("Be"))
      : secondHeading

  return [firstHeadingMobile, secondHeadingMobile]
}

/*
 useScreenSpy hook checks the window screen width on first 
 mount and after every window resize event and returns it value
*/

const ScreenSpy = createContext<Object>(500)

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

  return (
    <ScreenSpy.Provider value={{ dimensions }}>{children}</ScreenSpy.Provider>
  )
}

export const useScreenSpy = () => useContext(ScreenSpy)

/*
useThemeSet hook passes the theme configs to child elements 
of themeContextProvider
*/
const themeContext = createContext(null)

export const ThemeContextProvider = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(false)

  const backgroundStyle = isDark ? "dark-bg" : "light-bg"
  const textStyle = isDark ? "dark-spans" : "light-spans"
  const btnStyle = isDark ? "dark-btn" : "light-btn"
  const logoStyle = isDark ? logoLight : logoDark
  const iconStyle = isDark ? moonIcon : sunIcon

  const handleThemeToggle = (): void =>
    isDark ? setIsDark(false) : setIsDark(true)

  return (
    <themeContext.Provider
      value={{
        logoStyle,
        textStyle,
        btnStyle,
        backgroundStyle,
        iconStyle,
        handleThemeToggle,
      }}
    >
      {children}
    </themeContext.Provider>
  )
}

type themeConfig = {
  paragraphStyle: string
  logoStyle: string
  iconStyle: string
  handleThemeToggle: any
}

export const useThemes = (): themeConfig => useContext(themeContext)

/*
useThemeSet hook passes the theme configs to child elements 
of themeContextProvider
*/
const langContext = createContext(null)

export const LangContextProvider = ({ children }) => {
  const [lang, setLang] = useState<string>("english")
  const setEnglish = (): void => lang === "french" && setLang("english")
  const setFrench = (): void => lang === "english" && setLang("french")

  return (
    <langContext.Provider value={{ lang, setEnglish, setFrench }}>
      {children}
    </langContext.Provider>
  )
}

type langConfig = {
  lang: string
  setEnglish: any
  setFrench: any
}

export const useLanguages = (): langConfig => useContext(langContext)

/*
function to transform query results to an array and returns 
a filtred one depending on the selected language
*/
export const languageFilter = (obj: object, lang: string): object => {
  const toArray = Object.keys(obj).map(key => ({ [key]: obj[key] }))
  const filtred = toArray.filter(val => Object.keys(val).includes(lang))

  return filtred[0][lang]
}

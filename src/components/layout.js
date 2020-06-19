import React, { useEffect, useState } from "react"
import gsap from "gsap"

import { useThemes } from "../utils/utils"
import Transition from "./transition"
import Providers from "./providers/providers"
import Header from "./header"
import "../styles/styles.scss"

const Layout = ({ children, location }) => {
  useEffect(() => {
    const initialRender = JSON.parse(sessionStorage.getItem("rendredBefore"))
    const defaults = { duration: 1, ease: "power3.out", delay: 1 }

    const initialAnimation = gsap
      .timeline({ defaults })
      .to(".observer", { opacity: 1 })
      .pause()

    if (!!initialRender === false) {
      sessionStorage.setItem("rendredBefore", JSON.stringify(true))
      initialAnimation.play()
    } else {
      const observer = document.querySelector(".observer")
      observer.style.opacity = 1
    }
  }, [])

  return (
    <Providers>
      <AppWrapper>
        <Transition location={location}>
          <main className="section">{children}</main>
        </Transition>
      </AppWrapper>
    </Providers>
  )
}
const AppWrapper = ({ children }) => {
  const { backgroundStyle } = useThemes()

  return (
    <div className={backgroundStyle}>
      <div className="observer">
        <Header />
        {children}
      </div>
    </div>
  )
}

export default Layout

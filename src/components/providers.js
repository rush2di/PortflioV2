import React from "react"

import {
  ThemeContextProvider,
  LangContextProvider,
  ScreenSpyProvider,
} from "../utils/utils"

const Providers = ({ children }) => (
  <LangContextProvider>
    <ThemeContextProvider>
      <ScreenSpyProvider>{children}</ScreenSpyProvider>
    </ThemeContextProvider>
  </LangContextProvider>
)

export default Providers

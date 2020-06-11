import React from "react"
import {
  TransitionGroup,
  Transition as ReactTransition,
} from "react-transition-group"
import { useThemes } from "../utils/utils"

const timeout = 500

const getOpacityTransition = {
  entering: {
    transition: `all ${timeout}ms ease-in-out`,
    position: `fixed`,
    opacity: 0,
    transform: "translateY(2rem)",
  },
  entered: {
    transition: `all ${timeout}ms ease-in-out`,
    opacity: 1,
  },
  exiting: {
    transition: `all ${timeout}ms ease-in-out`,
    opacity: 0,
    transform: "translateY(4rem)",
  },
}

const styleFixer = { position: "relative", width: "100%" }

const Transition = ({ children, location }) => {
  const { backgroundStyle } = useThemes()

  return (
    <TransitionGroup>
      <ReactTransition
        key={!!location ? location.pathname : ""}
        timeout={{
          enter: timeout,
          exit: timeout,
        }}
      >
        {status => (
          <div style={styleFixer} className={backgroundStyle}>
            <div
              style={{
                ...getOpacityTransition[status],
              }}
            >
              {children}
            </div>
          </div>
        )}
      </ReactTransition>
    </TransitionGroup>
  )
}

export default Transition

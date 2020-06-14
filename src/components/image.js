import React from "react"
import Img from "gatsby-image"

const Image = ({ image, costumClass, style = {} }) =>
  !!image && !!image.childImageSharp ? (
    <Img
      fluid={image.childImageSharp.fluid}
      alt="cover"
      {...(!!costumClass && { className: costumClass })}
      style={style}
    />
  ) : (
    <img
      src={image.publicURL}
      alt="cover"
      {...(!!costumClass && { className: costumClass })}
      style={style}
    />
  )

export default Image

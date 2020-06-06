import React from "react"
import Img from "gatsby-image"

const Image = ({ image, costumClass, alt }) =>
  !!image && !!image.childImageSharp ? (
    <Img
      fluid={image.childImageSharp.fluid}
      alt="cover"
      {...(!!costumClass && { className: costumClass })}
    />
  ) : (
    <img
      src={image.publicURL}
      alt={alt}
      {...(!!costumClass && { className: costumClass })}
    />
  )

export default Image

// Gatsby supports TypeScript natively!
import React from "react"
import { Link } from "gatsby"

import SEO from "../components/seo"

const SecondPage = (props) => (
  <React.Fragment>
    <SEO title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2 ({props.path})</p>
    <Link to="/">Go back to the homepage</Link>
  </React.Fragment>
)

export default SecondPage

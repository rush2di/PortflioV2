import React from "react"

import SEO from "../components/seo"

const NotFoundPage = () => (
  <React.Fragment>
    <SEO title="404: Not found" />
    <div
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "5rem",
      }}
    >
      <h1 className="heading heading-lg">NOT FOUND</h1>
      <p style={{ marginTop: "2rem" }}>
        You just hit a route that doesn&#39;t exist... the sadness.
      </p>
    </div>
  </React.Fragment>
)

export default NotFoundPage

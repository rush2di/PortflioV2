import React from "react"
import { Link } from "gatsby"

const HomePage = () => {
	return (
	  <React.Fragmment>
	    <h1>Hi people</h1>
	    <p>Welcome to your new Gatsby site.</p>
	    <p>Now go build something great.</p>
	    <Link to="/page-2/">Go to page 2</Link>
	  </React.Fragmment>
	)
}
export default HomePage
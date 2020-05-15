import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import { useLanguages, languageFilter } from "../utils/utils"

const HomePage = ({data}) => {
	const { lang } = useLanguages()
	const { frontmatter } = data.edges[0].node
	const content = languageFilter(frontmatter, lang)
	const { title, introduction, paragraph, speciality, tsheading, tsparagraph, psheading } = content

	return (
	  <React.Fragment>
	    <h1>{title}</h1>
	    <span>{speciality}</span>
	    <p><span>{introduction}</span>{paragraph}</p>
	    <div>
	    	<h3>{tsheading}</h3>
	    	<p>{tsparagraph}</p>
	    </div>	    
	    <div>
	    	<h3>{psheading}</h3>
	    	<ProjectsSection lang={lang}/>
	    </div>
	    <Link to="/page-2/">Go to page 2</Link>
	  </React.Fragment>
	)
}

const ProjectsSection = ({lang}) => {
	const { allMarkdownRemark } = useStaticQuery(graphql`
{
  allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "projects-template"}}}, sort: {fields: [frontmatter___date], order: DESC}) {
    edges {
      node {
      	fields {
      		slug
      	}
        frontmatter {
          title
          date
          english {
            intro
            type
          }
          french {
            intro
            type
          }
        }
      }
    }
  }
}	
`)
	console.log(allMarkdownRemark)
	return (
		<ul>
			<UImapper data={allMarkdownRemark} lang={lang} />
		</ul>
		)
}

const UImapper = ({data, lang}) => (
	data.edges.map((items,i) => {
		const { slug } = items.node.fields
		const { frontmatter } = items.node

		const content = languageFilter(frontmatter, lang)
		const index = i.toFixed(2)

		const { intro, type } = content
		const { title } = frontmatter

		return (
			<li key={title+index}>
				<Link to={`projects/${slug}`}>
					<div>
						<span>{index}</span>
						<h3>{title}</h3>
						<span>{type}</span>
					</div>
				</Link>
			</li>
			)
	})
)

export default HomePage
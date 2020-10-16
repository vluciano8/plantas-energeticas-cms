
import React from 'react';
import CardSmall from "../components/cardSmall"
import { useStaticQuery, graphql } from "gatsby"

const Sidebar = () => {

    const data = useStaticQuery(graphql`
{
  tagsGroup: allMarkdownRemark(limit: 100) {
    group(field: frontmatter___tags) {
      fieldValue
    }
  }
  allMarkdownRemark(limit:5 sort:{fields:frontmatter___date, order:DESC} ) {
    edges {
      node {
        id
        fields {
          slug
        }
        frontmatter {
          date(formatString: "DD/MM/YYYY")
          title
          description
          category
          tags
          featuredImage {
            childImageSharp {
              fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
}
`)
return  ( 
    <div className="sidebar">
    {/* <h2 className="sidebar-header">Suscribete</h2> */}
    <div className="sidebar-emails">
      <h2>Suscribete</h2>
      <p>a nuestro newsletter mensual</p> 
      <form>
        <input type="text" id="email" aria-label="email" />
        <input
          type="submit"
          value="Suscribete"
          aria-label="subscribe"
        />{" "}
      </form>
      <span>Puedes desuscribir cuando quieras</span>
    </div>
    <h2 className="sidebar-header">Entradas Populares</h2>
      <div>
      {data.allMarkdownRemark.edges.map(({ node }, index) => {
        if (index > 1 && index < 5) {
          return (
            <CardSmall
              key={node.id}
              slug={node.fields.slug}
              frontmatter={node.frontmatter}
            />
          )
        } else return null
      })}
    </div>
  </div>
 );
}

    

 
export default Sidebar;
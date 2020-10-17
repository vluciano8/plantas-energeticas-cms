import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { FaAngleDoubleRight } from "react-icons/fa"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Card from "../components/card"
import Sidebar from '../components/sidebar'
//import Featured from "../components/featured"
import Search from "../components/search"

const IndexPage = props => {
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
              date(formatString: "DD.MM.YYYY")
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
  const [queryType, query] = props.location.search.split("=")

  if (queryType === "?s" && query.length > 0) {
    return (
      <Layout>
        <Search
          markdown={data.allMarkdownRemark}
          tagsGroup={data.tagsGroup}
          query={query}
        />
      </Layout>
    )
  } else {
    return (
      <Layout>
        <SEO title="Home" slug="/" />
         {/* <Featured markdown={data.allMarkdownRemark} /> */}
        <div className="flex-layout">
          <div className="cards">
            <h2 id="articles-title">Articulos</h2>
            {data.allMarkdownRemark.edges.map(({ node }, index) => {
              if (index < 0) {
                return null
              } else {
                return (
                  <Card
                    key={node.id}
                    slug={node.fields.slug}
                    frontmatter={node.frontmatter}
                  />
                )
              }
            })}
            
          </div>

          <Sidebar />
        </div>
        <Link to="/blog" id="archive-link">
          Todas las entradas
          <FaAngleDoubleRight className="icon-right" />
        </Link>{" "}
        <br />
      </Layout>
    )
  }
}

export default IndexPage

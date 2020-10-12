import React from "react"
import { graphql, Link } from "gatsby"

import Card from "../components/card"
import CardSmall from "../components/cardSmall"
import Layout from "../components/layout"
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa"

function ArchivePageTemplate({ data, pageContext }) {
  const { numPages, currentPage } = pageContext
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout pageType="Archive">
      <h2 className="page-header">Listado Entradas {currentPage}</h2>
      <div className="flex-layout">
        <div className="cards">
          <h2 id="articles-title">Entradas</h2>
          {posts.map(({ node }, index) => {
            return (
              <Card
                key={node.id}
                slug={node.fields.slug}
                frontmatter={node.frontmatter}
              />
            )
          })}
          <div className="pagination-links">
            {currentPage === 1 && (
              <Link disabled className="pagination-disabled">
                <FaAngleDoubleLeft className="icon-left" />
                <span>Anterior</span>
              </Link>
            )}
            {currentPage === 2 && (
              <Link to="/archive" className="pagination-link">
                <FaAngleDoubleLeft className="icon-left icon-fix" />
                <span>Anterior</span>
              </Link>
            )}
            {currentPage > 2 && (
              <Link
                to={`/archive/${currentPage - 1}`}
                className="pagination-link"
              >
                <FaAngleDoubleLeft className="icon-left icon-fix" />
                <span>Anterior</span>
              </Link>
            )}
            {currentPage > 0 && (
              <div className="paginationDetails">
                <span>Página</span>&nbsp;
                {currentPage} de {numPages}
              </div>
            )}
            {currentPage < numPages ? (
              <Link
                to={`/archive/${currentPage + 1}`}
                className="pagination-link"
              >
                <span>Siguiente</span>
                <FaAngleDoubleRight className="icon-right icon-fix" />
              </Link>
            ) : (
              <Link disabled className="pagination-disabled">
                <span>Siguiente</span>
                <FaAngleDoubleRight className="icon-right icon-fix" />
              </Link>
            )}
          </div>
        </div>
        <div className="sidebar">
          <h2 className="sidebar-header">Mailing List</h2>
          <div className="sidebar-emails">
            <h2>Mailing list here</h2>
            <p>Subscribe to my list for lots of great reasons</p>
            <form>
              <input type="text" id="email" aria-label="email" />
              <input
                type="submit"
                value="Subscribe"
                aria-label="subscribe"
              />{" "}
            </form>
            <span>Weekly updates, unsubscribe at any time</span>
          </div>
          <h2 className="sidebar-header">Popular Articles</h2>
          <div className="sidebar-popular">
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
      </div>
    </Layout>
  )
}

export default ArchivePageTemplate
export const pageQuery = graphql`
  query archiveQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
            category
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`

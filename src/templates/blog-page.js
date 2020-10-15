import React from "react"
import { graphql, Link } from "gatsby"

import Card from "../components/card"
import Sidebar from "../components/sidebar"
import Layout from "../components/layout"
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa"

function BlogPageTemplate({ data, pageContext }) {
  const { numPages, currentPage } = pageContext
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout pageType="Blog">
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
              <Link disabled className="pagination-disabled" to={"/"}>
                <FaAngleDoubleLeft className="icon-left" />
                <span>Anterior</span>
              </Link>
            )}
            {currentPage === 2 && (
              <Link to="/blog" className="pagination-link">
                <FaAngleDoubleLeft className="icon-left icon-fix" />
                <span>Anterior</span>
              </Link>
            )}
            {currentPage > 2 && (
              <Link
                to={`/blog/${currentPage - 1}`}
                className="pagination-link"
              >
                <FaAngleDoubleLeft className="icon-left icon-fix" />
                <span>Anterior</span>
              </Link>
            )}
            {currentPage > 0 && (
              <div className="paginationDetails">
                &nbsp;
                {currentPage} de {numPages}
              </div>
            )}
            {currentPage < numPages ? (
              <Link
                to={`/blog/${currentPage + 1}`}
                className="pagination-link"
              >
                <span>Próxima</span>
                <FaAngleDoubleRight className="icon-right icon-fix" />
              </Link>
            ) : (
              <Link disabled className="pagination-disabled" to={"/"}>
              
                <span>Próxima</span>
                <FaAngleDoubleRight className="icon-right icon-fix" />
              </Link>
            )}
          </div>
        </div>
        <Sidebar />
      </div>
    </Layout>
  )
}

export default BlogPageTemplate
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
          id
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD.MM.YYYY")
            title
            description
            tags
            category
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 400) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`

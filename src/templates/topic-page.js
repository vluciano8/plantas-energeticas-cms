import React from "react"

import { graphql, useStaticQuery } from "gatsby"
import Image from "gatsby-image"
import Card from "../components/card"
import CardSmall from "../components/cardSmall"
import Layout from "../components/layout"

const TopicPageTemplate = ({ pageContext }) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark {
        edges {
          node {
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
      allTopicsJson {
        edges {
          node {
            name
            slug
            image {
              childImageSharp {
                fluid(maxWidth: 240, maxHeight: 240) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  `)

  const { topic } = pageContext
  const { edges } = data.allMarkdownRemark

  const edgesWithTopic = edges.filter(({ node }) => {
    return node.frontmatter.tags.includes(topic)
  })

  const topicInfo = data.allTopicsJson.edges.filter(({ node }) => {
    return node.slug === topic.toLowerCase().replace(" ", "-")
  })[0].node

  return (
    <Layout pageType="Topic">
      <div className="topic-page-header">
        <h1>{topic}</h1>
        <Image
          className="topic-page-image"
          fluid={topicInfo.image.childImageSharp.fluid}
          alt={topicInfo.name}
        />{" "}
      </div>
      <div className="flex-layout">
        <div className="cards">
          <h2 id="articles-title">Articulos</h2>
          {edgesWithTopic.map(({ node }, index) => {
            return (
              <Card
                key={node.fields.slug}
                slug={node.fields.slug}
                frontmatter={node.frontmatter}
              />
            )
          })}
        </div>
        <div className="sidebar">
          <h2 className="sidebar-header">Suscribete</h2>
          <div className="sidebar-emails">
            <h2>Newsletter</h2>
            <p>Recibe nuestras novedades</p>
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
          <h2 className="sidebar-header">Popular Articles</h2>
          <div className="sidebar-popular">
            {data.allMarkdownRemark.edges.map(({ node }, index) => {
              if (index > 2 && index < 5) {
                return (
                  <CardSmall
                    key={node.fields.slug}
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

export default TopicPageTemplate

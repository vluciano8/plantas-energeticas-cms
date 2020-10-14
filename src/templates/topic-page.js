import React from "react"

import { graphql, useStaticQuery } from "gatsby"
import Image from "gatsby-image"
import Card from "../components/card"
import Sidebar from '../components/sidebar'
import Layout from "../components/layout"

const TopicPageTemplate = ({ pageContext }) => {

  const { topic } = pageContext
  
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(sort:{fields:frontmatter___date, order:DESC}) {
        edges {
          node {
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
        <Sidebar />
      </div>
    </Layout>
  )
}

export default TopicPageTemplate

import React, { Component } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Image from "gatsby-image"
import SEO from "../components/seo"
import Card from "../components/card"
import { FaRegCalendar,FaFacebookF, FaTwitter, FaGoogle, FaLinkedinIn} from 'react-icons/fa'


class ArticleTemplate extends Component {
  render() {
    const { data, pageContext } = this.props
    const { topic } = pageContext
    const baseUrl = 'https://plantas-energeticas.netlify.app/'
    const post = data.markdownRemark

    const similarPosts = data.allMarkdownRemark.edges
      .filter(item => {
        return (
          item.node.frontmatter.category === topic &&
          item.node.frontmatter.title !== post.frontmatter.title
        )
      })
      .filter((item, index) => {
        return index < 2
      })

    return (
      <Layout pageType="Post">
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description}
        />
        <div id="article">
          <header>
            <h1 className="article-title">{post.frontmatter.title}</h1>
            <span className="article-date"><FaRegCalendar value={{ className: 'react-icons' }}/>{' '}{post.frontmatter.date}</span>            
            <div className="article-tags">
              {post.frontmatter.tags.map(tag => (
                <Link
                  className="tag"
                  key={tag}
                  to={`/${tag
                    .split(" ")
                    .join("-")
                    .split("/")
                    .join("-")
                    .toLowerCase()}`}
                >
                  {tag}
                </Link>
              ))}
            </div>
            <Image
            className="article-image lazyload"
              fluid={post.frontmatter.featuredImage.childImageSharp.fluid}
            ></Image>
          </header>
          <div
            className="article-markdown"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          <h3 className="share-title">Si te gusto, comparte</h3>
          <div className="social-share-links">
          <ul>
          <li>
            <a href={'https://www.facebook.com/sharer/php?u=' + baseUrl + pageContext.slug  } className="facebook" target="_blank" rel="noopener noreferrer">
            <div className="share-icons-background">
              <FaFacebookF size={20} />
            </div>
              
            </a>
          </li>
          <li>
            <a href={'https://www.twitter.com/share?url=' + baseUrl + pageContext.slug+ '&text='+ post.title + '&via' } className="twitter" target="_blank" rel="noopener noreferrer">
            <div className="share-icons-background">
              <FaTwitter size={20}/>
              </div>
            </a>
          </li>
          <li>
          <a href={'https://plus.google.com/share?url=' + baseUrl + pageContext.slug } className="google" target="_blank" rel="noopener noreferrer">
          <div className="share-icons-background">
            <FaGoogle size={20} />
            </div>
          </a>
        </li>
        <li>
          <a href={'https://www.linkedin.com/shareArticle?url=' + baseUrl + pageContext.slug } className="linkedin" target="_blank" rel="noopener noreferrer">
          <div className="share-icons-background">
            <FaLinkedinIn size={20} />
            </div>
          </a>
        </li>
          </ul>
          </div>
          <div>
            {similarPosts.length > 0 && (
              <h3 id="similar-posts-header">
                Otras Entradas de {this.props.pageContext.topic}
              </h3>
            )}

            <section>
              {similarPosts.map(({ node }) => {
                return (
                  <Card
                    key={node.fields.slug}
                    title={node.frontmatter.title}
                    slug={node.fields.slug}
                    date={node.frontmatter.date}
                    description={node.frontmatter.description}
                    excerpt={node.excerpt}
                    frontmatter={node.frontmatter}
                  />
                )
              })}
            </section>
          </div>
        </div>
        
      </Layout>
    )
  }
}

export default ArticleTemplate
export const pageQuery = graphql`
  query ArticleBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "DD.MM.YYYY")
        dateModified(formatString: "MMMM DD, YYYY")
        description
        tags
        category
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
    allMarkdownRemark {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
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

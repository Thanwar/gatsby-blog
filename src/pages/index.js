import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import styled  from "styled-components"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"


const Post = styled.div`
  display: flex;
`
const PostImage = styled.div`
  flex: 25%;
  margin-right: 1rem;
`
const PostText = styled.div`
  flex: 75%;
`


const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allContentfulPost.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
        {posts.map(({node}) => {
          const title = node.title || node.slug
          return (
            <Post key={node.slug}>
                <PostImage>
                  <Img fluid={node.image.fluid} />
                </PostImage>

                <PostText>
                <header>
                  <h2 style={{
                    marginTop: 0,
                  }}>
                    <Link to={node.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                </header>
                <section>
                <p>{node.subtitle}</p>
                </section>
                </PostText>
            </Post>
          )
        })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPost {
          edges {
            node {
              title
              subtitle
              image {
                fluid {
                  ...GatsbyContentfulFluid
                }
              }
              slug
            }
          }
        }
  }
`

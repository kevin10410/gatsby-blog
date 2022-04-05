/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

type QueryTypes = {
  site: {
    siteMetadata: {
      title: string
      description: string
      author: string
    }
  }
}

type NameMetaObj = {
  name: string
  content: string
}

type PropertyMetaObj = {
  property: string
  content: string
}

interface SEOProps {
  description?: string,
  lang?: string,
  meta?: Array<NameMetaObj | PropertyMetaObj>,
  title: string
}

const Seo = ({ description='', lang='en', meta=[], title }: SEOProps) => {
  const { site } = useStaticQuery<QueryTypes>(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  )

  const metaDescription: string = description || site.siteMetadata.description
  const defaultTitle: string = site.siteMetadata?.title

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : undefined}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
      ].concat(meta)}
    />
  )
}

export default Seo

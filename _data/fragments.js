const links = `
  ... on PageRecord {
    text: name
    url
  }
  ... on LinkRecord {
    text
    url
    newTab
  }
`

const seo = `
  siteName
  titleSuffix
  twitterAccount
  fallbackSeo {
    description
    title
    twitterCard
    image {
      url
    }
  }
  facebookPageUrl
`

module.exports = {
  links,
  seo,
}

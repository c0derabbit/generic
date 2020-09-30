const fetch = require('node-fetch')
const token = process.env.DATOCMS_TOKEN

const { links } = require('./fragments')

module.exports = async () => {
  try {
    const res = await fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `{
          _site {
            favicon {
              url
            }
            seo: globalSeo {
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
            }
          }
          navigation {
            siteName
            showSiteName
            logo {
              url
            }
            header {
              ... on PageRecord {
                text: name
                url
              }
              ... on LinkRecord {
                text
                url
                newTab
              }
            }
            footer {
              name
              links {
                ... on PageRecord {
                  text: name
                  url
                }
                ... on LinkRecord {
                  text
                  url
                  newTab
                }
              }
            }
          }
          pages: allPages {
            name
            url
            seo {
              title
              description
              twitterCard
            }
            sections {
              ... on HeroRecord {
                _modelApiKey
                title
                text
                cta {
                  ... on PageRecord {
                    text: name
                    url
                  }
                  ... on LinkRecord {
                    text
                    url
                    newTab
                  }
                }
                secondaryCta {
                  ... on PageRecord {
                    text: name
                    url
                  }
                  ... on LinkRecord {
                    text
                    url
                    newTab
                  }
                }
                image {
                  url
                }
              }
              ... on FeatureListRecord {
                _modelApiKey
                title
                subtitle
                features {
                  title
                  description
                  illustration {
                    url
                  }
                  link {
                    ... on LinkRecord {
                      text
                      url
                      newTab
                    }
                    ... on PageRecord {
                      text: name
                      url
                    }
                  }
                }
              }
            }
          }
        }`,
      }),
    });

    const { data } = await res.json()

    return data
  } catch (error) {
    console.error(error)
  }
}

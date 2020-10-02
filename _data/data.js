const fetch = require('node-fetch')
const token = process.env.DATOCMS_TOKEN

const { links, seo } = require('./fragments')

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
              ${seo}
            }
          }
          navigation {
            siteName
            showSiteName
            logo {
              url
            }
            header {
              ${links}
            }
            footer {
              name
              links {
                ${links}
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
                  ${links}
                }
                secondaryCta {
                  ${links}
                }
                image {
                  url
                }
                imageAlignment
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
                    ${links}
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

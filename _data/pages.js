const fetch = require('node-fetch')
const token = process.env.DATOCMS_TOKEN

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

    return data.pages
  } catch (error) {
    console.error(error)
  }
}

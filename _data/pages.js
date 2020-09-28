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
                title
                text
                ctaText
                ctaUrl
                image {
                  url
                }
                _modelApiKey
              }
              ... on TestRecord {
                title
                _modelApiKey
              }
            }
          }
        }`,
      }),
    });

    const { data } = await res.json()
    console.log(data.pages)

    return data.pages
  } catch (error) {
    console.error(error)
  }
}

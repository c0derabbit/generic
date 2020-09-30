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

module.exports = {
  links,
}

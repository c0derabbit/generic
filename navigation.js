const getData = require('./data')

module.exports = async () => {
  const data = await getData()

  return data.navigation
}

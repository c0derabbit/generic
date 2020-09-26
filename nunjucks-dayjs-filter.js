const dayjs = require('dayjs')

function dayjsFilter(date, format = null) {
  return dayjs(date).format(format)
}

module.exports = dayjsFilter

var hljs = require('highlight.js')

module.exports = function(config) {
  config.addPassthroughCopy({ public: './' })
  config.addPassthroughCopy('./css/')
  config.addNunjucksFilter('date', require('./nunjucks-dayjs-filter'))

  const highlight = (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (_) {}
    }
    return ''
  }

  const markdownIt = require('markdown-it')
  const options = {
    html: true,
    linkify: true,
    typographer: true,
    highlight,
  }
  const markdownLib = markdownIt(options).use(require('markdown-it-footnote'))

  config.setLibrary('md', markdownLib)

  return {
    templateFormats: ['md', 'njk', 'jpg', 'png', 'gif'],
  }
}

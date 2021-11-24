const flatten = require('./format/flatten')
const NL = '\n'
const EMPTY_LINE = ''

function format (data) {
  const groups = Object.keys(data).filter(g => g !== 'comments')
  const comments = data.comments || []

  const lines = []
  comments.forEach(comment => {
    lines.push(comment)
  })
  lines.push(EMPTY_LINE)
  groups.forEach(group => formatGroup(group, data[group], lines))

  lines.push(EMPTY_LINE)
  return lines.join(NL)
}

function formatGroup (groupName, items, lines) {
  items.forEach(item => formatItem(groupName, item, lines))
}

function formatItem (groupName, item, lines) {
  lines.push(`[${groupName}]`)
  const properties = flatten(item)
  const maxKeyLength = Math.max(...Object.keys(properties).map(key => key.length)) + 1
  Object.entries(properties).forEach(([key, value]) => {
    let paddedKey = key
    while (paddedKey.length < maxKeyLength) {
      paddedKey = paddedKey + ' '
    }
    lines.push(`${paddedKey} ${value}`)
  })
  lines.push(EMPTY_LINE)
}

module.exports = format

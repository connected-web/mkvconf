const fs = require('fs')
const path = require('path')

function saveFixture (name, data) {
  const filepath = path.join(__dirname, '../fixtures/', name)
  const body = name.includes('.json') ? JSON.stringify(data, null, 2) : data
  return fs.writeFileSync(filepath, body, 'utf8')
}

module.exports = saveFixture

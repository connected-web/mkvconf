const fs = require('fs')
const path = require('path')

function loadFixture (name) {
  const filepath = path.join(__dirname, '../fixtures/', name)
  const body = fs.readFileSync(filepath, 'utf8')
  return name.includes('.json') ? JSON.parse(body) : body
}

module.exports = loadFixture

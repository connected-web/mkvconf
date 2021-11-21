const { version } = require('../package.json')
const commands = require('./commands')

async function help ({ args, cwd }) {
  console.log(`[mkvconf] v${version} Help`)
  const info = Object.entries(commands()).map(([key, { description }]) => {
    return `  ${description}`
  })
  info.forEach(line => {
    console.log(line)
  })
}
help.description = 'help : Display a list of available commands'

module.exports = help

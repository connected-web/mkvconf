module.exports = () => {
  const help = require('./commands/help')
  const lint = require('./commands/lint')
  const json = require('./commands/json')

  return {
    help,
    lint,
    json
  }
}

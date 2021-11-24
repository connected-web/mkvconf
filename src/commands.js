module.exports = () => {
  const help = require('./commands/help')
  const lint = require('./commands/lint')

  return {
    help,
    lint
  }
}

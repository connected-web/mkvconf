module.exports = () => {
  const help = require('./help')
  const lint = require('./lint')

  return {
    help,
    lint
  }
}

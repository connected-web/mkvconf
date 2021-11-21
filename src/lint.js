const lintFile = require('./linting/lintFile')

function fixMode (args) {
  return args.filter(arg => arg.charAt(0) === '-')[0] === '--fix'
}

function filterFiles (args) {
  return args.filter(arg => arg.charAt(0) !== '-')
}

async function lint ({ args, cwd }) {
  const fixErrors = fixMode(args)
  const files = filterFiles(args)
  if (files.length > 0) {
    const work = files.map(file => lintFile(file, cwd, fixErrors))
    return Promise.all(work)
  } else {
    console.error('No files provided to lint.')
  }
}
lint.description = 'lint [--fix] [file] : Check an input file for linting errors'

module.exports = lint

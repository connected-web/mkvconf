const lintFile = require('../linting/lintFile')

function fixMode (args) {
  return args.filter(arg => arg.trim() === '--fix').length > 0
}

function suffixMode (args) {
  return args.filter(arg => arg.trim() === '--suffix').length > 0
}

function filterFiles (args) {
  return args.filter(arg => arg.charAt(0) !== '-')
}

async function lint ({ args, cwd }) {
  const fixErrors = fixMode(args)
  const saveWithSuffix = suffixMode(args)
  const files = filterFiles(args)
  if (files.length > 0) {
    const work = files.map(file => lintFile(file, cwd, fixErrors, saveWithSuffix))
    return Promise.all(work)
  } else {
    console.error('No files provided to lint.')
  }
}
lint.description = [
  'lint file     : Check an input file for linting errors',
  '     --fix    : Fix errors inline, replaces input file after read',
  '     --suffix : Generate a new linted file, with the ".linted" suffix'
].join('\n')

module.exports = lint

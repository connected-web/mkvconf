const find = require('fast-glob')
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

function sortFilelistByName (a, b) {
  return (a + '').localeCompare(b + '')
}

async function findFiles (files) {
  const foundFiles = await find(files, { dot: true })
  return foundFiles.sort(sortFilelistByName)
}

async function lint ({ args, cwd }) {
  const fixErrors = fixMode(args)
  const saveWithSuffix = suffixMode(args)
  const files = filterFiles(args)
  const expandedFilelist = await findFiles(files)
  if (files.length > 0) {
    const work = expandedFilelist.map(file => lintFile(file, cwd, fixErrors, saveWithSuffix))
    try {
      const results = await Promise.all(work)
      results.forEach(result => {
        result.logs.forEach(line => console.log(line))
        result.errors.forEach(line => console.error(line))
      })
      const filesRequiredLinting = results.filter(r => r.requiredLinting).length > 0
      if (fixErrors || saveWithSuffix) {
        process.exit(0)
      } else if (filesRequiredLinting) {
        process.exit(1)
      } else {
        process.exit(0)
      }
    } catch (ex) {
      console.error(ex)
      process.exit(3)
    }
  } else {
    console.error('No files provided to lint.')
    process.exit(4)
  }
}
lint.description = [
  'lint file     : Check an input file for linting errors',
  '     --fix    : Fix errors inline, replaces input file after read',
  '     --suffix : Generate a new linted file, with the ".linted" suffix'
].join('\n')

module.exports = lint

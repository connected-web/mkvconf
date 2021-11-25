const convertFileToJson = require('../linting/convertFileToJson')

function filterFiles (args) {
  return args.filter(arg => arg.charAt(0) !== '-')
}

async function json ({ args, cwd }) {
  const files = filterFiles(args)
  if (files.length > 0) {
    const work = files.map(file => convertFileToJson(file, cwd))
    try {
      await Promise.all(work)
      process.exit(0)
    } catch (ex) {
      console.error(ex)
      process.exit(1)
    }
  } else {
    console.error('No files provided to convert to JSON.')
    process.exit(2)
  }
}
json.description = [
  'json file     : Convert the input file into json with a .json suffix'
].join('\n')

module.exports = json

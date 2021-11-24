const asyncFs = require('fs/promises')
const mkvconf = require('../../')

async function lintFile (file, cwd, fixErrors, saveWithSuffix) {
  const body = await asyncFs.readFile(file, 'utf8')
  const data = mkvconf.parse(body)
  const result = mkvconf.format(data)

  if (result.length !== body.length) {
    if (!fixErrors) {
      console.error(`Imperfections found in ${file}; can be fixed with the --fix flag`)
    }
  }

  if (saveWithSuffix) {
    await asyncFs.writeFile(`${file}.linted`, result, 'utf8')
  }
}

module.exports = lintFile

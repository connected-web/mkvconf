const asyncFs = require('fs/promises')
const mkvconf = require('../../')

async function lintFile (file, cwd, fixErrors, saveWithSuffix) {
  const source = await asyncFs.readFile(file, 'utf8')
  const sourceData = mkvconf.parse(source)
  const result = mkvconf.format(sourceData)
  const resultLines = result.split('\n')

  const requiredLinting = result.length !== source.length

  const logs = []
  const errors = []

  if (requiredLinting) {
    if (fixErrors) {
      await asyncFs.writeFile(file, result, 'utf8')
      logs.push(`Linted ${file} OK (${result.length} bytes, ${resultLines.length} lines).`)
    } else if (saveWithSuffix) {
      await asyncFs.writeFile(`${file}.linted`, result, 'utf8')
      logs.push(`Linted ${file} saved as ${file}.linted OK (${result.length} bytes, ${resultLines.length} lines).`)
    } else {
      errors.push(`Imperfections found in ${file}; (${result.length} bytes, ${resultLines.length} lines) - can be fixed with the --fix flag`)
    }
  }

  return {
    requiredLinting,
    saveWithSuffix,
    source,
    sourceData,
    result,
    logs,
    errors
  }
}

module.exports = lintFile

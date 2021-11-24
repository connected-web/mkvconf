const asyncFs = require('fs/promises')
const mkvconf = require('../../')

async function lintFile (file, cwd, fixErrors, saveWithSuffix) {
  const source = await asyncFs.readFile(file, 'utf8')
  const sourceData = mkvconf.parse(source)
  const result = mkvconf.format(sourceData)
  const resultLines = result.split('\n')

  const requiredLinting = result.length !== source.length

  if (requiredLinting) {
    if (fixErrors) {
      await asyncFs.writeFile(file, result, 'utf8')
      console.log(`Linted ${file} OK (${result.length} bytes, ${resultLines.length} lines).`)
    } else {
      console.error(`Imperfections found in ${file}; (${result.length} bytes, ${resultLines.length} lines) - can be fixed with the --fix flag`)
    }
  }

  if (saveWithSuffix) {
    await asyncFs.writeFile(`${file}.linted`, result, 'utf8')
  }

  return {
    requiredLinting,
    saveWithSuffix,
    source,
    sourceData,
    result
  }
}

module.exports = lintFile

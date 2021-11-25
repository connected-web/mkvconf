const asyncFs = require('fs/promises')
const mkvconf = require('../../')

async function convertFileToJson (file, cwd) {
  const source = await asyncFs.readFile(file, 'utf8')
  const sourceData = mkvconf.parse(source)
  const result = JSON.stringify(sourceData, null, 2)
  const resultLines = result.split('\n')

  await asyncFs.writeFile(`${file}.json`, result, 'utf8')
  console.log(`Source ${file} saved as ${file}.json OK (${result.length} bytes, ${resultLines.length} lines).`)

  return {
    source,
    sourceData,
    result
  }
}

module.exports = convertFileToJson

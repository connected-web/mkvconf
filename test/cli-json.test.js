const { expect } = require('chai')
const asyncExec = require('./helpers/asyncExec')
const loadFixture = require('./helpers/loadFixture')
const NL = '\n'

describe('Command Line Interface - JSON', () => {
  it('should complain if no input file is supplied', async () => {
    let actual, command
    try {
      command = await asyncExec('node cli.js json')
    } catch (ex) {
      actual = ex.message.trim().split(NL)
    }
    const expected = [
      'Command failed: node cli.js json',
      'No files provided to convert to JSON.'
    ]
    expect(actual || command.stderr?.split(NL) || command.stdout?.split(NL)).to.deep.equal(expected)
  })

  it('should convert a mkvconf file to json', async () => {
    await asyncExec('cp test/fixtures/item.file test/fixtures/temp.file')
    const { stdout, stderr } = await asyncExec('node cli.js json test/fixtures/temp.file')

    const actual = {
      stdout: stdout.split(NL),
      stderr: stderr.split(NL)
    }
    const expected = {
      stdout: ['Source test/fixtures/temp.file saved as test/fixtures/temp.file.json OK (358 bytes, 27 lines).'],
      stderr: ['']
    }
    expect(actual).to.deep.equal(expected)

    const actualFile = loadFixture('temp.file.json')
    const expectedFile = loadFixture('item.json')
    expect(actualFile).to.deep.equal(expectedFile)
  })

  after(async () => {
    await asyncExec('rm -f test/fixtures/temp.file')
    await asyncExec('rm -f test/fixtures/temp.file.json')
  })
})

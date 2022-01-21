const { expect } = require('chai')
const asyncExec = require('./helpers/asyncExec')
const loadFixture = require('./helpers/loadFixture')
const NL = '\n'

describe('Command Line Interface - Lint', () => {
  it('should complain if no input file is supplied', async () => {
    let actual
    try {
      await asyncExec('node cli.js lint')
    } catch (ex) {
      actual = ex.message.trim().split(NL)
    }
    const expected = [
      'Command failed: node cli.js lint',
      'No files provided to lint.'
    ]
    expect(actual).to.deep.equal(expected)
  })

  it('should lint a fixture with bad formatting', async () => {
    let actual
    try {
      await asyncExec('node cli.js lint test/fixtures/item.file')
    } catch (ex) {
      actual = ex.message.trim().split(NL)
    }
    const expected = [
      'Command failed: node cli.js lint test/fixtures/item.file',
      'Imperfections found in test/fixtures/item.file; (174 bytes, 15 lines) - can be fixed with the --fix flag'
    ]
    expect(actual).to.deep.equal(expected)
  })

  it('should lint and fix a fixture with bad formatting', async () => {
    await asyncExec('cp test/fixtures/item.file test/fixtures/temp.file')
    const beforeFile = loadFixture('temp.file')
    const { stdout, stderr } = await asyncExec('node cli.js lint test/fixtures/temp.file --fix')
    const actual = {
      stdout: stdout.split(NL),
      stderr: stderr.split(NL)
    }
    const expected = {
      stderr: [''],
      stdout: ['Linted test/fixtures/temp.file OK (174 bytes, 15 lines).']
    }
    const afterFile = loadFixture('temp.file')
    expect(actual).to.deep.equal(expected)
    expect(beforeFile.split(NL)).to.not.deep.equal(afterFile.split(NL))
  })

  it('should lint and suffix a fixture with bad formatting', async () => {
    await asyncExec('cp test/fixtures/item.file test/fixtures/temp.file')
    const beforeFile = loadFixture('temp.file')
    const { stdout, stderr } = await asyncExec('node cli.js lint test/fixtures/temp.file --suffix')
    const actual = {
      stdout: stdout.split(NL),
      stderr: stderr.split(NL)
    }
    const expected = {
      stderr: [''],
      stdout: ['Linted test/fixtures/temp.file saved as test/fixtures/temp.file.linted OK (174 bytes, 15 lines).']
    }
    const afterFile = loadFixture('temp.file.linted')
    expect(actual).to.deep.equal(expected)
    expect(beforeFile.split(NL)).to.not.deep.equal(afterFile.split(NL))
  })

  it('should lint multiple fixture with bad formatting', async () => {
    let actual
    try {
      await asyncExec('node cli.js lint test/**/*.file')
    } catch (ex) {
      actual = ex.message.trim().split(NL)
    }
    const expected = [
      'Command failed: node cli.js lint test/**/*.file',
      'Imperfections found in test/fixtures/item.file; (174 bytes, 15 lines) - can be fixed with the --fix flag',
      'Imperfections found in test/fixtures/mixed.file; (1126 bytes, 51 lines) - can be fixed with the --fix flag',
      'Imperfections found in test/fixtures/temp.file; (174 bytes, 15 lines) - can be fixed with the --fix flag',
      'Imperfections found in test/fixtures/unicode.file; (480 bytes, 15 lines) - can be fixed with the --fix flag'
    ]
    expect(actual).to.deep.equal(expected)
  })

  after(async () => {
    await asyncExec('rm -f test/fixtures/temp.file')
    await asyncExec('rm -f test/fixtures/temp.file.linted')
  })
})

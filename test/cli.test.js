const { expect } = require('chai')
const asyncExec = require('./helpers/asyncExec')
const { version } = require('../package.json')
const loadFixture = require('./helpers/loadFixture')
const NL = '\n'

const standardHelp = [
  `[mkvconf] v${version} Help`,
  'help          : Display a list of available commands',
  'lint file     : Check an input file for linting errors',
  '     --fix    : Fix errors inline, replaces input file after read',
  '     --suffix : Generate a new linted file, with the ".linted" suffix'
]

describe('Command Line Interface', () => {
  describe('Help', () => {
    it('should display help if no commands are provided', async () => {
      const { stdout, stderr } = await asyncExec('node cli.js')
      const actual = {
        stdout: stdout.split(NL),
        stderr: stderr.split(NL)
      }
      const expected = {
        stderr: ['No command supplied; please read the help below:'],
        stdout: standardHelp
      }
      expect(actual).to.deep.equal(expected)
    })

    it('should display help if an invalid command is provided', async () => {
      const { stdout, stderr } = await asyncExec('node cli.js invalid-command')
      const actual = {
        stdout: stdout.split(NL),
        stderr: stderr.split(NL)
      }
      const expected = {
        stderr: ['The command "invalid-command" is not supported; please read the help below:'],
        stdout: standardHelp
      }
      expect(actual).to.deep.equal(expected)
    })

    it('should display help if the help command is provided', async () => {
      const { stdout, stderr } = await asyncExec('node cli.js help')
      const actual = {
        stdout: stdout.split(NL),
        stderr: stderr.split(NL)
      }
      const expected = {
        stderr: [''],
        stdout: standardHelp
      }
      expect(actual).to.deep.equal(expected)
    })
  })

  describe('Lint', () => {
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

    after(async () => {
      await asyncExec('rm -f test/fixtures/temp.file')
      await asyncExec('rm -f test/fixtures/temp.file.linted')
    })
  })
})

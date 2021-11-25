const { expect } = require('chai')
const asyncExec = require('./helpers/asyncExec')
const { version } = require('../package.json')
const NL = '\n'

const standardHelp = [
  `[mkvconf] v${version} Help`,
  'help          : Display a list of available commands',
  'lint file     : Check an input file for linting errors',
  '     --fix    : Fix errors inline, replaces input file after read',
  '     --suffix : Generate a new linted file, with the ".linted" suffix',
  'json file     : Convert the input file into json with a .json suffix'
]

describe('Command Line Interface - Help', () => {
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

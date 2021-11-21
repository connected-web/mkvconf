const { version } = require('../package.json')

const commands = {
  help: help
}

function help ({ args, cwd }) {
  console.log(`[mkvconf] v${version} Help`)
  const info = Object.entries(commands).map(([key, { description }]) => {
    return `  ${key} : ${description}`
  })
  info.forEach(line => {
    console.log(line)
  })
}
help.description = 'Display a list of available commands'

async function run ({ command, args, cwd }) {
  const cmdFn = commands[command]
  if (cmdFn) {
    cmdFn({ args, cwd })
  } else {
    if (command) {
      console.error(`The command "${command}" is not supported; please read the help below:`)
    } else {
      console.error('No command supplied; please read the help below:')
    }
    help({ args, cwd })
  }
}

module.exports = { run }

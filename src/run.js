const commands = require('./commands')

async function run ({ command, args, cwd }) {
  const commandMap = commands()
  const cmdFn = commandMap[command]
  if (cmdFn) {
    await cmdFn({ args, cwd })
  } else {
    if (command) {
      console.error(`The command "${command}" is not supported; please read the help below:`)
    } else {
      console.error('No command supplied; please read the help below:')
    }
    await commandMap.help({ args, cwd })
  }
}

module.exports = { run }

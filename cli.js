#!/usr/bin/env node

const { run } = require('./src/run')
const report = (...messages) => console.log('[mkvconf] [CLI]', ...messages)

async function processArgs () {
  const [,, command, ...args] = process.argv
  const cwd = process.cwd()

  try {
    await run({ command, args, cwd })
  } catch (ex) {
    report('Unable to complete;', ex.message, ex)
  }
}

processArgs()

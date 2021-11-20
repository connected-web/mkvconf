const NL = '\n'

function parseLine (line, result, workingState) {
  workingState.comments.push(line)
}

function parse (input) {
  const result = {}
  const workingState = {
    comments: []
  }
  const lines = input.split(NL)
  lines.forEach(line => parseLine(line.trim(), result, workingState))

  if (workingState.comments.length > 0) {
    result.comments = workingState.comments
  }

  return result
}

module.exports = parse

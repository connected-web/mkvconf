const NL = '\n'

const matchers = [{
  regex: /^\[([\w\d- ]+)\]/,
  func: createObjectGroup
}, {
  regex: /^([\w][\w\d.]*)\s+(.*)/,
  func: addKeyValuePair
}, {
  regex: /\/\//,
  func: addComment
}, {
  regex: /.*/, func: addComment
}]

function createObjectGroup (line, values, result, workingState) {
  const [, groupName] = values
  workingState.groupName = groupName
  workingState.object = {}
  result[groupName] = result[groupName] || []
  result[groupName].push(workingState.object)
}

function addKeyValuePair (line, values, result, workingState) {
  const [, key, value] = values
  if (workingState.object) {
    const keyPath = key.split('.')

    let parent = workingState.object
    while (keyPath.length > 1) {
      const keyPart = keyPath.shift()
      parent[keyPart] = parent[keyPart] || {}
      parent = parent[keyPart]
    }
    parent[keyPath.shift()] = parseValue(value)
    Object.assign(workingState.object, workingState.parent)
  } else {
    addComment(line, [], result, workingState)
  }
}

function addComment (line, values, result, workingState) {
  workingState.comments.push(line)
}

function parseLine (line, result, workingState) {
  if (line.length === 0) {
    return
  }
  const match = matchers.filter(matcher => matcher.regex.test(line))[0]
  match.func(line, line.match(match.regex), result, workingState)
}

function parseValue (value) {
  const str = (value + '').trim()
  let result
  try {
    result = JSON.parse(str)
  } catch (ex) {
    result = str
  }
  return result
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

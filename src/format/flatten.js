const flatten = (data = {}, result = {}, prefix = '') => {
  for (const key in data) {
    if (typeof data[key] !== 'object') {
      result[prefix + key] = data[key]
    } else {
      flatten(data[key], result, `${prefix}${key}.`)
    }
  }
  return result
}

module.exports = flatten

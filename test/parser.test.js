const { expect } = require('chai')
const loadFixture = require('./helpers/loadFixture')
const mkvconf = require('../')

const fs = require('fs')

describe('Parser', () => {
  it('should correctly parse the fruit fixture', () => {
    const input = loadFixture('fruit.file')
    const expected = loadFixture('fruit.json')
    const actual = mkvconf.parse(input)
    expect(actual).to.deep.equal(expected)
  })

  it('should correctly parse the item fixture', () => {
    const input = loadFixture('item.file')
    const expected = loadFixture('item.json')
    const actual = mkvconf.parse(input)
    expect(actual).to.deep.equal(expected)
  })

  it('should correctly parse the mixed fixture', () => {
    const input = loadFixture('mixed.file')
    const expected = loadFixture('mixed.json')
    const actual = mkvconf.parse(input)
    fs.writeFileSync('./example.json', JSON.stringify(actual, null, 2), 'utf8')
    expect(actual).to.deep.equal(expected)
  })
})

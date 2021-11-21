const { expect } = require('chai')
const loadFixture = require('./helpers/loadFixture')
const mkvconf = require('../')

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
    expect(actual).to.deep.equal(expected)
  })

  it('should correctly parse the errors fixture', () => {
    const input = loadFixture('errors.file')
    const expected = loadFixture('errors.json')
    const actual = mkvconf.parse(input)
    expect(actual).to.deep.equal(expected)
  })

  it('should correctly parse the unicode fixture', () => {
    const input = loadFixture('unicode.file')
    const expected = loadFixture('unicode.json')
    const actual = mkvconf.parse(input)
    expect(actual).to.deep.equal(expected)
  })
})

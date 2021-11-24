const { expect } = require('chai')
const loadFixture = require('./helpers/loadFixture')
const mkvconf = require('../')

describe('Format', () => {
  it('should correctly format the fruit fixture', () => {
    const input = loadFixture('fruit.file')
    const expected = loadFixture('fruit.file.linted')
    const data = mkvconf.parse(input)
    const actual = mkvconf.format(data)
    expect(actual).to.deep.equal(expected)
  })

  it('should correctly format the item fixture', () => {
    const input = loadFixture('item.file')
    const expected = loadFixture('item.file.linted')
    const data = mkvconf.parse(input)
    const actual = mkvconf.format(data)
    expect(actual).to.deep.equal(expected)
  })

  it('should correctly format the mixed fixture', () => {
    const input = loadFixture('mixed.file')
    const expected = loadFixture('mixed.file.linted')
    const data = mkvconf.parse(input)
    const actual = mkvconf.format(data)
    expect(actual).to.deep.equal(expected)
  })

  it('should correctly format the errors fixture', () => {
    const input = loadFixture('errors.file')
    const expected = loadFixture('errors.file.linted')
    const data = mkvconf.parse(input)
    const actual = mkvconf.format(data)
    expect(actual).to.deep.equal(expected)
  })

  it('should correctly format the unicode fixture', () => {
    const input = loadFixture('unicode.file')
    const expected = loadFixture('unicode.file.linted')
    const data = mkvconf.parse(input)
    const actual = mkvconf.format(data)
    expect(actual).to.deep.equal(expected)
  })
})

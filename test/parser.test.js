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
})

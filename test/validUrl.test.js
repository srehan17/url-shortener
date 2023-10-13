const expect = require('chai').expect

// Test suite
describe('Mocha', () => {
    // Test spec (unit test)
    it('should run our tests using npm', () => {
        expect(true).to.be.ok
    })
})

describe('checkForValidUrl', () => {
  let checkForValidUrl = require('../server').isValidUrl

  it('should check for valid url', () => {
    // expect(checkForValidUrl(testingUrl)).to.be.ok
    // const testingUrl = new URL(url)
    // return testingUrl.protocol === 'http:' || testingUrl.protocol === 'https:'
  })

})

      
   
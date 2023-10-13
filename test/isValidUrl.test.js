const chai = require('chai')
const expect = require('chai').expect

const isValidUrl = require('../isValidUrl')

describe('check for valid url', () => {
  
  it('should check for url with https or http protocol', () => {
    let url = "https://www.childrensplace.com"
    const testingUrl = new URL(url)
    expect(testingUrl.protocol).to.be.oneOf(['https:','http:'])
    expect(testingUrl.protocol).to.not.be.oneOf([null , ''])
  })

  it('should check for valid url with https protocol', () => {
    let url = "https://www.childrensplace.com"
    const testingUrl = new URL(url)
    expect(isValidUrl(testingUrl)).to.be.true
  })

  it('should check for valid url with http protocol', () => {
    let url = "http://www.childrensplace.com"
    const testingUrl = new URL(url)
    expect(isValidUrl(testingUrl)).to.be.true
  })
})

      
   
var expect  = require("chai").expect
var request = require("request")
const chai =require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
chai.should()

const UrlModel = require('../models/Url')

describe('/GET urls', () => {
    let host = "http://localhost:3000"

    it("returns status 200", function() {
        request(host, function(error, response, body) {
          expect(response.statusCode).to.equal(200)
        })
    })
  
    it("returns the list of urls", function() {
        request(host, function(error, response, body) {
          expect([{ short_url: "157343" }]).to.deep.include.members([{ short_url: "157343"}])
        })
    })
})
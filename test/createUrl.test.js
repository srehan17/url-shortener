const assert = require('assert')
const expect = require('chai').expect
const UrlModel = require('../models/Url')

describe('creating new url in database', () => { 
    it('creates a new url', () => { 
        const url = new UrlModel({ short_url: "157343", original_url: "https://www.childrensplace.com" }) 
        url.save() 
            .then(() => { 
                assert(!url.isNew) 
            }) 
    }) 
  })  


describe("UrlModel should have short_url and original_url", function(){
    const url = new UrlModel({ short_url: "157343", original_url: "https://www.childrensplace.com" }) 

    it("should have short_url", () => {
        expect(url.short_url).to.equal('157343')
    })

    it("should have original_url", () => {
        expect(url.original_url).to.equal('https://www.childrensplace.com')
    })
})
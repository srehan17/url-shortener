const assert = require('assert')
var expect  = require("chai").expect
var request = require("request")
const UrlModel = require('../models/Url')
let server = require('../server')

// describe('deletingUrlFromDatabase', () => { 
//     it('deletes url from db', () => { 
        
//     }) 
//   })  

describe('deletingUrlFromDatabase', () => { 
    it('should delete url from db', () => { 
      const url = new UrlModel({ short_url: "157343", original_url: "https://www.childrensplace.com" }) 

    }) 
  })  

  describe('/DELETE/:id url', () => {
    it('it should DELETE a book given the id', (done) => {
      const url = new UrlModel({ short_url: "157343", original_url: "https://www.childrensplace.com" }) 
      url.save((err, url) => {
            chai.request(server)
            .delete('/url/' + url.id)
            .end((err, res) => {
                  res.should.have.status(200)
                  res.body.should.be.a('object')
                  res.body.should.have.property('message').eql('Url successfully deleted!')
                  res.body.result.should.have.property('ok').eql(1)
                  res.body.result.should.have.property('n').eql(1)
              done()
            })
      })
    })
  })

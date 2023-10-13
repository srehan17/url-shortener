const chai =require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
chai.should()

const UrlModel = require('../models/Url')

describe('/GET urls', () => {
    let host = "http://localhost:3000"

    it('it should GET homepage', (done) => {
        chai
          .request(host)
          .get('/')
          .end((err, res) => {
            if (err) {
                throw err
            } 
                res.should.have.status(200)
                // res.body.should.be.a('object array')
                // res.body.length.should.be.eql(0)
                done()
            
          })
    }),
    it('it should get list of urls', (done) => {
        const urls = UrlModel.find({}) 
            .then((urls) => { 
                done() 
            }) 
    }

    )
})
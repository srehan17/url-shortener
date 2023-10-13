const UrlModel = require('../models/Url')

beforeEach(() => {
    const url = new UrlModel({ short_url: "157343", original_url: "https://www.childrensplace.com"})
    url.save()
        .then(() => done())
})

describe('findByUrlId', () => { 
    it('Finds url by id', (done) => { 
        UrlModel.findById() 
            .then((url) => { 
                done() 
            }) 
    }) 
})
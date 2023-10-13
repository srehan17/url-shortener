const assert = require('assert')
const UrlModel = require('../models/Url')

describe('creatingNewUrlInDatabase', () => { 
    it('creates a new url', () => { 
        const url = new UrlModel({ short_url: "157343", original_url: "https://www.childrensplace.com" }) 
        url.save() 
            .then(() => { 
                assert(!url.isNew) 
            }) 
    }) 
  })  
const { MONGO_URI } = require('../config')

const mongoose = require('mongoose')

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,  
  useUnifiedTopology: true,
}).then(() => {
  console.log('Database connection successful')
})
  .catch((err) => {
    console.error(err, 'Database connection error')
  })


const UrlModelSchema = new mongoose.Schema({
    short_url: {
      type: String,
      required: true,
      unique: true
    },
    original_url: {
      type: String,
      required: true,
    }
})
  
const Url = mongoose.model("Url", UrlModelSchema)
  
module.exports =  Url
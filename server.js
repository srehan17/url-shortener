const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
dotenv.config()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const ID = require("nodejs-unique-numeric-id-generator")

const UrlModel = require('./models/Url')
  
const port = process.env.PORT || 3000

app.use(cors())

const isValidUrl = (url) => {
  try {
    const testingUrl = new URL(url)
    return testingUrl.protocol === 'http:' || testingUrl.protocol === 'https:'
  }
  catch (err) {
    console.error(err)
    return false
  }
}

app.use(express.static('styles'))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  UrlModel.find().then((urls) => {
    res.render('index', { urls })
  })
})

app.get('/shorturl', async (req, res) => {
  const urls = await UrlModel.find()
  res.render('index', { urls: urls })
})

app.post('/shorturl', (req, res) => {
  const original_url = req.body.urlInput
  if (!isValidUrl(original_url)) {
    res.json({
      error: 'invalid url'
    })
  }
  else {
    try {
      UrlModel.findOne({ original_url }).then((result) => {
        if (result !== null) {
          // res.json(result)
        }
        else {
          const short_url = ID.generate(new Date().toJSON())
          const newUrl = new UrlModel({
            original_url,
            short_url,
          })
          newUrl.save()
          // res.json(newUrl)
        }
        res.redirect('/')
      })
    }
    catch (err) {
      console.error(err)
    }
  }
})

app.get('/shorturl/:short_url', (req, res) => {
  try {
    UrlModel.findOne({
      short_url: req.params['short_url']
    }).then((data) => {
      res.redirect(data.original_url)
    })
    .catch((err) =>
      res.status(404).json("Url not found")
    )
  }
  catch (err) {
    res.status(500).json('Server error')
  }
})

app.post('/delete/:id', async (req, res) => {
  try {
    const url = await UrlModel.deleteOne({_id: req.params.id})
    if (!url){
      res.status(400).json('Url not found')
    }
    return res.redirect('/')
  }
  catch (err) {
      res.status(500).json('Server error')
  }})


app.listen(port, function() {
  console.log(`Listening on port ${port}`)
})

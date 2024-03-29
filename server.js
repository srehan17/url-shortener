const express = require('express')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
dotenv.config()

app.use(cookieParser('NotSoSecret'));
app.use(session({
  secret : 'something',
  cookie: { maxAge: 60000 },
  resave: true,
  saveUninitialized: true
}));
app.use(flash());

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const ID = require("nodejs-unique-numeric-id-generator")

const UrlModel = require('./models/Url')
  
const port = 3000

app.use(cors())

const isValidUrl = require('./isValidUrl')

app.use(express.static('styles'))

app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
  try {
    const urls = await UrlModel.find({})
    if (urls) {
      const message = req.flash('msg')
      res.status(200).render('index', { urls, message })
    }
    else {
      res.status(404).json("No URL found")
    }
    
  }
  catch(err) {
    res.status(500).json('Server error')
  }
})

app.post('/', (req, res) => {
  const original_url = req.body.urlInput
  if (!isValidUrl(original_url)) {
    req.flash('msg', "Invalid URL! Please enter a URL with valid protocol.");
    res.redirect('/')
  }
  else {
    try {
      UrlModel.findOne({ original_url }).then((result) => {
        if (result !== null) {
          req.flash('msg', "URL already exists!");
          res.redirect('/')
        }
        else {
          const short_url = ID.generate(new Date().toJSON())
          const newUrl = new UrlModel({
            original_url,
            short_url,
          })
          newUrl.save()
          req.flash('msg', "URL added successfully!");
          res.redirect('/')
        }
      })
    }
    catch (err) {
      res.status(500).json('Server error')
    }
  }
})

app.get('/:short_url', (req, res) => {
  try {
    UrlModel.findOne({
      short_url: req.params['short_url']
    }).then((data) => {
      res.redirect(data.original_url)
    })
    .catch((err) =>
      res.status(404).json("URL not found")
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
      return res.status(400).json('URL not found')
    }
    req.flash('msg', "URL deleted successfully!");
    res.redirect('/')
  }
  catch (err) {
    res.status(500).json('Server error')
  }})

app.listen(port, function() {
  console.log(`Listening on port ${port}`)
})

module.exports = app
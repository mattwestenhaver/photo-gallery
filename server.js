const
  dotenv = require('dotenv').load,
  express = require('express'),
  logger = require('morgan'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  app = express(),
  request = require('request'),
  apiUrl = "https://pastebin.com/raw/BmA8B0tY",
  itemsPP = 9,
  PORT = process.env.PORT || 3001 
;

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())

app.get('/api/:page/:width/:height/', (req, res) => {
  request(apiUrl, (error, response, body) => {
    if(error) return res.json({ success: false, err: error })
    var images = body.split("\r\n").filter(i => (i.split('/')[5] <= req.params.width && i.split('/')[6] <= req.params.height))
    var page = req.params.page
    var currentImages = images.slice((page - 1) * itemsPP, ((page - 1) * itemsPP) + itemsPP)
    res.json({ success: true, pages: Math.ceil(images.length / itemsPP), images: currentImages })
  })
})

app.listen(PORT, err => {
  console.log(err || `Server running on Port ${PORT}`)
})

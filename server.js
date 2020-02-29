const
  dotenv = require('dotenv').load,
  express = require('express'),
  logger = require('morgan'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  app = express(),
  request = require('request'),
  apiUrl = "https://pastebin.com/raw/BmA8B0tY",
  PORT = process.env.PORT || 3001 
;

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())

app.get('/api/images/', (req, res) => {
  request(apiUrl, function(error, response, body) {
    if(error) return res.json({ success: false, err: error })
    res.json({ success: true, length: body.split("\n").length, images: body.split("\r\n")})
  })
})

app.listen(PORT, err => {
  console.log(err || `Server running on Port ${PORT}`)
})

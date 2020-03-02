const
  dotenv = require('dotenv').config(),
  express = require('express'),
  logger = require('morgan'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  app = express(),
  request = require('request'),
  apiUrl = "https://pastebin.com/raw/BmA8B0tY",
  itemsPP = 9,
  User = ('./models/User.js'),
  usersRoutes = require('./routes/users.js'),
  signToken = require('./serverAuth').signToken,
  MONGODB_URI =  process.env.MONGODB_URI || 'mongodb://localhost/photo-gallery',
  PORT = process.env.PORT || 3001 
;


app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "./client/build/index.html"));
});

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}, (err) => {
  console.log(err || `🤘🏾 Connected to Mongo @ ${MONGODB_URI}`)
});

app.get('/', (req, res) => {
  res.json({message:'API root'})
})

app.use('/users', usersRoutes)

app.get('/api/:page/:width/:height/', (req, res) => {
  request(apiUrl, (error, response, body) => {
    if(error) return res.json({ success: false, err: error })
    var images = body.split("\r\n").filter(i => (Number(i.split('/')[5]) <= req.params.width && Number(i.split('/')[6]) <= req.params.height))
    console.log(images)
    var page = req.params.page
    var currentImages = images.slice((page - 1) * itemsPP, ((page - 1) * itemsPP) + itemsPP)
    res.json({ success: true, pages: Math.ceil(images.length / itemsPP), images: currentImages })
  })
})

app.listen(PORT, err => {
  console.log(err || `Server running on Port ${PORT}`)
})

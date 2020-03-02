const
  User = require('../models/User.js'),
  signToken = require('../serverAuth').signToken
;

module.exports = {

  index: (req, res) => {
    User.find({}, (err, users) => {
      if(err) return res.json({ success: false, code: err.code })
      res.json({ success: true, users })
    })
  },

  create: (req, res) => {
    User.create(req.body, (err, user) => {
      if(err) return res.json({ success:false, code: err.code })
      res.json({ success: true, message: "User successfully created.", user })
    })
  },

  authenticate: (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if(err) return res.json({ success: false, err: err.code })
      if(!user || !user.validPassword(req.body.password)) {
        return res.json({ success: false, message: "Invalid credentials." })
      }
      const token = signToken(user)
      res.json({ success: true, message: "Token attached.", token })
    })
  }

}
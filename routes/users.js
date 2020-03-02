const
  express = require('express'),
  usersController = require('../controllers/users.js'),
  usersRouter = new express.Router(),
  verifyToken = require('../serverAuth.js').verifyToken
;

usersRouter.route('/')
  .get(usersController.index)
  .post(usersController.create)
;

usersRouter.post('/authenticate', usersController.authenticate)

usersRouter.use(verifyToken)

module.exports = usersRouter
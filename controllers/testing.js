const router = require('express').Router()
const Tap = require('../models/tap')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  await Tap.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router
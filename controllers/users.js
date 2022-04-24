const User = require('../models/user')
const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('taps')
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body
  
  const username = body.username
  const existingUser = await User.findOne({ username: username })
  if (existingUser) {
    return response.status(400).send({ error: 'Username must be unique' }).end()
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  savedUser = await user.save()
  response.json(savedUser.toJSON())
})

usersRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

usersRouter.put('/:id', async (request, response) => {
  const body = request.body

  const user = {
    name: body.name
  }

  const updatedUser = await User.findByIdAndUpdate(request.params.id, user, { new: true })
  response.json(updatedUser.toJSON())
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id).populate('taps')
  if (user) {
    response.json(user.toJSON())
  } else {
    response.status(404).end()
  }
})

module.exports = usersRouter 
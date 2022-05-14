const Tap = require('../models/tap')
const tapsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization  && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

tapsRouter.get('/', async (request, response) => {
  const taps = await Tap.find({}).populate('user')
  response.json(taps)
})

tapsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = ''
  console.log(body)
  const token = getTokenFrom(request)
  if (token) {
    decodedToken = jwt.verify(token, process.env.SECRET)
  }
  if (!token) {
    console.log('token is missing')
    return response.status(401).json({ error: 'token is missing' })  }
  else if (!decodedToken.id) {
    console.log('token is invalid')
    return response.status(401).json({ error: 'token is invalid' })
  }
  else if (body === undefined) {
    console.log('content missing')
    return response.status(400).json({ error: 'content missing' })
  } else {  
    const tap = new Tap({
      name: body.name,
      style: body.style,
      abv: body.abv,
      ibu: body.ibu,
      type: body.type,
      brewery: body.brewery,
      remaining: body.remaining,
      description: body.description,
      color: body.color,
      user: user._id
    })

    const user = await User.findById(decodedToken.id)
    savedTap = await tap.save()
    user.taps = user.taps.concat(savedTap._id)
    await user.save()
    console.log('new tap saved')
    response.json(savedTap.toJSON())
  }
})

tapsRouter.delete('/:id', async (request, response) => {
  await Tap.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

tapsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const tap = {
    name: body.name,
    style: body.style,
    abv: body.abv,
    ibu: body.ibu,
    type: body.type,
    unit: body.unit,
    color: body.color,
    brewery: body.brewery,
    remaining: body.remaining,
    description: body.description
  }

  const updatedTap = await Tap.findByIdAndUpdate(request.params.id, tap, { new: true })
  response.json(updatedTap.toJSON())
})

tapsRouter.get('/:id', async (request, response) => {
  const tap = await Tap.findById(request.params.id)
  if (tap) {
    response.json(tap.toJSON())
  } else {
    response.status(404).end()
  }
}) 

module.exports = tapsRouter 
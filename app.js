const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const tapsRouter = require('./controllers/taps')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const config = require('./config')
const path = require('path')

mongoose.connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

app.use(cors()) 
app.use(express.json())

app.use('/api/taps', tapsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(express.static('build'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

module.exports = app
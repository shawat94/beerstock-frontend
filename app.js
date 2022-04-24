const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const tapsRouter = require('./controllers/taps')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const config = require('./config')

mongoose.connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

app.use(cors()) 
app.use(express.static('build'))
app.use(express.json())

app.use('/api/taps', tapsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./build/index.html"));
})

module.exports = app
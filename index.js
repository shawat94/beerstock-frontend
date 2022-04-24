const express = require('express')
const app = require('./app')
const http = require('http')
const config = require('./config')

const server = http.createServer(app)

const PORT = config.PORT

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
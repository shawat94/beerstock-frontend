const mongoose = require('mongoose')

const tapSchema = new mongoose.Schema({
  name: String,
  style: String,
  abv: String,
  ibu: String,
  type: String,
  unit: String,
  brewery: String,
  remaining: Number,
  description: String,
  color: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

tapSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__V
  }
})

module.exports = mongoose.model('Tap', tapSchema)
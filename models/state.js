const mongoose = require('mongoose')

const Schema = mongoose.Schema

let state = new Schema(
  {
    name: {
      type: String
    },
  },
  { collection: 'states' }
)

module.exports = mongoose.model('State', state)
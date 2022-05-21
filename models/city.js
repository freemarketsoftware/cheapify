const mongoose = require('mongoose')

const Schema = mongoose.Schema

let city = new Schema(
  {
    name: {
      type: String
    },
    state: {
      type: String
    }
  },
  { collection: 'cities' }
)

module.exports = mongoose.model('City', city)
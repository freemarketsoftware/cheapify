const mongoose = require('mongoose')

const Schema = mongoose.Schema

let project = new Schema(
  {
    owner: {
        type: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    },
    title: {
      type: String
    },
    description: {
        type: String
    }
  },
  { collection: 'projects' }
)

module.exports = mongoose.model('Project', project)
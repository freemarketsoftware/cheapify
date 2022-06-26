const mongoose = require('mongoose')

const Schema = mongoose.Schema

let domain = new Schema(
    {
        path: {
            type: String
        },
        name: {
            type: Object
        },
        displayOrder: {
            type: Number
        }
    },
    { collection: 'domains' }
)

module.exports = mongoose.model('Domain', domain)
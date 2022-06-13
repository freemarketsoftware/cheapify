const mongoose = require('mongoose')

const Schema = mongoose.Schema

let domain = new Schema(
    {
        name: {
            type: Map
        },
    },
    { collection: 'domains' }
)

module.exports = mongoose.model('Domain', domain)
const mongoose = require('mongoose')

const Schema = mongoose.Schema

let domain = new Schema(
    {
        name: {
            type: Object
        },
    },
    { collection: 'domains' }
)

module.exports = mongoose.model('Domain', domain)
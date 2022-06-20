const mongoose = require('mongoose')

const Schema = mongoose.Schema

let business = new Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String
        },
        url: {
            type: String
        },
        phone: {
            type: String
        },
        address: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
    },
    { collection: 'businesses' }
)

module.exports = mongoose.model('Business', business)
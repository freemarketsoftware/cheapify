const mongoose = require('mongoose')

const Schema = mongoose.Schema

let category = new Schema(
    {
        name: {
            type: String
        },
        domain: {
            type: String
        },
        type: {

        },
        img: {
            type: String
        }
    },
    { collection: 'categories' }
)

module.exports = mongoose.model('Category', category)
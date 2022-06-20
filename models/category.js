const mongoose = require('mongoose')

const Schema = mongoose.Schema

let category = new Schema(
    {
        name: {
            type: Object
        },
        domain: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Domain' 
        },
    },
    { collection: 'categories' }
)

module.exports = mongoose.model('Category', category)
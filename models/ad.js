const mongoose = require('mongoose')

const Schema = mongoose.Schema

let ad = new Schema(
    {
        title: {
            type: String
        },
        description: {
            type: String
        },
        price: {
            type: String
        },
        imgs: [{
            type: String
        }],
        city: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'City' 
        },
        category: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category' 
        },
        lat: {
            type: String
        },
        long: {
            type: String
        },
        mailCode: {
            type: String,
        },
        email: {
            type: String
        },
        phone: {
            type: String
        },
        owner: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    { collection: 'ads' }
)

module.exports = mongoose.model('Ad', ad)
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
            type: Schema.Types.ObjectId,
            ref: 'City' 
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
        category: {
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
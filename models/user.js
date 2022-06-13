const mongoose = require('mongoose')
const Schema = mongoose.Schema

let user = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        lat: {
            type: String,
        },
        long: {
            type: String,
        },
        ads: [{
            type: Schema.Types.ObjectId,
            ref: 'Ad'
        }],
    },
    { collection: 'users' }
)

module.exports = mongoose.model('User', user)
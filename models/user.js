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
            unique: true,
            required: true,
        },
        projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
    },
    { collection: 'users' }
)

module.exports = mongoose.model('User', user)
const mongoose = require('mongoose')

const Schema = mongoose.Schema

let project = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        owner: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        status: {
            type: String,
            enum: ['open', 'closed'],
            default: 'open'
        }
    },
    { collection: 'projects' }
)


module.exports = mongoose.model('Project', project)
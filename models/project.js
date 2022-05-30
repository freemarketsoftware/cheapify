const mongoose = require('mongoose')

const Schema = mongoose.Schema

let project = new Schema(
    {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        owner: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        status: {
            type: String,
            enum: ['open', 'closed', 'empty'],
            default: 'empty'
        }
    },
    { collection: 'projects' }
)


module.exports = mongoose.model('Project', project)
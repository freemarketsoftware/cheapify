var express = require('express')
var apiRouter = express.Router()
const db = require('../db')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const { authenticated } = require('../middlewares/authenticated')
const { registrationValidator, loginValidator } = require('../helpers/validators')

const User = require('../models/user')

// apiRouter.use(authenticated)

apiRouter.get('/api/projects', [authenticated],async (req, res) => {
    // const projects = await Project.find({owner: req.session.user._id}).lean()

    const projects = [{
        title: 'My first project',
        description: 'I want to build a complete deck around my house',
        status: 'open'
    },
    {
        title: 'My second project',
        description: 'I want to build a complete deck around my house',
        status: 'open'
    },
    {
        title: 'My third project',
        description: 'I want to build a complete deck around my house',
        status: 'closed'
    }]

    return res.status(200).json({ projects })
})

module.exports = apiRouter


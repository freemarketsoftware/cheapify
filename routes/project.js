var express = require('express')
var router = express.Router()
const db = require('../db')

const { authenticated } = require('../middlewares/authenticated')
const { registrationValidator, loginValidator } = require('../helpers/validators')

const User  = require('../models/user')
const Project = require('../models/project')

router.use(authenticated)

router.get('/projects/list', async (req, res) => {
    const projects = await Project.find({owner: req.session.user._id}).lean()
    res.render('projects/list', { layout: 'index', projects: projects })
})

router.get('/projects/create', (req, res) => {
    res.render('projects/create', { layout: 'index', value: 'test' })
})

router.get('/projects/edit/:id', async (req, res) => {
    const user = await User.findOne({ email: req.session.user.email })
    const project = await Project.findOne({ _id: req.params.id})
    console.log(project)  
    
    res.render('projects/edit', { layout: 'index', value: 'test' })
})


router.post('/projects/create', async (req, res) => {
    const user = await User.findOne({ email: req.session.user.email })
    const project = new Project({
        owner: user._id,
        title: req.body.title,
        description: req.body.description,
        status: 'open'
    })
    const projectSaved = await project.save()
    user.projects.push(projectSaved)
    const userSaved = await user.save()
    return res.status(200).json({ valid: true })
})

router.post('/projects/edit/:id', async (req, res) => {
    const user = await User.findOne({ email: req.session.user.email })
    const project = await Project.findOne({ _id: req.params.id})
    if(project && project.owner === user._id) {
        project.title = req.body.title
        project.description = req.body.description
        await project.save()
        return res.status(200).json({ valid: true })
    }
    
    //if(user owns project)
    // const project = Project.findOne({_id: req.param.id})

    return res.status(401).json({ valid: false })
})

router.post('/projects/select/:id', (req, res) => {
    console.log(req.params.id)

    return res.status(200).json({ valid: true })
})

router.post('/projects/close/:id', (req, res) => {
    console.log(req.params.id)

    return res.status(200).json({ valid: true })
})


module.exports = router


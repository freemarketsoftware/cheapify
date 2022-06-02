var express = require('express')
var router = express.Router()
const db = require('../db')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const { authenticated } = require('../middlewares/authenticated')
const { registrationValidator, loginValidator } = require('../helpers/validators')

const User = require('../models/user')
const Project = require('../models/project')


router.get('/projects', [authenticated], async (req, res) => {
    // const projects = await Project.find({owner: req.session.user._id}).lean()

    const projects = [{
        title: 'asdasdMy first project',
        description: 'asdasdI want to build a complete deck around my house',
        status: 'open'
    },
    {
        title: 'asdasdMy second project',
        description: 'asdasdI want to build a complete deck around my house',
        status: 'open'
    },
    {
        title: 'asdasdMy third project',
        description: 'asdasdI want to build a complete deck around my house',
        status: 'closed'
    }]

    res.render('projects/projects', { layout: 'index', projects })
})

router.get('/projects/create', async (req, res) => {
    const user = await User.findOne({ email: req.session.user.email })
    const project = new Project({
        owner: user._id,
        status: 'empty'
    })
    const projectSaved = await project.save()
    user.projects.push(projectSaved)
    const userSaved = await user.save()
    res.render('projects/create', { layout: 'index', projectId: project._id })
})

router.get('/projects/edit/:id', async (req, res) => {
    const user = await User.findOne({ email: req.session.user.email })
    const project = await Project.findOne({ _id: req.params.id })
    console.log(project)

    res.render('projects/edit', { layout: 'index', value: 'test' })
})


router.post('/projects/create', upload.array('pictures', 8), async (req, res) => {
    const user = await User.findOne({ email: req.session.user.email })
    const project = await Project.find({ _id: req.body.id })
    project.title = req.body.title
    project.description = req.body.description
    project.status = 'open'
    console.log(project)
    console.log(req.files)
    return res.status(200).json({ valid: true })
})

router.post('/projects/edit/:id', async (req, res) => {
    const user = await User.findOne({ email: req.session.user.email })
    const project = await Project.findOne({ _id: req.params.id })
    if (project && project.owner === user._id) {
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


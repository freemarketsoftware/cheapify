var express = require('express')
var router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const { getTranslations } = require('../translations')

const { authenticated } = require('../middlewares/authenticated')
const { registrationValidator, loginValidator } = require('../helpers/validators')

const User = require('../models/user')
const Category = require('../models/category')
const Domain = require('../models/domain')
const Ad = require('../models/ad')


router.post('/create', upload.array('pictures', 8), async (req, res) => {
    const user = await User.findOne({ email: req.session.user.email })
    const email = req.body.email
    const ad = new Ad({
        owner: user._id,
        title: req.body.title,
        category: req.body.category,
        price: req.body.price,
        description: req.body.description,
    })
    const adSaved = await ad.save()
    user.ads.push(adSaved)
    const userSaved = await user.save()
    console.log(req.files)
    return res.status(200).json({ valid: true })
})

router.post('/edit/:id', async (req, res) => {
    const user = await User.findOne({ email: req.session.user.email })
    const ad = await Ad.findOne({ _id: req.params.id })
    if (ad && ad.owner === user._id) {
        ad.title = req.body.title
        ad.description = req.body.description
        await ad.save()
        return res.status(200).json({ valid: true })
    }
    //if(user owns project)
    // const project = Project.findOne({_id: req.param.id})
    return res.status(401).json({ valid: false })
})

module.exports = router


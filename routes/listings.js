var express = require('express')
var router = express.Router()
const db = require('../db')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const { getTranslations } = require('../translations')

const { authenticated } = require('../middlewares/authenticated')
const { registrationValidator, loginValidator } = require('../helpers/validators')

const User = require('../models/user')
const Ad = require('../models/ad')
const City = require('../models/ad')
const Category = require('../models/ad')


router.get('/listings/:category/:city', async (req, res) => {
    const translations = {...getTranslations('LISTINGS'), ...getTranslations('AD'), ...getTranslations('HEADER')}
    
    const category = await Category.findOne({name: req.params.category})
    const city = await City.findOne({name: req.params.city})

    // const ads = await Ad.findOne({})
    const ads = {}

    console.log(req.params.category)
    console.log(req.params.city)


    res.render('listings', { layout: 'index', ads })
})


module.exports = router


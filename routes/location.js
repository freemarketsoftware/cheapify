var express = require('express')
var router = express.Router()
const bcrypt = require('bcrypt')
const { getTranslations } = require('../translations')

const { authenticated, second } = require('../middlewares/authenticated')
const { registrationValidator, loginValidator } = require('../helpers/validators')

const { getLocationByIp } = require('../services/locationService')

const User = require('../models/user')
const Ad = require('../models/ad')
const City = require('../models/city')
const Category = require('../models/category')
const Domain = require('../models/domain')

//Unused
router.get('/', async (req, res) => {
    const headers = req.headers
    // req.headers['x-forwarded-for']
    // req.socket.remoteAddress
    const ip = '192.222.174.165' || req.headers['x-forwarded-for'] || req.socket.remoteAddress || null
    const location = await getLocationByIp(ip)
    const locale = 'en'
    const uiConfig = await getUIConfig();

})

router.post('/city/:location', async (req, res) => {
    // store location in user or not ?
    // maybe avoid storing location + ip address
    if (req.session.user) {

    }

    const location = req.params.location
    const city = await City.findOne({path: location}).lean()
    // Set-Cookie:name=value[; expires=date][; domain=domain][; path=path][; secure]
    res.setHeader('Set-Cookie', `location=${city.path}; path=/`);
    res.json({location: city.path})
})



// Unused, maybe frontend can
router.post('/geolocation/:location', async (req, res) => {
    // response.setHeader('Set-Cookie', ['foo=bar; HttpOnly', 'x=42; HttpOnly', 'y=88']);

    // TODO: Validate that location exists
    const location = req.params.location


    res.setHeader('Set-Cookie', `location=${location}; HttpOnly`);
})

router.post('/ip/:location', async (req, res) => {
    // response.setHeader('Set-Cookie', ['foo=bar; HttpOnly', 'x=42; HttpOnly', 'y=88']);

    // TODO: Validate that location exists
    const location = req.params.location


    res.setHeader('Set-Cookie', `location=${location}; HttpOnly`);
})






module.exports = router
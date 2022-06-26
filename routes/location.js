var express = require('express')
var router = express.Router()
const bcrypt = require('bcrypt')
const { getTranslations } = require('../translations')

const { authenticated, second } = require('../middlewares/authenticated')
const { registrationValidator, loginValidator } = require('../helpers/validators');

const { getConfig } = require('../helpers/ui')
const { getPathing } = require('../services/pathing')
const { getLocationByIp } = require('../services/geolocation')

const User = require('../models/user')
const Ad = require('../models/ad')
const City = require('../models/city')
const Category = require('../models/category')
const Domain = require('../models/domain')


router.get('/', async (req, res) => {
    const headers = req.headers
    // req.headers['x-forwarded-for']
    // req.socket.remoteAddress
    const ip = '192.222.174.165' || req.headers['x-forwarded-for'] || req.socket.remoteAddress || null
    const location = await getLocationByIp(ip)
    const locale = 'en'
    const config = await getConfig();

})

router.post('/city/:location', async (req, res) => {
    // response.setHeader('Set-Cookie', ['foo=bar; HttpOnly', 'x=42; HttpOnly', 'y=88']);
    if (req.session.user) {

    }
    // TODO: Validate that location exists
    const location = req.params.location
    const domain = `http://localhost:3000/`
    console.log(location)
    // https://stackoverflow.com/questions/3467114/how-are-cookies-passed-in-the-http-protocol
    // Set-Cookie:name=value[; expires=date][; domain=domain][; path=path][; secure]
    res.setHeader('Set-Cookie', `location=${location}; path=/`);
    res.json({location})
})

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
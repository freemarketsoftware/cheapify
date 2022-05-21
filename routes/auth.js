var express = require('express')
var router = express.Router()
const db = require('../db')
const bcrypt = require('bcrypt')
const { registrationValidator, loginValidator } = require('../helpers/validators');

const User = require('../models/user')


router.post('/auth/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        const compare = await bcrypt.compare(req.body.password, user.password)
        if (compare) {
            req.session.user = user
            return res.status(200).json({ valid: true })
        }
    }
    console.log('Invalid email / password')
    return res.status(401).json({ valid: false })
})

router.post('/auth/register', async (req, res) => {
    const userExist = await User.exists({ email: req.body.email });
    if (!userExist) {
        const user = new User({
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
        });
        const savedUser = await user.save();
        return res.status(200).send({ valid: true });
    } else {
        console.log('User already exists')
        return res.status(400).json({ valid: false })
    }
})

router.post('/auth/reset', async (req, res) => {
    const userExist = await User.exists({ email: req.body.email });

})

module.exports = router
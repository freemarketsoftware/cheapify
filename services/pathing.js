
const User = require('../models/user')
const Ad = require('../models/ad')
const City = require('../models/city')
const Category = require('../models/category')
const Domain = require('../models/domain')

const getPathing = async (paths) => {
    city = `${paths.city}/`
    category = `${paths.category}/`
    return { city, category }
}

module.exports.getPathing = getPathing

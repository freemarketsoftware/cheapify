
const User = require('../models/user')
const Ad = require('../models/ad')
const City = require('../models/city')
const Category = require('../models/category')
const Domain = require('../models/domain')


const getConfig = async (locale) => {
    const config = await Domain.find({}).lean()
    const categories = await Category.find({}).lean()
    
    config.forEach(domain => {
        domain.categories = categories.filter((category) => {
            return category.domain.equals(domain._id)
        })
    })

    config.forEach()
    console.log(config)
    return {}
}

module.exports.getConfig = getConfig

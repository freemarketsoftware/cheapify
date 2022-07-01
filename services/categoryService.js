
const Category = require('../models/category')


const getCategory = async (categoryPath) => {
    const category = await Category.findOne({path: categoryPath}).lean()
    return category
}


module.exports.getCategory = getCategory



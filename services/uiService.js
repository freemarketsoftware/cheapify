
const User = require('../models/user')
const Ad = require('../models/ad')
const City = require('../models/city')
const Category = require('../models/category')
const Domain = require('../models/domain')


const sortDomains = (a, b) => {
    if (a.displayOrder < b.displayOrder) {
        return -1;
    }
    if (a.displayOrder > b.displayOrder) {
        return 1;
    }
    return 0;
}

const sortCategories = (locale) => (a, b) => {
    if (a.name[locale] < b.name[locale]) {
        return -1;
    }
    if (a.name[locale] > b.name[locale]) {
        return 1;
    }
    return 0;
}

// const arr = [
//     { name: 'John', age: 92 },
//     { name: 'Dave', age: 42 },
//     { name: 'Justin', age: 3 }
//   ]
  
//   const propComparator = (propName) =>
//     (a, b) => a[propName] == b[propName] ? 0 : a[propName] < b[propName] ? -1 : 1
  
//   arr.sort(propComparator('name'))
  
//   arr.sort(propComparator('age'))


const getCategoryHeaderConfig = async (locale) => {
    const domains = await Domain.find({}).lean()
    const domainsWithCategories = JSON.parse(JSON.stringify(domains))
    const categories = await Category.find({}).lean()
    domainsWithCategories.sort(sortDomains)
    categories.sort(sortCategories(locale))

    domainsWithCategories.forEach(domain => {
        domain.categories = categories.filter((category) => {
            return category.domain.equals(domain._id)
        })
    })
    return {domainsWithCategories, categories, domains}
}

const getCities = async () => {
    const cities = City.find({}).lean()
    return cities
}

const getLocales = () => {
    return [{label: 'English', langCode: 'en'}, {label: 'Français', langCode: 'fr'}]
}

// replace with cached values for domains, categories and cities to avoid fetching DB

const getUIConfig = async () => {
    const categoryHeaderConfig = await getCategoryHeaderConfig()
    return {
        domainsWithCategories: categoryHeaderConfig.domainsWithCategories,
        categories: categoryHeaderConfig.categories,
        domains: categoryHeaderConfig.domains,
        cities: await getCities(),
        locales: await getLocales(),
    }
}

module.exports.getUIConfig = getUIConfig

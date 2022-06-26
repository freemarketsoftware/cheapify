require('dotenv').config({ path: './.dev.env' })
const cheerio = require('cheerio')
const fs = require('fs')
const request = require('request')
const path = require('path')

const City = require('./models/city')
const Domain = require('./models/domain')
const Category = require('./models/category')
const Business = require('./models/business')

const mongoose = require('mongoose')
const { getPathLength } = require('geolib')
const mongo_uri = process.env.MONGO_URI

// Connection URI
// const uri = 'mongodb://127.0.0.1:27017/construction-crawling'
// Create a new MongoClient
// const client = new MongoClient(uri)


// { unique: 'klevesque@dix54.ca', len: 9 }
// { unique: 'mario.bellefleur@fenplast.com', len: 18 }
// { unique: 'info@macie.ca', len: 10 }

// { unique: '', len: 6 }
// { unique: 'mario.rodrigue@pomerleau.ca', len: 9 }

mongoose.connect(mongo_uri)
const connection = mongoose.connection
connection.once('open', () => { })


async function run() {

    
    const file = await fs.readFileSync('./configseed/category.json', { encoding: 'utf8', flag: 'r' })
    const json = JSON.parse(file)

    // await seedDomains(json.domains)
    await seedCategories(json.categories)



    async function seedCategories(categories) {
        categories.forEach(async (categ) => {
            const domain = await Domain.findOne({ path: categ.domain })
            const category = new Category({
                path: categ.path,
                name: categ.name,
                domain: domain._id,
            })
            await category.save()
        })
    }


    async function seedDomains(domains) {
        domains.forEach(async (dom) => {
            const domain = new Domain({
                path: dom.path,
                name: dom.name,
                displayOrder: dom.displayOrder
            })

            await domain.save()
        })
    }

}

run().catch(console.dir)



var cleanup = function (str) {
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    return str.toLowerCase().replace(/[^a-z]+/g, '-')
}

var deleteAll = (collection, query) => {
    collection.deleteMany(query)
}

var listAll = (collection, field) => {
    for (var elem of collection) {
        console.log(elem['url'])
    }
}

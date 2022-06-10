require('dotenv').config({ path: './.dev.env' })
const cheerio = require('cheerio')
const fs = require('fs')
const request = require('request')
const path = require('path')

const City = require('./models/city')
const Business = require('./models/business')

const mongoose = require('mongoose')
const { groupEnd } = require('console')
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

    Business.find({}, (err, bizs) => {

        // console.log(bizs.filter(el => el.email === 'klevesque@dix54.ca'))


        const find = bizs.filter(el => {
            return el.name.toLowerCase().includes('bena construction')
        })

        console.log(find)

        // bizs.forEach(biz => {

        //     const categories = JSON.parse(biz.categories) 

        //     if(categories.length == 2) {
        //         categories.forEach(categ => {
        //             if(categ['Sous-catégories'] === '7') {
        //                 console.log(biz.name)
        //             }
        //         })
        //     }

        //     // if(categories.length == 1) {
        //     //     console.log(biz.name)
        //     //     console.log(categories[0])
        //     // }
        // })


        // Business.deleteOne({name: biz.name}, (err,res ) => {
        //     console.log(err, res)
        // })  

        // const group = bizs.filter(el => el.website.includes('groupe'))
        // console.log(group.length)
        // group.slice(0,10).forEach(el => console.log(el))
        // // bizs.forEach(biz => {
        //     if(passWebsiteFilter(biz.website)) {
        //         console.log(biz.website)
        //     }
        // })
        // const over = []
        // const uniqueEmails = Array.from(new Set(bizs.map(el => el.email)))
        // console.log(bizs.length)
        // console.log(uniqueEmails.length)
        // uniqueEmails.forEach(unique => {
        //     const arr = bizs.filter(elem => elem.email.includes('group'));
        //     const len = arr.length
        //     if (len > 5) {
        //         console.log("'" + unique + "'")
        //     }
        // })

        console.log('end')
        // const uniqueAddress = Array.from(new Set(bizs.map(el => el.address)))
        // console.log(uniqueAddress.length)
        // uniqueAddress.forEach(unique => {
        //     const arr = json.filter(elem => elem.address === unique);
        //     const len = arr.length
        //     if (len > 5) {
        //         console.log({ unique, len })
        //     }
        // })
    })
    // Array.from(['pfaucon@legroupemaurice.com']).forEach((email) => {
    //         Business.deleteMany({ email: email }, (err, res) => {
    //             console.log(err, res)
    //         })
    //     }
    //     )
    // Business.deleteMany({email: 'famrarene@ccdc.qc.ca'}, (err,res ) => {
    //     console.log(err, res)
    // })


    // const file = await fs.readFileSync('./data/all.json', { encoding: 'utf8', flag: 'r' })
    // const json = JSON.parse(file)



    // const steamatic = json.filter(el => el.website === 'steamatic.ca')
    // console.log(steamatic)


    // console.log(json.length)
    // const cities = Array.from(new Set(json.map(elem => elem.city)))
    // cities.sort((a, b) => a.localeCompare(b))


    // json.forEach(elem => {
    //     // console.log(elem)
    //     // const user = await User.findOne({ email: req.session.user.email })
    //     // user._id
    //     City.findOne({ name: elem.city }, function (err, city) {
    //         const business = new Business({
    //             name: elem.name,
    //             email:  elem.email,
    //             website: elem.website,
    //             city: city._id,
    //             address: elem.address.toLowerCase(),
    //             phone: elem.phone,
    //             categories: JSON.stringify(elem.categories),
    //             other: JSON.stringify({
    //                 businessId: elem.businessId,
    //                 licenseId: elem.licenseId,
    //             })
    //         })
    //         business.save((err, data) => {

    //             // console.log(data._id)
    //         })
    //     });



    // })


    // bizs.forEach(uniqueName => {
    //     if(json.filter(elem => elem.name === uniqueName).length > 1) {
    //         console.log(uniqueName)
    //     }
    // })

    // bizs.slice(0,100).forEach(biz => {
    //     console.log(biz)
    // })



    // const database = client.db('cheapify')
    // const citiesCollection = database.collection('cities')




    // cities.forEach(cityString => {
    //     // const city = {
    //     //     name: cityString,
    //     //     state: 'quebec'
    //     // }

    //     // citiesCollection.insertOne(city, (result) => {
    //     //     console.log(result.message)
    //     // })
    //     const city = new City({
    //         name: cityString,
    //         state: 'Quebec'
    //     })

    //     city.save((data) => {
    //         console.log(data)
    //     })
    // })


    // const cities = await citiesCollection.find({}).toArray()

    // console.log(cities)
    // for(const city of cities) {
    //     // const query = {_id: city._id}
    //     // const objSet = {$set: {state: 'Quebec'}}
    //     // // await citiesCollection.updateOne(query, objSet);
    //     // console.log("Update")
    // }


}

run().catch(console.dir)




var passWebsiteFilter = (website) => {
    return !['yahoo', 'videotron.ca', 'gmail.com', 'bellnet', 'glencore.ca',
        'live.com', 'bell.net', 'live.ca', 'hotmail', 'outlook', 'sympatico',
        'msn.com', 'bellnet', 'qmail.net', 'mail.com'].some(str => website.includes(str))
}

var transformCategory = (category) => {
    switch(category['Sous-catégories']) {
        case '1.2':
            console.log('Commercial, institutionnel et industriel | Agrandissement')
            break
        case '1.3':
                break
        case '7':
            console.log('Ventilation')
            break
        case '':
            break
            
    } 
}

// const bizs = []
// console.log(json[0])
// json.forEach(biz => { 
//     if(!['videotron.ca', 'gmail.com', 'bellnet',
//     'glencore.ca', 'live.com', 'bell.net',
//     'hotmail', 'outlook', 'sympatico',
//     'msn.com', 'bellnet', 'qmail.net', 'mail.com'].some(str => biz.website.includes(str))) {
//         bizs.push({name: biz.name , website: biz.website.toLowerCase()})
//     }

// })

// console.log(bizs)









// const tuples = []; 
// const cities = Array.from(new Set(json.map(elem => elem.city)))
// cities.forEach(city => {
//     const cies = json.filter(el => el.city === city)
//     tuples.push({companies: cies, city})
// })

// tuples.filter(elem => elem.city === 'Gatineau')[0].companies.slice(0,200).forEach(cie => {
//     if(!cie.website.includes('videotron.ca') && !cie.website.includes('gmail.com') && !cie.website.includes('bellnet') && !cie.website.includes('live') && !cie.website.includes('hotmail')
//     && !cie.website.includes('outlook') && !cie.website.includes('sympatico') && !cie.website.includes('msn.com')  && !cie.website.includes('bell.net')  && !cie.website.includes('qmail.net') && !cie.website.includes('mail.com'))
//         console.log(cie.website)
// })





// console.log(json)

// const array = json['Liste Licence']

// console.log(array[10]['Licence'])
// console.log(array[10]['Licence']['Catégories et sous-catégories'])

// console.log(array.length)

// const rbq = array.map(el => {
//     return el['Licence']['Adresse']

// })

// const pruned = array.map(el => {
//     return {
//         name: el['Licence']["Nom de l'intervenant"],
//         email: el['Licence']['Courriel'],
//         website: el['Licence']['Courriel']?.split('@')[1],
//         phone: el['Licence']['Numéro de téléphone'],
//         address: el['Licence']['Adresse'],
//         city: el['Licence']['Municipalité'],
//         region: el['Licence']['Région administrative'],
//         state: 'Quebec',
//         licence: el['Licence']['Type de licence'],
//         entity: el['Licence']['Statut juridique'],
//         categories: el['Licence']['Catégories et sous-catégories'],
//         licenceId: el['Licence']['Numéro de licence'],
//         businessId: el['Licence']['NEQ']
//     }
// })
// console.log(json.filter(elem => elem.name.toLowerCase().includes("paysage alex")))


// console.log(cities)
// const removed = json.filter(el => el.name === null)
// console.log(removed)

// function compare( a, b ) {
//     if ( a.count < b.count ){
//       return 1;
//     }
//     if ( a.count > b.count ){
//       return -1;
//     }
//     return 0;
//   }

// cities.forEach(city => {
//     const cies = json.filter(el => el.city === city)
//     tuples.push({companies: cies, city})
// })

// tuples.sort(compare)

// const mtlFromTuples = tuples.filter(elem => {return elem.city === 'Montréal'})[0];
// const montreal = json.filter(el => el.city === 'Montréal')
// console.log(tuples)
// console.log(roughSizeOfObject(montreal))

// console.log(tuples)


// function roughSizeOfObject( object ) {

//     var objectList = [];
//     var stack = [ object ];
//     var bytes = 0;

//     while ( stack.length ) {
//         var value = stack.pop();

//         if ( typeof value === 'boolean' ) {
//             bytes += 4;
//         }
//         else if ( typeof value === 'string' ) {
//             bytes += value.length * 2;
//         }
//         else if ( typeof value === 'number' ) {
//             bytes += 8;
//         }
//         else if
//         (
//             typeof value === 'object'
//             && objectList.indexOf( value ) === -1
//         )
//         {
//             objectList.push( value );

//             for( var i in value ) {
//                 stack.push( value[ i ] );
//             }
//         }
//     }
//     return bytes;
// }

// function roughSizeOfObject2( object ) {

//     var objectList = [];

//     var recurse = function( value )
//     {
//         var bytes = 0;

//         if ( typeof value === 'boolean' ) {
//             bytes = 4;
//         }
//         else if ( typeof value === 'string' ) {
//             bytes = value.length * 2;
//         }
//         else if ( typeof value === 'number' ) {
//             bytes = 8;
//         }
//         else if
//         (
//             typeof value === 'object'
//             && objectList.indexOf( value ) === -1
//         )
//         {
//             objectList[ objectList.length ] = value;

//             for( i in value ) {
//                 bytes+= 8; // an assumed existence overhead
//                 bytes+= recurse( value[i] )
//             }
//         }

//         return bytes;
//     }

//     return recurse( object );
// }

// console.log(montreal.length)
// const filtered = removed.filter(el => !(el.name === null && el.email === null))

// console.log(filtered[10])
// await fs.writeFileSync('./data/all.json', JSON.stringify(json));


//  el => el.type === 'Entrepreneur' && el.city === 'Gatineau'

// const clean = json.filter(el => (el.region === null))


//CITIES SHOULD BE CLEANED

// const cityMap = [];

// json.forEach(el => cityMap[cleanup(el.city)] = el.city)

// console.log(cityMap)


// for(var i = 0 ; i < json.length; i++) {
//     json[i].city = cityMap[cleanup(json[i].city)]
// }

// const clean = Array.from(new Set(json.map(el => cleanup(el.city))))
// console.log(clean.length)
// const unclean = Array.from(new Set(json.map(el => (el.city))))
// console.log(unclean.length)

// const citiesCount = []
// for(const city of cities) {
//     citiesCount.push({
//         city: cleanup(city),
//         count: json.filter(el => el.city === city).length
//     })
//     // console.log(city + ' ' + json.filter(el => el.city === city).length)
// }
// console.log(citiesCount)
// console.log(cities.filter(el => el === 'Gatineau') + ' ' + json.filter(el => el.city === city).length)


// for(var i = 0 ; i < json.length; i++) {
//     if(json[i].name === 'Consortium Alco-TMI/Lajoie Somec inc.') {
//         json.address = '';
//     } else if(json[i].name === 'Canmec industriel inc.') {

//     }  else if(json[i].name === 'Morrow Equipment Company, L.L.C.') {

//     }  else if(json[i].name === 'Global Parking Solutions Consulting inc.') {

//     }  else if(json[i].name === '') {

//     }  else if(json[i].name === '') {

//     }  else if(json[i].name === '') {

//     }
// }


// const regions = Array.from(new Set(json.map(el => el.region)));
// regions.forEach(region => {


//     // const cities = Array.from(new Set(filtered.filter(el => el.region === region && el.city !== null).map(el => el.city)));
//     console.log(region)
//     // console.log(cities)
// })



// const fields = Array.from(new Set(filtered.map(el => el.region)));
// const provinces = new Set(json.map(el => el.province))

// const quebec = Array.from(new Set(json.filter(el => el.province === 'Quebec')))
// const ontario = Array.from(new Set(json.filter(el => el.province === 'Ontario')))

// console.log(quebec.length)
// console.log(quebec)


var createLetterKey = (str) => {

    console.log(str)
}


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

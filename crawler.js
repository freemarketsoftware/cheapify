const { MongoClient } = require('mongodb')
const fs = require('fs')
// Connection URI
const uri = 'mongodb://127.0.0.1:27017/construction-crawling'
// Create a new MongoClient
const client = new MongoClient(uri)

//AIzaSyCtzJ_idn6NZQGipDlAjFnTQtn8_imkBww

async function run() {

    const file = await fs.readFileSync('./data/all.json', {encoding:'utf8', flag:'r'})
    const json = JSON.parse(file)

    // console.log(json.filter(elem => elem.name.toLowerCase().includes("paysage alex")))

    const tuples = []; 
    const cities = Array.from(new Set(json.map(elem => elem.city)))
    cities.forEach(city => {
        const cies = json.filter(el => el.city === city)
        tuples.push({companies: cies, city})
    })





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

    try {
            await client.connect()

            const database = client.db('cheapasdify')
            // console.log(database)
            const citiesCollection = database.collection('cities')

            const cities = await citiesCollection.find({}).toArray()

            // console.log(cities)
            for(const city of cities) {
                // const query = {_id: city._id}
                // const objSet = {$set: {state: 'Quebec'}}
                // // await citiesCollection.updateOne(query, objSet);
                // console.log("Update")
            }

        } finally {
            await client.close()
        }
}
run().catch(console.dir)


var fixRegion = () => {

}



var createLetterKey = (str) => {

    console.log(str)
}


var cleanup = function(str) {
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    return str.toLowerCase().replace(/[^a-z]+/g, '-')
 }




var deleteAll = (collection, query) => {
    collection.deleteMany(query)
}

var listAll = (collection, field) => {
    for(var elem of collection) {
        console.log(elem['url'])
    }
}

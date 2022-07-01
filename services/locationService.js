
const fetch = require('node-fetch');
const City = require('../models/city')


const getLocationByPath = async (req) => {
    const locationByPath = req.params.location || null
    const city = await City.findOne({ path: locationByPath }).lean()
    return city
}

const getLocation = async (req) => {
    const locationByCookie = req.cookies.location || null
    const locationByIp = '192.222.174.165' || req.headers['x-forwarded-for'] || req.socket.remoteAddress || null
    let city = null
    if (locationByCookie && !city) {
        city = await City.findOne({ path: locationByCookie }).lean()
        if (locationByIp && !city) {
            const ipLocation = await getLocationByIp(locationByIp)
            let cityStr = ipLocation.city.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            cityStr = cityStr.toLowerCase().replace(/[^a-zA-Z]+/g, "");
            city = await City.findOne({ path: cityStr }).lean()
        }
    }
    if (!city) {
        city = await City.findOne({ path: 'montreal' }).lean()
    }

    return city
}

const getLocationByIp = async (ip) => {
    const url = `http://api.ipstack.com/${ip}?access_key=b76e7d597e6c40c15f3e01b2a01ebaca`
    const response = await fetch(url)
    const body = await response.text();
    const json = JSON.parse(body)
    return json
}


module.exports.getLocation = getLocation
module.exports.getLocationByPath = getLocationByPath



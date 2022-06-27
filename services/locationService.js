
const fetch = require('node-fetch');
const City = require('../models/city')


// path secured
// cookie --> ip --> default
const getLocationConfig = async (req) => {
    const locationCookie = req.cookies.location || null
    const ip = '192.222.174.165' || req.headers['x-forwarded-for'] || req.socket.remoteAddress || null
    let city = null
    if (locationCookie) {
        city = await City.findOne({path: locationCookie}).lean()
    }
    else if(ip) {
        const ipLocation = await getLocationByIp(ip)
        let cityStr = ipLocation.city.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        cityStr = cityStr.toLowerCase().replace(/[^a-zA-Z]+/g, "");
        city = await City.findOne({path: cityStr}).lean()
    }

    if(!city) {
        // Should be the state
        city = await City.findOne({path: 'montreal'}).lean()
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


module.exports.getLocationConfig = getLocationConfig



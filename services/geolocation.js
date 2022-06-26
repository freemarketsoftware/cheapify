
const fetch = require('node-fetch');





const getLocationByIp = async (ip) => {
    const url = `http://api.ipstack.com/${ip}?access_key=b76e7d597e6c40c15f3e01b2a01ebaca`
    const response = await fetch(url)
    const body = await response.text();
    const json = JSON.parse(body)
    return json
}


module.exports.getLocationByIp = getLocationByIp

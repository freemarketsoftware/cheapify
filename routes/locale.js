var express = require('express')
var router = express.Router()

const { isLocaleAvailable } = require('../services/localeService')


router.post('/:locale', async (req, res) => {
    const locale = req.params.locale
    if(!isLocaleAvailable(locale)) {
        return res.status(400).send({message: 'Specified locale is not available'})
    }
    res.setHeader('Set-Cookie', `locale=${locale}; path=/`);
    res.json({locale})
})


module.exports = router
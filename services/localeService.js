


const isLocaleAvailable = (locale) => {
    const availableLocales = ['en', 'fr']
    return availableLocales.includes(locale)
}

const extractLocale = (req) => {
    const locale = req.cookies.locale || null
    console.log(locale)
    if(!locale || !isLocaleAvailable(locale)) {
        return 'en'
    } else {
        return locale
    }
}



module.exports.extractLocale = extractLocale
module.exports.isLocaleAvailable = isLocaleAvailable



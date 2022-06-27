


const isLocaleAvailable = (locale) => {
    const availableLocales = ['en', 'fr']
    return availableLocales.includes(locale)
}

const extractLocale = async (req) => {
    const locale = req.cookies.locale || null
    if(!locale || !isLocaleAvailable(locale)) {
        return 'en'
    }
}



module.exports.extractLocale = extractLocale
module.exports.isLocaleAvailable = isLocaleAvailable



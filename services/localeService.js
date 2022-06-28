const isLocaleAvailable = (locale) => {
    const availableLocales = ['en', 'fr']
    return availableLocales.includes(locale)
}

const extractLocale = (locale) => {
    if (!locale || !isLocaleAvailable(locale)) {
        return 'en'
    } else {
        return locale
    }
}

module.exports.extractLocale = extractLocale
module.exports.isLocaleAvailable = isLocaleAvailable



const isLocaleAvailable = (locale) => {
    const availableLocales = ['en', 'fr']
    return availableLocales.includes(locale)
}

const isLocaleValid = (locale) => {
    if (!locale || !isLocaleAvailable(locale)) {
        return false
    } else {
        return true
    }
}

module.exports.isLocaleValid = isLocaleValid
module.exports.isLocaleAvailable = isLocaleAvailable



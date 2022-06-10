
var lang = {
    'HEADER' : {
        'search': {
            'en': 'Search for something',
            'fr': 'Chercher quelque chose',
        }, 
        'location': {
            'en': 'Enter your city, ',
            'fr': 'Entrer votre',
        }, 
    },
    'BREADCRUMBS' : {

    },

    'CREATE': {
        'create': {
            'en': 'Create ad',
            'fr': 'Créer une annonce',
        },
    },

    'EDIT': {
        'edit': {
            'en': 'Edit ad',
            'fr': 'Modifier une annonce',
        },
    },

    'AD': {
        'title': {
            'en': 'Title',
            'fr': 'Titre' 
        },
    
        'description': {
            'en': 'Description',
            'fr': 'Description' 
        },
    
        'price': {
            'en': 'Price',
            'fr': 'Prix' 
        },
    },

    'LISTINGS' : {
        
    },
}




function getTranslations(key) {
    return lang[key]
}

module.exports = {
    getTranslations,
}
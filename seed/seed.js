require('dotenv').config({ path: './.dev.env' })
const { Long } = require('mongodb')
const mongoose = require('mongoose')
const State = require('../models/state')
const uri = process.env.MONGO_URI
// https://javascript.plainenglish.io/seeding-mongodb-database-from-node-the-simplest-way-3d6a0c1c4668
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Mongo connection open')
    }).catch((err) => {
        console.log(err)
    })

const domains = [
    {
        "name": {
            "en": "Real Estate",
            "fr": "Immobilier"
        }
    },
    {
        "name": {
            "en": "Jobs",
            "fr": "Emplois"
        }
    },
    {
        "name": {
            "en": "For Sale",
            "fr": "À vendre"
        }
    },
    {
        "name": {
            "en": "Services",
            "fr": "Services"
        }
    }
]

const categories = [
    {
        "name": {
            "en": "Apartments",
            "fr": "Appartements"
        },
        "domain": "real-estate"
    },
    {
        "name": {
            "en": "Real estate for sale",
            "fr": "Immobilier à vendre"
        },
        "domain": "real-estate"
    },
    {
        "name": {
            "en": "Commercial",
            "fr": "Commercial"
        },
        "domain": "real-estate"
    },
    {
        "name": {
            "en": "Storage / Parking",
            "fr": "Entreposage / Stationement"
        },
        "domain": "real-estate"
    },
    {
        "name": {
            "en": "Rooms, Roommates",
            "fr": "Chambres, Colocs"
        },
        "domain": "real-estate"
    },
    {
        "name": {
            "en": "Cottages",
            "fr": "Chalets"
        },
        "domain": "real-estate"
    },
    {
        "name": {
            "en": "Land",
            "fr": "Terrains"
        },
        "domain": "real-estate"
    },

    {
        "name": {
            "en": "Administration, Compatibility, Finance",
            "fr": "Administration, Compatibilité, Finance"
        },
        "domain": "jobs"
    },
    {
        "name": {
            "en": "Artistic, Design",
            "fr": "Artistique et design"
        },
        "domain": "jobs"
    },
    {
        "name": {
            "en": "Engineering, Architecture",
            "fr": "Ingénierie et architecture"
        },
        "domain": "jobs"
    },
    {
        "name": {
            "en": "Hairdressing, Aesthetics, Spa and Fitness",
            "fr": "Coiffure, esthétique, spa et fitness"
        },
        "domain": "jobs"
    },
    {
        "name": {
            "en": "Construction, Industrial and Labor",
            "fr": "Construction, industriel et travail physique"
        },
        "domain": "jobs"
    },
    {
        "name": {
            "en": "Education, Babysitting",
            "fr": "Éducation, gardiennage"
        },
        "domain": "jobs"
    },
    {
        "name": {
            "en": "General work",
            "fr": "Travail général"
        },
        "domain": "jobs"
    },
    {
        "name": {
            "en": "IT, Programming",
            "fr": "Informatique et programmation"
        },
        "domain": "jobs"
    },
    {
        "name": {
            "en": "Legal",
            "fr": "Juridique"
        },
        "domain": "jobs"
    },
    {
        "name": {
            "en": "Marketing, Sales",
            "fr": "Marketing et vente"
        },
        "domain": "jobs"
    },
    {
        "name": {
            "en": "Restaurants, Bars, Hospitality",
            "fr": "Restauration, bars et hôtellerie"
        },
        "domain": "jobs"
    },
    {
        "name": {
            "en": "Transportation, Delivery",
            "fr": "Transport et livraison"
        },
        "domain": "jobs"
    },
    {
        "name": {
            "en": "Health, Biotechnology, Science",
            "fr": "Santé, biotechnologie et science"
        },
        "domain": "jobs"
    },
    {
        "name": {
            "en": "Security",
            "fr": "Sécurité"
        },
        "domain": "jobs"
    },
    {
        "name": {
            "en": "Other",
            "fr": "Autre"
        },
        "domain": "jobs"
    },

    {
        "name": {
            "en": "Appliances",
            "fr": "Appareils électroménagers"
        },
        "domain": "for-sale"
    },
    {
        "name": {
            "en": "Arts and Crafts",
            "fr": "Artisanat"
        },
        "domain": "for-sale"
    },
    {
        "name": {
            "en": "ATV, Skidoo and UTV",
            "fr": "ATV, UTV, Skidoo"
        },
        "domain": "for-sale"
    },
    {
        "name": {
            "en": "Automotive Parts",
            "fr": "Pièces automobiles"
        },
        "domain": "for-sale"
    },
    {
        "name": {
            "en": "Baby and Child",
            "fr": "Bébé et enfant"
        },
        "domain": "for-sale"
    },
    {
        "name": {
            "en": "Bikes",
            "fr": "Vélos"
        },
        "domain": "for-sale"
    },
    {
        "name": {
            "en": "Boats",
            "fr": "Bateaux"
        },
        "domain": "for-sale"
    },
    {
        "name": {
            "en": "Books",
            "fr": "Livres"
        },
        "domain": "for-sale"
    },
    {
        "name": {
            "en": "Bussiness",
            "fr": "Affaires"
        },
        "domain": "for-sale"
    },
    {
        "name": {
            "en": "CD, DVD, Blue-ray",
            "fr": "CD, DVD, Blue-ray"
        },
        "domain": "for-sale"
    },
    {
        "name": {
            "en": "Cars and Trucks",
            "fr": "Automobiles et camions"
        },
        "domain": "for-sale"
    },
    {
        "name": {
            "en": "Clothing",
            "fr": "Vêtements"
        },
        "domain": "for-sale"
    },
    {
        "name": {
            "en": "Collectibles",
            "fr": "Objets de collection"
        },
        "domain": "for-sale"
    },
    {
        "name": {
            "en": "Commercial",
            "fr": "Commercial"
        },
        "domain": "for-sale"
    },
    {
        "name": {
            "en": "Computers",
            "fr": "Ordinateurs"
        },
        "domain": "for-sale"
    },
    {
        "name": {
            "en": "Electronics",
            "fr": "Électronique"
        },
        "domain": "for-sale"
    },
    {
        "name": {
            "en": "Free",
            "fr": "Gratuit"
        },
        "domain": "for-sale"
    },
    {
        "name": {
            "en": "Furniture",
            "fr": "Meubles"
        },
        "domain": "for-sale"
    },
    {
        "name": {
            "en": "General",
            "fr": "Général"
        },
        "domain": "for-sale"
    },
    {
        "name": {
            "en": "Heavy Equipment",
            "fr": "Équipement lourd"
        },
        "domain": "for-sale"
    },
    {
        "name": {
            "en": "Household - Exterior",
            "fr": "Articles de maison - extérieur"
        },
        "domain": "for-sale"
    },
    {
        "name": {
            "en": "Household - Interior",
            "fr": "Articles de maison - intérieur"
        },
        "domain": "for-sale"
    },
    {
        "name": {
            "en": "Industrial",
            "fr": "Industriel"
        },
        "domain": "for-sale"
    },
    {
        "name": {
            "en": "Jewelry and Luxury",
            "fr": "Bijoux et luxe"
        },
        "domain": "for-sale"
    },
    {
        "name": {
            "en": "Materials",
            "fr": "Matériaux"
        },
        "domain": "for-sale"
    },
    {
        "name": {
            "en": "Motorcycles",
            "fr": "Motos"
        },
        "domain": "for-sale"
    },
    {
        "name": {
            "en": "Music Instruments",
            "fr": "Instruments de musique"
        },
        "domain": "for-sale"
    },
    {
        "name": {
            "en": "Personal care and Beauty",
            "fr": "Soins personnels et beauté"
        },
        "domain": "for-sale"
    },
    {
        "name": {
            "en": "Photo and Video",
            "fr": "Photo et vidéo"
        },
        "domain": "for-sale"
    },
    {
        "name": {
            "en": "RVs, Mobile Homes and Camping",
            "fr": "Véhicules récréatifs et camping"
        },
        "domain": "for-sale"
    },
    {
        "name": {
            "en": "Smartphones and Tablets",
            "fr": "Téléphones et tablettes"
        },
        "domain": "for-sale"
    },
    {
        "name": {
            "en": "Sports",
            "fr": "Sports"
        },
        "domain": "for-sale"
    },
    {
        "name": {
            "en": "Tools",
            "fr": "Outils"
        },
        "domain": "for-sale"
    },
    {
        "name": {
            "en": "Toys",
            "fr": "Jouets"
        },
        "domain": "for-sale"
    },
    {
        "name": {
            "en": "Video Games and Consoles",
            "fr": "Jeux vidéo et consoles"
        },
        "domain": "for-sale"
    },
    {
        "name": {
            "en": "Wanted",
            "fr": "Recherché"
        },
        "domain": "for-sale"
    },
    {
        "name": {
            "en": "Repairs",
            "fr": "Réparation"
        },
        "domain": "services"
    },
    {
        "name": {
            "en": "Electronics",
            "fr": "Électroniques"
        },
        "domain": "services"
    },
    {
        "name": {
            "en": "Cleaning",
            "fr": "Nettoyage"
        },
        "domain": "services"
    },
    {
        "name": {
            "en": "Entertainment",
            "fr": "Divertissement"
        },
        "domain": "services"
    },

    {
        "name": {
            "en": "Legal",
            "fr": "Juridique"
        },
        "domain": "services"
    },

    {
        "name": {
            "en": "Financial",
            "fr": "Finances"
        },
        "domain": "services"
    },
    {
        "name": {
            "en": "Personal Care",
            "fr": "Soins personnels"
        },
        "domain": "services"
    },
    {
        "name": {
            "en": "Labor",
            "fr": "Travail"
        },
        "domain": "services"
    },
    {
        "name": {
            "en": "Skilled Trades",
            "fr": "Main d'oeuvre"
        },
        "domain": "services"
    },
    {
        "name": {
            "en": "Rentals",
            "fr": "Locations"
        },
        "domain": "services"
    },
    {
        "name": {
            "en": "Courses",
            "fr": "Cours"
        },
        "domain": "services"
    },
    {
        "name": {
            "en": "Events",
            "fr": "Évènements"
        },
        "domain": "services"
    },
    {
        "name": {
            "en": "Travel",
            "fr": "Voyages"
        },
        "domain": "services"
    },
    {
        "name": {
            "en": "Pet care",
            "fr": "Soins aux animaux"
        },
        "domain": "services"
    },
    {
        "name": {
            "en": "Other",
            "fr": "Autre"
        },
        "domain": "services"
    }
]


async function seedCategories(categories) {
    categories.forEach(async (categ) => {
        const domain = await Domain.findOne({ path: categ.domain })
        const category = new Category({
            name: categ.name,
            domain: domain._id
        })
        await category.save()
    })
}

async function seedDomains(domains) {
    domains.forEach(async (dom) => {
        const domain = new Domain({
            name: dom.name,
        })

        await domain.save()
    })
}
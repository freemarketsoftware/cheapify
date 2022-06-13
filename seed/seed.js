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
        "path": "real-estate",
        "name": {
            "en": "Real Estate",
            "fr": "Immobilier"
        }
    },
    {
        "path": "jobs",
        "name": {
            "en": "Jobs",
            "fr": "Emplois"
        }
    },
    {
        "path": "for-sale",
        "name": {
            "en": "For Sale",
            "fr": "À vendre"
        }
    },
    {
        "path": "services",
        "name": {
            "en": "Services",
            "fr": "Services"
        }
    }
]

const categories = [
    {
        "path": "re-appartments",
        "name": {
            "en": "Apartments",
            "fr": "Appartements"
        },
        "domain": "real-estate"
    },
    {
        "path": "re-forsale",
        "name": {
            "en": "Real estate for sale",
            "fr": "Immobilier à vendre"
        },
        "domain": "real-estate"
    },
    {
        "path": "re-commercial",
        "name": {
            "en": "Commercial",
            "fr": "Commercial"
        },
        "domain": "real-estate"
    },
    {
        "path": "re-storage",
        "name": {
            "en": "Storage / Parking",
            "fr": "Entreposage / Stationement"
        },
        "domain": "real-estate"
    },
    {
        "path": "re-rooms",
        "name": {
            "en": "Rooms, Roommates",
            "fr": "Chambres, Colocs"
        },
        "domain": "real-estate"
    },
    {
        "path": "re-cottages",
        "name": {
            "en": "Cottages",
            "fr": "Chalets"
        },
        "domain": "real-estate"
    },
    {
        "path": "re-land",
        "name": {
            "en": "Land",
            "fr": "Terrains"
        },
        "domain": "real-estate"
    },

    {
        "path": "j-office",
        "name": {
            "en": "Administration, Compatibility, Finance",
            "fr": "Administration, Compatibilité, Finance"
        },
        "domain": "jobs"
    },
    {
        "path": "j-artist",
        "name": {
            "en": "Artistic, Design",
            "fr": "Artistique et design"
        },
        "domain": "jobs"
    },
    {
        "path": "j-engie",
        "name": {
            "en": "Engineering, Architecture",
            "fr": "Ingénierie et architecture"
        },
        "domain": "jobs"
    },
    {
        "path": "j-care",
        "name": {
            "en": "Hairdressing, Aesthetics, Spa and Fitness",
            "fr": "Coiffure, esthétique, spa et fitness"
        },
        "domain": "jobs"
    },
    {
        "path": "j-hardwork",
        "name": {
            "en": "Construction, Industrial and Labor",
            "fr": "Construction, industriel et travail physique"
        },
        "domain": "jobs"
    },
    {
        "path": "j-education",
        "name": {
            "en": "Education, Babysitting",
            "fr": "Éducation, gardiennage"
        },
        "domain": "jobs"
    },
    {
        "path": "j-general",
        "name": {
            "en": "General work",
            "fr": "Travail général"
        },
        "domain": "jobs"
    },
    {
        "path": "j-code",
        "name": {
            "en": "IT, Programming",
            "fr": "Informatique et programmation"
        },
        "domain": "jobs"
    },
    {
        "path": "j-legal",
        "name": {
            "en": "Legal",
            "fr": "Juridique"
        },
        "domain": "jobs"
    },
    {
        "path": "j-sales",
        "name": {
            "en": "Marketing, Sales",
            "fr": "Marketing et vente"
        },
        "domain": "jobs"
    },
    {
        "path": "j-resto",
        "name": {
            "en": "Restaurants, Bars, Hospitality",
            "fr": "Restauration, bars et hôtellerie"
        },
        "domain": "jobs"
    },
    {
        "path": "j-transport",
        "name": {
            "en": "Transportation, Delivery",
            "fr": "Transport et livraison"
        },
        "domain": "jobs"
    },
    {
        "path": "j-science",
        "name": {
            "en": "Health, Biotechnology, Science",
            "fr": "Santé, biotechnologie et science"
        },
        "domain": "jobs"
    },
    {
        "path": "j-security",
        "name": {
            "en": "Security",
            "fr": "Sécurité"
        },
        "domain": "jobs"
    },
    {
        "path": "j-other",
        "name": {
            "en": "Other",
            "fr": "Autre"
        },
        "domain": "jobs"
    },

    {
        "path": "b-appliances",
        "name": {
            "en": "Appliances",
            "fr": "Appareils électroménagers"
        },
        "domain": "for-sale"
    },
    {
        "path": "b-arts",
        "name": {
            "en": "Arts and Crafts",
            "fr": "Artisanat"
        },
        "domain": "for-sale"
    },
    {
        "path": "b-terrain",
        "name": {
            "en": "ATV, Skidoo and UTV",
            "fr": "ATV, UTV, Skidoo"
        },
        "domain": "for-sale"
    },
    {
        "path": "b-autoparts",
        "name": {
            "en": "Automotive Parts",
            "fr": "Pièces automobiles"
        },
        "domain": "for-sale"
    },
    {
        "path": "b-baby",
        "name": {
            "en": "Baby and Child",
            "fr": "Bébé et enfant"
        },
        "domain": "for-sale"
    },
    {
        "path": "b-bikes",
        "name": {
            "en": "Bikes",
            "fr": "Vélos"
        },
        "domain": "for-sale"
    },
    {
        "path": "b-boats",
        "name": {
            "en": "Boats",
            "fr": "Bateaux"
        },
        "domain": "for-sale"
    },
    {
        "path": "b-books",
        "name": {
            "en": "Books",
            "fr": "Livres"
        },
        "domain": "for-sale"
    },
    {
        "path": "b-business",
        "name": {
            "en": "Bussiness",
            "fr": "Affaires"
        },
        "domain": "for-sale"
    },
    {
        "path": "b-cd-dvd-blueray",
        "name": {
            "en": "CD, DVD, Blue-ray",
            "fr": "CD, DVD, Blue-ray"
        },
        "domain": "for-sale"
    },
    {
        "path": "b-cars-trucks",
        "name": {
            "en": "Cars and Trucks",
            "fr": "Automobiles et camions"
        },
        "domain": "for-sale"
    },
    {
        "path": "b-clothing",
        "name": {
            "en": "Clothing",
            "fr": "Vêtements"
        },
        "domain": "for-sale"
    },
    {
        "path": "b-collectibles",
        "name": {
            "en": "Collectibles",
            "fr": "Objets de collection"
        },
        "domain": "for-sale"
    },
    {
        "path": "b-commercial",
        "name": {
            "en": "Commercial",
            "fr": "Commercial"
        },
        "domain": "for-sale"
    },
    {
        "path": "b-computers",
        "name": {
            "en": "Computers",
            "fr": "Ordinateurs"
        },
        "domain": "for-sale"
    },
    {
        "path": "b-electronics",
        "name": {
            "en": "Electronics",
            "fr": "Électronique"
        },
        "domain": "for-sale"
    },
    {
        "path": "b-free",
        "name": {
            "en": "Free",
            "fr": "Gratuit"
        },
        "domain": "for-sale"
    },
    {
        "path": "b-furniture",
        "name": {
            "en": "Furniture",
            "fr": "Meubles"
        },
        "domain": "for-sale"
    },
    {
        "path": "b-general",
        "name": {
            "en": "General",
            "fr": "Général"
        },
        "domain": "for-sale"
    },
    {
        "path": "b-heavy-equip",
        "name": {
            "en": "Heavy Equipment",
            "fr": "Équipement lourd"
        },
        "domain": "for-sale"
    },
    {
        "path": "b-house-exterior",
        "name": {
            "en": "Household - Exterior",
            "fr": "Articles de maison - extérieur"
        },
        "domain": "for-sale"
    },
    {
        "path": "b-house-interior",
        "name": {
            "en": "Household - Interior",
            "fr": "Articles de maison - intérieur"
        },
        "domain": "for-sale"
    },
    {
        "path": "b-industrial",
        "name": {
            "en": "Industrial",
            "fr": "Industriel"
        },
        "domain": "for-sale"
    },
    {
        "path": "b-luxury",
        "name": {
            "en": "Jewelry and Luxury",
            "fr": "Bijoux et luxe"
        },
        "domain": "for-sale"
    },
    {
        "path": "b-materials",
        "name": {
            "en": "Materials",
            "fr": "Matériaux"
        },
        "domain": "for-sale"
    },
    {
        "path": "b-moto",
        "name": {
            "en": "Motorcycles",
            "fr": "Motos"
        },
        "domain": "for-sale"
    },
    {
        "path": "b-music",
        "name": {
            "en": "Music Instruments",
            "fr": "Instruments de musique"
        },
        "domain": "for-sale"
    },
    {
        "path": "b-personal-care",
        "name": {
            "en": "Personal care and Beauty",
            "fr": "Soins personnels et beauté"
        },
        "domain": "for-sale"
    },
    {
        "path": "b-photo-video",
        "name": {
            "en": "Photo and Video",
            "fr": "Photo et vidéo"
        },
        "domain": "for-sale"
    },
    {
        "path": "b-rvs-camping",
        "name": {
            "en": "RVs, Mobile Homes and Camping",
            "fr": "Véhicules récréatifs et camping"
        },
        "domain": "for-sale"
    },
    {
        "path": "b-phones",
        "name": {
            "en": "Smartphones and Tablets",
            "fr": "Téléphones et tablettes"
        },
        "domain": "for-sale"
    },
    {
        "path": "b-sports",
        "name": {
            "en": "Sports",
            "fr": "Sports"
        },
        "domain": "for-sale"
    },
    {
        "path": "b-tools",
        "name": {
            "en": "Tools",
            "fr": "Outils"
        },
        "domain": "for-sale"
    },
    {
        "path": "b-toys",
        "name": {
            "en": "Toys",
            "fr": "Jouets"
        },
        "domain": "for-sale"
    },
    {
        "path": "b-video-games",
        "name": {
            "en": "Video Games and Consoles",
            "fr": "Jeux vidéo et consoles"
        },
        "domain": "for-sale"
    },
    {
        "path": "b-wanted",
        "name": {
            "en": "Wanted",
            "fr": "Recherché"
        },
        "domain": "for-sale"
    },
    {
        "path": "s-repair",
        "name": {
            "en": "Repairs",
            "fr": "Réparation"
        },
        "domain": "services"
    },
    {
        "path": "s-electronics",
        "name": {
            "en": "Electronics",
            "fr": "Électroniques"
        },
        "domain": "services"
    },
    {
        "path": "s-cleaning",
        "name": {
            "en": "Cleaning",
            "fr": "Nettoyage"
        },
        "domain": "services"
    },
    {
        "path": "s-entertainment",
        "name": {
            "en": "Entertainment",
            "fr": "Divertissement"
        },
        "domain": "services"
    },

    {
        "path": "s-legal",
        "name": {
            "en": "Legal",
            "fr": "Juridique"
        },
        "domain": "services"
    },

    {
        "path": "s-financial",
        "name": {
            "en": "Financial",
            "fr": "Finances"
        },
        "domain": "services"
    },
    {
        "path": "s-care",
        "name": {
            "en": "Personal Care",
            "fr": "Soins personnels"
        },
        "domain": "services"
    },
    {
        "path": "s-labor",
        "name": {
            "en": "Labor",
            "fr": "Travail"
        },
        "domain": "services"
    },
    {
        "path": "s-trades",
        "name": {
            "en": "Skilled Trades",
            "fr": "Main d'oeuvre"
        },
        "domain": "services"
    },
    {
        "path": "s-rentals",
        "name": {
            "en": "Rentals",
            "fr": "Locations"
        },
        "domain": "services"
    },
    {
        "path": "s-courses",
        "name": {
            "en": "Courses",
            "fr": "Cours"
        },
        "domain": "services"
    },
    {
        "path": "s-events",
        "name": {
            "en": "Events",
            "fr": "Évènements"
        },
        "domain": "services"
    },
    {
        "path": "s-travel",
        "name": {
            "en": "Travel",
            "fr": "Voyages"
        },
        "domain": "services"
    },
    {
        "path": "s-pets",
        "name": {
            "en": "Pet care",
            "fr": "Soins aux animaux"
        },
        "domain": "services"
    },
    {
        "path": "s-other",
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
            path: categ.path,
            name: categ.name,
            domain: domain._id
        })
        await category.save()
    })
}

async function seedDomains(domains) {
    domains.forEach(async (dom) => {
        const domain = new Domain({
            path: dom.path,
            name: dom.name,
        })

        await domain.save()
    })
}
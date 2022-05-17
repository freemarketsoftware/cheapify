require('dotenv').config({ path: './.dev.env' })
const { Long } = require('mongodb')
const mongoose = require('mongoose')
const State = require('../models/state')
const uri = process.env.MONGO_URI

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Mongo connection open')
    }).catch((err) => {
        console.log(err)
    })

const seedStates = [
    {
        name: 'Quebec'
    },
]

const seedCities = [
    {
        name: 'Gatineau',
        state: 'Quebec'
    },
]

const seedbusinesses = [
    {
        name: 'Le Minautore',
        city: 'Gatineau',
        url: '',
        lat: '45.42711777383732',
        long: '-75.71566112942672'
    },
    {
        name: 'Au 4 jeudis',
        city: 'Gatineau',
        url: '4jeudis.ca',
        lat: '45.4269933744398',
        long: '-75.71615460599911'
    }, 
    {
        name: 'Ou Quoi Salon Urbain',
        city: 'Gatineau',
        url: 'ouquoi48.com',
        lat: '45.42707142280253',
        long:'-75.71606774206404',
    },
    {
        name: 'Club Le Pigale',
        city: 'Gatineau',
        url: 'pigale.com',
        lat: '45.465466852996165',
        long:'-75.69984462500979',
    },
    {
        name: 'Bar 77',
        city: 'Gatineau',
        url: '',
        lat: '45.490972457550065',
        long:'-75.65204202081469',
    },
    {
        name: 'Pop-o-Bar',
        city: 'Gatineau',
        url: 'restaurantpopobar.com',
        lat: '45.463623489153555',
        long:'-75.69949721888392',
    }
]

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
global.fetch = require("node-fetch")

const app = express()
const port = process.env.PORT || 3000

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Set up Static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Tarique'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Tarique'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Helping you',
        title: 'Help',
        name: 'Tarique'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Provide a Geographical location'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (forecastData, error) => {
            console.log(forecastData, error)
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        errorFooter: 'Help Article not Found',
        name: 'Tarique'
    })
})


app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        errorHeader: 'Page not Found!',
        name: 'Tarique'
    })
})


app.listen(port, () => {
    console.log('this is port ' + port)
})

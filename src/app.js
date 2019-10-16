const path = require('path')
const express = require('express')
const hbs = require('hbs')

//require grocode/forecast into app.js
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handelbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Mor Cohen"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Mor Cohen"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Mor Cohen",
        description: "This is some helpful text"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address term!'
        })
    }
    else {
        location = req.query.address
        geocode(location, (error, { lat, long, place } = {}) => {
            if (error) {
                return res.send({error})
            }
            forecast(lat, long, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }
                res.send({
                    address: req.query.address,
                    forcast: forecastData,
                    location: place
                })

            })
        })
    }
    // console.log(req.query.address)
    // res.send([{
    //     address : req.query.address,
    //     forcast : "sunny",
    //     location: 'hadera'
    //     }])


})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a serach term'
        })
    }
    console.log(req.query.search)
    res.send([{
        products: []
    }])

})


app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: "404-Help",
        msg: "Can't find the HELP article",
        name: "Mor Cohen"
    })
})


app.get('*', (req, res) => {
    res.render('404page', {
        title: "404",
        msg: "Sorry, Page Not Found",
        name: "Mor Cohen"
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
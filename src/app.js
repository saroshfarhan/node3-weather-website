const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
//to set path for templates folder as we no longer are using views
const templatePath = path.join(__dirname, '../templates')

//adding views pat as per new folder directory
const viewsPath = path.join(__dirname, '../templates/views')

//creating path for partials
const partialsPath = path.join(__dirname, '../templates/partials')

// console.log(__dirname)
// console.log(publicDirectoryPath)

//setup handlebars engine and views location
//For dynamic templating of web pages
app.set('view engine', 'hbs')
//app.set('views', path.join(__dirname, '../views'))
hbs.registerPartials(partialsPath)
//to set for views
app.set('views', viewsPath)
//To serve a static page
app.use(express.static(publicDirectoryPath))


//to serve up the template use res.render()
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sarosh Farhan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Sarosh Farhan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        help: 'This is the help message',
        name: 'Sarosh Farhan'
    })
})

//To serve a page
app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geoCode(req.query.address , (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({
                error
            })
        }
        forecast(latitude,longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }else{
                res.send({
                    forecast: forecastData ,
                    location,
                    address: req.query.address
                })
            }
            
            })
    })
    
})

app.get('/products', (req, res) => {

    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products : [],
    })
})

//To handle help 404 pages
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Help article not found',
        name: 'Sarosh Farhan'
    })

})

//To handle 404 page
app.get('*', (req, res) => {
    
    res.render('404', {
        title: '404',
        error: 'Page not found',
        name : 'Sarosh Farhan'        
    })
})

//To listen at particular port.
app.listen(3000, () => {
    console.log('Server is up!')
})
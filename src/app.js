const path = require('path');
const express = require('express');
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const app = express();

// Define Paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
const utilsPath = path.join(__dirname,'../src/utils')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))
app.use(express.static(utilsPath))

// app.get('', (req,res) => {
//     res.send('<h1>Home!</h1>')
// })
app.get('', (req,res) => {
    res.render('index', {
        title : 'weather',
        name : 'Riya Shah'
    })
})

app.get('/about', (req,res) => {
    // res.send([{
    //     name:'Riya',
    //     age:22
    // },{
    //     name:'Shreya',
    //     age:27
    // }]);
    res.render('about',{
        title : 'About',
        name : 'Riya',
        img : '/img/about.png'
    })
})

app.get('/weather', (req,res) => {
    console.log(req.query);
    if(!req.query.address){
        return res.send({
            error:'Please Provide an address'
        })
    }
    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                // error:error
                error
            })
        }
        // debugger
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast : forecastData,
                location ,
                address : req.query.address
            })
        })
    })
//    res.send({
//     location:'Ahmedabad',
//     temprature:38,
//     address: req.query.address
//    });
})

// Query String
// localhost:8000/products?search=games&ratings=4
app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query);
    res.send({
        products : {}
    })
})
//--end Query string eg---

app.get('/help', (req,res) => {
    // res.send('<h1>Help Page</h1>')
    res.render('help',{
        helpText : "This is some helpful text",
        title:"Help",
        name: "Riya Shah"
    })
})
app.get('/help/*' , (req,res) => {
    res.render('404',{
        title : 'Help article',
        errormsg:'Help article not found',
        name : 'Riya Shah'
    })
})

app.get('*' ,(req,res) => {
    res.render("404",{
        title : '404',
        errormsg:'Page not found',
        name : 'Riya Shah'
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
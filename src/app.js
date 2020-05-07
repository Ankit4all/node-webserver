const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();


const staticpath = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialpath = path.join(__dirname,'../templates/partials')

//handle bars
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)
//setup static dir
app.use(express.static(staticpath))


app.get('',(req,res) => {
    res.render('index',{
        title:'Weather',
        name:'ankit'
    })
})

// app.get('/weather', (req, res) => {
//     if (!req.query.address) {
//         return res.send({
//             error: 'You must provide an address!'
//         })
//     }

//     geocode(req.query.address, (error, { latitude, longitude, location }) => {
//         if (error) {
//             return res.send({ error })
//         }

//         forecast(latitude, longitude, (error, forecastData) => {
//             if (error) {
//                 return res.send({ error })
//             }

//             res.send({
//                 forecast: forecastData,
//                 location,
//                 address: req.query.address
//             })
//         })
//     })
// })

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({
            error:'cant work without address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location} = {}) => {
        if (error){
        return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastdata) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address
            })
        })
    })
})


app.get('/about',(req,res) => {
    res.render('about',{
        title:'About page',
        name:'ankit'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help page',
        name:'ankit'
    })
})



app.get('/sas',(req,res) => {
    res.send('djdsjdhsjh')
})

app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'ankit',
        errormsg:'page not found'
    })
})


app.listen(3000,() => {
    console.log('server is running')
})
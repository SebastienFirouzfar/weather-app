const path = require('path')
const express = require('express');
const app = express();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
// console.log(__dirname)


//connect heroku
let port = process.env.PORT;

//pour acceder à la page templates de views 
//avant templates,  views était le dossier qui contenaie
//les pages ejs
const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath)

//pour les extentions en hbs
// //Chemin vers dossier partials
// const partials = path.join(__dirname, '../templates/partials')
// app.set("partials", partials)


//chemin vers le dossier public où se trouve tt les pages html
console.log(path.join(__dirname, '../public'))
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))
app.set('view engine', 'ejs')


//page index, la page d’accueil de l’application 
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Sebastien firouzfar 1'
    })
})

//page about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Hello les amis',
        name: 'Firouzfar sebastien 2'
    })
})

//page help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help me friends',
        name: "Sebastien FIROUZFAR 3"
    })
})

//page weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'error address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
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

    // res.send({
    //     pays: "Belgique",
    //     forecast: "running",
    //     address : req.query.address
    // })
})





app.get('/products', (req, res) => {
    //http://localhost:3000/products => si nous avons 
    //s'il n'y a pas la clé après products (http://localhost:3000/products?search=games), il nous envoie un msg d'erreur
    if (!req.query.search) {
        return res.send({
            error: 'error of search'
        })
    }

    //affiche la valeur mis dans l'url / display the value in the url
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Sebastien FIROUZFAR 5",
        errorMessage: 'Help page not found !'

    })
})

//toute la page
app.get('*', (req, res) => {
    //    res.send('my 404 error') 
    res.render('404', {
        title: 404,
        name: "Sebastien FIROUZFAR 4",
        errorMessage: 'Page not found !'

    })
})

// app.listen(3000, () => console.log("Server Up and running"));
//Connect port heroku
if (port == null || port == "") {
    port = 3000;
}
app.listen(port);
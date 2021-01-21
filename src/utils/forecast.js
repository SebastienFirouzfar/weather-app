const request = require('request')
const forecast = (latitude, longitude, callback) =>{
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=Brussels&appid=5cff34fe1cb5033879b50f8d81d3ca1b';
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to weather service ! ', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            // callback(undefined,body.weather[0].description + ' it s currently ' + main.temp + body.coord.lat)
           callback(undefined, body.weather[0].description.charAt(0).toUpperCase() + body.weather[0].description + "! It's currently "+ body.main.temp + " degrees out. This hight today is "+ body.main.temp_max + " with a low of "+ body.main.temp_min +". There is " + body.main.humidity + " % of humidity.")
        }
    })
}

module.exports = forecast
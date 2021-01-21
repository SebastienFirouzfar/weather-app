const request = require('request')
const forecast = (latitude, longitude, callback) =>{
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=Brussels&appid=5cff34fe1cb5033879b50f8d81d3ca1b';
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to weather service ! ', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined,body.coord.lon + ' in Belgium ' + body.coord.lat)
        }
    })
}

module.exports = forecast
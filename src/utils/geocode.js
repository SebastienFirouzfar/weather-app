const request = require('request')
const geocode = (address, callback) => {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1Ijoic2ViYXN0aWVuZmlyb3V6ZmFyIiwiYSI6ImNrazJtdDMxbTBreWIzMnFvdGV1aW03cTQifQ.LbCNLNf92dTs-AdYzTo1zA'
    request({url: geocodeURL, json: true}, (error, response)=>{
        if(error) {
            callback('Unable to connect to location service', undefined)
        }else if(response.body.features.length === 0){
            callback('Unable to find location Try search another', undefined)
        }else{
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }

    })
}

module.exports = geocode
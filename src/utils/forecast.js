const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/f37c193ff5632080aafd9bbfd207fa1a/${lat},${long}?units=si`
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback("FAILED TO CONNECT TO SERVER")
        }
        else if (body.error) {
            callback("Unable to find location")
        }
        else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')

        }
    })
}

module.exports = forecast
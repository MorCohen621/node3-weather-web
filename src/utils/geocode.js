const request = require('request')


const geocode = (location, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoibW9yY29oZW4xNzA1IiwiYSI6ImNrMTZieGoyaTA3NWkzY21ydTV6b3dsbGgifQ.FY8Kze4veyfxjW2YrgOtWA&limit=1`
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback("FAILED TO CONNECT TO SERVER")
        }else if(body.features.length === 0){
            callback("Can't find requested location , please try again")
        }else{
            callback(undefined,{
                 long : body.features[0].center[0],
                 lat : body.features[0].center[1],
                 place : body.features[0].place_name
            })
        }

    })
}

module.exports = geocode
const request = require("request");

function requestCoordinates(address, callback){
    let url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoia2FidWx6aGFuIiwiYSI6ImNrYmJyYm5ycjA0M2kydG1wN2dqbXMzcTEifQ.jfriHmn3CkYLcGchjhtbdw"
    request({url, json: true}, (error, {body})=>{
        if (error) {
            weatherData("Unable to connect the server")
        } else {
            if (!body.features[0]) return callback("The place was not found");
            console.log(body.features[0].place_name);
            console.log(body.features[0].center);
            callback(undefined, body.features[0].center[1], body.features[0].center[0])            
        }
    })
}

function weatherData(latitude, longitude, callback) {
    const url = "http://api.weatherstack.com/current?access_key=af65b99667a2a57f28ffd3a24ce33aa5&query=" + latitude + "," + longitude;

    request({ url, json: true }, (error, {body}) => {
        if (error) console.log("Unable to get the weather data");
        else {
            const data = {
            result: true,
            location: body.location.name + ", " + body.location.country,
            local_time: body.location.localtime,
            description: body.current.weather_descriptions[0] + ". The temperature was observed at " + body.current.observation_time
            + "\nIt was " + body.current.temperature + " degrees Celsius.\nIt felt like "
            + body.current.feelslike + " degrees Celsius."
            }
            callback(undefined, data);
        }
    })
}

module.exports = {
    weatherData: weatherData,
    requestCoordinates: requestCoordinates
} 
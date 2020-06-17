const request = require("request");

function requestCoordinates(address, callback){
    let url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoia2FidWx6aGFuIiwiYSI6ImNrYmJyYm5ycjA0M2kydG1wN2dqbXMzcTEifQ.jfriHmn3CkYLcGchjhtbdw"
    request({url, json: true}, (error, {body})=>{
        if (error) {
            weatherData("Unable to connect the server")
        } else {
            if (!body.features[0]) return callback("The place was not found");
            callback(undefined, body.features[0].center[1], body.features[0].center[0])            
        }
    })
}

function weatherData(latitude, longitude, callback) {
    const url = "http://api.weatherstack.com/current?access_key=af65b99667a2a57f28ffd3a24ce33aa5&query=" + latitude + "," + longitude;

    request({ url, json: true }, (error, {body}) => {
        if (error) console.log("Unable to get the weather data");
        else {
            console.log(body);
            const data = {
            result: true,
            location: body.location.name + ", " + body.location.country,
            local_time: body.location.localtime,
            description: body.current.weather_descriptions[0] + ". The temperature was observed at " + localObservationTime(body.location.utc_offset, body.current.observation_time)
            + " local time. It was " + body.current.temperature + " degrees Celsius. It felt like "
            + body.current.feelslike + " degrees Celsius.",
            humidity: body.current.humidity,
            windspeed: body.current.wind_speed
            }
            callback(undefined, data);
        }
    })
}

function localObservationTime(utc_offset, observation_time){
    let splitTime = observation_time.split(""); 
    let properTimeNumber = 0;
    if (splitTime[0]==="0") {
        properTimeNumber += Number(splitTime[1] + "." + splitTime[3] + splitTime[4]);
    } else {
        properTimeNumber += Number(splitTime[0] + splitTime[1] + "." + splitTime[3] + splitTime[4]);
    }    
    properTimeNumber = properTimeNumber + parseInt(utc_offset);    
    if(splitTime[6]==="P") properTimeNumber+=12;
    properTimeNumber = properTimeNumber.toFixed(2);
    if(properTimeNumber>23.59) properTimeNumber -= 24;
    let properTimeArray = [];
    if(properTimeNumber<10) properTimeArray[0] = "0";
    properTimeArray = properTimeArray.concat(properTimeNumber.toString().split(""));
    return properTimeArray[0] + properTimeArray[1] + ":" + properTimeArray[3] + properTimeArray[4];
}

module.exports = {
    weatherData: weatherData,
    requestCoordinates: requestCoordinates
} 
const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d0ed3464aaa14a628aa65515dc5b7de6&query=' + latitude + ',' + longitude + '&units=m'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Error thrown. Must be network issue', undefined)
        }
        else if (body.success === "false") {
            callback('Error with the geolocation co-ordinate', undefined)
        }
        else {
            callback("It is currently " + body.current.temperature + " degrees out. There is " + body.current.precip + " % chance of raining.", undefined)
        }

    })
}

module.exports = forecast
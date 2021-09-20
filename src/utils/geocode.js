const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2Fyb3NoZmFyaGFuIiwiYSI6ImNrdDY0bTJpZTBmMDIycG83NnJmMnZ5dGsifQ.4ojXNh2HZ_8ZhY-v_Fg-Cg&limit=1'
    request({url: url, json: true}, (error, {body}) => {
            if(error){
                callback('Unabe to connect to weather service!', undefined)
            }else if(body.message === 'Not Found' || body.features.length === 0){
                callback('Cannot find the place, please check the spelling and try again!', undefined)
            }else{
                // const latitude = response.body.features[0].center[1]
                // const longitude = response.body.features[0].center[0]
                // console.log('Latitude is ' + response.body.features[0].center[1] + ' and Logitude is ' + response.body.features[0].center[0])
                // console.log("Place " + response.body.features[0].place_name)
                callback(undefined, {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                })
            }
    })
}

module.exports  = geoCode

//Reference {without object restructuring}
// const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2Fyb3NoZmFyaGFuIiwiYSI6ImNrdDY0bTJpZTBmMDIycG83NnJmMnZ5dGsifQ.4ojXNh2HZ_8ZhY-v_Fg-Cg&limit=1'
// request({url: url, json: true}, (error, response) => {
//         if(error){
//             callback('Unabe to connect to weather service!', undefined)
//         }else if(response.body.message === 'Not Found'){
//             callback('Cannot find the place, please check the spelling and try again!', undefined)
//         }else{
//             // const latitude = response.body.features[0].center[1]
//             // const longitude = response.body.features[0].center[0]
//             // console.log('Latitude is ' + response.body.features[0].center[1] + ' and Logitude is ' + response.body.features[0].center[0])
//             // console.log("Place " + response.body.features[0].place_name)
//             callback(undefined, {
//                 latitude: response.body.features[0].center[1],
//                 longitude: response.body.features[0].center[0],
//                 location: response.body.features[0].place_name
//             })
//         }
// })
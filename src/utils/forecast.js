const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=8b0563a9433663ce3d804d6e8ac65aa6&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request({ url: url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unabe to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location!", undefined);
    } else {
      const temp = body.current.temperature;
      const feelTemp = body.current.feelslike;
      callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + temp + " degrees out. It feels like " + feelTemp + " degress out")
    }
  });
};

module.exports = forecast

//Refernce { Without object destructuring}
// request({ url: url, json: true }, (error, response) => {
//   if (error) {
//     callback("Unabe to connect to weather service!", undefined);
//   } else if (response.body.error) {
//     callback("Unable to find location!", undefined);
//   } else {
//     const temp = response.body.current.temperature;
//     const feelTemp = response.body.current.feelslike;
//     callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + temp + " degrees out. It feels like " + feelTemp + " degress out")
//   }
// });
// };
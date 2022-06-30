const request = require("request");

const yargs = require("yargs");

const getWeather = (url) => {
  request({ url: url, json: true }, (error, response) => {
    const data = response.body;
    const country = data.sys.country,
      state = data.name,
      temperature = data.main.temp,
      pressure = data.main.pressure,
      humidity = data.main.humidity,
      visibility = data.visibility;
    //console.log(data.main);
    console.log(
      "Country: " +
        country +
        " State: " +
        state +
        " Temperature: " +
        temperature +
        " Pressure: " +
        pressure +
        " Humidity: " +
        humidity +
        " Visibility: " +
        visibility
    );
  });
};

yargs.parse();

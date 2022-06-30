const request = require("request");

const yargs = require("yargs");
//debugger;
yargs.command({
  command: "Temperature",
  describe: "Enter location",
  builder: {
    city: {
      describe: "city name",
      demandOption: true,
      type: "string",
    },
    /*state: {
      describe: "state name",
      //demandOption: true,
      //type: "string",
    },*/
    country: {
      describe: "country name",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      argv.city +
      "," +
      argv.country +
      "&APPID=62b4ca8c3ab560e2742636ac825805d5&units=metric";
    getWeather(url);
  },
});

const getWeather = (url) => {
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      console.log("Unable to connect to weather service");
    } else if (response.body.error) {
      console.log("Unable to find location");
    } else {
      const data = response.body;
      const country = data.country,
        city = data.name,
        temperature = data.temp,
        pressure = data.pressure,
        humidity = data.humidity,
        visibility = data.visibility;
      //console.log(data.main);
      console.log(
        "Country: " +
          country +
          " city: " +
          city +
          " Temperature: " +
          temperature +
          "℃  Pressure: " +
          pressure +
          "mbar Humidity: " +
          humidity +
          "% Visibility: " +
          visibility +
          "km"
      );
    }
  });
};

yargs.parse();

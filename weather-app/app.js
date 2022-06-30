const request = require("request");
const { argv } = require("yargs");

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
  const c_code = argv.country.toUpperCase().slice(0, 2);
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      console.log("Unable to connect to Weather server");
    } else if (
      response.body.name == undefined ||
      response.body.sys.country !== c_code
    ) {
      console.log("Unable to Find location");
    } else {
      const data = response.body;
      const country = data.sys.country,
        city = data.name,
        temperature = data.main.temp,
        pressure = data.main.pressure,
        humidity = data.main.humidity,
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

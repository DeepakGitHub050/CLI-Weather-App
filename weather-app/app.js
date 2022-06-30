const request = require("request");

const yargs = require("yargs");

yargs.command({
  command: "Temperature",
  describe: "Enter location",
  builder: {
    city: {
      describe: "city name",
      demandOption: true,
      type: "string",
    },
    state: {
      describe: "state name",
      //demandOption: true,
      //type: "string",
    },
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
      argv.state +
      "," +
      argv.country +
      "&APPID=62b4ca8c3ab560e2742636ac825805d5&units=metric";
    getWeather(url);
  },
});

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

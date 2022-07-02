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
      encodeURIComponent(argv.city) +
      "," +
      encodeURIComponent(argv.country) +
      "&APPID=62b4ca8c3ab560e2742636ac825805d5&units=metric";
    getWeather(url, (error, data) => {
      console.log("Error", error);
      console.log("Data", data);
    });
  },
});

const getWeather = (url, callback) => {
  const c_code = argv.country.toUpperCase().slice(0, 2);
  request({ url, json: true }, (error, { body }) => {
    //uses Es6 Destructuring property
    if (error) {
      callback("Unable to connect to Weather server");
    } else if (body.name == undefined || body.sys.country !== c_code) {
      callback("Unable to Find location");
    } else {
      const data = body; //////used Es6 Destructing property
      const { sys, main, visibility } = data;
      const { temp, pressure, humidity } = main;
      const country = sys.country,
        city = data.name,
        temperature = temp,
        Pressure = pressure,
        Humidity = humidity,
        Visibility = visibility;
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
          Visibility +
          "km"
      );
    }
  });
};

yargs.parse();

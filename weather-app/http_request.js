const https = require("https");
const url =
  "https://api.openweathermap.org/data/2.5/weather?q=Ranchi,IN&APPID=62b4ca8c3ab560e2742636ac825805d5&units=metric";

const request = https.request(url, (response) => {
  let data = "";
  response.on("data", (chunk) => {
    data = data + chunk.toString();
  });
  response.on("end", () => {
    console.log(JSON.parse(data));
  });
  response.on("error", (error) => {
    console.log("An error ", error);
  });
});

request.end();

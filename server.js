const url =
  "https://api.openweathermap.org/data/2.5/weather?q=melbourne,au&units=metric&appid=1ec0ba4dff2640748c7f4e2eda424ded";
const imgURL = "http://openweathermap.org/img/wn/"; //xx@2x.png";
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});

app.get("/", (req, res) => {
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
   
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
const weatherIcon = weatherData.weather[0].icon;
const imgIconURL = `${imgURL}${weatherIcon}@4x.png`;

      console.log( temp, weatherDescription, weatherIcon, imgIconURL);
       res.write(`<h1>The weather in Melborune is ${weatherDescription} and temperature is ${temp} °C</h1>`);
        res.write(`<img src="${imgIconURL}" alt=""></img>`);

       res.send();
    });
  });
 
  
});

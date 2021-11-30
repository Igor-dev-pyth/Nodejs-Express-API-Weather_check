const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html")
  app.post("/", function(req,res){
    const query = req.body.cityName
    const apiKey = "YOUR_API_KEY"
    const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&units=" + units + "&appid=" + apiKey
    https.get(url, function(response){
      // console.log(response.status Code);
      response.on("data", function(data){
        const weatherData = JSON.parse(data)
        // console.log(weatherData);
        const temp = weatherData.main.temp
        const descr = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        // console.log(temp, descr);
        res.write("<html><h3>The temperature in " + query + " is " + temp + " degrees Celsius,</h3></html>");
        res.write("<h3>and the weather is: " + descr +"</h3>");
        res.write("<img src=http://openweathermap.org/img/wn/" + icon + "@2x.png>");
        res.send();
      })
    })
  })
})



app.listen(3000, function(){
  console.log("Server runs on port 3000");
})

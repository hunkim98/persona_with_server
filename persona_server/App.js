const express = require("express");
const app = express();
const port = 5000;

var request = require("request");

app.get("/", (req, res) => {
  res.send("Opened the server");
});

app.get("/new", (req, res) => {
  res.send("hello");
});

app.get("/getTokyo", (req, res) => {
  request(
    "http://api.weatherstack.com/current?access_key=e25a53c86085389ed25e5f88efa6db86&query=Tokyo",
    function (error, response, body) {
      if (!error & (response.statusCode == 200)) {
        var parsedBody = JSON.parse(body);
        var temperature = parsedBody["current"]["temperature"];
        res.send({ temperature });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

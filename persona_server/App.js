const { response } = require("express");
const express = require("express");
const app = express();
const port = 5000;
const fs = require("fs");
const Datastore = require("nedb");

const database = new Datastore("database.db");
database.loadDatabase();
app.use(express.json({ limit: "1mb" }));

var request = require("request");

app.get("/", (req, res) => {
  database.find({}, (err, docs) => {
    res.send(docs);
  });
});

app.get("/gatherData", (req, res) => {
  database.find({}, (err, docs) => {
    res.json(docs);
  });
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

app.post("/sendData", (req, res) => {
  console.log("user sent data");
  console.log(req.body);
  const timestamp = Date.now();
  req.body.timestamp = timestamp;
  database.insert(req.body);
  database.findOne(req.body, (err, docs) => {
    if (err) {
      response.end();
      return;
    }
    console.log({ id: docs._id });
    res.json({ status: "success", id: docs._id, name: req.body.name });
  });
});

app.post("/shareData", (req, res) => {
  console.log("user requests data");
  console.log(req.body.user_id);
  database.findOne({ _id: req.body.user_id }, (err, docs) => {
    if (err) {
      response.end();
      return;
    }
    res.json({
      status: "success",
      name: docs.name,
      personality: docs.personality,
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

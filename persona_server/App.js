const { response } = require("express");
const express = require("express");
var request = require("request");
const app = express();
const port = process.env.PORT || 5000;
const Datastore = require("nedb");

const database = new Datastore("database.db");
database.loadDatabase();
app.use(express.json({ limit: "1mb" }));

app.set("trust proxy", true);

app.get("/gatherData", (req, res) => {
  database.find({}, (err, docs) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send(docs);
  });
});

app.get("/backupData", (req, res) => {
  const ipAddress = req.headers["x-forwarded-for"];
  res.header("Access-Control-Allow-Origin", "*");
  res.send(ipAddress);
});

// app.get("/removeData", (req, res) => {
//   database.remove({}, { multi: true }, function (err, numRemoved) {
//     res.send("erased all data");
//   });
// });

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
    res.json({
      status: "success",
      id: docs._id,
      name: req.body.name,
    });
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
    if (docs !== null) {
      res.json({
        status: "success",
        name: docs.name,
        personality: docs.personality,
      });
    } else {
      res.json({
        status: "false",
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.static(__dirname));

let vehicles = {};

app.get("/location", (req, res) => {
  const vno = req.query.vno;
  if(vehicles[vno]){
    res.json(vehicles[vno]);
  } else {
    res.json({ error: "Vehicle not found" });
  }
});

app.get("/update", (req, res) => {
  const vno = req.query.vno;
  vehicles[vno] = {
    lat: parseFloat(req.query.lat),
    lng: parseFloat(req.query.lng),
    speed: req.query.speed || 0
  };
  res.send("Updated");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
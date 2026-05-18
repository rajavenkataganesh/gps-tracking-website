const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

// Serve index.html
app.use(express.static(__dirname));

let vehicleLocation = {
  lat: 17.3850,
  lng: 78.4867,
  speed: 45
};

app.get("/location", (req, res) => {
  res.json(vehicleLocation);
});

app.get("/update", (req, res) => {
  vehicleLocation.lat = parseFloat(req.query.lat);
  vehicleLocation.lng = parseFloat(req.query.lng);
  vehicleLocation.speed = req.query.speed || 0;
  res.send("Updated");
});

// Vercel ki dynamic port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
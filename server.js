const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

let vehicleLocation = {
lat:17.3850,
lng:78.4867,
speed:45
};

app.get("/location",(req,res)=>{

res.json(vehicleLocation);

});

app.get("/update",(req,res)=>{

vehicleLocation.lat =
parseFloat(req.query.lat);

vehicleLocation.lng =
parseFloat(req.query.lng);

vehicleLocation.speed =
req.query.speed || 0;

res.send("Updated");

});

app.listen(3000,()=>{

console.log("Server running");

});
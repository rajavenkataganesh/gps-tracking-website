var map = L.map('map').setView([17.3850,78.4867],13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

var marker;
let pathCoordinates = [];
let polyline;
let trackingInterval;

function loadLocation(){
  var vno = document.getElementById("vehicleNo").value;
  
  if(!vno){
    alert("Vehicle number enter cheyyi!");
    return;
  }

  fetch("https://gps-tracking-website-production.up.railway.app/location?vno=" + vno)
  .then(res=>res.json())
  .then(data=>{

    if(data.error){
      alert("Vehicle not found!");
      return;
    }

    pathCoordinates.push([data.lat,data.lng]);

    if(polyline){
      map.removeLayer(polyline);
    }

    polyline = L.polyline(pathCoordinates).addTo(map);

    document.getElementById("coords").innerHTML =
    `Latitude: ${data.lat} Longitude: ${data.lng}`;

    document.getElementById("speed").innerHTML =
    `Speed: ${data.speed} km/h`;

    if(marker){
      marker.setLatLng([data.lat,data.lng]);
    }
    else{
      marker = L.marker([data.lat,data.lng])
      .addTo(map)
      .bindPopup("Live Vehicle")
      .openPopup();
    }

    map.setView([data.lat,data.lng],13);
  });
}
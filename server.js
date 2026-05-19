const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.static(__dirname));

const SUPABASE_URL = "https://xptcxahcpizcaxmfeebx.supabase.co";
const SUPABASE_KEY = "mee_anon_key_ikkade_petti";

async function getVehicle(vno) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/vehicles?vno=eq.${vno}`, {
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`
    }
  });
  const data = await res.json();
  return data[0];
}

async function upsertVehicle(vno, lat, lng, speed) {
  await fetch(`${SUPABASE_URL}/rest/v1/vehicles?vno=eq.${vno}`, {
    method: "DELETE",
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`
    }
  });
  await fetch(`${SUPABASE_URL}/rest/v1/vehicles`, {
    method: "POST",
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ vno, lat, lng, speed })
  });
}

app.get("/location", async (req, res) => {
  const vno = req.query.vno;
  const vehicle = await getVehicle(vno);
  if(vehicle) res.json(vehicle);
  else res.json({ error: "Vehicle not found" });
});

app.get("/update", async (req, res) => {
  const { vno, lat, lng, speed } = req.query;
  await upsertVehicle(vno, parseFloat(lat), parseFloat(lng), speed || 0);
  res.send("Updated");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
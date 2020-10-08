require("dotenv").config({ path: "variables.env" });
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const getData = async (lat, lon) => {
  const API_KEY = process.env.OPEN_WEATHER_MAP_API_KEY;
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    throw error;
  }
};

// Convert degrees to point on a compass
const degToCompass = (num) => {
  while (num < 0) num += 360;
  while (num >= 360) num -= 360;
  const val = Math.round((num - 11.25) / 45);
  const arr = [
    "north",
    "north-east",
    "east",
    "south-east",
    "south",
    "south-west",
    "west",
    "north-west",
  ];
  return arr[Math.abs(val)];
};

// Converts epoch time to HH:MM
const epochToTodayTime = (epochTime) => {
  const date = new Date(epochTime * 1000);
  return date.toLocaleTimeString([], {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
};

router.get("/:lat,:lon", async (req, res) => {
  try {
    res.render("forecast.html", {
      data: await getData((lat = req.params.lat), (lon = req.params.lon)),
      degToCompass,
      epochToTodayTime,
    });
  } catch (error) {
    throw error;
  }
});

module.exports = router;

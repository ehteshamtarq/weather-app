import React, { useState, useEffect } from "react";
import axios from "axios";
import "./WeatherApp.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function WeatherApp() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const searchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=8d38b10a871c449d9d2201608240102&q=${location}&aqi=no`
      );
      console.log(response.data);
      setWeatherData(response.data);
      setError(null);
    } catch (err) {
      if (location !== "") {
        setError("No Matching Location Found");
        setWeatherData(null);
      }
    }
  };

  useEffect(() => {
    if (location === "") {
      setError(null);
    }
    const debounceTimeout = setTimeout(searchWeather, 500);
    return () => clearTimeout(debounceTimeout);
  }, [location]);

  return (
    <>
      <header>
        <h1>Weather App</h1>
      </header>
      <main>
        <Box
          component="form"
          
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <TextField
            id="outlined-basic"
            label="Enter Location"
            variant="outlined"
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  console.log(e.key);
                  return false;
                }}}
          />
        </Box>
        {error && (
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <div className="error">{error}</div>
          </Box>
        )}
        {weatherData && (
          <div
            className="card"
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Box
              component="img"
              sx={{
                height: 80,
                width: 80,
              }}
              alt="The house from the offer."
              src={weatherData.current.condition.icon}
            />
            <h2>
              {weatherData.location.name}, {weatherData.location.country}
            </h2>
            <p>
              Temperature: {weatherData.current.temp_c}°C /{" "}
              {weatherData.current.temp_f}°F
            </p>
            <p>Weather Condition: {weatherData.current.condition.text}</p>
            <p>Humidity: {weatherData.current.humidity}%</p>
            <p>Cloud: {weatherData.current.cloud}%</p>
            <p>Wind Speed: {weatherData.current.wind_kph} km/h</p>
            <p>Last Updated: {weatherData.current.last_updated}</p>
          </div>
        )}
      </main>
    </>
  );
}

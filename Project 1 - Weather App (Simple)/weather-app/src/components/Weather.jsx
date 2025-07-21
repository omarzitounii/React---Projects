import React, { useState, useRef, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const inputRef = useRef();

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const getWeatherData = async (city) => {
    if (city === "") {
      alert("Enter city name please!");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();
      if (data.cod === "404") {
        alert("City not found!");
        return;
      }

      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        icon: icon,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      });
      inputRef.current.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherData("Braunschweig");
  }, []);

return (
    <>
    <div className="flex items-center gap-5 w-full">
        <input
        ref={inputRef}
        type="text"
        placeholder="Search"
        className="py-2 ps-6 border-2 border-gray-200 rounded-full placeholder-gray-200 text-gray-200 text-xl outline-0 w-[80%]"
        onKeyDown={(e) => {
        if (e.key === 'Enter') {
            getWeatherData(inputRef.current.value);
        }
        }}
        />
        <button
        onClick={() => getWeatherData(inputRef.current.value)}
        className="w-[20%]"
        >
        <FontAwesomeIcon
            icon={faSearch}
            className={`text-xl p-3 rounded-full text-gray-600 bg-gray-200 cursor-pointer`}
        />
        </button>
    </div>

    <img
        src={weatherData?.icon}
        alt="Weather Icon"
        className="my-4 mx-auto"
    />
    <p className="text-7xl">{weatherData?.temperature}</p>
    <p className="text-4xl">{weatherData?.location}</p>

    <div className="flex justify-between mt-20 w-full">
        <div className="flex flex-col items-center sm:items-start sm:flex-row gap-3">
        <img
            src={humidity_icon}
            alt="humidity-icon"
            className="w-8 h-8 object-contain"
        />
        <div className="flex flex-col items-center sm:items-start sm:-mt-1">
            <p className="text-3xl">{weatherData?.humidity}</p>
            <span>Humidity</span>
        </div>
        </div>

        <div className="flex flex-col items-center sm:items-start sm:flex-row gap-3">
        <img
            src={wind_icon}
            alt="wind-icon"
            className="w-8 h-8 object-contain"
        />
        <div className="flex flex-col items-center sm:items-start sm:-mt-1">
            <p className="text-3xl">{weatherData?.windSpeed} Km/h</p>
            <span>Wind speed</span>
        </div>
        </div>
    </div>
    </>
);

};

export default Weather;

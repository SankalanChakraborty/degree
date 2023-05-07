import React from "react";
import "./SearchBar.css";
import { useState } from "react";

const Search = () => {
  const [inputText, setInputText] = useState("");
  const [weather, setWeather] = useState({});

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const weekDays = [
    "Sunday",
    "Monday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const dateObj = new Date();
  console.log(dateObj);
  const weekDay = weekDays[dateObj.getDay()];
  console.log(weekDay);
  const todaysDate = dateObj.getDate();
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  const api = {
    API_KEY: process.env.REACT_APP_API_KEY,
    BASE_URI: "https://api.openweathermap.org/data/2.5/",
  };

  const iconURL = "https://openweathermap.org/img/wn/";

  function doSearch(evt) {
    if (evt.code === "Enter") {
      if (inputText !== "") {
        setInputText("");
        fetch(
          `${api.BASE_URI}weather?q=${inputText}&units=metric&APPID=${api.API_KEY}`
        )
          .then((res) => res.json())
          .then((result) => {
            setWeather(result);
            console.log(weather);
          })
          .catch((error) => {
            console.error("City not found ! ", error);
          });
      }
    }
  }

  return (
    <div className="app-div">
      <div className="result-div">
        {typeof weather.main !== "undefined" ? (
          <>
            {/*eslint-disable-next-line*/}
            <span className="temp-value">
              {/*eslint-disable-next-line*/}
              {Math.round(weather.main.temp) + "°" + "C"}{" "}
              <img
                src={`${iconURL}${weather.weather[0].icon}@2x.png`}
                alt={`${weather.weather[0].main}`}
              />
            </span>
            <h4 className="loc">
              {weather.name + ", "}
              {weather.sys.country}
            </h4>
          </>
        ) : (
          <>
            <h3>{`${weekDay}, ${month} ${todaysDate}, ${year}`}</h3>
            <span className="intro-span">
              Search for places to get weather info
            </span>
          </>
        )}
      </div>
      <div className="search">
        <input
          type="text"
          value={inputText}
          placeholder="Search..."
          onChange={(e) => {
            setInputText(e.target.value);
          }}
          onKeyDown={(evt) => {
            doSearch(evt);
          }}
        />
        {typeof weather.main !== "undefined" ? (
          <>
            <span className="temp-icon">
              <img
                src={`${iconURL}${weather.weather[0].icon}@2x.png`}
                alt={`${weather.weather[0].main}`}
              />
            </span>
            <h1 className="temp-desc">{weather.weather[0].main}</h1>
            <hr className="separator" />
            <table className="weather-info">
              <tbody>
                <tr>
                  <td className="weather-info-heading">Temperature</td>
                  {/*eslint-disable-next-line*/}
                  <td className="weather-info-value">
                    {/*eslint-disable-next-line*/}
                    {Math.round(weather.main.temp) + "°" + "C  "}(Approx.)
                  </td>
                </tr>

                <tr>
                  <td className="weather-info-heading">Humidity</td>
                  <td className="weather-info-value">
                    {weather.main.humidity}%
                  </td>
                </tr>

                <tr>
                  <td className="weather-info-heading">Visibility</td>
                  <td className="weather-info-value">
                    {weather.visibility} mi.
                  </td>
                </tr>

                <tr>
                  <td className="weather-info-heading">Windspeed</td>
                  <td className="weather-info-value">
                    {weather.wind.speed} km/h
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Search;

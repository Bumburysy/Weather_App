import React from 'react';
import '../styles/WeatherElement.css';
import { getWeatherIcon, decodeWindDirection } from './Decoder.js';

//Zamiana daty na dzień tygodnia
const getDayOfWeek = (dateString) => {
    const days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
    const date = new Date(dateString);
    return days[date.getDay()];
};

//Element pogody dla jednego dnia tygodnia
function ForecastDay({ date, weatherCode, maxTemp, minTemp, windSpeed, windDirection }) {
  const [themeClass, icon, description] = getWeatherIcon(weatherCode);
    return (
        <div className={`weather-element ${themeClass}`}>
            <p>{getDayOfWeek(date)} {new Date(date).toLocaleDateString()}</p>
            <img src={`/assets/${icon}`} alt="Weather Icon" className="weather-icon"/>
            <p>{description}</p>
            <p>Od {minTemp}°C do {maxTemp}°C</p>
            <p>Wiatr: {windSpeed} km/h {decodeWindDirection(windDirection)}</p>
        </div>
    );
}

export default ForecastDay;

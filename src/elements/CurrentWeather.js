import React, { useState, useEffect } from 'react';
import '../styles/WeatherElement.css'
import { fetchCurrentWeather } from './WeatherService';
import { getWeatherIcon, decodeWindDirection } from './Decoder.js';

//Obsługa wyświetlnia aktualnej pogody.
function CurrentWeather({city, country, latitude, longitude }) {
    const [currentWeather, setCurrentWeather] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const weatherData = await fetchCurrentWeather(latitude, longitude);
                setCurrentWeather(weatherData);
            } catch (error) {
                console.error("Błąd przy pobieraniu danych o pogodzie:", error);
            }
        };
        
        if (latitude && longitude) {
            fetchData();
        }
    }, [latitude, longitude]);

    if (!currentWeather) {
        return <p>Ładowanie danych pogodowych...</p>;
    }

    const [themeClass, icon, description] = getWeatherIcon(currentWeather.weather_code);

    return (
        <div className={`weather-element ${themeClass}`}>
            <p>Aktualnie</p>
            <img src={`/assets/${icon}`} alt="Weather Icon" className="weather-icon"/>
            <p>{description}</p>
            <p>{currentWeather.temperature}°C</p>
            <p>Wilgotność: {currentWeather.humidity}%</p>
            <p>Wiatr: {currentWeather.windSpeed} km/h {decodeWindDirection(currentWeather.windDirection)}</p>
        </div>
    );
}

export default CurrentWeather;
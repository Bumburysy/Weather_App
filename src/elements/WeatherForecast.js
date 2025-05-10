import React, { useState, useEffect } from 'react';
import ForecastDay from './ForecastDay';
import '../styles/WeatherForecast.css';
import { fetchWeatherForecast } from './WeatherService';

//Obsługa wyświetlania 7-dniowej prognozy pogody.
function WeatherForecast({ latitude, longitude }) {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const dailyData = await fetchWeatherForecast(latitude, longitude);
              setForecast(dailyData);
          } catch (error) {
              console.error("Błąd przy pobieraniu danych o pogodzie:", error);
          }
      };

      if (latitude && longitude) {
          fetchData();
      }
  }, [latitude, longitude]);

  if (forecast.length === 0) {
      return <p>Ładowanie prognozy...</p>;
  }

  return (
      <div className="weather-forecast">
          <h2>Prognoza Tygodniowa</h2>
          <div className="forecast-grid">
              {forecast.map((day) => (
                  <ForecastDay
                      key={day.date}
                      date={day.date}
                      weatherCode={day.weatherCode}
                      maxTemp={day.temperatureMax}
                      minTemp={day.temperatureMin}
                      windSpeed={day.windSpeed}
                      windDirection={day.windDirection}
                  />
              ))}
          </div>
      </div>
  );
}

export default WeatherForecast;

//Obsługa pobierania danych pogodowych z API dla obecnej pogody.
export const fetchCurrentWeather = async (latitude, longitude) => {
    const API_URL = "https://api.open-meteo.com/v1/forecast";
    const params = new URLSearchParams({
        latitude,
        longitude,
        current: "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m",
    });

    try {
        const response = await fetch(`${API_URL}?${params}`);
        if (!response.ok) {
            throw new Error("Nie udało się pobrać danych o pogodzie");
        }
        const data = await response.json();
        return {
            temperature: data.current.temperature_2m,
            humidity: data.current.relative_humidity_2m,
            weather_code: data.current.weather_code,
            windSpeed: data.current.wind_speed_10m,
            windDirection: data.current.wind_direction_10m,
        };
    } catch (error) {
        console.error("Błąd przy pobieraniu danych pogodowych:", error);
        throw error;
    }
};

//Obsługa pobierania danych pogodowych z API dla 7-dniowej prognozy pogody.
export const fetchWeatherForecast = async (latitude, longitude) => {
    const API_URL = "https://api.open-meteo.com/v1/forecast";
    const params = new URLSearchParams({
        latitude,
        longitude,
        daily: "weather_code,temperature_2m_max,temperature_2m_min,windspeed_10m_max,winddirection_10m_dominant",
        timezone: "auto",
    });

    try {
        const response = await fetch(`${API_URL}?${params}`);
        if (!response.ok) {
            throw new Error("Nie udało się pobrać prognozy pogodowej");
        }

        const data = await response.json();
        const { time, weather_code, temperature_2m_max, temperature_2m_min, windspeed_10m_max, winddirection_10m_dominant } = data.daily;

        return time.map((date, index) => ({
            date,
            weatherCode: weather_code[index],
            temperatureMax: temperature_2m_max[index],
            temperatureMin: temperature_2m_min[index],
            windSpeed: windspeed_10m_max[index],
            windDirection: winddirection_10m_dominant[index],
        }));
    } catch (error) {
        console.error("Błąd przy pobieraniu prognozy pogodowej:", error);
        throw error;
    }
};

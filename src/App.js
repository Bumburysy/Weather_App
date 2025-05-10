import React, { useState } from 'react';
import './styles/App.css';
import SearchBar from './elements/SearchBar';
import Clock from './elements/Clock';
import CurrentWeather from './elements/CurrentWeather';
import WeatherForecast from './elements/WeatherForecast';
import {fetchCoordinates} from './elements/GeocodingService';


//Główny komponent aplikacji.
function App(){
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [theme, setTheme] = useState('dark');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    //Przełącznie trybu wyświetlania ciemny/jasny.
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    //Obsługa wyszukiwania lokalizacji.
    const handleSearch = async (newLocation) => {
        try {
            const { latitude, longitude, name, country } = await fetchCoordinates(newLocation);
            setCity(name);
            setCountry(country);
            setLatitude(latitude);
            setLongitude(longitude);
        } catch (error) {
            console.error("Błąd przy pobieraniu danych o pogodzie:", error);
            alert("Nie udało się pobrać danych pogodowych. Spróbuj ponownie.");
        }
    };

    return (
        <div className={`app ${theme}`}>
            <header className="app-header">
                <Clock />
                <div className="theme-buttons">
                    <button className="button" onClick={() => toggleTheme('light')}>💡</button>
                </div>
            </header>
            
            <main className={`app-content ${theme}`}>
                <div className="app-main-text">
                    <h1>Aplikacja Pogodowa</h1>
                </div>
                <SearchBar onSearch={handleSearch}/>
                {latitude && longitude && (
                    <>
                        <div className="app-main-text">
                            <h2>Prognoza Pogody: {city} {country}</h2>
                        </div>
                        <CurrentWeather city={city} country={country} latitude={latitude} longitude={longitude} />
                        <WeatherForecast latitude={latitude} longitude={longitude} />
                    </>
                )}
            </main>

            <footer className="app-footer">
                <p>Copyright © 2025 Weather App</p>
                <p>Autor: Michał N IO2 AMIW 2024/2025</p>
                <p>Źródło ikon: <a href='https://icons8.com/icon/set/weather/color'>Icons8</a></p>
                <p>Bazowane na API: <a href='https://open-meteo.com/'>Open Meteo</a></p>
            </footer>
        </div>
    )
};

export default App;

/*
- Wykorzystanie otwartego api z prognozą pogody - przykład: https://open-meteo.com/
- Aplikacja powinna prezentować aktualną prognozę pogody dla wybranego miejsca na świecie.
- Informacje o aktualnej pogodzie: temperatura, wilgotność, prędkość i kierunek wiatru oraz ikona symbolizująca warunki atmosferyczne
- Informacje o prognozie na 7 najbliższych dni: temperatura max/min, prędkość wiatru (średnia albo maksymalna), przeważający kierunek wiatru oraz ikona symbolizująca warunki atmosferyczne
- Pobieranie danych z API odbywa się w sposób nieblokujący (asynchroniczny)
- Informacje o teraźniejszej pogodnie stanowią osoby komponent podobnie jak każdy dzień w prognozie pogody stanowi osobny komponent ReactJS
- Należy również zwrócić uwagę na aspekt wizualny aplikacji - komponenty powinny być odgraniczone, teksty czytelne, istotne informacje odpowiednio wyeksponowane
- Strona powinna być również responsywna (co najmniej dostosowywać się do szerokości okna)
- Dodatkowa opcja to zmiana koloru / obrazu tła w zależności od dzisiejszej pogody
*/
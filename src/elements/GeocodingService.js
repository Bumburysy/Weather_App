const GEOCODING_API_URL = "https://geocoding-api.open-meteo.com/v1/search";

//Obsługa konwersji lokalizacji z wartości słownej na koordynaty.
export const fetchCoordinates = async (location) => {
    const params = new URLSearchParams({ name: location });

    try {
        const response = await fetch(`${GEOCODING_API_URL}?${params}`);
        if (!response.ok) {
            throw new Error("Błąd przy pobieraniu danych geolokalizacyjncych:");
        }

        const data = await response.json();
        if (!data.results || data.results.length === 0) {
            throw new Error("Nie znaleziona danych dla podanej lokalizacji");
        }

        const { latitude, longitude, name, country } = data.results[0];
        return { latitude, longitude, name, country };
    } catch (error) {
        console.error("Błąd przy pobieraniu koordynatów:", error);
        throw error;
    }
};
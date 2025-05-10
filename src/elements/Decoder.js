//Zamiana kierunku wiatru podanego w stopniach na wartość słowną.
export const decodeWindDirection = (degrees) => {
    switch (true) {
        case (degrees >= 337.5 || degrees < 22.5):
            return 'N';
        case (degrees >= 22.5 && degrees < 67.5):
            return 'NE';
        case (degrees >= 67.5 && degrees < 112.5):
            return 'E';
        case (degrees >= 112.5 && degrees < 157.5):
            return 'SE';
        case (degrees >= 157.5 && degrees < 202.5):
            return 'S';
        case (degrees >= 202.5 && degrees < 247.5):
            return 'SW';
        case (degrees >= 247.5 && degrees < 292.5):
            return 'W';
        case (degrees >= 292.5 && degrees < 337.5):
            return 'NW';
        default:
            return 'Unknown';
    }
};

//Zdekodowanie kodu pogody z API do wartości słownej - zwrócenie wartości dla tła, ikony pogody oraz opisu.
export const getWeatherIcon = (Code) => {
    switch (Code) {
        case 0:
            return ["sunny", "sunny.png", "Słonecznie"];
        case 1:
        case 2:
        case 3:
            return ["partly-cloudy", "partly_cloudy.png", "Częściowe Zachmurzenie"];
        case 45:
        case 48:
            return ["fog", "fog.png", "Mgła"];
        case 51:
        case 53:
        case 55:
            return ["drizzle", "drizzle.png", "Mżawka"];
        case 56:
        case 57:
            return ["freezing-rain", "freezing_rain.png", "Marznąca Mżawka"];
        case 61:
        case 63:
        case 65:
            return ["rain", "rain.png", "Deszcz"];
        case 66:
        case 67:
            return ["freezing-rain", "freezing_rain.png", "Marznący Deszcz"];
        case 71:
        case 73:
        case 75:
            return ["snow", "snow.png", "Śnieg"];
        case 77:  
            return ["snow-grains", "snow-grains.png", "Drobny Śnieg"];
        case 80:
        case 81:
        case 82:
            return ["heavy-rain", "heavy_rain.png", "Intensywny Deszcz"];
        case 85:
        case 86:
            return ["snow-showers", "snow-showers.png", "Przelotny Śnieg"];
        case 95:
            return ["thunderstorm", "thunderstorm.png", "Burza"];
        case 96:
        case 99:
            return ["thunderstorm-hail", "thunderstorm_hail.png", "Burza z Gradem"];
        default:
            return ["unknown", "unknown.png", "Nieznana Pogoda"];
    }
};
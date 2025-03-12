export const getWeatherIcon = (code: number): string => {
    // Sunny
    if (code === 0 || code === 1) {
        return "sunny-icon";  // Sunny
    }

    // Cloudy
    if (code === 2) {
        return "partly-cloudy-icon";  // Cloudy
    }

    if (code === 3) {
        return "cloudy-icon";  // Cloudy
    }

    if (code >= 50 && code <= 59) {
        return "drizzle-icon";  // Drizzle
    }

    // Rain (non-freezing and freezing)
    if (code >= 60 && code <= 69 || code >= 80 && code <= 82) {
        return "rain-icon";  // Rain
    }

    // Snow (general and specific fall)
    if (code >= 70 && code <= 71) {
        return "snow-light-icon";  // Snow
    }

    if (code >= 72 && code <= 73) {
        return "snow-intermediate-icon";  // Snow
    }
    if ((code >= 74 && code <= 78) || (code >= 85 && code <= 86)) {
        return "snow-icon";  // Snow
    }

    if (code >= 83 && code <= 84) {
        return "rain-snow-icon";
    }

    if (code >= 87 && code <= 90 || code === 79 ) {
        return "hail-icon";
    }

    // Thunderstorm (all levels)
    if (code >= 91 && code <= 99 || code == 29) {
        return "thunderstorm-icon"; 
    }

    // Fog and Ice Fog
    if (code >= 40 && code <= 49) {
        return "fog-icon";  // Fog or Ice Fog
    }

    // Dust, Haze, and Sandstorms
    if (code >= 4 && code <= 9) {
        return "dust-icon";  // Dust, Haze, Sandstorm
    }

    // Other Precipitation and Mixed Conditions
    if (code === 23 || code === 25 || code === 26 || code === 27 || code === 28) {
        return "precipitation-icon";  // Mixed Precipitation or Showers
    }

    // Default: Unknown weather
    return "default-icon";  // Default icon for undefined weather
};

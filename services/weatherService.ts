
interface WeatherData {
  temperature: number;
  weatherCode: number;
  weatherDescription: string;
}

const WEATHER_CODES: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  71: 'Slight snow',
  73: 'Moderate snow',
  75: 'Heavy snow',
  77: 'Snow grains',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with hail',
  99: 'Thunderstorm with heavy hail',
};

const LOCATIONS: Record<string, { lat: number; lon: number }> = {
  'Tokyo': { lat: 35.6895, lon: 139.6917 },
  'Takasaki': { lat: 36.3220, lon: 139.0033 },
  'Niigata (Snow)': { lat: 36.9360, lon: 138.8110 }, // Yuzawa
  'Gunma': { lat: 36.3220, lon: 139.0033 },
  'Narita': { lat: 35.7719, lon: 140.3929 },
  'Seoul / Seongsu': { lat: 37.5665, lon: 126.9780 },
  'Seoul / Incheon': { lat: 37.4563, lon: 126.7052 },
  'Japan': { lat: 35.6895, lon: 139.6917 }, // Default to Tokyo
};

export const fetchWeather = async (locationName: string): Promise<WeatherData | null> => {
  const coords = LOCATIONS[locationName] || LOCATIONS['Tokyo'];
  
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,weather_code&timezone=auto`
    );
    const data = await response.json();
    
    if (!data.current) return null;

    return {
      temperature: data.current.temperature_2m,
      weatherCode: data.current.weather_code,
      weatherDescription: WEATHER_CODES[data.current.weather_code] || 'Unknown',
    };
  } catch (error) {
    console.error("Failed to fetch weather data", error);
    return null;
  }
};

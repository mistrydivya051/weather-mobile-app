import ForecastCard from "@/components/ForecastCard";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import { ForecastData, WeatherData } from "@/types/weatherApi";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// OpenWeather API key
const API_KEY = "98490e32cf1654ab53e6eeefcd477fde";

// Base API URL
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export default function WeatherScreen() {
  const [city, setCity] = useState("Toronto"); // set default city
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch current weather and forecast data
  const fetchAllWeather = async (cityName: string) => {
    try {
      setLoading(true);
      setCity(cityName);

      // get current weather
      const weatherResponse = await fetch(
        `${BASE_URL}/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const weatherData: WeatherData = await weatherResponse.json();
      setWeather(weatherData); // set current weather

      // get 5 day forecast
      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const forecastData = await forecastResponse.json();

      // Pick one forecast per day (every 24 hours)
      const dailyForecast = forecastData.list.filter(
        (_: ForecastData, index: number) => index % 8 === 0
      );

      setForecast(dailyForecast); //  set forecast data
    } catch (error) {
      console.log("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  // default lod weather "Toronto"
  useEffect(() => {
    fetchAllWeather("Toronto");
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Weather Forecast</Text>
        <Text style={styles.subtitle}>{city}</Text>

        <SearchBar onSearch={fetchAllWeather} />

        {loading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" />
          </View>
        )}

        {!loading && weather && <WeatherCard data={weather} />}

        {!loading && forecast.length > 0 && (
          <View style={styles.forecastSection}>
            <Text style={styles.forecastTitle}>5-Day Forecast</Text>

            {forecast.map((item, index) => (
              <ForecastCard key={index} item={item} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#020617",
  },
  container: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#ffffff",
  },
  subtitle: {
    fontSize: 14,
    color: "#cbd5f5",
    marginBottom: 15,
  },
  loader: {
    marginVertical: 20,
    alignItems: "center",
  },
  forecastSection: {
    marginTop: 20,
  },
  forecastTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 8,
  },
});

import { ForecastData } from "@/types/weatherApi";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

// props for forecast card component
interface Props {
  item: ForecastData; // forecast data item
}

export default function ForecastCard({ item }: Props) {
  const date = new Date(item.dt_txt); // parse date from forecast data

  return (
    <View style={styles.card}>
        <Text style={styles.date}>
                {date.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
        </Text>
      <Text style={styles.day}>
        {date.toLocaleDateString("en-US", { weekday: "short" })}
      </Text>


    {/* weather icon */}
      <Image
        source={{
          uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
        }} style={styles.icon}
      />

        {/* weather details */}
      <Text style={styles.temp}>
        {Math.round(item.main.temp)}°C
      </Text>

      <Text style={styles.desc}>
        {item.weather[0].description}
      </Text>

      <Text style={styles.info}>
        Humidity: {item.main.humidity}%
      </Text>

      <Text style={styles.info}>
        Wind: {item.wind.speed} m/s
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1e293b",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  date: {
  fontSize: 13,
  color: "#cbd5f5",
  marginBottom: 5,
},
  day: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  icon: {
    width: 50,
    height: 50,
    marginVertical: 5,
  },
  temp: {
    fontSize: 24,
    fontWeight: "600",
    color: "#38bdf8",
  },
  desc: {
    fontSize: 13,
    color: "#e5e7eb",
    textTransform: "capitalize",
  },
  info: {
    fontSize: 12,
    color: "#cbd5f5",
  },
});
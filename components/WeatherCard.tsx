import { WeatherData } from "@/types/weatherApi";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";


// props for weather card component
interface Props {
  data: WeatherData; 
}

export default function WeatherCard({ data }: Props) {
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  // display current date
  const today = new Date();

  return (
    <View style={styles.card}>
      <Text style={styles.date}>
        {today.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </Text>
      <Text style={styles.day}>
              {today.toLocaleDateString("en-US", { weekday: "short" })}
            </Text>
      <Text style={styles.city}>{data.name}</Text>

      <Image source={{ uri: iconUrl }} style={styles.icon} />

        {/* weather details */}
      <Text style={styles.temp}>
        {Math.round(data.main.temp)}°C
      </Text>

      <Text style={styles.desc}>
        {data.weather[0].description}
      </Text>

      <Text style={styles.info}>
        Humidity: {data.main.humidity}%
      </Text>
      <Text style={styles.info}>
        Wind: {data.wind.speed} m/s
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
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
  city: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  icon: {
    width: 90,
    height: 90,
  },
  temp: {
    fontSize: 32,
    fontWeight: "600",
    color: "#38bdf8",
  },
  desc: {
    fontSize: 14,
    color: "#e5e7eb",
    textTransform: "capitalize",
    marginBottom: 8,
  },
  info: {
    fontSize: 13,
    color: "#cbd5f5",
  },
});


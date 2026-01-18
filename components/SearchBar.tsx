import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

// props for search bar component
interface Props {
  onSearch: (city: string) => void; // function to handle search action
}

export default function SearchBar({ onSearch }: Props) {
  const [city, setCity] = useState<string>("");

  return (
    <View style={styles.row}>
      <TextInput
        placeholder="Search city..."
        value={city}
        onChangeText={setCity}
        style={styles.input}
      />
      <Button
  title="Search"
  onPress={() => city && onSearch(city)}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    marginRight: 10,
    borderRadius: 8,
  },
});





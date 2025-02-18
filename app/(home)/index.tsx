import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Ikonkalar uchun

type Sections = {
  id: string;
  title: string;
  icon: string;
};

// Bo‘limlar ro‘yxati
const sections: Sections[] = [
  { id: "1", title: "O'quv reja", icon: "book-outline" },
  { id: "2", title: "Dars jadvali", icon: "calendar-outline" },
  { id: "3", title: "Nazorat jadvali", icon: "clipboard-outline" },
  { id: "4", title: "Fan tanlovi", icon: "options-outline" },
  { id: "5", title: "Fanlar resurslari", icon: "library-outline" },
  { id: "6", title: "Unilibrary", icon: "school-outline" },
  { id: "7", title: "O'quv faoliyati", icon: "bar-chart-outline" },
  { id: "8", title: "Davomat", icon: "people-outline" },
  { id: "9", title: "O'zlashtirish", icon: "checkmark-circle-outline" },
  { id: "10", title: "Reyting daftarcha", icon: "podium-outline" },
  { id: "11", title: "Imtihonlar", icon: "document-text-outline" },
  { id: "12", title: "Bitiruv ishi", icon: "medal-outline" },
];

// Har bir element uchun Card
const ListItem = ({ item }: { item: { title: string; icon: string } }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => alert(`${item.title} bo‘limi tanlandi!`)}
    >
      <Ionicons
        name={
          item.icon as
            | "book-outline"
            | "calendar-outline"
            | "clipboard-outline"
            | "options-outline"
            | "library-outline"
            | "school-outline"
            | "bar-chart-outline"
            | "people-outline"
            | "checkmark-circle-outline"
        }
        size={28}
        color="#007bff"
        style={styles.icon}
      />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );
};

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bosh Sahifa</Text>
      <FlatList
        data={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ListItem item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

// 🌟 Stil
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginRight: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },
});

export default HomeScreen;

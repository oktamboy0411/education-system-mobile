import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import auth from "@react-native-firebase/auth";

const Home = () => {
  const signOutUser = async () => {
    try {
      await auth().signOut();
      alert("Muvaffaqiyatli chiqdingiz!");
    } catch (error) {
      alert("Xatolik yuz berdi: ");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bosh Sahifa</Text>
      <TouchableOpacity style={styles.button} onPress={signOutUser}>
        <Text style={styles.buttonText}>Chiqish</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
    justifyContent: "center", // UI markazlash uchun
    alignItems: "center",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Home;

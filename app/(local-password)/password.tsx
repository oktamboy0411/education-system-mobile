import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AsyncStorageUserFunctions from "@/utils/AsyncStorage";

const LocalPasswordScreen = ({ navigation }: any) => {
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [savedPassword, setSavedPassword] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const loadUserData = async () => {
      const storedUserId = await AsyncStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
        const user = await AsyncStorageUserFunctions.getUserById(storedUserId);
        if (user) {
          setSavedPassword(user.password);
        }
      }
    };

    loadUserData();
  }, []);

  const handleLogin = async () => {
    if (password === savedPassword) {
      Alert.alert("Tizimga kirdingiz!");
      navigation.navigate("Home");
    } else {
      Alert.alert("Xatolik!", "Parol noto‘g‘ri!");
    }
  };

  const handleChangePassword = async () => {
    if (!newPassword) {
      Alert.alert("Xatolik", "Yangi parolni kiriting!");
      return;
    }

    if (userId) {
      await AsyncStorageUserFunctions.updatePasswordById(userId, newPassword);
      setSavedPassword(newPassword);
      Alert.alert("Muvaffaqiyatli!", "Parolingiz yangilandi!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tizimga kirish</Text>

      <TextInput
        style={styles.input}
        placeholder="Parolni kiriting"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Kirish</Text>
      </TouchableOpacity>

      <Text style={styles.forgotText}>Parolni unutdingizmi?</Text>
      <TextInput
        style={styles.input}
        placeholder="Yangi parol"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Parolni yangilash</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  forgotText: {
    marginTop: 10,
    fontSize: 14,
    color: "#888",
  },
});

export default LocalPasswordScreen;

import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorageUserFunctions from "@/utils/AsyncStorage";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "expo-router";

const LocalPasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [savedPassword, setSavedPassword] = useState<string | null>(null);
  const userId = useAuthStore((state) => state.userId);
  const router = useRouter();

  useEffect(() => {
    if (!userId) {
      router.replace("/(auth)");
      return;
    }

    const loadUserData = async () => {
      try {
        const localPassword = await AsyncStorageUserFunctions.getLocalPassword(userId);
        if (localPassword) {
          setSavedPassword(localPassword);
        } else {
          router.replace("/(home)"); 
        }
      } catch (error) {
        console.error("Xatolik:", error);
        Alert.alert("Xatolik", "Foydalanuvchi ma'lumotlarini olishda muammo yuz berdi.");
      }
    };

    loadUserData();
  }, [userId]);

  const handleLogin = () => {
    if (savedPassword === null) {
      Alert.alert("Xatolik", "Parolni yuklashda muammo yuz berdi!");
      return;
    }

    if (password === savedPassword) {
      Alert.alert("Tizimga kirdingiz!");
      router.replace("/(home)");
    } else {
      Alert.alert("Xatolik!", "Parol noto‘g‘ri!");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Tizimga kirish
      </Text>

      <TextInput
        style={{
          width: "80%",
          padding: 12,
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 8,
          marginBottom: 20,
          backgroundColor: "#fff",
        }}
        placeholder="Parolni kiriting"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={{
          backgroundColor: "#007bff",
          padding: 12,
          borderRadius: 8,
        }}
        onPress={handleLogin}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>Kirish</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocalPasswordScreen;

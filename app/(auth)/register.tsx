import { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  TextInput,
  Button,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import AsyncStorageUserFunctions from "@/utils/AsyncStorage";

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Xatolik", "Iltimos, barcha maydonlarni to‘ldiring.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Xatolik", "Parollar mos kelmadi.");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      AsyncStorageUserFunctions.saveUser({ email, password });
      router.replace("/(home)");
    } catch (error: any) {
      Alert.alert("Ro‘yxatdan o‘tishda xatolik:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Ro‘yxatdan o‘tish
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
        }}
      />

      <TextInput
        placeholder="Parol"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
        }}
      />

      <TextInput
        placeholder="Parolni tasdiqlash"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
        }}
      />

      <Button
        title={loading ? "Ro‘yxatdan o‘tish..." : "Ro‘yxatdan o‘tish"}
        onPress={handleRegister}
        disabled={loading}
      />

      <TouchableOpacity onPress={() => router.push("/(auth)")}>
        <Text style={{ textAlign: "center", marginTop: 15, color: "blue" }}>
          Tizimga kirish
        </Text>
      </TouchableOpacity>
    </View>
  );
}

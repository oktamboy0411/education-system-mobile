import { useRouter } from "expo-router";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import {
  View,
  TextInput,
  Button,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";
import AsyncStorageUserFunctions from "@/utils/AsyncStorage";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Xatolik", "Iltimos, email va parolni kiriting.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      AsyncStorageUserFunctions.saveUser({ email, password });
      router.replace("/(home)");
    } catch (error: any) {
      Alert.alert("Kirishda xatolik:", error.message);
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
        Tizimga kirish
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

      <Button
        title={loading ? "Kirish..." : "Kirish"}
        onPress={handleLogin}
        disabled={loading}
      />

      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={{ textAlign: "center", marginTop: 15, color: "blue" }}>
          Ro‘yxatdan o‘tish
        </Text>
      </TouchableOpacity>
    </View>
  );
}

import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorageUserFunctions, { UserTypes } from "@/utils/AsyncStorage";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useRouter } from "expo-router";
import useAuthStore from "@/store/useAuthStore";

function UserListPage() {
  const [users, setUsers] = useState<UserTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const setUserId = useAuthStore((state) => state.setUserId);
  const router = useRouter();

  const fetchUsers = async () => {
    const storedUsers = await AsyncStorageUserFunctions.getUsers();
    setUsers(storedUsers);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogin = useCallback(
    async (email: string, password: string, id: string) => {
      const netInfo = await NetInfo.fetch();

      if (!netInfo.isConnected) {
        Alert.alert(
          "Internet xatosi",
          "Tarmoq mavjud emas, qayta urinib ko‘ring."
        );
        return;
      }

      try {
        await signInWithEmailAndPassword(auth, email, password);
        setUserId(id);
        router.push("/password");
      } catch (error) {
        Alert.alert(
          "Xatolik",
          "Foydalanuvchi topilmadi yoki parol noto‘g‘ri. Foydalanuvchini o‘chirishni xohlaysizmi?",
          [
            {
              text: "Yo‘q",
              style: "destructive",
            },
            {
              text: "Ha",
              onPress: async () => {
                await AsyncStorageUserFunctions.deleteUserById(id);
                setUsers((prevUsers) =>
                  prevUsers.filter((user) => user.id !== id)
                );
              },
            },
          ]
        );
      }
    },
    [setUserId, router]
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ padding: 15, borderBottomWidth: 1, borderColor: "#ccc" }}
            onPress={() => handleLogin(item.email, item.password, item.id)}
          >
            <Text>{item.email}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default UserListPage;

import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorageUserFunctions, { UserTypes } from "@/utils/AsyncStorage";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useRouter } from "expo-router";

function UserListPage() {
  const [users, setUsers] = useState<UserTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const storedUsers = await AsyncStorageUserFunctions.getUsers();
      setUsers(storedUsers);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleLogin = async (email: string, password: string, id: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/password");
    } catch (error) {
      Alert.alert("Error", "User does not exist or incorrect password");
      handleDeleteUser(id);
      if (users.length == 0) {
        router.replace("/(auth)");
      }
    }
  };

  const handleDeleteUser = async (id: string) => {
    await AsyncStorageUserFunctions.deleteUserById(id);
    setUsers(users.filter((user) => user.id !== id));
  };

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
        keyExtractor={(item) => item.email}
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

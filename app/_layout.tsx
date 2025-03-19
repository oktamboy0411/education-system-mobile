import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import AsyncStorageUserFunctions from "@/utils/AsyncStorage";

function Layout() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const storedUser = await AsyncStorageUserFunctions.getUsers();
      if (storedUser.length !== 0) {
        router.replace("/(local-password)");
      } else {
        router.replace("/(auth)");
      }
    };

    checkUser();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(home)" />
      <Stack.Screen name="(local-password)" />
    </Stack>
  );
}

export default Layout;

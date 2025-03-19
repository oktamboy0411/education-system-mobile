import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title="Menyuni ochish"
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      <Text style={{ fontSize: 20, marginTop: 20 }}>🏠 Bosh sahifa</Text>
    </View>
  );
};

export default HomeScreen;

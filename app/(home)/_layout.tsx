import React, { Component } from "react";
import { Drawer } from "expo-router/drawer";

class HomeLayout extends Component {
  render() {
    return (
      <Drawer screenOptions={{ headerShown: true }}>
        <Drawer.Screen name="index" options={{ title: "Bosh sahifa" }} />
        <Drawer.Screen name="profile" options={{ title: "Profil" }} />
        <Drawer.Screen name="settings" options={{ title: "Sozlamalar" }} />
      </Drawer>
    );
  }
}

export default HomeLayout;

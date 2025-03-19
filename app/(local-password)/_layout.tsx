import React, { Component } from "react";
import { Stack } from "expo-router";

export class _layout extends Component {
  render() {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="password" />
      </Stack>
    );
  }
}

export default _layout;

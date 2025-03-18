import React, { Component } from "react";
import { Stack } from "expo-router";

export class _layout extends Component {
  render() {
    return (
      <Stack>
        <Stack.Screen name="index" options={{ title: "Users" }} />
        <Stack.Screen name="password" options={{ title: "Local Password" }} />
      </Stack>
    );
  }
}

export default _layout;

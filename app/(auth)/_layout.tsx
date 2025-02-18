import React, { Component } from "react";
import { Stack } from "expo-router";

export class _layout extends Component {
  render() {
    return (
      <Stack>
        <Stack.Screen name="index" options={{ title: "Login" }} />
        <Stack.Screen name="register" options={{ title: "Register" }} />
      </Stack>
    );
  }
}

export default _layout;

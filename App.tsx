import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="dodgerblue" />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </>
  );
}

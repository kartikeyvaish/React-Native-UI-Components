import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../src/HomeScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Home Screen" }}
      />
    </Stack.Navigator>
  );
}

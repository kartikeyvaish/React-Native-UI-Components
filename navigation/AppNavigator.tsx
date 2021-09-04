import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OTP_Input_Screen from "../src/OTP Input/screen/OTP_Input_Screen";
import HomeScreen from "../src/Home/HomeScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "React Native UI Components" }}
      />
      <Stack.Screen
        name="OTP_Input_Screen"
        component={OTP_Input_Screen}
        options={{ title: "OTP Input" }}
      />
    </Stack.Navigator>
  );
}

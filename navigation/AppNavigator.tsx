import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import DetailsScreen from "../src/SharedTransition/screens/DetailsScreen";
import HomeScreen from "../src/Home/HomeScreen";
import ImageViewerScreen from "../src/ImageViewer/screens/ImageViewerScreen";
import ListScreen from "../src/SharedTransition/screens/ListScreen";
import MusicPlayerScreen from "../src/MusicPlayer/screens/MusicPlayerScreen";
import OTP_Input_Screen from "../src/OTPInput/screen/OTP_Input_Screen";

const Stack = createSharedElementStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home_Screen"
        component={HomeScreen}
        options={{ title: "React Native UI Components" }}
      />
      <Stack.Screen
        name="OTP_Input_Screen"
        component={OTP_Input_Screen}
        options={{ title: "OTP Input" }}
      />
      <Stack.Screen
        name="Music_Player_Screen"
        component={MusicPlayerScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Image_Viewer_Screen"
        component={ImageViewerScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ListScreen"
        component={ListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{ headerShown: false }}
        sharedElements={(route, otherRoute, showing) => {
          const { item } = route.params;
          return [
            {
              id: `item.${item.id}.photo`,
              animation: "fade",
            },
            {
              id: `item.${item.id}.description`,
              animation: "move",
            },
          ];
          // return [`item.${item.id}.photo`, `item.${item.id}.description`];
        }}
      />
    </Stack.Navigator>
  );
}

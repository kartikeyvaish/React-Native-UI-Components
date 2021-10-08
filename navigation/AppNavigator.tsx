import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../src/Home/HomeScreen';
import OTP_Input_Screen from '../src/OTPInput/screen/OTP_Input_Screen';
import MusicPlayerScreen from '../src/MusicPlayer/screens/MusicPlayerScreen';
import YoutubeVideosScreen from '../src/Youtube/screens/YoutubeVideosScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home_Screen"
        component={HomeScreen}
        options={{ title: 'React Native UI Components' }}
      />
      <Stack.Screen
        name="OTP_Input_Screen"
        component={OTP_Input_Screen}
        options={{ title: 'OTP Input' }}
      />
      <Stack.Screen
        name="Youtube_Videos_Screen"
        component={YoutubeVideosScreen}
        options={{ title: 'Youtube' }}
      />
      <Stack.Screen
        name="Music_Player_Screen"
        component={MusicPlayerScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

import React, { useState, useEffect } from "react";
import { StatusBar, Appearance } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import AppNavigator from "./navigation/AppNavigator";
import dark from "./theme/Dark";
import light from "./theme/Light";

const defaultScheme = Appearance.getColorScheme();

export default function App() {
  const [Mode, SetMode] = useState(defaultScheme);

  // Appearance Change UseEffect
  useEffect(() => {
    Appearance.addChangeListener(onThemeChange);

    return () => Appearance.removeChangeListener(onThemeChange);
  }, []);

  // Function to execute on phone theme change
  const onThemeChange = ({ colorScheme }: any) => SetMode(colorScheme);

  return (
    <>
      <StatusBar
        barStyle={Mode === "light" ? "dark-content" : "light-content"}
        animated={true}
        showHideTransition="slide"
        backgroundColor={
          Mode === "light" ? light.colors.background : dark.colors.background
        }
      />
      <NavigationContainer theme={Mode === "dark" ? dark : light}>
        <AppNavigator />
      </NavigationContainer>
    </>
  );
}

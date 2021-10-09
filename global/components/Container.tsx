import React from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";

function Container({ style, children }: any) {
  const { colors } = useTheme();

  return (
    <View style={{ backgroundColor: colors.background, ...style }}>
      {children}
    </View>
  );
}

export default Container;

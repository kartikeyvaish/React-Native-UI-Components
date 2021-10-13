import React from "react";
import { StyleSheet, ViewStyle, Pressable } from "react-native";

type Props = {
  backgroundColor?: string;
  opacity?: number;
  zIndex?: number;
  style?: ViewStyle | ViewStyle[];
  children?: React.ReactNode;
  onPress?: () => void;
};

function ShadedView({
  backgroundColor,
  opacity = 1,
  zIndex = 1,
  style = {},
  children,
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        ...styles.container,
        backgroundColor: backgroundColor,
        opacity: opacity,
        zIndex: zIndex,
        ...style,
      }}
    >
      {children}
    </Pressable>
  );
}

export default ShadedView;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

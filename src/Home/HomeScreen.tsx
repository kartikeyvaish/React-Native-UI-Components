import React from "react";
import { View, StyleSheet } from "react-native";
import ComponentsList from "../../config/ComponentsList";

import HomeMenuCard from "./HomeMenuCard";

type Props = {
  navigation?: any;
};

function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      {ComponentsList.map((item) => (
        <HomeMenuCard
          {...item}
          key={item._id}
          onPress={() => navigation.navigate("OTP_Input_Screen")}
        />
      ))}
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "white",
  },
});

import React from "react";
import { StyleSheet } from "react-native";

import ComponentsList from "../../config/ComponentsList";
import Container from "../../global/components/Container";
import HomeMenuCard from "./HomeMenuCard";

type Props = {
  navigation?: any;
};

function HomeScreen({ navigation }: Props) {
  return (
    <Container style={styles.container}>
      {ComponentsList.map((item) => (
        <HomeMenuCard
          {...item}
          key={item._id}
          onPress={() => navigation.navigate(item.component)}
        />
      ))}
    </Container>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
});

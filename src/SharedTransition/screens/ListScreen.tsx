import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

import configs from "../config/PlaceItems";
import PlaceItemCard from "../components/PlaceItemCard";

function ListScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <FlatList
        data={configs.Places}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PlaceItemCard
            {...item}
            onPress={() => navigation.navigate("DetailsScreen", { item })}
          />
        )}
      />
    </View>
  );
}

export default ListScreen;

const styles = StyleSheet.create({
  container: {},
});

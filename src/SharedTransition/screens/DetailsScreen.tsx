import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { SharedElement } from "react-navigation-shared-element";

const ScreenWidth = Dimensions.get("window").width;

function DetailsScreen(props: any) {
  const { item } = props.route.params;

  return (
    <View>
      <SharedElement id={`item.${item.id}.photo`}>
        <FastImage
          source={{ uri: item.uri }}
          style={styles.DetailsImage}
          resizeMode="cover"
        />
      </SharedElement>
      <SharedElement id={`item.${item.id}.name`}>
        <Text style={styles.name}>{item.name}</Text>
      </SharedElement>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
}

export default DetailsScreen;

const styles = StyleSheet.create({
  DetailsImage: {
    width: ScreenWidth,
    height: 300,
    alignSelf: "center",
  },
  name: { margin: 20, fontSize: 30, fontWeight: "bold" },
  description: { margin: 20, marginTop: 0, fontSize: 20 },
});

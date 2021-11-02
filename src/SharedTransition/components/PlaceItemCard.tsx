import React from "react";
import { Dimensions, View, StyleSheet, Text, Pressable } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import FastImage from "react-native-fast-image";

type Props = {
  uri: string;
  name: string;
  description: string;
  onPress: () => void;
  id: number;
};

const ScreenWidth = Dimensions.get("window").width;
const IMAGE_SIZE = ScreenWidth * 0.25;

function PlaceItemCard({ uri, name, description, onPress, id }: Props) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <SharedElement id={`item.${id}.photo`}>
        <FastImage
          source={{ uri: uri }}
          style={{
            width: IMAGE_SIZE,
            height: IMAGE_SIZE,
            borderWidth: 1,
          }}
          resizeMode="cover"
        />
      </SharedElement>
      <View style={{ flex: 1, paddingLeft: 20 }}>
        <SharedElement id={`item.${id}.name`}>
          <Text style={styles.name}>{name}</Text>
        </SharedElement>
        <Text style={{ fontSize: 18 }}>{description}</Text>
      </View>
    </Pressable>
  );
}

export default PlaceItemCard;

const styles = StyleSheet.create({
  container: { padding: 10, flexDirection: "row" },
  name: { fontSize: 30, fontWeight: "bold" },
});

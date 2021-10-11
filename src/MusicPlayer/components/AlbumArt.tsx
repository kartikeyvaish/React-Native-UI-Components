import React from "react";
import { StyleSheet, View, Image } from "react-native";

type Props = {
  uri: string;
};

function AlbumArt({ uri }: Props) {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.AlbumArtContainer}>
        <Image source={{ uri: uri }} style={styles.AlbumArt} />
      </View>
    </View>
  );
}

export default AlbumArt;

const styles = StyleSheet.create({
  AlbumArtContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  AlbumArt: {
    width: "90%",
    height: "100%",
    borderRadius: 1,
  },
});

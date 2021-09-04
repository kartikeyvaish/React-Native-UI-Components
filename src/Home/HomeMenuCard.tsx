import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  GestureResponderEvent,
} from "react-native";

type Props = {
  navigation?: any;
  _id: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  name: string;
};

function HomeMenuCard({ _id, onPress = () => {}, name }: Props) {
  return (
    <TouchableOpacity
      key={_id}
      onPress={onPress}
      style={styles.HomeMenuCardStyle}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{name}</Text>
    </TouchableOpacity>
  );
}

export default HomeMenuCard;

const styles = StyleSheet.create({
  HomeMenuCardStyle: {
    backgroundColor: "white",
    padding: 15,
    elevation: 5,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 10,
  },
});

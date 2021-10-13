import { useTheme } from "@react-navigation/native";
import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import FastImage from "react-native-fast-image";

import ShadedView from "./ShadedView";

const ScreenWidth = Dimensions.get("screen").width;
const EachWidth = ScreenWidth / 3;

type Props = {
  uri: string;
  onPress?: () => void;
  Selected?: Boolean;
};

function ImageCard({ uri, onPress, Selected }: Props) {
  const [Loaded, SetLoaded] = useState(false);
  const { colors } = useTheme();

  const RenderImageCard = useMemo(() => {
    return (
      <FastImage
        source={{ uri }}
        style={[
          styles.Image,
          {
            borderRadius: Selected ? 10 : 3,
          },
        ]}
        onLoad={(e) => SetLoaded(true)}
      />
    );
  }, [uri, onPress, Loaded]);

  return (
    <Pressable onPress={onPress} style={styles.container}>
      {RenderImageCard}

      {Loaded === false ? (
        <ShadedView zIndex={10} backgroundColor={undefined}>
          <ActivityIndicator size="large" color={colors.text} />
        </ShadedView>
      ) : null}

      {Selected ? (
        <>
          <ShadedView
            zIndex={100}
            backgroundColor={undefined}
            onPress={onPress}
          >
            <AntDesign
              name="checkcircle"
              size={30}
              color="dodgerblue"
              style={styles.CheckIcon}
              onPress={onPress}
            />
          </ShadedView>

          <ShadedView
            backgroundColor="white"
            opacity={0.3}
            zIndex={9}
            onPress={onPress}
          />
        </>
      ) : null}
    </Pressable>
  );
}

export default ImageCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 120,
    borderColor: "white",
    borderWidth: 1,
    maxWidth: EachWidth,
  },
  Image: {
    flex: 1,
    resizeMode: "cover",
  },
  CheckIcon: {
    backgroundColor: "white",
    borderRadius: 100,
  },
});

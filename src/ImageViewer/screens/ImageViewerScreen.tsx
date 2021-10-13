import React from "react";
import { Alert, StyleSheet } from "react-native";

import configs from "../config/configs";
import ImageViewer from "../components/ImageViewer";

function ImageViewerScreen({ navigation }: any) {
  return (
    <ImageViewer
      files={configs.ImageList}
      onBackButtonPress={() => navigation.goBack()}
      onDoneButtonPress={(data) =>
        Alert.alert(`${data?.length} items selected` || "O items selected")
      }
    />
  );
}

export default ImageViewerScreen;

const styles = StyleSheet.create({
  container: {},
});

import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

type Props = {
  customHeaderComponent?: React.ReactNode;
  onBackButtonPress?: () => void;
  backButtonIconName?: any;
  showBackButton?: boolean;
  backButtonComponent?: React.ReactNode;
  backButtonColor?: string | undefined | null;
  onDoneButtonPress?: () => void;
  doneButtonIconName?: any;
  showDoneButton?: boolean;
  doneButtonComponent?: React.ReactNode;
  doneButtonColor?: string | undefined | null;
  doneButtonDisabled?: boolean | null;
  selectedLength?: number;
};

function HeaderBar({
  onBackButtonPress,
  backButtonIconName = "arrowleft",
  showBackButton = true,
  backButtonComponent = null,
  backButtonColor = null,
  onDoneButtonPress,
  doneButtonIconName = "check",
  showDoneButton = true,
  doneButtonComponent = null,
  doneButtonColor = null,
  customHeaderComponent = null,
  doneButtonDisabled = null,
  selectedLength = 0,
}: Props) {
  const { colors } = useTheme();
  let doneBtnDisablity =
    doneButtonDisabled !== null
      ? doneButtonDisabled
        ? true
        : false
      : selectedLength
      ? false
      : true;

  return customHeaderComponent ? (
    <>{customHeaderComponent}</>
  ) : (
    <View style={styles.HeaderBar}>
      <View style={styles.HeaderFirstHalfStyle}>
        {backButtonComponent ? (
          backButtonComponent
        ) : showBackButton ? (
          <AntDesign
            name={backButtonIconName}
            size={24}
            color={backButtonColor ? backButtonColor : colors.text}
            onPress={onBackButtonPress}
          />
        ) : null}
      </View>

      <View style={styles.HeaderSecondHalfStyle}>
        {doneButtonComponent ? (
          doneButtonComponent
        ) : showDoneButton ? (
          <AntDesign
            name={doneButtonIconName}
            size={24}
            color={doneButtonColor ? doneButtonColor : colors.text}
            onPress={doneBtnDisablity ? undefined : onDoneButtonPress}
            style={{ opacity: doneBtnDisablity ? 0.5 : 1 }}
          />
        ) : null}

        {selectedLength ? (
          <Text style={{ marginRight: 30 }}>{selectedLength} Selected</Text>
        ) : null}
      </View>
    </View>
  );
}

export default React.memo(HeaderBar);

const styles = StyleSheet.create({
  HeaderBar: {
    height: 50,
    paddingLeft: 12,
    flexDirection: "row",
  },
  HeaderSecondHalfStyle: {
    flex: 1,
    alignItems: "center",
    paddingLeft: 18,
    flexDirection: "row-reverse",
  },
  HeaderFirstHalfStyle: { flex: 1, justifyContent: "center" },
});

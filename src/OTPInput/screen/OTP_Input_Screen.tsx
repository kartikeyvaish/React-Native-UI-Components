import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import OTPInput from "../components/OTPInput";

function OTP_Input_Screen(props: any) {
  const [OTP, SetOTP] = useState("");

  return (
    <View style={styles.container}>
      <OTPInput onChangeText={SetOTP} value={OTP} headerTitle="Enter OTP" />
    </View>
  );
}

export default OTP_Input_Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

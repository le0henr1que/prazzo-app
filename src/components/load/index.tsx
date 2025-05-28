import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../../assets/1736101287227.json")}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFF",
  },
  animation: {
    width: width * 0.7,
    height: height * 0.7,
  },
});

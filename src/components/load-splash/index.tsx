import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import { colors } from "../../styles/colors";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function LoadSplash() {
  return (
    <View style={styles.container}>
      <View
        style={{
          width,
          height,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../../assets/default/prazologo.webp")}
          style={{ width: 146, height: 37, resizeMode: "contain" }}
        />
        <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
          <LottieView
            source={require("../../../assets/lottie/spiner-load-white.json")}
            autoPlay
            loop
            style={styles.animation}
          />
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.brand.default,
  },
  animation: {
    width: 60,
    height: 60,
  },
  safeArea: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 24,
  },
});

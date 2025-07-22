import { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import ScannerBorder from "../../assets/scannerBorder";

const ScannerWithAnimation = () => {
  const animation = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get("window").width;

  const width = 359;
  const height = 170;

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(animation, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startAnimation();
  }, [animation]);

  
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [65, -65], 
  });

  return (
    <View style={styles.container}>
      {/* Scanner Box */}
      <View style={styles.scannerBox}>
        {/* Linha animada */}
        <Animated.View
          style={[
            styles.redLine,
            {
              transform: [{ translateY }],
            },
          ]}
        />
        <ScannerBorder width={width} height={height} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scannerBox: {
    width: 359,
    height: 170,
    borderColor: "transparent",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },

  redLine: {
    position: "absolute",
    width: "90%",
    height: 2,
    backgroundColor: "red",
  },
  borderTopLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRadius: 16,
    borderColor: "#fff",
  },
  borderTopRight: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderRadius: 16,
    borderColor: "#fff",
  },
  borderBottomLeft: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRadius: 16,
    borderColor: "#fff",
  },
  borderBottomRight: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderRadius: 16,
    borderColor: "#fff",
  },
  horizontalTop: {
    position: "absolute",
    top: 0,
    width: "30%",
    height: 2,
    backgroundColor: "#fff",
  },
  horizontalBottom: {
    position: "absolute",
    bottom: 0,
    width: "30%",
    height: 2,
    backgroundColor: "#fff",
  },
});

export default ScannerWithAnimation;

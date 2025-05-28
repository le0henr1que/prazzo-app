import { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

const ScannerWithAnimation = () => {
  const animation = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get("window").width;

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

  // Interpolar o valor animado para mover a linha vermelha verticalmente
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [100, -100], // Altura dentro do retângulo (ajuste conforme necessário)
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
        {/* Contorno branco */}
        <View style={styles.borderTopLeft} />
        <View style={styles.borderTopRight} />
        <View style={styles.borderBottomLeft} />
        <View style={styles.borderBottomRight} />
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
    width: "80%",
    height: 250,
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
    borderColor: "#fff",
  },
});

export default ScannerWithAnimation;

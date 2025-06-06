import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import { colors } from "../../styles/colors";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Typography from "../text";

const { width, height } = Dimensions.get("window");

const phrases = [
  "Organizando os produtos da loja...",
  "Verificando o estoque atual...",
  "Atualizando as validades dos itens...",
  "Preparando os dados da sua loja...",
  "Otimizando a visualização do estoque...",
  "Garantindo que nada esteja vencido...",
];

export default function SwitchStoreLoad() {
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * phrases.length);
      setCurrentPhrase(phrases[randomIndex]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top"]}>
        <View style={styles.topContainer}>
          <Image
            source={require("../../../assets/default/noprazo-brand.png")}
            style={{
              resizeMode: "contain",
              marginTop: 24,
            }}
          />
        </View>
      </SafeAreaView>

      <View style={styles.middleContainer}>
        <LottieView
          source={require("../../../assets/lottie/house-animation.json")}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>

      <SafeAreaView edges={["bottom"]}>
        <View style={styles.bottomContainer}>
          <Typography variant="BASE" family="regular">
            {currentPhrase}
          </Typography>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between", // Distribui o espaço verticalmente
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    // backgroundColor: colors.brand.default,
    paddingHorizontal: 20,
  },
  topContainer: {
    width: "100%",
    alignItems: "center",
    paddingTop: 20,
  },
  middleContainer: {
    flex: 1, // Permite que este container ocupe o espaço restante no meio
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 20,
  },
  animation: {
    width: 500,
    height: 500,
  },
  phraseText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.white,
    textAlign: "center",
  },
});

import React, { useState } from "react";
import { Animated, TouchableOpacity, View, StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

const CustomSwitch = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [animatedValue] = useState(new Animated.Value(0)); // Valor animado (posição da bolinha)

  // Alterna o estado e a animação
  const toggleSwitch = () => {
    Animated.timing(animatedValue, {
      toValue: isEnabled ? 0 : 1, // Posição: 0 (desligado), 1 (ligado)
      duration: 200, // Tempo da animação
      useNativeDriver: false,
    }).start();
    setIsEnabled(!isEnabled);
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: isEnabled
            ? colors.primary["600"]
            : colors.neutral["200"],
        },
      ]}
      onPress={toggleSwitch}
    >
      <Animated.View
        style={[
          styles.thumb,
          {
            transform: [
              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [2, 20],
                }),
              },
            ],
          },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50, // Largura total do switch
    height: 28, // Altura total do switch
    borderRadius: 20, // Arredondamento total
    padding: 2, // Espaçamento interno
    justifyContent: "center",
  },
  thumb: {
    width: 24, // Tamanho da bolinha
    height: 24,
    backgroundColor: "#FFFFFF", // Cor da bolinha
    borderRadius: 12, // Deixa a bolinha redonda
    elevation: 3, // Sombra para a bolinha (opcional)
  },
});

export default CustomSwitch;

import React, { useState, useEffect } from "react";
import { Animated, TouchableOpacity, View, StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

interface CustomSwitchProps {
  value?: boolean;
  onValueChange?: (value: boolean) => void;
}

const CustomSwitch = ({ value, onValueChange }: CustomSwitchProps) => {
  const [isEnabled, setIsEnabled] = useState(value || false);
  const [animatedValue] = useState(new Animated.Value(value ? 1 : 0));

  useEffect(() => {
    if (value !== undefined) {
      setIsEnabled(value);
      Animated.timing(animatedValue, {
        toValue: value ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [value]);

  const toggleSwitch = () => {
    const newValue = !isEnabled;
    Animated.timing(animatedValue, {
      toValue: newValue ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    setIsEnabled(newValue);
    onValueChange?.(newValue);
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

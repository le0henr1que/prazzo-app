import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ColorValue,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { colors } from "../../styles/colors";
import Typography from "../text";

type ToastType = "success" | "danger" | "info" | "warning";
type IoniconName = ComponentProps<typeof Ionicons>["name"];

interface CustomToastProps {
  message: string;
  type?: ToastType;
  onHide: () => void;
}

export const CustomToast: React.FC<CustomToastProps> = ({
  message,
  type = "info",
  onHide,
}) => {
  const translateY = useRef(new Animated.Value(-80)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateIn = () => {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    };

    const animateOut = () => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -80,
          duration: 400,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => {
        onHide();
      });
    };

    animateIn();

    const timeout = setTimeout(() => {
      animateOut();
    }, 5000);

    return () => clearTimeout(timeout);
  }, [onHide]);

  const bgColors: Record<ToastType, ColorValue> = {
    success: colors.success[600],
    danger: colors.danger.dark,
    warning: colors.warning.default,
    info: colors.brand.default,
  };
  const lightBgColors: Record<ToastType, ColorValue> = {
    success: "#41af8d",
    warning: "#e29842",
    info: "#5599b5",
    danger: "#e46161",
  };
  const iconNames: Record<ToastType, IoniconName> = {
    success: "checkmark-circle",
    danger: "alert-circle",
    warning: "warning",
    info: "information-circle",
  };

  const backgroundColor = bgColors[type];
  const iconBgColor = lightBgColors[type];
  const iconName = iconNames[type];

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor,
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={[styles.iconWrapper, { backgroundColor: iconBgColor }]}>
        <Ionicons name={iconName} color="#fff" size={24} />
      </View>
      <Typography variant="SM" family="medium" style={styles.message}>
        {message}
      </Typography>
      <TouchableOpacity onPress={onHide}>
        <View style={styles.customX}>
          <View style={styles.line} />
          <View style={[styles.line, { transform: [{ rotate: "90deg" }] }]} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 999,
    flexDirection: "row",
    width: 366,
    height: 52,
    padding: 12,
    borderWidth: 1,
    borderRadius: 4,
    top: 65,
    gap: 8,
    alignItems: "center",
    borderColor: "transparent",
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    color: "#fff",
  },
  customX: {
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "45deg" }],
    left: 110,
  },
  line: {
    position: "absolute",
    width: 0.9,
    height: 16,
    backgroundColor: "#fff",
    borderRadius: 1,
  },
});

import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Typography from "../text";
import { colors } from "../../styles/colors";

export type Tab = {
  key: string;
  label: string;
};

export type TabSwitchProps = {
  tabs: Tab[];
  activeTab: string;
  onChange: (key: string) => void;
  counts?: Record<string, number>; 
};

export default function TabSwitch({ tabs, activeTab, onChange,  counts = {} }: TabSwitchProps) {

  const safeTabs = Array.isArray(tabs) ? tabs : [];

  return (
    <View style={styles.productSwitch}>
      {safeTabs.map((tab) => {
        const [isPressed, setIsPressed] = React.useState(false);
        const isActive = activeTab === tab.key;
        const count = counts[tab.key];  
        return (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.btnSwitch,
              isPressed && styles.btnPressed,
              isActive && styles.btnActive,
            ]}
            onPress={() => onChange(tab.key)}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            activeOpacity={1}
          >
            <Typography
              variant="SM"
              family={isActive ? "bold" : "medium"}
              style={[
                styles.textActive,
              ]}
            >
              {tab.label}
            </Typography>
            {typeof count === "number" && count > 0 && (
                <View style={styles.badge}>
                  <Typography variant="XS" family="bold" style={styles.badgeText}>
                    {count}
                  </Typography>
                </View>
              )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  productSwitch: {
    width: "100%",
    height: 44,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[3],
    backgroundColor: colors.white,
    color: colors.neutral[6]
  },
  btnSwitch: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    height: "100%",
    borderBottomWidth: 0,
    borderBottomColor: "transparent",
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  btnPressed: {
    backgroundColor: colors.neutral[2]
  },
  btnActive: {
    borderBottomWidth: 2,
    borderBottomColor: colors.brand.default,
     marginBottom: -2,
  },
  textActive: {
    color: colors.neutral[7],
  },
   badge: {
    backgroundColor: colors.brand.default,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: colors.white,
  },
});

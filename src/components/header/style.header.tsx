import { StyleSheet } from "react-native";

import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "100%",
    borderBottomColor: colors.neutral["200"],
    borderBottomWidth: 1,
  },
  badge: {
    position: "absolute",
    right: 0,
    top: -5,
    backgroundColor: "red",
    borderRadius: 10,
    height: 20,
    minWidth: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    zIndex: 1,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  icon: {
    width: 40,
    height: 40,
    padding: 8,
    backgroundColor: colors.neutral["100"],
    borderRadius: 22.5,
    alignItems: "center",
    display: "flex",
  },
});

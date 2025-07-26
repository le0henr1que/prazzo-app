import { colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  bodyContent: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    gap: 16,
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  header: {
    flex: 1,
    backgroundColor: colors.primary["700"],
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "stretch",
    height: 188,
  },
  textHeader: {
    flex: 1,
    width: "100%",
    gap: 28,
    justifyContent: "center",
    alignItems: "flex-start",
    textAlign: "left",
    paddingBottom: 15,
    paddingLeft: 20,
    paddingTop: 64,
    paddingRight: 20,
  },
  title: {
    color: "white",
  },
  body: {
    flex: 3,
    width: "100%",
  },
});
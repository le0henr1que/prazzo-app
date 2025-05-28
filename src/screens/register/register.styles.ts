import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
import { typography } from "../../styles/typography";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
  line: {
    flex: 1,
    backgroundColor: colors.neutral["200"],
    width: "100%",
    borderWidth: 0.2,
    opacity: 0.2,
  },
  image: {
    width: 92,
    height: 29,
    resizeMode: "contain",
  },
  header: {
    flex: 1,
    backgroundColor: colors.primary["700"],
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // resizeMode: "stretch",
  },
  textHeader: {
    flex: 1,
    width: "100%",
    gap: 24,
    justifyContent: "center",
    alignItems: "flex-start",
    textAlign: "left",
    paddingBottom: 25,
    paddingLeft: 20,
    paddingTop: 64,
    paddingRight: 20,
  },
  title: {
    color: "white",
    width: "70%",
    fontSize: 32,
    fontStyle: "normal",
    fontWeight: typography.weight.bold as any,
    lineHeight: 41.6,
  },
  body: {
    flex: 3,
    backgroundColor: "white",
    width: "100%",
  },
});

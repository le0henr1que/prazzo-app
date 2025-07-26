import { StyleSheet } from "react-native";
import { typography } from "../../styles/typography";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    flex: 1,
    backgroundColor: colors.neutral["200"],
    width: "100%",
    borderWidth: 0.2,
    opacity: 0.2,
  },
  buttonContainer: {
    padding: 20,
    width: "100%",
    gap: 20,
  },

  Image: {
    width: "100%",
    height: 570,
  },
  logo: {
    top: 80,
    position: "absolute",
    alignSelf: "center",
    width: 114,
    height: 29,
    resizeMode: "contain",
  },
  divContent: {
    flex: 1,
    position: "absolute",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    textAlign: "left",
    paddingTop: 390,
    gap: 13,
    paddingRight: 20,
    paddingBottom: 24,
    paddingLeft: 20,
  },
  primaryButton: {
    backgroundColor: "#008000",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  secondaryButton: {
    borderColor: "#008000",
    borderWidth: 2,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  secondaryButtonText: {
    color: "#008000",
    fontSize: 16,
  },
  dot: {
    backgroundColor: "rgba(0,0,0,.2)",
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: colors.primary["600"],
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  pagination: {
    bottom: 60,
    display: "flex",
    justifyContent: "flex-start",
    paddingTop: 24,
    paddingRight: 20,
    paddingBottom: 24,
    paddingLeft: 20,
  },
});

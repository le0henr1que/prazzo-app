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
    width: 98,
    height: 25,
    resizeMode: "contain",
  },
  header: {
    flex: 1,
    backgroundColor: colors.primary["700"],
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textHeader: {
    flex: 1,
    width: "100%",
    gap: 28,
    justifyContent: "center",
    alignItems: "flex-start",
    textAlign: "left",
    paddingLeft: 16,
    paddingTop: 26,
    paddingRight: 20,
    height: 188,
  },

  body: {
    flex: 3,
    backgroundColor: "white",
    width: "100%",
    height: 415,
  },
  backButton: {
    marginBottom: 5,
  },
});
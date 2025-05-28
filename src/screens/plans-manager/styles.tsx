import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  bannerContainer: {
    height: 150,
    position: "relative",
  },
  banner: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  avatarWrapper: {
    position: "absolute",
    bottom: -40,
    left: 20,
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "#fff",
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: -10,
    backgroundColor: colors.primary["500"],
    borderRadius: 20,
    padding: 5,
  },
  cameraIcon: {
    width: 20,
    height: 20,
  },
  footerButtom: {
    display: "flex",
    width: "100%",
    padding: 20,
    justifyContent: "center",
    gap: 16,
    backgroundColor: "#FFF",
    boxShadow: "0px -4px 12px 0px rgba(151, 151, 151, 0.15)",
  },
  form: {
    marginTop: 29,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: colors.neutral["600"],
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: colors.neutral["300"],
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutral["300"],
    marginVertical: 20,
  },
  button: {
    marginHorizontal: 20,
    backgroundColor: colors.primary["500"],
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});

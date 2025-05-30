import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
import { typography } from "../../styles/typography";

export const Input = StyleSheet.create({
  input: {
    width: "100%",
    display: "flex",
    height: 48,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.neutral["300"],
    fontSize: 16,
    color: colors.neutral["900"],
  },
  focusedStyle: {
    width: "100%",
    height: 48,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: colors.primary["600"],
    fontSize: typography.size.base,
    color: colors.neutral["900"],
  },
  styleError: {
    width: "100%",
    display: "flex",
    height: 48,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.danger["500"],
    backgroundColor: colors.danger["50"],
    fontSize: typography.size.base,
    lineHeight: typography.lineHeight.base,
    color: colors.neutral["900"],
  },
  style: {
    width: "100%",
    display: "flex",
    height: 48,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.neutral["300"],
    fontSize: typography.size.base,
    // lineHeight: typography.lineHeight.base,
    color: colors.neutral["900"],
  },
  inputError: {
    borderColor: colors.danger["500"],
  },
  inputFocused: {
    borderColor: colors.primary["500"],
  },
  inputPassword: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  iconEye: {
    position: "absolute",
    right: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.neutral["700"],
    marginBottom: 8,
  },
  errorText: {
    fontSize: 12,
    color: colors.danger["500"],
    marginTop: 4,
  },
  inputView: {
    width: "100%",
    display: "flex",
    gap: 0,
  },
});

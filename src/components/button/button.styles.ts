import { StyleSheet } from "react-native";
import { ButtonSize, ButtonType, ButtonVariant } from ".";
import { theme } from "../../styles/theme";

type IFontWeight =
  | "normal"
  | "bold"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

const getButtonStyles = (
  type: ButtonType,
  variant: ButtonVariant,
  size: ButtonSize
) => {
  const sizeStyle = {
    small: {
      height: 40,
      paddingVertical: 10,
      paddingHorizontal: 16,
      fontSize: theme.typography.size.small,
      lineHeight: theme.typography.lineHeight.small,
    },
    medium: {
      height: 44,
      paddingVertical: 10,
      paddingHorizontal: 16,
      fontSize: theme.typography.size.base,
      lineHeight: theme.typography.lineHeight.base,
    },
    large: {
      height: 48,
      paddingVertical: 12,
      paddingHorizontal: 16,
      fontSize: theme.typography.size.base,
      lineHeight: theme.typography.lineHeight.base,
    },
    "x-small": {
      height: 36,
      paddingVertical: 8,
      paddingHorizontal: 16,
      fontSize: theme.typography.size.small,
      lineHeight: theme.typography.lineHeight.small,
    },
  };

  const baseStyle = {
    display: "flex" as const,
    height: sizeStyle[size].height,
    paddingVertical: sizeStyle[size].paddingVertical,
    paddingHorizontal: sizeStyle[size].paddingHorizontal,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    flexDirection: "row" as const,
    gap: 8,
    borderRadius: theme.radius.lg,
  };

  const baseTextStyle = {
    fontFamily: theme.typography.fontFamily.semibold,
    fontSize: sizeStyle[size].fontSize,
    fontWeight: theme.typography.weight.semibold as IFontWeight,
    lineHeight: sizeStyle[size].lineHeight,
    letterSpacing: theme.typography.letterSpacing["0"],
  };

  const variantStyles = {
    primary: {
      backgroundColor: theme.colors.primary["600"],
      borderColor: theme.colors.primary["600"],
    },
    white: {
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.white,
    },
    danger: {
      backgroundColor: theme.colors.danger["600"],
      borderColor: theme.colors.danger["600"],
    },
    neutral: {
      backgroundColor: theme.colors.neutral["100"],
      borderColor: theme.colors.neutral["100"],
    },
  };

  const buttonColor = {
    primary: {
      fill: {
        backgroundColor: theme.colors.primary["600"],
        text: {
          color: theme.colors.white,
        },
      },
      outlined: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: theme.colors.primary["600"],
        text: {
          color: variantStyles[variant].backgroundColor,
        },
      },
      subtle: {
        backgroundColor: theme.colors.primary["50"],
        text: {
          color: theme.colors.primary["600"],
        },
      },
      ghost: {
        backgroundColor: "transparent",
        text: {
          color: theme.colors.primary["600"],
        },
      },
    },
    white: {
      fill: {
        backgroundColor: theme.colors.white,
        padding: 0,
        text: {
          color: theme.colors.primary["600"],
        },
      },
      outlined: {
        backgroundColor: theme.colors.white,
        padding: 0,
        text: {
          color: theme.colors.primary["600"],
        },
      },
      subtle: {
        backgroundColor: theme.colors.white,
        padding: 0,
        text: {
          color: theme.colors.primary["600"],
        },
      },
      ghost: {
        backgroundColor: theme.colors.white,
        text: {
          color: theme.colors.primary["600"],
        },
      },
    },
    danger: {
      fill: {
        backgroundColor: theme.colors.danger["600"],

        text: {
          color: theme.colors.white,
        },
      },
      outlined: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: theme.colors.danger["600"],
        text: {
          color: theme.colors.danger["600"],
        },
      },
      subtle: {
        backgroundColor: theme.colors.danger["50"],
        text: {
          color: theme.colors.danger["600"],
        },
      },
      ghost: {
        backgroundColor: "transparent",
        text: {
          color: theme.colors.danger["600"],
        },
      },
    },
    neutral: {
      fill: {
        backgroundColor: theme.colors.neutral["100"],
        text: {
          color: theme.colors.neutral["900"],
        },
      },
      outlined: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: theme.colors.neutral["300"],
        text: {
          color: theme.colors.neutral["900"],
        },
      },
      subtle: {
        backgroundColor: theme.colors.neutral["100"],
        text: {
          color: theme.colors.neutral["900"],
        },
      },
      ghost: {
        backgroundColor: "transparent",
        text: {
          color: theme.colors.neutral["900"],
        },
      },
    },
  };

  const typeStyles = {
    outlined: buttonColor[variant][type],
    fill: buttonColor[variant][type],
    subtle: buttonColor[variant][type],
    ghost: buttonColor[variant][type],
  };

  return StyleSheet.create({
    button: {
      ...baseStyle,
      ...variantStyles[variant],
      ...typeStyles[type],
    },
    text: {
      ...baseTextStyle,
      ...buttonColor[variant][type].text,
    },
  });
};

export default getButtonStyles;

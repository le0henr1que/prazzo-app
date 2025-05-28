import { Text, TextProps, StyleSheet } from "react-native";
import { typography } from "../../styles/typography";

type TypographyVariant = "XS" | "SM" | "BASE" | "LG" | "XL" | "2XL" | "3XL";

interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  family?: keyof typeof typography.fontFamily;
  style?: object;
  children: React.ReactNode;
}

const variantStyles = {
  XS: {
    fontSize: typography.size["x-small"],
    lineHeight: typography.lineHeight["x-small"],
  },
  SM: {
    fontSize: typography.size.small,
    lineHeight: typography.lineHeight.small,
  },
  BASE: {
    fontSize: typography.size.base,
    lineHeight: typography.lineHeight.base,
  },
  LG: {
    fontSize: typography.size.large,
    lineHeight: typography.lineHeight.large,
  },
  XL: {
    fontSize: typography.size["x-large"],
    lineHeight: typography.lineHeight["x-large"],
  },
  "2XL": {
    fontSize: typography.size["2x-large"],
    lineHeight: typography.lineHeight["2x-large"],
  },
  "3XL": {
    fontSize: typography.size["3x-large"],
    lineHeight: typography.lineHeight["3x-large"],
  },
};

const Typography = ({
  variant = "BASE",
  family,
  style,
  children,
  ...props
}: TypographyProps) => {
  const variantConfig = variantStyles[variant];

  const fontFamilyStyle = family
    ? { fontFamily: typography.fontFamily[family] }
    : {};

  return (
    <Text style={[variantConfig, fontFamilyStyle, style]} {...props}>
      {children}
    </Text>
  );
};

export default Typography;

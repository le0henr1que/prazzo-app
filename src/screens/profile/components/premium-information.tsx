import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../styles/colors";

export function PremiumInformation() {
  return (
    <View style={styles.premium}>
      <Text
        style={{
          color: colors.neutral["900"],
          fontSize: 14,
          fontWeight: "700",
          lineHeight: 20,
          textAlign: "left",
        }}
      >
        Seja Premiume
      </Text>
      <Text
        style={{
          color: colors.neutral["900"],
          fontSize: 12,
          fontWeight: "500",
          lineHeight: 20,
          textAlign: "left",
        }}
      >
        Desbloqueie diversas funcionalidades para o seu app com nosso plano
        pago.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  premium: {
    marginTop: 20,
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#E8CC3C",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

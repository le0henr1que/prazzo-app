import { SealCheck } from "phosphor-react-native";
import { StyleSheet, View } from "react-native";
import Typography from "../../../components/text";
import { colors } from "../../../styles/colors";

export function PremiumInformation() {
  return (
    <View style={styles.premium}>
      <View style={{ width: "85%" }}>
        <Typography color={colors.white} variant="SM" family="bold">
          Seja Premium
        </Typography>
        <Typography color={colors.white} variant="XS" family="regular">
          Desbloqueie diversas funcionalidades para o seu app com nosso{" "}
          <Typography color={colors.white} variant="XS" family="semibold">
            {" "}
            plano premium.
          </Typography>
        </Typography>
      </View>
      <View>
        <SealCheck color={colors.white} weight="fill" size={34} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  premium: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: "100%",
    backgroundColor: "#00A2E9",
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

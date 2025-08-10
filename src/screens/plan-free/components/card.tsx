import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import Typography from "../../../components/text";
import { colors } from "../../../styles/colors";

export default function CardPlan() {
  return (
    <View style={styles.cardContainer}>
      <View>
        <View style={styles.badgeContainer}>
          <Ionicons name="medal-sharp" size={24} color="#FFFF" />
        </View>
      </View>
      <View>
        <Typography
          variant={"XS"}
          family={"semibold"}
          color={colors.neutral[5]}
        >
          Seu plano
        </Typography>
        <Typography
          variant={"BASE"}
          family={"semibold"}
          color={colors.neutral[7]}
        >
          Plano FREE
        </Typography>
        <Typography variant={"SM"} family={"regular"} color={colors.neutral[5]}>
          Nosso plano mais básico
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  badgeContainer: {
    backgroundColor: colors.brand.dark,
    padding: 8,
    width: 40,
    height: 40,
    borderRadius: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
    width: "100%",
    borderColor: colors.neutral[3],
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
});

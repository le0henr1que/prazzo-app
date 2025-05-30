import { Image, StyleSheet, Text, View } from "react-native";
import ScamBarIcon from "../../../../assets/icons/scam-bar";
import { colors } from "../../../styles/colors";

export default function CardWatingDate({
  productCode,
}: {
  productCode: string;
}) {
  return (
    <View style={styles.cardDate}>
      <View style={styles.cardDataHeader}>
        <Text style={styles.cardDataTitle}>Aguardando data</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 8,
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 8,
        }}
      >
        <View style={styles.cardDataContent}>
          <View>
            <Image
              source={{ uri: "https://via.placeholder.com/60" }}
              style={styles.image}
            />
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.normalTitle}>
              Wasabi Doritos Pacote Grande 78g
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={styles.neutralTitle}>Código do produto: </Text>
              <Text
                style={{
                  color: "#1F2937",
                  fontSize: 12,
                  fontStyle: "normal",
                  fontWeight: "600",
                  lineHeight: 20,
                  letterSpacing: 0,
                }}
              >
                {productCode}
              </Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: colors.primary["600"],
                fontSize: 14,
                fontStyle: "normal",
                fontWeight: "600",
                lineHeight: 20,
                letterSpacing: 0,
              }}
            >
              R$ 20,00
            </Text>
          </View>
        </View>
        <View style={styles.cardDataFooter}>
          <Text>
            <ScamBarIcon color={"#0D9488"} />
          </Text>
          <Text style={styles.cardDataTitleFooter}>0 items</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  cardDate: {
    marginTop: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    alignSelf: "stretch",
    borderRadius: 8,
    backgroundColor: "#FFF",
    boxShadow: "0px 4px 12px 0px rgba(151, 151, 151, 0.15)",
  },
  image: { width: 80, height: 80, borderRadius: 8, marginRight: 10 },
  cardDataHeader: {
    display: "flex",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 8,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 6,
    alignSelf: "stretch",
    borderRadius: "8px 8px 0px 0px",
    backgroundColor: "#1F2937",
  },
  cardDataTitle: {
    color: "#FFF",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 16,
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  normalTitle: {
    color: "#1F2937",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 20,
    letterSpacing: 0,
  },
  neutralTitle: {
    color: "#6B7280",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 16,
    letterSpacing: 0,
  },
  cardDataContent: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    borderBottomColor: "#E5E7EB",
    borderBottomWidth: 1,
    gap: 8,
  },
  cardDataFooter: {
    display: "flex",
    padding: 2,
    gap: 8,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  cardDataTitleFooter: {
    color: colors.primary["600"],
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 16,
    letterSpacing: 0,
    textTransform: "uppercase",
  },
});

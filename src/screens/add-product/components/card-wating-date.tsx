import { Image, StyleSheet, Text, View } from "react-native";
import ScamBarIcon from "../../../../assets/icons/scam-bar";
import { colors } from "../../../styles/colors";

import { Ionicons } from "@expo/vector-icons";
import { typography } from "../../../styles/typography";
import { format, parse } from "date-fns";
import { exportIconAndColor } from "../../../utils/export-Icon-and-color";
import { calculateDaysExpired } from "../../../utils/calculate-days-expired";
import { formatCurrency } from "../../../utils/format-to-money";
import Typography from "../../../components/text";

export default function CardWatingDate({ product }: { product: any }) {
  let expired_days;
  if (product?.date?.length === 10) {
    const parsedDate = parse(product.date, "dd/MM/yyyy", new Date());
    expired_days = format(parsedDate, "yyyy-MM-dd");
  }
  console.log(expired_days);
  return (
    <View style={styles.cardDate}>
      <View
        style={[
          styles.header,

          {
            backgroundColor: exportIconAndColor(
              calculateDaysExpired(expired_days as any)
            )?.color,
          },
        ]}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 6,
            alignItems: "center",
            paddingVertical: 4,
          }}
        >
          {expired_days && (
            <Ionicons
              name={
                (exportIconAndColor(calculateDaysExpired(expired_days))
                  ?.icon as keyof typeof Ionicons.glyphMap) ||
                ("alert-circle" as keyof typeof Ionicons.glyphMap)
              }
              size={16}
              color={colors.white}
              style={{ marginLeft: 8 }}
            />
          )}
          {!expired_days && (
            <Typography variant="XS" family="semibold" style={styles.expiredText}>AGUARDANDO DATA</Typography>
          )}
          {expired_days && (
            <Typography variant="XS" family="semibold" style={styles.expiredText}>
              {exportIconAndColor(calculateDaysExpired(expired_days))?.title}
            </Typography>
          )}
        </View>
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
              source={{
                uri: product?.imageUrl,
              }}
              style={styles.image}
            />
          </View>
          <View style={{ flex: 2 }}>
            <Typography variant="SM" family="semibold" style={styles.normalTitle}>{product?.name}</Typography>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography variant="XS" family="medium" style={styles.neutralTitle}>Código do produto: </Typography>
              <Typography variant="XS" family="bold"
                style={{
                  color: "#1F2937",
                }}
              >
                {product?.code}
              </Typography>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography variant="XS" family="medium" style={styles.neutralTitle}>Data de validade: </Typography>
              <Typography
                variant="XS" family="bold"
                style={{
                  color: "#1F2937",
                }}
              >
                {product.date}
              </Typography>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography variant="XS" family="medium" style={styles.neutralTitle}>Local: </Typography>
              <Typography
                variant="XS" family="bold"
                style={{
                  color: "#1F2937",
                }}
              >
                {product.place}
              </Typography>
            </View>
          </View>
          <View style={{ flex: 0 }}>
            <Typography
              variant="SM" family="bold"
              style={{
                color: colors.brand.default,
              }}
            >
              R$ {formatCurrency(product?.price)}
            </Typography>
          </View>
        </View>
        <View style={styles.cardDataFooter}>
          {/* <Text>
            <ScamBarIcon color={"#0D9488"} />
          </Text>
          <Text style={styles.cardDataTitleFooter}>
            {product.qtdItems} Itens
          </Text> */}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  cardDate: {
    backgroundColor: "#fff",
    borderRadius: 8,
    width: "100%",
    overflow: "hidden",
    borderColor: "#ddd",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 2,
  },
  expiredText: {
    color: "#fff",
  },
  header: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    display: "flex",
    gap: 6,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
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
  
  },
  neutralTitle: {
    color: "#6B7280",
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
    padding: 8,
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

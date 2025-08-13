import { StyleSheet, Text, View,ScrollView } from "react-native";
import { calculateDaysExpired } from "../../../utils/calculate-days-expired";
import { exportIconAndColor } from "../../../utils/export-Icon-and-color";
import { formatDate } from "../../../utils/format-date";
import { formatToBRL } from "../../../utils/format-to-money";
import { colors } from "../../../styles/colors";
import Typography from "../../../components/text";

function Details({ data }: { data: any }) {
  console.log("data0", data);

  const expiresAt = data?.expires_at || "";

  const daysExpired = calculateDaysExpired(expiresAt);

  const { color } = exportIconAndColor(daysExpired);
  const statusText =
    daysExpired < 0
      ? "Vencido"
      : daysExpired <= 13
      ? "Próximo ao vencimento"
      : "Em dia";

  return (
    <View style={styles.container}>
      <View style={styles.row}>
          <Typography variant="SM" family="medium" style={styles.label}>Código do Produto</Typography>
          <Typography variant="SM" family="semibold" style={styles.value}>{data?.productCode || "N/A"}</Typography>
      </View>
      <View style={styles.row}>
          <Typography variant="SM" family="medium" style={styles.label}>Valor Unitário</Typography>
          <Typography variant="SM" family="semibold" style={styles.value}>
            {formatToBRL(Number(data?.unique_price ?? 0))}
          </Typography>
       </View>
      <View style={styles.row}>
          <Typography variant="SM" family="medium" style={styles.label}>Categoria</Typography >
          <Typography variant="SM" family="semibold" style={styles.value}>{data?.category?.name || "N/A"}</Typography>
      </View>
      <View style={styles.row}>
          <Typography variant="SM" family="medium" style={styles.label}>Loja do produto</Typography >
          <Typography variant="SM" family="semibold" style={styles.value}>{data?.org?.name || "N/A"}</Typography>
      </View>
       <View style={styles.row}>
          <Typography variant="SM" family="medium" style={styles.label}>Local do produto</Typography >
          <Typography variant="SM" family="semibold" style={styles.value}>{data?.section || "N/A"}</Typography>
      </View>
      <View style={styles.row}>
          <Typography variant="SM" family="medium" style={styles.label}>Fornecedor</Typography >
          <Typography variant="SM" family="semibold" style={styles.value}>{data?.supplier?.name || "N/A"}</Typography>
      </View>
      <View style={styles.row}> 
          <Typography variant="SM" family="medium" style={styles.label}>Data de validade</Typography>
          <Typography variant="SM" family="semibold" style={styles.value}>
            {data?.expires_at ? formatDate(data?.expires_at) : "Sem data"}
          </Typography>
      </View>

      <View style={styles.row}>
          <Typography variant="SM" family="medium" style={styles.label}>Lote</Typography>
          <Typography variant="SM" family="semibold" style={styles.value}>{data?.batchCode}</Typography>
      </View>
      <View style={styles.row}>
          <Typography variant="SM" family="medium" style={styles.label}>Quantidade de itens</Typography >
          <Typography variant="SM" family="semibold" style={styles.value}>
            {data?.quantity || 0}
            {data?.quantity === 1 ? " item" : " itens"}
          </Typography>
      </View>
       <View style={styles.row}>
          <Typography variant="SM" family="medium" style={styles.label}>Valor Total do lote</Typography >
          <Typography variant="SM" family="semibold" style={styles.value}>
            {formatToBRL(
              (parseFloat(
                (data?.unique_price || "0").toString().replace(",", ".")
              ) || 0) * (parseInt(data?.quantity?.toString() || "0", 10) || 0)
            )}
          </Typography>
      </View>
      <View style={styles.row}>
          <Typography variant="SM" family="medium" style={styles.label}>Status</Typography >
          <Typography variant="SM" family="semibold" style={[styles.value, styles.status, { color }]}>
            {statusText}
          </Typography>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 8,
  },
  row: {
    flexDirection: "row",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.neutral["2"],
    padding: 12,
    justifyContent: "space-between",
    zIndex: 0,
  },
  column: {
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: "#f9f9f9",
  },
  label: {
    color: colors.neutral[6],
  },
  value: {
    color: colors.neutral[7],
  },
  status: {
    color: "red",
    fontWeight: "bold",
  },
});

export default Details;

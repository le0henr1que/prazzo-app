import { StyleSheet, Text, View } from "react-native";
import { calculateDaysExpired } from "../../../utils/calculate-days-expired";
import { exportIconAndColor } from "../../../utils/export-Icon-and-color";
import { formatDate } from "../../../utils/format-date";
import { formatToBRL } from "../../../utils/format-to-money";

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
        <View style={styles.column}>
          <Text style={styles.label}>Código do Produto</Text>
          <Text style={styles.value}>{data?.productCode || "N/A"}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Data de validade</Text>
          <Text style={styles.value}>
            {data?.expires_at ? formatDate(data?.expires_at) : "Sem data"}
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Lote</Text>
          <Text style={styles.value}>{data?.batchCode}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Quantidade de itens</Text>
          <Text style={styles.value}>
            {data?.quantity || 0}
            {data?.quantity === 1 ? " item" : " itens"}
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Valor Unitário</Text>
          <Text style={styles.value}>
            {formatToBRL(Number(data?.unique_price ?? 0))}
          </Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Valor Total do lote</Text>
          <Text style={styles.value}>
            {formatToBRL(
              (parseFloat(
                (data?.unique_price || "0").toString().replace(",", ".")
              ) || 0) * (parseInt(data?.quantity?.toString() || "0", 10) || 0)
            )}
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Categoria</Text>
          <Text style={styles.value}>{data?.category?.name || "N/A"}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Status</Text>
          <Text style={[styles.value, styles.status, { color }]}>
            {statusText}
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Loja do produto</Text>
          <Text style={styles.value}>{data?.org?.name || "N/A"}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Fornecedor</Text>
          <Text style={styles.value}>{data?.supplier?.name || "N/A"}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {},
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  column: {
    flex: 1,
    marginHorizontal: 8,
  },
  label: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: "#000",
  },
  status: {
    color: "red",
    fontWeight: "bold",
  },
});

export default Details;

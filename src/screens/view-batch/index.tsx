import { Image, StyleSheet, Text, View } from "react-native";
import TrashIcon from "../../../assets/icons/trash";
import { colors } from "../../styles/colors";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Button from "../../components/button";
import { useDialogModal } from "../../hook/handle-modal/hooks/actions";
import { ScreensType } from "../index.screens";
import DeleteBatchAction from "../../components/delete-batch-action";

function ViewBatch() {
  const { handleModal } = useDialogModal();
  const navigation = useNavigation<NativeStackNavigationProp<ScreensType>>();
  const handleDeleteBatch = () => {
    console.log("Excluir lote");
    handleModal({
      isOpen: true,
      element: <DeleteBatchAction navigation={navigation} />,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.tag}>
        <TrashIcon />
        <Text style={styles.tagTitle}>Vencido HÁ 2 DIAS</Text>
      </View>
      <View style={styles.productContainer}>
        <View style={styles.productInfo}>
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../../../assets/batch.png")}
          />
          <View style={styles.productDescription}>
            <Text style={styles.productName}>Lote QB12QAQWQW21</Text>
            <Text style={styles.productPrice}>R$ 20,00/Un</Text>
          </View>
        </View>
        <View style={styles.productAction}>
          <View style={{ flex: 1 }}>
            <Button
              size="small"
              type="outlined"
              onPress={() =>
                navigation.navigate("EditBatch", { batchCode: "12312321" })
              }
            >
              Editar lote
            </Button>
          </View>
          <View style={{ flex: 1 }}>
            <Button
              size="small"
              variant="danger"
              onPress={() => handleDeleteBatch()}
            >
              Excluir lote
            </Button>
          </View>
        </View>
      </View>
      <View style={styles.containerDatails}>
        <Text
          style={{
            fontSize: 16,
            color: colors.neutral["900"],
            fontWeight: "600",
            lineHeight: 24,
            paddingHorizontal: 8,
            marginBottom: 16,
          }}
        >
          Detalhes do lote
        </Text>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Código do produto</Text>
            <Text style={styles.value}>121213223323232</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Data de validade</Text>
            <Text style={styles.value}>12/12/2002</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Lote</Text>
            <Text style={styles.value}>ASESD</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Quantidade de itens</Text>
            <Text style={styles.value}>124 itens</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Valor Unitário</Text>
            <Text style={styles.value}>R$ 20,00</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Valor Total do lote</Text>
            <Text style={styles.value}>R$ 200,000</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Categoria</Text>
            <Text style={styles.value}>Mercearia</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Status</Text>
            <Text style={[styles.value, styles.status]}>Vencido</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Loja do produto</Text>
            <Text style={styles.value}>Loja 1</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Fornecedor</Text>
            <Text style={styles.value}>AJ Alimentos</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: { flex: 1 },
  containerDatails: {
    marginTop: 20,
    padding: 10,
  },
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
  productSwitch: {
    width: "100%",
    height: 36,
    padding: 3,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: colors.neutral["200"],
  },
  btnSwitch: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    width: "100%",
    height: "100%",
  },
  textSwitch: {
    color: colors.neutral["900"],
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 20,
    letterSpacing: -0.24,
  },
  tag: {
    width: "100%",
    backgroundColor: colors.danger["600"],
    // padding 4px 8px
    paddingVertical: 4,
    paddingHorizontal: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  tagTitle: {
    fontSize: 12,
    color: "#F1F5F9",
    fontWeight: "600",
    lineHeight: 16,
    textTransform: "uppercase",
  },
  productContainer: {
    padding: 20,
    borderBottomColor: colors.neutral["300"],
    borderBottomWidth: 1,
  },
  productInfo: {
    display: "flex",
    flexDirection: "row",

    gap: 12,
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  productAction: {
    marginTop: 16,
    display: "flex",
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  productDescription: {
    width: "100%",
    flex: 2,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  productName: {
    color: colors.neutral["900"],
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 28,
  },
  productPrice: {
    color: colors.primary["600"],
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
  },
});

export default ViewBatch;

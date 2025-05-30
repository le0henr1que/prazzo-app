import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TrashIcon from "../../../assets/icons/trash";
import { colors } from "../../styles/colors";
import Button from "../../components/button";
import { JSX, useState } from "react";
import Details from "./components/details";
import Lots from "./components/lots";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { calculateDaysExpired } from "../../utils/calculate-days-expired";
import { exportIconAndColor } from "../../utils/export-Icon-and-color";
import { useGetOneProductQuery } from "../../services/product";
import { ScreensType } from "../index.screens";

function ViewProduct() {
  const params = useRoute();
  const { productId, batchId } = params?.params;
  if (!productId) {
    console.error("Product ID is required");
    return null; // or handle the error as needed
  }
  if (!batchId) {
    console.error("Batch ID is required");
    return null; // or handle the error as needed
  }
  console.log("ID DO PRODUTO", productId);
  console.log(params?.params, "params do produto");

  const { data } = useGetOneProductQuery({ id: productId });

  const filteredBatch = data?.batches?.find(
    (batch: any) => batch?.id === batchId
  );

  const batchWithCode = {
    ...filteredBatch,
    productCode: data?.code,
  };

  console.log("BATCH com code", batchWithCode);
  console.log("CAGUEI", data?.batches);

  const contentSwitch: Record<string, JSX.Element> = {
    details: <Details data={batchWithCode} />,
    lots: <Lots data={data?.batches} />,
  };
  const [activeSwitch, setActiveSwitch] = useState("details");
  const navigation = useNavigation<NativeStackNavigationProp<ScreensType>>();

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.tag,
          {
            backgroundColor:
              exportIconAndColor(
                calculateDaysExpired(filteredBatch?.expires_at)
              )?.color || colors.neutral["800"],
          },
        ]}
      >
        <TrashIcon />
        <Text style={styles.tagTitle}>
          {
            exportIconAndColor(calculateDaysExpired(filteredBatch?.expires_at))
              ?.title
          }
        </Text>
      </View>
      <View style={styles.productContainer}>
        <View style={styles.productInfo}>
          <Image
            style={{ width: 102, height: 102 }}
            source={{ uri: data?.imageUrl || "https://via.placeholder.com/60" }}
          />
          <View style={styles.productDescription}>
            <Text style={styles.productName}>
              {data?.name || "Produto não encontrado"}
            </Text>
            <Text style={styles.productPrice}>
              R$ {filteredBatch?.unique_price || "0,00"}/Un
            </Text>
          </View>
        </View>
        <View style={styles.productAction}>
          <View style={{ flex: 1 }}>
            <Button
              size="small"
              type="outlined"
              onPress={() =>
                navigation.navigate("EditProduct", { productCode: "12312321" })
              }
            >
              Editar produto
            </Button>
          </View>
          <View style={{ flex: 1 }}>
            <Button
              size="small"
              onPress={() => navigation.navigate("AddBatch")}
            >
              Adicionar lote
            </Button>
          </View>
        </View>
      </View>
      <View style={{ padding: 20 }}>
        <View style={styles.productSwitch}>
          <TouchableOpacity
            style={{
              ...styles.btnSwitch,
              backgroundColor:
                activeSwitch === "details" ? "#FFF" : "transparent",
            }}
            onPress={() => setActiveSwitch("details")}
          >
            <Text style={styles.textSwitch}>Detalhes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.btnSwitch,
              backgroundColor: activeSwitch === "lots" ? "#FFF" : "transparent",
            }}
            onPress={() => setActiveSwitch("lots")}
          >
            <Text style={styles.textSwitch}>Lotes</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20 }}>{contentSwitch[activeSwitch]}</View>
      </View>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: { flex: 1 },
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
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 28,
  },
});

export default ViewProduct;

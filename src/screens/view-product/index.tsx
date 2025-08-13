import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TrashIcon from "../../../assets/icons/trash";
import { colors } from "../../styles/colors";
import Button from "../../components/button";
import { JSX, useCallback, useState } from "react";
import Details from "./components/details";
import Lots from "./components/lots";
import DeleteProduct from "../../components/delete-product";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { calculateDaysExpired } from "../../utils/calculate-days-expired";
import { exportIconAndColor } from "../../utils/export-Icon-and-color";
import { useGetOneProductQuery } from "../../services/product";
import { ScreensType } from "../index.screens";
import Typography from "../../components/text";
import BackIconcon from "../../../assets/icons/backIcon";
import Ionicons from "react-native-vector-icons/Ionicons";
import PencilIcon from "../../../assets/icons/pencil-icon";
import OnboardingBack from "../../../assets/banner.png";
import { formatToBRL } from "../../utils/format-to-money";
import { formatDate } from "../../utils/format-date";
import { ClockCountdown, Storefront, User } from "phosphor-react-native";
import { useDialogModal } from "../../hook/handle-modal/hooks/actions";

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

  const contentSwitch: Record<string, JSX.Element> = {
    details: <Details data={batchWithCode} />,
    lots: <Lots data={data?.batches} />,
  };
  const [activeSwitch, setActiveSwitch] = useState("details");
  const navigation = useNavigation<NativeStackNavigationProp<ScreensType>>();

  const { handleModal } = useDialogModal();
  const openDeleteModal = () => {
    handleModal({
      isOpen: true,
      element: (
        <DeleteProduct
          productId={productId}
          version={data?.version}
          onCancel={() => handleModal({ isOpen: false })}
        />
      ),
    });
  };
  useFocusEffect(
  useCallback(() => {
    if (!filteredBatch) return;

    StatusBar.setBackgroundColor(
      exportIconAndColor(calculateDaysExpired(filteredBatch.expires_at))?.color || colors.neutral[900]
    );
    StatusBar.setBarStyle('light-content');

    return () => {
      StatusBar.setBackgroundColor(colors.neutral[900]);
      StatusBar.setBarStyle('default');
    };
  }, [filteredBatch])
);
  


  return (
    <>
      <StatusBar
        backgroundColor={
          exportIconAndColor(calculateDaysExpired(filteredBatch?.expires_at))
            ?.color || colors.neutral[900]
        }
        barStyle="light-content"
        translucent={false}
      />

      <SafeAreaView style={[styles.container, { position: "relative", flex: 1 }]}>
        <View
          style={[
            styles.topContainer,
            {
              backgroundColor:
                exportIconAndColor(
                  calculateDaysExpired(filteredBatch?.expires_at)
                )?.color || colors.neutral[900],
            },
          ]}
        >
          <BackIconcon />
          <Typography
            variant="BASE"
            family="semibold"
            style={{ color: colors.white }}
          >
            Detalhes do produto
          </Typography>
          <Typography
            variant="XS"
            family="semibold"
            style={[
              styles.tagTitle,
              {
                color:
                  exportIconAndColor(
                    calculateDaysExpired(filteredBatch?.expires_at)
                  )?.color || colors.neutral[900],
              },
            ]}
          >
            <Ionicons
              name={
                exportIconAndColor(
                  calculateDaysExpired(filteredBatch?.expires_at)
                )?.icon || ""
              }
              color={
                exportIconAndColor(
                  calculateDaysExpired(filteredBatch?.expires_at)
                )?.color || colors.neutral[7]
              }
            />
            {exportIconAndColor(calculateDaysExpired(filteredBatch?.expires_at))
              ?.title || "Não possui data de validade"}
          </Typography>
        </View>

        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={
              OnboardingBack /* { uri: data?.imageUrl || "https://via.placeholder.com/60" } */
            }
          />
        </View>
        <View style={styles.productContainer}>
          <View style={{ alignSelf: "flex-end", flexDirection: "row", gap: 8 }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EditProduct", { productInformation: data })
              }
              style={styles.editButton}
            >
              <PencilIcon />
              <Typography variant="SM" family="semibold">
                Editar lote
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={openDeleteModal}
              style={styles.trashButton}
            >
             {/*  <TouchableOpacity > */}
                <TrashIcon color={colors.danger.default} />
          {/*     </TouchableOpacity> */}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.productCardWrapper}>
          <View style={styles.productCardTitle}>
            <Typography variant="LG" family="semibold">
              {data?.name || "Produto não encontrado"}
            </Typography>
            <Typography
              variant="SM"
              family="medium"
              style={{ color: colors.neutral[5] }}
            >
              Lote: {data?.batches[0]?.name || "Lote não encontrado"}
            </Typography>
          </View>
          <View style={styles.productCard}>
            <View style={styles.item}>
              <Typography
                variant="SM"
                family="bold"
                style={{ color: colors.brand.default }}
              >
                {data?.batches[0]?.quantity || "N/a"} Itens
              </Typography>
              <Typography
                variant="XS"
                family="medium"
                style={{ color: colors.neutral[6] }}
              >
                Quantidade
              </Typography>
            </View>
            <View style={[styles.item, styles.divider]}>
              <Typography
                variant="SM"
                family="bold"
                style={{ color: colors.brand.default }}
              >
                {data?.batches[0]?.unique_price != null
                  ? formatToBRL(Number(data.batches[0].unique_price))
                  : "N/a"}
              </Typography>
              <Typography
                variant="XS"
                family="medium"
                style={{ color: colors.neutral[6] }}
              >
                Valor total
              </Typography>
            </View>
            <View style={[styles.item, styles.divider]}>
              <Typography
                variant="SM"
                family="bold"
                style={{ color: colors.brand.default }}
              >
                {data?.batches[0]?.expires_at != null
                  ? formatDate(data.batches[0].expires_at)
                  : "N/a"}
              </Typography>
              <Typography
                variant="XS"
                family="medium"
                style={{ color: colors.neutral[6] }}
              >
                Validade
              </Typography>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.productSwitch}>
            <TouchableOpacity
              style={{
                ...styles.btnSwitch,
              }}
              onPress={() => setActiveSwitch("details")}
            >
              <Typography
                variant="SM"
                family={activeSwitch === "details" ? "bold" : "medium"}
                style={{
                  color:
                    activeSwitch === "details"
                      ? colors.neutral["900"]
                      : colors.neutral[6],
                }}
              >
                Mais detalhes
              </Typography>
              {activeSwitch === "details" && (
                <View
                  style={{
                    position: "absolute",
                    top: 31,
                    height: 2,
                    width: "100%",
                    backgroundColor: colors.brand.default,
                  }}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.btnSwitch,
              }}
              onPress={() => setActiveSwitch("lots")}
            >
              <Typography
                variant="SM"
                family={activeSwitch === "lots" ? "bold" : "medium"}
                style={{
                  color:
                    activeSwitch === "lots"
                      ? colors.neutral["900"]
                      : colors.neutral[6],
                }}
              >
                Outros lotes
              </Typography>
              {activeSwitch === "lots" && (
                <View
                  style={{
                    position: "absolute",
                    top: 31,
                    height: 2,
                    width: "100%",
                    backgroundColor: colors.brand.default,
                  }}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
          <ScrollView
            style={{ flex: 1, marginTop: 16 }}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
          > 
            {contentSwitch[activeSwitch]}
          </ScrollView>
          <View style={styles.bottomView}>
            <View style={styles.bottomViewWrapper}>
              <View style={styles.item}>
                <ClockCountdown size={32} weight="regular" color={colors.neutral[6]} />
                <Typography
                  variant="XS"
                  family="bold"
                  style={{ color: colors.neutral[6] }}
                >
                  Vencimentos
                </Typography>
              </View>
            <View style={styles.item}>
              <Storefront size={32} weight="regular" color={colors.neutral[6]} />
               <Typography
                  variant="XS"
                  family="bold"
                  style={{ color: colors.neutral[6] }}
                >
                  Vencimentos
                </Typography>
            </View>
            <View style={styles.item}>
              <User size={32} weight="regular" color={colors.neutral[6]} />
               <Typography
                  variant="XS"
                  family="bold"
                  style={{ color: colors.neutral[6] }}
                >
                  Perfil
                </Typography>
          </View>
        </View>
          
        </View>
      </SafeAreaView>
      {/*      <View
        style={[
          styles.tag,
          {
            backgroundColor:
              exportIconAndColor(
                calculateDaysExpired(filteredBatch?.expires_at)
              )?.color || colors.neutral[1],
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
      </View> */}
      {/*  <View style={styles.productContainer}>
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
      </View>*/}
    </>
  );
}

export const styles = StyleSheet.create({
  container: { flex: 1 },
   topContainer: {
    flexDirection: "row",
    height: 162,
    paddingHorizontal: 22,
    paddingTop: 30,
    flexShrink: 0,
    gap: 16
  },
  bottomView: {
    borderTopWidth: 3,
    borderTopColor: colors.neutral[1],
    backgroundColor: colors.white,
    height: "8%",
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexShrink: 0,
  },
   imageWrapper: {
    position: "absolute",
    alignSelf: "center",
    zIndex: 2,
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 4,
    borderColor: colors.white,
    borderWidth: 1,
    left: 16,
    top: 140, 
  },
  image: {
    width: 102,
    height: 101,
    borderRadius: 8, 
  },
  editButton:{
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.neutral[3],
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    width: 185,
    height: 40,
  }, 
  trashButton: {
    borderWidth: 1,
    borderColor: colors.danger.default,
    borderRadius: 8,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
  },
  productCardWrapper:{
    paddingVertical: 12,
    paddingHorizontal: 20,
    gap: 12, 
  },
  productCardTitle: {
    display: "flex",
    alignItems: "flex-start",
    gap: 6, 
  },
  productCard:{
    display: "flex",
    flexDirection: "row",
    width: "100%",
    borderWidth: 1,
    borderColor: colors.neutral[2],
    padding: 12,
    borderRadius: 8,
  },
  item:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
  borderLeftWidth: 1,
  borderLeftColor: colors.neutral[3],
  paddingLeft: 12, 
},
  productSwitch: {
    width: "100%",
    height: 36,
    padding: 3,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[3],
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
  bottomViewWrapper:{
    display: "flex",
    flexDirection: "row",
    padding: 12,
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
    backgroundColor: colors.white,
    paddingTop: 6,
    paddingHorizontal: 8,
    height: 26,
    width: 230,
    borderRadius: 4,
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    position: "absolute",
    right: 13,
    top: 125,  
    textTransform: "uppercase",
  },
  productContainer: {
    padding: 10,
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

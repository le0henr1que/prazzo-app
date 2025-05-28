import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDialogModal } from "../hook/handle-modal/hooks/actions";
import CardAction from "./card-product-action";
import { exportIconAndColor } from "../utils/export-Icon-and-color";
import { calculateDaysExpired } from "../utils/calculate-days-expired";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../styles/colors";
import DotsVertical from "../../assets/icons/dots-vertical";
import { formatCurrency } from "../utils/format-to-money";
import { formatDate } from "../utils/format-date";
import ScamBarIcon from "../../assets/icons/scam-bar";
import { typography } from "../styles/typography";

const ProductCard = ({ item }: any) => {
  const { handleModal } = useDialogModal();
  console.log(item);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const handlePressProductCard = () => {
    console.log("Produto clicado");
    navigation.navigate("ViewProduct");
  };
  const handlePress = () => {
    handleModal({
      isOpen: true,
      element: <CardAction navigation={navigation} />,
    });
  };
  return (
    <>
      <TouchableOpacity style={{ paddingBottom: 16 }}>
        <View style={styles.card}>
          <TouchableOpacity
            onPress={() => handlePress()}
            style={[
              styles.header,
              {
                backgroundColor: exportIconAndColor(
                  calculateDaysExpired(item?.expires_at)
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
              }}
            >
              {item?.expires_at && (
                <Ionicons
                  name={
                    exportIconAndColor(calculateDaysExpired(item?.expires_at))
                      ?.icon || "default-icon-name"
                  }
                  size={16}
                  color={colors.white}
                  style={{ marginLeft: 8 }}
                />
              )}
              {!item?.expires_at && (
                <Text style={styles.expiredText}>AGUARDANDO DATA</Text>
              )}
              {item?.expires_at && (
                <Text style={styles.expiredText}>
                  {
                    exportIconAndColor(calculateDaysExpired(item?.expires_at))
                      ?.title
                  }
                </Text>
              )}
            </View>
            <TouchableOpacity onPress={() => handlePress()}>
              <DotsVertical />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePressProductCard()}>
            <View style={styles.body}>
              <Image
                source={{ uri: item?.product?.imageUrl }}
                style={styles.image}
              />
              <View style={styles.details}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Text
                    style={styles.title}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {item?.product?.name}
                  </Text>
                  <Text style={styles.price}>
                    R$ {formatCurrency(item?.unique_price)}
                  </Text>
                </View>
                <Text style={styles.text}>
                  Código do produto:{" "}
                  <Text style={styles.text2}>{item?.product?.code}</Text>
                </Text>
                <Text style={styles.text}>
                  Data de validade:{" "}
                  <Text style={styles.text2}>
                    {item?.expires_at
                      ? formatDate(item?.expires_at, "dd/MM/yyyy")
                      : "Sem data"}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Local:{" "}
                  <Text style={styles.text2}>
                    {item?.section || "Sem local"}
                  </Text>
                </Text>
              </View>
            </View>
            <View style={styles.footer}>
              <View
                style={{
                  display: "flex",
                  gap: 4,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <ScamBarIcon color={colors.primary["600"]} />
                <Text style={styles.quantity}>{item?.quantity} itens</Text>
              </View>
              <Text style={styles.category}>
                {item?.category?.name || "Sem Categoria"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
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
  header: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    display: "flex",
    gap: 6,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  expiredText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: typography.fontFamily.semibold,
  },
  body: {
    flexDirection: "row",
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  details: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    gap: 4,
  },
  title: {
    fontWeight: 500,
    fontSize: 14,
    width: "85%",
    lineHeight: 20,
    fontFamily: typography.fontFamily.semibold,
    flex: 1,
    flexShrink: 0,
    flexBasis: 0,
  },
  price: {
    color: colors.primary["600"],
    fontFamily: typography.fontFamily.semibold,
    lineHeight: 20,
    marginVertical: 5,
    width: "30%",
    marginTop: -0.4,
    textAlign: "right",
  },
  text: {
    fontSize: 12,
    color: colors.neutral["600"],
    fontFamily: typography.fontFamily.medium,
    lineHeight: 16,
  },
  text2: {
    color: colors.neutral["950"],
    fontFamily: typography.fontFamily.semibold,
    fontSize: 12,
    lineHeight: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  quantity: {
    fontFamily: typography.fontFamily.semibold,
    color: colors.primary["600"],
  },
  category: {
    fontSize: 12,
    fontFamily: typography.fontFamily.semibold,
    backgroundColor: colors.neutral["100"],
    paddingVertical: 2,
    paddingHorizontal: 12,
    color: colors.neutral["900"],
    borderRadius: 4,
  },
});

export default ProductCard;

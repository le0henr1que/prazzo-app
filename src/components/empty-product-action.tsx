// src/screens/HomeScreen/screens/expirations/components/FilterModalize.tsx
import { StyleSheet, Text, View } from "react-native";
import AtentionIcon from "../../assets/icons/attention-icon";
import { useDialogModal } from "../hook/handle-modal/hooks/actions";
import { colors } from "../styles/colors";
import Button from "./button";

const EmptyProduct = ({ navigation, code }: any) => {
  const { handleModal } = useDialogModal();

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <AtentionIcon />
        <View style={styles.containerTitles}>
          <Text style={styles.title}>Produto não encontrado</Text>
          <Text style={styles.subTitle}>
            O código de barras escaneado não retornou nenhum produto na nossa
            base de dados. Deseja cadastrar manualmente?
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => {
            handleModal({ isOpen: false });
            navigation.navigate("AddProduct", { productInformation: { code } });
          }}
        >
          Cadastrar manualmente
        </Button>
        <Button
          onPress={() => {
            handleModal({ isOpen: false });
            navigation.navigate("Home");
          }}
          variant="neutral"
        >
          Cancelar
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    padding: 0,
    width: "100%",
  },
  switchTitle: {
    color: "18181B",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 24,
  },
  title: { color: "#212121", fontSize: 18, fontWeight: 600 },
  subTitle: {
    color: colors.neutral["500"],
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 24,
    textAlign: "center",
  },
  containerTitle: {
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral["300"],
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingBottom: 24,
  },
  switch: {},
  containerTitles: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 20,
    textAlign: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    gap: 12,
    padding: 20,
    textAlign: "center",
  },
});

export default EmptyProduct;

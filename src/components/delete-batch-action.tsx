// src/screens/HomeScreen/screens/expirations/components/FilterModalize.tsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AtentionIcon from "../../assets/icons/attention-icon";
import { useDialogModal } from "../hook/handle-modal/hooks/actions";
import { colors } from "../styles/colors";
import Button from "./button";

const DeleteBatchAction = ({ navigation }: any) => {
  const { handleModal } = useDialogModal();
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => {
    console.log("isEnabled", isEnabled);
    setIsEnabled((previousState) => !previousState);
  };
  const handleDeleteBatch = () => {
    console.log("Excluir lote");
    navigation.navigate("Home");
    handleModal({ isOpen: false });
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <AtentionIcon />
        <View style={styles.containerTitles}>
          <Text style={styles.title}>Atenção</Text>
          <Text style={styles.subTitle}>
            Tem certeza que deseja excluir este lote?
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button variant="danger" onPress={() => handleDeleteBatch()}>
          Excluir
        </Button>
        <Button
          variant="neutral"
          onPress={() => {
            handleModal({ isOpen: false });
          }}
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

export default DeleteBatchAction;

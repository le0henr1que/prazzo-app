// src/screens/HomeScreen/screens/expirations/components/FilterModalize.tsx
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDialogModal } from "../hook/handle-modal/hooks/actions";
import TrashLineIcon from "../../assets/icons/trash-line";
import UserIcon from "../../assets/icons/user";
import { colors } from "../styles/colors";
import CardPermission from "./card-permission";
import DeleteMemberAction from "./delete-member-action";

const CardMemberAction = ({ navigation }: any) => {
  const { handleModal } = useDialogModal();

  const handleAddMember = async () => {
    handleModal({
      isOpen: true,
      element: <CardPermission />,
      title: "Alterar Permissão",
    });
  };

  const handleDeleteddMember = () => {
    handleModal({
      isOpen: true,
      element: <DeleteMemberAction navigation={navigation} />,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonAction}
        onPress={() => {
          handleAddMember();
        }}
      >
        <UserIcon />
        <Text style={styles.addddMember}>Alterar Permissão</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonAction}
        onPress={() => handleDeleteddMember()}
      >
        <TrashLineIcon />
        <Text style={styles.deleteProduct}>Remover do grupo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  buttonAction: {
    borderBottomColor: colors.neutral["200"],
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    gap: 6,
    alignContent: "center",
  },

  container: {
    marginTop: 40,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    maxHeight: 400,
    marginBottom: 40,
    width: "100%",
  },
  overlay: {
    zIndex: 1000,
    elevation: 1000,
  },
  addddMember: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  deleteProduct: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.danger["500"],
  },
});

export default CardMemberAction;

// src/screens/HomeScreen/screens/expirations/components/FilterModalize.tsx
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TrashLineIcon from "../../assets/icons/trash-line";
import UserIcon from "../../assets/icons/user";
import { useDialogModal } from "../hook/handle-modal/hooks/actions";
import { useDialogNotification } from "../hook/notification/hooks/actions";
import { useDeleteSupplierMutation } from "../services/supplier";
import { colors } from "../styles/colors";

const CardProviderAction = ({ supplier }: { supplier: any }) => {
  const { handleModal } = useDialogModal();

  const [deleteSupplier, { isLoading }] = useDeleteSupplierMutation();
  const { handleNotification } = useDialogNotification();

  const handleAddProvider = async () => {
    console.log("Editar o fornecedor", supplier?.id);
  };

  const handleDeleteddProvider = async () => {
    console.log("Excluir o fornecedor", supplier);
    try {
      await deleteSupplier({
        id: supplier?.id,
        version: supplier?.version,
      }).unwrap();
      handleModal({ isOpen: false });
    } catch (error) {
      handleNotification({
        isOpen: true,
        variant: "error",
        title: "Ocorreu um erro ao excluir o fornecedor",
        message: (error as any)?.data?.messages[0] || "Ocorreu um erro",
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonAction}
        onPress={() => {
          handleAddProvider();
        }}
      >
        <UserIcon />
        <Text style={styles.addddMember}>Editar Fornecedor</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonAction}
        onPress={() => handleDeleteddProvider()}
      >
        <TrashLineIcon />
        <Text style={styles.deleteProduct}>Excluir fornecedor</Text>
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

export default CardProviderAction;

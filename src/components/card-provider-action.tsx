// src/screens/HomeScreen/screens/expirations/components/FilterModalize.tsx
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TrashLineIcon from "../../assets/icons/trash-line";
import UserIcon from "../../assets/icons/user";
import { useDialogModal } from "../hook/handle-modal/hooks/actions";
import { useDialogNotification } from "../hook/notification/hooks/actions";
import { useDeleteSupplierMutation } from "../services/supplier";
import { colors } from "../styles/colors";
import { useState } from "react";
import { typography } from "../styles/typography";
import { PencilLine, Trash } from "phosphor-react-native"; 
import { FormProvider } from "../screens/supplier/components/form-provider-edit";
import DeleteProduct from "./delete-product";
import DeleteModal from "./delete-product";


const CardProviderAction = ({
  supplier,
  showToast,
  refetch,
}: {
  supplier: any;
  showToast: (message: string, type?: "success" | "danger" | "info" | "warning") => void;
  refetch: () => void; 
}) => {
  const { handleModal } = useDialogModal();

  const [deleteSupplier, { isLoading }] = useDeleteSupplierMutation();
  const { handleNotification } = useDialogNotification();
  const [showDelete, setShowDelete] = useState(false);
  
const handleAddProvider = ( ) => {
    handleModal({
      isOpen: true,
      element: (<FormProvider mode="edit"  initialData={supplier}   onSuccess={() => refetch()}
      />),
      title: "Editar Fornecedor",
    });
  };
  
  const handleExProvider = () => {
  const onCancel = () => handleModal({ isOpen: false });
  const onSuccess = () => {
    showToast("Fornecedor excluído com sucesso!", "success");
    handleModal({ isOpen: false });
  };

  handleModal({
    isOpen: true,
    element: (
      <DeleteModal
        type="supplier"
        id={supplier.id}
        version={supplier.version}
        onCancel={onCancel}
        onSuccess={onSuccess}
      />
    ),
  });
};


  const handleDeleteddProvider = async () => {
    console.log("Excluir o fornecedor", supplier);
    try {
      await deleteSupplier({
        id: supplier?.id,
        version: supplier?.version,
      }).unwrap();
      handleModal({ isOpen: false });
       showToast("Fornecedor excluído com sucesso!", "success");
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
      > <View style={styles.textModal}>
        <PencilLine size={24} />
        <Text style={styles.addddMember}>Editar Fornecedor</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonAction}
        onPress={() => handleDeleteddProvider()}
      >
        <View style={styles.textModal}>
       <Trash size={24} />
        <TouchableOpacity
  onPress={() =>
    handleModal({
      isOpen: true,
      element: (
        <DeleteModal
          type="supplier"
          id={supplier.id}
          version={supplier.version} // tem que garantir que existe!
          onCancel={() => handleModal({ isOpen: false })}
        />
      ),
    })
  }
>
        <Text style={styles.deleteProduct}>Excluir fornecedor</Text>
        </TouchableOpacity>
          
        </View>       
      </TouchableOpacity>
       <View style={styles.handleIndicator} />
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
    fontSize: typography.size.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.neutral[7],
    marginBottom: 20,
  },
  deleteProduct: {
    fontSize: typography.size.base,
    fontFamily: typography.fontFamily.medium,
    marginBottom: 20, 
    color: colors.danger.default,
  },
  textModal:{
    display: "flex",
    flexDirection: "row",
    top: 10,
    width: 375,
    height: 56,
    gap: 12,
  },
   handleIndicator: {
    alignSelf: 'center',
    width: 135,
    height: 5,
    top: 35,
    borderRadius:100,
    backgroundColor: colors.black,
  },
});

export default CardProviderAction;

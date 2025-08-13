import { useForm, Controller } from "react-hook-form";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Button from "./button";
import Typography from "./text";
import { Input } from "./input/input.style";
import { CustomInput } from "./input";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../styles/colors";
import { useState } from "react";
import { useDeleteProductMutation } from "../services/product";
import { useDeleteSupplierMutation } from "../services/supplier";
import { useToast } from "../hook/toast/useToast";

type DeleteProps =
  | {
      type: "product";
      productId: string;
      version: number;
      onCancel: () => void;
      onSuccess: () => void; 
    }
  | {
      type: "supplier";
      id: string;
      version: number;
      onCancel: () => void;
      onSuccess: () => void; 
    };
    
  const DeleteModal = (props: DeleteProps) => {
    console.log("DeleteModal props:", props);
  const { handleSubmit } = useForm();
  const [active, setActive] = useState(false);

  const [deleteProduct] = useDeleteProductMutation();
  const [deleteSupplier] = useDeleteSupplierMutation();

  const { showToast } = useToast();

  const onSubmit = async () => {
    try {
      if (props.type === "product") {
        console.log("Deletar produto:", props.productId);
        await deleteProduct({
          id: props.productId,
          version: props.version,
        }).unwrap();
      } 
      else {
        console.log("Deletar fornecedor:", props.id);
        await deleteSupplier({
          id: props.id,
          version: String(props.version),
        }).unwrap();
      }
       props.onSuccess();
      //  showToast("Excluído com sucesso!", "success");
       props.onCancel();
    } catch (error) {
      console.error("Erro ao deletar", error);
    }
  };

  // const title =
  //   props.type === "product"
  //     ? "Excluir lote do produto"
  //     : `Excluir fornecedor ${props.name ? `"${props.name}"` : ""}`;
  const message =
    props.type === "product"
      ? "Você tem certeza de que quer excluir o lote deste produto? Essa ação é permanente!"
      : "Tem certeza que deseja excluir esse fornecedor da sua loja?";

 
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <View style={styles.iconBackground}>
          <Ionicons name="warning" size={40} color={colors.danger.default} />
        </View>
      </View>
      <View style={{ alignItems: "center", gap: 12, paddingHorizontal: 20 }}>
        <Typography
          variant="LG"
          family="bold"
          style={{ color: colors.neutral[7] }}
        >
          Atenção!
        </Typography>
        <Typography
          variant="BASE"
          family="regular"
          style={{ textAlign: "center", color: colors.neutral[6] }}
        >
         {message}
        </Typography>
        {props.type === "product" && (
        <View style={styles.deleteBatchContainer}>
          <TouchableOpacity
            onPress={() => setActive(!active)}
            style={[styles.switch, active ? styles.switchOn : styles.switchOff]}
          >
            <View
              style={[
                styles.circle,
                active ? styles.circleOn : styles.circleOff,
              ]}
            />
          </TouchableOpacity>
          <Typography
            variant="BASE"
            family="medium"
            style={{ color: colors.neutral[7] }}
          >
            Excluir todos os lotes deste produto
          </Typography>
        </View>
          )}
          
      </View>
      <View style={styles.divisor}></View>
      <View style={styles.buttonContainer}>
        <Button variant="danger" onPress={onSubmit}>
         {props.type === "product" ? "Excluir lote" : "Remover fornecedor"}
        </Button>
        <Button variant="neutral" onPress={props.onCancel}>Cancelar</Button>
        
      </View>

   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 999,
  },
  iconWrapper: {
    alignItems: "center",
    padding: 20,
  },
  iconBackground: {
    backgroundColor: colors.danger.light,
    padding: 16,
    borderRadius: 50,
  },
  deleteBatchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 24,
  },
  switch: {
    width: 55,
    height: 28,
    borderRadius: 30,
    padding: 4,
    justifyContent: "center",
  },
  switchOn: {
    backgroundColor: colors.brand.default,
    alignItems: "flex-end",
  },
  switchOff: {
    backgroundColor: colors.neutral[2],
    alignItems: "flex-start",
  },
  circle: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  circleOn: {
    backgroundColor: "#fff",
  },
  circleOff: {
    backgroundColor: "#fff",
  },
  divisor: {
    height: 1,
    backgroundColor: colors.neutral[3],
    marginVertical: 24,
    alignSelf: "stretch",
  },
  buttonContainer: {
    flexDirection: "column",
    gap: 12,
    paddingHorizontal: 20,
    zIndex: 999,
  }, 
});

export default DeleteModal;

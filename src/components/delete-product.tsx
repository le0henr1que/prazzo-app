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

const DeleteProduct = ({
  productId,
  version,
  onCancel,
}: {
  productId: string;
  version: number;
  onCancel: () => void;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();

  const [active, setActive] = useState(false);
  const [deleteProduct, {isLoading, isError}] = useDeleteProductMutation();


  const onSubmit  = async (data: any) => {
     try {
     console.log("Deletar produto com ID:", productId, version);
     const result = await deleteProduct({id: productId, version}).unwrap();   
    } catch (error) {
       console.error("Erro ao deletar produto", error);  
    } 
  };
 
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
          Atenção
        </Typography>
        <Typography
          variant="BASE"
          family="regular"
          style={{ textAlign: "center", color: colors.neutral[6] }}
        >
          Você tem certeza de que quer excluir o lote deste produto? Essa ação é
          permanente!
        </Typography>
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
      </View>
      <View style={styles.divisor}></View>
      <View style={styles.buttonContainer}>
        <Button variant="danger" onPress={onSubmit}>
          Excluir lote
        </Button>
        <Button variant="neutral" onPress={onCancel}>Cancelar</Button>
        
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

export default DeleteProduct;

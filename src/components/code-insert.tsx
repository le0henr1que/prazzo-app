import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useDialogModal } from "../hook/handle-modal/hooks/actions";
import { colors } from "../styles/colors";
import Button from "./button";
import { Input } from "./input/input.style";
import { productInformation } from "../services/product";

const CodInsert = ({ navigation }: any) => {
  const { handleModal } = useDialogModal();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    const productCode =
      typeof data?.productCode === "string"
        ? data.productCode
        : String(data?.productCode?.toString?.() || "");

    navigation.navigate("AddProduct", {
      productInformation: { code: productCode },
    });

    handleModal({ isOpen: false });
  };

  const handleCancel = () => {
    handleModal({ isOpen: false });
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <View style={Input.inputView}>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={errors.productCode ? Input.styleError : Input.style}
                placeholder="Ex: 1234567890"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
              />
            )}
            name="productCode"
          />
          {errors.productCode && (
            <Text style={Input.errorText}>Código de barras inválido</Text>
          )}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={{ width: "100%", flex: 1 }}>
          <Button variant="neutral" onPress={handleCancel}>
            Cancelar
          </Button>
        </View>
        <View style={{ width: "100%", flex: 1.5 }}>
          <Button onPress={handleSubmit(onSubmit)}>Confirmar</Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    padding: 0,
    width: "100%",
    paddingBottom: 40,
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
    paddingHorizontal: 20,
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
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    flex: 1,
    gap: 8,
  },
});

export default CodInsert;

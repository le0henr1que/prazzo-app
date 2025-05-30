import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useCreateSupplierMutation } from "../../../services/supplier";
import { useDialogModal } from "../../../hook/handle-modal/hooks/actions";
import { Input } from "../../../components/input/input.style";
import { formatPhoneNumber } from "../../../utils/format-phone-number";
import Button from "../../../components/button";

export const FormProviderAction = () => {
  const [createSupplier, { isLoading }] = useCreateSupplierMutation();
  const { handleModal } = useDialogModal();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const { name, contactInfo } = data;
    try {
      await createSupplier({
        name,
        contactInfo,
      }).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      handleModal({ isOpen: false });
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.formContainer}>
        <View style={styles.formContainerLine}>
          <View style={Input.inputView}>
            <Text style={Input.label}>Nome do fornecedor </Text>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={errors.name ? Input.styleError : Input.style}
                  placeholder="Digite o nome do fornecedor"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="name"
            />
            {errors.name && (
              <Text style={Input.errorText}>
                Nome do fornecedor é obrigatório
              </Text>
            )}
          </View>
        </View>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.formContainerLine}>
          <View style={Input.inputView}>
            <Text style={Input.label}>Número (Opcional)</Text>
            <Controller
              control={control}
              rules={{ required: false }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={errors.contactInfo ? Input.styleError : Input.style}
                  placeholder="Digite o número do fornecedor"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={formatPhoneNumber(value)}
                />
              )}
              name="contactInfo"
            />
            {errors.contactInfo && (
              <Text style={Input.errorText}>Lote é obrigatório</Text>
            )}
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={{ width: "100%", flex: 1 }}>
          <Button variant="neutral" onPress={() => console.log("cancelar")}>
            Cancelar
          </Button>
        </View>
        <View style={{ width: "100%", flex: 1.5 }}>
          <Button onPress={handleSubmit(onSubmit)} isLoading={isLoading}>
            Adicionar
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
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
  scrollViewContent: {},
  formContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: 16,
    gap: 12,
    paddingHorizontal: 20,
  },
  insideContainer: {
    padding: 15,

    flex: 1,
  },
  footerButtom: {
    display: "flex",
    width: "100%",
    padding: 20,
    justifyContent: "center",
    gap: 16,
    backgroundColor: "#FFF",
    boxShadow: "0px -4px 12px 0px rgba(151, 151, 151, 0.15)",
  },
  formContainerLine: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
  },
  inputWrapper: {
    flex: 1,
  },
});

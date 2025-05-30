import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Button from "../../components/button";
import { Input } from "../../components/input/input.style";
import { useDialogModal } from "../../hook/handle-modal/hooks/actions";
import CardWatingDate from "./components/card-wating-date";
import { ScreensType } from "../index.screens";
import SaveAction from "../../components/save-action";

function EditProduct() {
  const navigation = useNavigation<NativeStackNavigationProp<ScreensType>>();
  const { handleModal } = useDialogModal();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };
  const route = useRoute();
  const { productCode } = route.params as any;

  const handleValidateField = () => {
    handleModal({
      isOpen: true,
      element: <SaveAction navigation={navigation} />,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.insideContainer}>
        <CardWatingDate productCode={productCode} />
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.formContainer}>
            <View style={styles.formContainerLine}>
              <View style={(Input.inputView, styles.inputWrapper)}>
                <Text style={Input.label}>Nome do produto</Text>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={errors.price ? Input.styleError : Input.style}
                      placeholder="R$ 20,00"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="price"
                />
                {errors.name && (
                  <Text style={Input.errorText}>Lote é obrigatório</Text>
                )}
              </View>
            </View>
            <View style={styles.formContainerLine}>
              <View style={(Input.inputView, styles.inputWrapper)}>
                <Text style={Input.label}>Código</Text>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={errors.price ? Input.styleError : Input.style}
                      placeholder="R$ 20,00"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="price"
                />
                {errors.name && (
                  <Text style={Input.errorText}>Lote é obrigatório</Text>
                )}
              </View>
            </View>
            <View style={styles.formContainerLine}>
              <View style={(Input.inputView, styles.inputWrapper)}>
                <Text style={Input.label}>Preço (Unitário)</Text>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={errors.price ? Input.styleError : Input.style}
                      placeholder="R$ 20,00"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="price"
                />
                {errors.name && (
                  <Text style={Input.errorText}>Lote é obrigatório</Text>
                )}
              </View>
            </View>

            <View style={styles.formContainerLine}>
              <View style={(Input.inputView, styles.inputWrapper)}>
                <Text style={Input.label}>Data de validade</Text>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={errors.price ? Input.styleError : Input.style}
                      placeholder="R$ 20,00"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="price"
                />
                {errors.name && (
                  <Text style={Input.errorText}>Lote é obrigatório</Text>
                )}
              </View>
            </View>
            <View style={styles.formContainerLine}>
              <View style={(Input.inputView, styles.inputWrapper)}>
                <Text style={Input.label}>Categoria</Text>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={errors.price ? Input.styleError : Input.style}
                      placeholder="R$ 20,00"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="price"
                />
                {errors.name && (
                  <Text style={Input.errorText}>Lote é obrigatório</Text>
                )}
              </View>
            </View>
            <View style={styles.formContainerLine}>
              <View style={(Input.inputView, styles.inputWrapper)}>
                <Text style={Input.label}>Lote</Text>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={errors.batch ? Input.styleError : Input.style}
                      placeholder="Ex: 100"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="batch"
                />
                {errors.name && (
                  <Text style={Input.errorText}>Lote é obrigatório</Text>
                )}
              </View>
              <View style={(Input.inputView, styles.inputWrapper)}>
                <Text style={Input.label}>Quantidade de itens</Text>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={errors.qtdItems ? Input.styleError : Input.style}
                      placeholder="Ex: 12"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="qtdItems"
                />
                {errors.name && (
                  <Text style={Input.errorText}>
                    Qauntidade de items é obrigatório.
                  </Text>
                )}
              </View>
            </View>

            <View style={styles.formContainerLine}>
              <View style={(Input.inputView, styles.inputWrapper)}>
                <Text style={Input.label}>Fornecedor</Text>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={errors.supplier ? Input.styleError : Input.style}
                      placeholder="Selecione o fornecedor"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="supplier"
                />
                {errors.name && (
                  <Text style={Input.errorText}>Lote é obrigatório</Text>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={() => handleValidateField()}>Salvar</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: 16,
    gap: 12,
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

export default EditProduct;

import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Controller, useForm} from "react-hook-form";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Button from "../../components/button";
import { Input } from "../../components/input/input.style";
import { useDialogModal } from "../../hook/handle-modal/hooks/actions";
import CardWatingDate from "./components/card-wating-date";
import { ScreensType } from "../index.screens";
import SaveAction from "../../components/save-action";
import BackIconcon from "../../../assets/icons/backIcon-v2";
import { colors } from "../../styles/colors";
import Typography from "../../components/text";
import { Camera } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomInput } from "../../components/input";
import { formatCurrency } from "../../utils/format-to-money";
import { useGetCategorysQuery } from "../../services/category";
import { useGetSuppliersQuery } from "../../services/supplier";


function EditProduct() {
  const navigation = useNavigation<NativeStackNavigationProp<ScreensType>>();
  const { handleModal } = useDialogModal();
  const {
    control,
    handleSubmit,
    reset,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };
  const route = useRoute();
  const { productInformation } = route.params as any;
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    if (productInformation) {
      const batch = Array.isArray(productInformation.batches) ? productInformation.batches[0] : null;
      reset({
        name: productInformation.name,
        code: productInformation.code,
        price: batch.unique_price,
        expirationDate: batch.expires_at,
        category: batch.category,
        batch: batch.batchCode,
        qtdItems: batch.quantity?.toString(),
        supplier: batch.supplier,
        place: batch.section,
      });
    }
  }, [productInformation]); 
/* 
  const name = watch("name");
  const code = watch("code");
  const price = watch("price");
  const date = watch("expirationDate");
  const category = watch("category");
  const batch = watch("batch");
  const qtdItems = watch("qtdItems");
  const supplier = watch("supplier");
  const place = watch("place"); */

  const handleValidateField = () => {
    /* handleModal({
      isOpen: true,
      element: <SaveAction navigation={navigation} />,
    }); */
  };

  const { data: supplier } = useGetSuppliersQuery({
      search: {
        page: 1,
        perPage: 100,
      },
    });
  
    const optionsSupplier = supplier?.data?.map((item: any) => ({
      value: item.id,
      label: item.name,
    }));

    console.log("CARALHO", optionsSupplier)

  const { data: category } = useGetCategorysQuery({
      search: {
        page: 1,
        perPage: 100,
      },
  });
  const optionsCategory = category?.data?.map((item: any) => ({
    id: item.id,
    label: item.name,
  }));

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
          <View style={styles.header}>
            <View style={{ 
              paddingTop: 40, 
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              padding: 16,            
            }}>
              <View style={{flexDirection: "row", gap: 16}}>
                <BackIconcon color={colors.neutral[7]} />
                <Typography variant="BASE" family="semibold">
                  Editar lote
                </Typography>
              </View>
              <TouchableOpacity>
                <Camera />
              </TouchableOpacity>
            </View>
          </View>
        <View style={styles.insideContainer}>
          <CardWatingDate product={productInformation} /> 
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.formContainer}>
              <View style={styles.formContainerLine}>
                <View style={[Input.inputView, styles.inputWrapper]}>
                  <Typography variant="SM" family="semibold" style={Input.label}>Nome do produto</Typography>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomInput
                        name="name"
                       /*  style={errors.price ? Input.styleError : Input.style} */
                        placeholder="Digite o nome do produto"
                        onBlur={onBlur}
                        onChange={onChange}
                        clearErrors={clearErrors}
                        focusedField={focusedField}
                        setFocusedField={setFocusedField}
                        value={value}
                        errors={errors}
                      />
                    )}
                    name="name"
                  />
                  {errors.name && (
                    <Typography variant="SM" family="medium" style={Input.errorText}>Nome é obrigatório</Typography>
                  )}
                </View>
              </View>
              <View style={styles.formContainerLine}>
                <View style={(Input.inputView, styles.inputWrapper)}>
                  <Typography variant="SM" family="semibold" style={Input.label}>Código</Typography>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomInput
                        name="code"
                       /*  style={errors.price ? Input.styleError : Input.style} */
                        /* placeholder="R$ 20,00" */
                        onBlur={onBlur}
                        onChange={onChange}
                        clearErrors={clearErrors}
                        focusedField={focusedField}
                        setFocusedField={setFocusedField}
                        value={value}
                        errors={errors}
                        
                      />
                    )}
                    name="code"
                  />
                 {/*  {errors.name && (
                    <Typography variant="SM" family="medium" style={Input.errorText}>Lote é obrigatório</Typography>
                  )} */}
                </View>
              </View>
              <View style={styles.formContainerLine}>
                <View style={(Input.inputView, styles.inputWrapper)}>
                  <Typography variant="SM" family="semibold" style={Input.label}>Valor (Unitário)</Typography>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomInput
                        name="price"
                        placeholder="R$ 20,00"
                        onBlur={onBlur}
                        value={formatCurrency(value)}
                        keyboardType="numeric"
                        onChange={(text) => {
                          const numeric = text.replace(/[^0-9.,]/g, "");
                          onChange(numeric);
                        }}
                        clearErrors={clearErrors}
                        focusedField={focusedField}
                        setFocusedField={setFocusedField}
                        errors={errors}
                      />
                    )}
                    name="price"
                  />
                  {errors.name && (
                    <Typography variant="SM" family="medium" style={Input.errorText}>Valor é obrigatório</Typography>
                  )}
                </View>
              </View>
              <View style={styles.formContainerLine}>
                <View style={(Input.inputView, styles.inputWrapper)}>
                  <Typography variant="SM" family="semibold" style={Input.label}>Data de validade</Typography>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                     <CustomInput
                        variant="date"
                        name="expirationDate"
                       /*  style={errors.price ? Input.styleError : Input.style} */
                        placeholder="00/00/0000"
                        onBlur={onBlur}
                        onChange={onChange}
                        clearErrors={clearErrors}
                        focusedField={focusedField}
                        setFocusedField={setFocusedField}
                        value={value}
                        errors={errors}
                      />
                    )}
                    name="expirationDate"
                  />
                  {errors.name && (
                    <Typography variant="SM" family="medium" style={Input.errorText}>Data de validade é obrigatório</Typography>
                  )}
                </View>
              </View>
              <View style={styles.formContainerLine}>
                <View style={(Input.inputView, styles.inputWrapper)}>
                  <Typography variant="SM" family="semibold" style={Input.label}>Categoria</Typography>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomInput
                        variant="option"
                        options={optionsCategory}
                        name="category"
                       /*  style={errors.price ? Input.styleError : Input.style} */
                        placeholder="Digite a categoria"
                        onBlur={onBlur}
                        onChange={onChange}
                        clearErrors={clearErrors}
                        focusedField={focusedField}
                        setFocusedField={setFocusedField}
                        value={value}
                        errors={errors}
                      />
                    )}
                    name="category"
                  />
                  {errors.name && (
                    <Typography variant="SM" family="medium" style={Input.errorText}>Categoria é obrigatório</Typography>
                  )}
                </View>
              </View>
              <View style={styles.formContainerLine}>
                <View style={(Input.inputView, styles.inputWrapper)}>
                  <Typography variant="SM" family="semibold" style={Input.label}>Lote</Typography>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomInput
                        name="batch"
                       /*  style={errors.price ? Input.styleError : Input.style} */
                        placeholder="Digite o lote"
                        onBlur={onBlur}
                        onChange={onChange}
                        clearErrors={clearErrors}
                        focusedField={focusedField}
                        setFocusedField={setFocusedField}
                        value={value}
                        errors={errors}
                      />
                    )}
                    name="batch"
                  />
                  {errors.name && (
                    <Typography variant="SM" family="medium" style={Input.errorText}>Lote é obrigatório</Typography>
                  )}
                </View>
                <View style={(Input.inputView, styles.inputWrapper)}>
                  <Typography variant="SM" family="semibold" style={Input.label}>Quantidade de itens</Typography>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomInput
                        name="qtdItems"
                       /*  style={errors.price ? Input.styleError : Input.style} */
                        placeholder="123"
                        onBlur={onBlur}
                        onChange={onChange}
                        clearErrors={clearErrors}
                        focusedField={focusedField}
                        setFocusedField={setFocusedField}
                        value={value}
                        errors={errors}
                      />
                    )}
                    name="qtdItems"
                  />
                  {errors.name && (
                    <Typography variant="SM" family="medium" style={Input.errorText}>
                      Qauntidade de items é obrigatório.
                    </Typography>
                  )}
                </View>
              </View>

              <View style={styles.formContainerLine}>
                <View style={(Input.inputView, styles.inputWrapper)}>
                  <Typography variant="SM" family="semibold" style={Input.label}>Fornecedor</Typography>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomInput
                        variant="option"
                        options={optionsSupplier}
                        name="supplier"
                       /*  style={errors.price ? Input.styleError : Input.style} */
                        placeholder="Digite o fornecedor"
                        onBlur={onBlur}
                        onChange={onChange}
                        clearErrors={clearErrors}
                        focusedField={focusedField}
                        setFocusedField={setFocusedField}
                        value={value}
                        errors={errors}
                      />
                    )}
                    name="supplier"
                  />
                  {errors.name && (
                    <Typography variant="SM" family="medium" style={Input.errorText}>Fornecedor é obrigatório</Typography>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={() => handleValidateField()}>Salvar lote</Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{

  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 30,
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: 16,
    gap: 12,
  },
  insideContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
    flex: 1,
  },
  header:{
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1, 
    borderColor: colors.neutral[2],
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
  buttonContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.neutral[1],
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'center',
   },
});

export default EditProduct;

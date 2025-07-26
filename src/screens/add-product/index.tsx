import { API_URL } from "@env";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { format, parse } from "date-fns";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { TextInput } from "react-native-gesture-handler";
import { useToast } from "react-native-toast-notifications";
import { useCreateBatchMutation } from "../../services/batch";
import { useGetCategorysQuery } from "../../services/category";
import { useUploadFileMutation } from "../../services/file";
import { useGetSuppliersQuery } from "../../services/supplier";
import CardWatingDate from "./components/card-wating-date";
import { useFilterState } from "./ducks/filter/hooks/filterState";
import { formatCurrency } from "../../utils/format-to-money";
import Header from "./components/header";
import { Input } from "../../components/input/input.style";
import { CustomInput } from "../../components/input";
import Button from "../../components/button";
import Typography from "../../components/text";

/**
 *
 *
 * @return {*}
 */
function AddProduct() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute();
  const { productInformation, photoUri } = route.params as any;
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    clearErrors,
    setValue,
  } = useForm();
  const all = watch();
  console.log("all", all);
  const code = watch("code");
  const date = watch("validate");
  const place = watch("place");
  const qtdItems = watch("qtdItems");
  const price = watch("price");
  const name = watch("name");

  const [createBatch, { isLoading }] = useCreateBatchMutation();
  const toast = useToast();
  const [uploadFile, { isLoading: isLoadingFile }] = useUploadFileMutation();
  const { filters } = useFilterState();

  const [focusedField, setFocusedField] = useState<string | null>(null)

  const isLoad = isLoading || isLoadingFile;

  useEffect(() => {
    if (photoUri) {
      setValue("imageUrl", photoUri);
      console.log("BUCETA", photoUri)
    }
  }, [photoUri]);

  const onSubmit = async (data: any) => {
    try {
      if (filters?.imageUrl?.includes("file://")) {
        try {
          const formData = new FormData();
          const file = {
            uri: filters?.imageUrl,
            type: "image/jpeg",
            name: "photo.jpg",
          };
          await uploadFile({
            file: file,
            entity_name: "PRODUCT",
            entity_id: data?.code,
          }).unwrap();
        } catch (error) {
          console.log("Upload file error:", error);
        }
      }
      let formattedDate = null;
      if (data.validate) {
        const parsedDate = parse(data.validate, "dd/MM/yyyy", new Date());
        formattedDate = format(parsedDate, "yyyy-MM-dd");
      }

      await createBatch({
        product_id: productInformation?.id,
        batchCode: data?.batch || "",
        productName: data?.name || null,
        productCode: data?.code || null,
        unique_price: formatCurrency(data.price),
        supplier_id: data?.supplier || null,
        productQtdItems: data.qtdItems || null,
        category_id: data.category || null,
        productValidate: formattedDate,
        productPlace: data?.place,
        quantity: data?.qtdItems,
        imageUrl: `${API_URL}/file/image/${data?.code}`,
      }).unwrap();
      navigation.goBack();
      navigation.goBack();
      toast.show("Produto cadastrado com sucesso!", {
        type: "success",
        placement: "top",
      });
    } catch (e) {
      toast.show("Erro ao cadastrar produto!", {
        type: "error",
        placement: "top",
      });
      console.log(e);
    }
  };

  useEffect(() => {
    if (productInformation) {
      setValue("name", productInformation?.name);
      setValue("code", productInformation?.code);
      setValue("price", productInformation?.price);
      setValue("supplier", productInformation?.supplier);
      setValue("batch", productInformation?.batch);
      setValue("qtdItems", productInformation?.qtdItems);
    }
  }, [productInformation]);

  const { data: supplier } = useGetSuppliersQuery({
    search: {
      page: 1,
      perPage: 100,
    },
  });

  const optionsSupplier = supplier?.data?.map((item: any) => ({
    id: item.id,
    label: item.name,
  }));

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
  console.log(filters);
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <Header productInformation={productInformation} />
        <View style={styles.insideContainer}>
          <CardWatingDate
            product={{
              ...productInformation,
              date: date || "",
              code,
              place,
              qtdItems,
              price,
              name,
              imageUrl:
                photoUri ?? productInformation?.imageUrl ?? filters?.imageUrl,
            }}
          />
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.formContainer}>
              <View style={styles.formContainerLine}>
                <View style={(Input.inputView, styles.inputWrapper)}>
                  <Typography
                    variant="SM"
                    family="semibold"
                    style={Input.label}
                  >
                    Nome do produto
                  </Typography>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      /*  <TextInput
                        style={errors.name ? Input.styleError : Input.style}
                        placeholder="Nome do produto"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      /> */
                      <CustomInput
                        placeholder="Nome do produto"
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        errors={errors}
                        name="name"
                        clearErrors={clearErrors}
                        setFocusedField={setFocusedField}
                        focusedField={focusedField}
                      />
                    )}
                    name="name"
                  />
                  {errors.name && (
                    <Typography
                      variant="SM"
                      family="medium"
                      style={Input.errorText}
                    >
                      Lote é obrigatório
                    </Typography>
                  )}
                </View>
              </View>
              <View style={styles.formContainerLine}>
                <View style={(Input.inputView, styles.inputWrapper)}>
                  <Typography
                    variant="SM"
                    family="semibold"
                    style={Input.label}
                  >
                    Código
                  </Typography>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      /*  <TextInput
                        style={errors.code ? Input.styleError : Input.style}
                        placeholder="Código do produto"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      /> */
                      <CustomInput
                        placeholder="Código do produto"
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        errors={errors}
                        name="code"
                        clearErrors={clearErrors}
                        setFocusedField={setFocusedField}
                        focusedField={focusedField}
                      />
                    )}
                    name="code"
                  />
                  {errors.name && (
                    <Typography
                      variant="SM"
                      family="medium"
                      style={Input.errorText}
                    >
                      Lote é obrigatório
                    </Typography>
                  )}
                </View>
              </View>
              <View style={styles.formContainerLine}>
                <View style={(Input.inputView, styles.inputWrapper)}>
                  <Typography
                    variant="SM"
                    family="semibold"
                    style={Input.label}
                  >
                    Preço (Unitário)
                  </Typography>
                  <Controller
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      /*  <TextInput
                        keyboardType="numeric"
                        style={errors.price ? Input.styleError : Input.style}
                        placeholder="R$ 20,00"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={formatCurrency(value)}
                      /> */
                      <CustomInput
                        placeholder="Preço unitário"
                        value={formatCurrency(value)}
                        keyboardType="numeric"
                        onChange={(text) => {
                          const numeric = text.replace(/[^0-9.,]/g, "");
                          onChange(numeric);
                        }}
                        onBlur={onBlur}
                        errors={errors}
                        name="price"
                        clearErrors={clearErrors}
                        setFocusedField={setFocusedField}
                        focusedField={focusedField}
                      />
                    )}
                    name="price"
                  />
                  {errors.name && (
                    <Typography
                      variant="SM"
                      family="medium"
                      style={Input.errorText}
                    >
                      Lote é obrigatório
                    </Typography>
                  )}
                </View>
              </View>

              <View style={styles.formContainerLine}>
                <View style={(Input.inputView, styles.inputWrapper)}>
                  <Typography
                    variant="SM"
                    family="semibold"
                    style={Input.label}
                  >
                    Data de validade
                  </Typography>
                  <Controller
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomInput
                        variant="date"
                        placeholder="00/00/0000"
                        errors={errors}
                        name="validate"
                        onChange={onChange}
                        onBlur={onBlur}
                        clearErrors={clearErrors}
                        setFocusedField={setFocusedField}
                        focusedField={focusedField}
                      />
                    )}
                    name="validate"
                  />
                  {errors.validate && (
                    <Typography
                      variant="SM"
                      family="medium"
                      style={Input.errorText}
                    >
                      Lote é obrigatório
                    </Typography>
                  )}
                </View>
              </View>

              <View style={styles.formContainerLine}>
                <View style={(Input.inputView, styles.inputWrapper)}>
                  <Typography
                    variant="SM"
                    family="semibold"
                    style={Input.label}
                  >
                    Categoria
                  </Typography>
                  <Controller
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomInput
                        variant="option"
                        options={optionsCategory}
                        errors={errors}
                        placeholder="Selecione a categoria"
                        name="category"
                        onChange={onChange}
                        value={value}
                        onBlur={onBlur}
                        clearErrors={clearErrors}
                        setFocusedField={setFocusedField}
                        focusedField={focusedField}
                      />
                    )}
                    name="category"
                  />
                  {errors.category && (
                    <Typography
                      variant="SM"
                      family="medium"
                      style={Input.errorText}
                    >
                      Categoria é obrigatório
                    </Typography>
                  )}
                </View>
              </View>
              <View style={styles.formContainerLine}>
                <View style={(Input.inputView, styles.inputWrapper)}>
                  <Typography
                    variant="SM"
                    family="semibold"
                    style={Input.label}
                  >
                    Lote
                  </Typography>
                  <Controller
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      /*  <TextInput
                        style={errors.batch ? Input.styleError : Input.style}
                        placeholder="Ex: 100"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      /> */
                      <CustomInput
                        placeholder="Ex: 100"
                        value={value}
                        keyboardType="numeric"
                        onChange={onChange}
                        onBlur={onBlur}
                        errors={errors}
                        name="batch"
                        clearErrors={clearErrors}
                        setFocusedField={setFocusedField}
                        focusedField={focusedField}
                      />
                    )}
                    name="batch"
                  />
                  {errors.name && (
                    <Typography
                      variant="SM"
                      family="medium"
                      style={Input.errorText}
                    >
                      Lote é obrigatório
                    </Typography>
                  )}
                </View>
                <View style={(Input.inputView, styles.inputWrapper)}>
                  <Typography
                    variant="SM"
                    family="semibold"
                    style={Input.label}
                  >
                    Quantidade de itens
                  </Typography>
                  <Controller
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      /*     <TextInput
                        style={errors.qtdItems ? Input.styleError : Input.style}
                        placeholder="Ex: 12"
                        keyboardType="numeric"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      /> */
                      <CustomInput
                        placeholder="Ex: 12"
                        value={value}
                        keyboardType="numeric"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        errors={errors}
                        name="qtdItems"
                        clearErrors={clearErrors}
                        setFocusedField={setFocusedField}
                        focusedField={focusedField}
                      />
                    )}
                    name="qtdItems"
                  />
                  {errors.name && (
                    <Typography
                      variant="SM"
                      family="medium"
                      style={Input.errorText}
                    >
                      Qauntidade de items é obrigatório.
                    </Typography>
                  )}
                </View>
              </View>
              <View style={styles.formContainerLine}>
                <View style={(Input.inputView, styles.inputWrapper)}>
                  <Typography
                    variant="SM"
                    family="semibold"
                    style={Input.label}
                  >
                    Local
                  </Typography>
                  <Controller
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      /*  <TextInput
                        style={errors.place ? Input.styleError : Input.style}
                        placeholder="Ex: Prateleira 2"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      /> */
                      <CustomInput
                        placeholder="Ex: Prateleira 2"
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        errors={errors}
                        name="place"
                        clearErrors={clearErrors}
                        setFocusedField={setFocusedField}
                        focusedField={focusedField}
                      />
                    )}
                    name="place"
                  />
                  {errors.place && (
                    <Typography
                      variant="SM"
                      family="medium"
                      style={Input.errorText}
                    >
                      Lote é obrigatório
                    </Typography>
                  )}
                </View>
              </View>
              <View style={styles.formContainerLine}>
                <View style={(Input.inputView, styles.inputWrapper)}>
                  <Typography
                    variant="SM"
                    family="semibold"
                    style={Input.label}
                  >
                    Fornecedor
                  </Typography>
                  <Controller
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomInput
                        variant="option"
                        options={optionsSupplier}
                        errors={errors}
                        placeholder="Selecione o fornecedor"
                        name="supplier"
                        onChange={onChange}
                        value={value}
                        onBlur={onBlur}
                        clearErrors={clearErrors}
                        setFocusedField={setFocusedField}
                        focusedField={focusedField}
                      />
                    )}
                    name="supplier"
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
       <View style={styles.footerButton}>
          <SafeAreaView style={styles.buttonContainer}>
            <Button onPress={handleSubmit(onSubmit)} isLoading={isLoad}>
              Salvar Produto
            </Button>
          </SafeAreaView>
        </View>
      </SafeAreaView>
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
  footerButton: {
    display: "flex",
    width: "100%",
    height: 118,
    padding: 20,
    justifyContent: "center",
    gap: 16,
    backgroundColor: "#FFF",
    boxShadow: "0px -4px 12px 0px rgba(151, 151, 151, 0.45)",
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

export default AddProduct;

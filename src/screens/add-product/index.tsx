import { API_URL } from "@env";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { format, parse } from "date-fns";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, Text, View } from "react-native";
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
    setValue,
  } = useForm();
  const all = watch();
  console.log("all", all);
  const date = watch("validate");
  const place = watch("place");
  const qtdItems = watch("qtdItems");
  const price = watch("price");
  const name = watch("name");

  const [createBatch, { isLoading }] = useCreateBatchMutation();
  const toast = useToast();
  const [uploadFile, { isLoading: isLoadingFile }] = useUploadFileMutation();
  const { filters } = useFilterState();

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
              place,
              qtdItems,
              price,
              name,
              imageUrl: photoUri ?? productInformation?.imageUrl ?? filters?.imageUrl,
            }}
          />
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.formContainer}>
              <View style={styles.formContainerLine}>
                <View style={(Input.inputView, styles.inputWrapper)}>
                  <Text style={Input.label}>Nome do produto</Text>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={errors.name ? Input.styleError : Input.style}
                        placeholder="Nome do produto"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name="name"
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
                        style={errors.code ? Input.styleError : Input.style}
                        placeholder="Código do produto"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name="code"
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
                    rules={{ required: false }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        keyboardType="numeric"
                        style={errors.price ? Input.styleError : Input.style}
                        placeholder="R$ 20,00"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={formatCurrency(value)}
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
                    rules={{ required: false }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomInput
                        variant="date"
                        placeholder="00/00/0000"
                        errors={errors}
                        name="validate"
                        onChange={onChange}
                      />
                    )}
                    name="validate"
                  />
                  {errors.validate && (
                    <Text style={Input.errorText}>Lote é obrigatório</Text>
                  )}
                </View>
              </View>

              <View style={styles.formContainerLine}>
                <View style={(Input.inputView, styles.inputWrapper)}>
                  <Text style={Input.label}>Categoria</Text>
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
                      />
                    )}
                    name="category"
                  />
                  {errors.category && (
                    <Text style={Input.errorText}>Categoria é obrigatório</Text>
                  )}
                </View>
              </View>
              <View style={styles.formContainerLine}>
                <View style={(Input.inputView, styles.inputWrapper)}>
                  <Text style={Input.label}>Lote</Text>
                  <Controller
                    control={control}
                    rules={{ required: false }}
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
                    rules={{ required: false }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={errors.qtdItems ? Input.styleError : Input.style}
                        placeholder="Ex: 12"
                        keyboardType="numeric"
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
                  <Text style={Input.label}>Local</Text>
                  <Controller
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={errors.place ? Input.styleError : Input.style}
                        placeholder="Ex: Prateleira 2"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name="place"
                  />
                  {errors.place && (
                    <Text style={Input.errorText}>Lote é obrigatório</Text>
                  )}
                </View>
              </View>
              <View style={styles.formContainerLine}>
                <View style={(Input.inputView, styles.inputWrapper)}>
                  <Text style={Input.label}>Fornecedor</Text>
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
                      />
                    )}
                    name="supplier"
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <SafeAreaView style={styles.buttonContainer}>
          <Button onPress={handleSubmit(onSubmit)} isLoading={isLoad}>
            Salvar Produto
          </Button>
        </SafeAreaView>
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

export default AddProduct;

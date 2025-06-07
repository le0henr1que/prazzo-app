import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import Header from "../../components/header";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScreensType } from "../index.screens";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { typography } from "../../styles/typography";
import Button from "../../components/button";
import { Input } from "../../components/input/input.style";
import { Controller, useForm } from "react-hook-form";
import { CustomInput } from "../../components/input";
import { useCreateOrganizationMutation } from "../../services/organization";
import { useDialogModal } from "../../hook/handle-modal/hooks/actions";

interface Estado {
  id: string;
  sigla: string;
  nome: string;
}

interface Cidade {
  id: string;
  nome: string;
}

interface FormData {
  storeName: string;
  estado: { id: string; label: string } | null;
  cidade: { id: string; label: string } | null;
  address: string;
  number: string;
  neighborhood: string;
  phone: string;
}

const CreateStore = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ScreensType>>();
  const {
    control,
    handleSubmit,

    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      estado: null,
      cidade: null,
    },
  });

  const [estados, setEstados] = useState<Estado[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [isLoadingCidades, setIsLoadingCidades] = useState(false);
  const [isLoadingEstados, setIsLoadingEstados] = useState(true);

  const selectedEstado = watch("estado");

  useEffect(() => {
    const fetchEstados = async () => {
      setIsLoadingEstados(true);
      try {
        const response = await fetch(
          "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch estados");
        }
        const data = await response.json();
        setEstados(data);
      } catch (error) {
        console.error("Erro ao buscar estados:", error);
        setEstados([]);
      } finally {
        setIsLoadingEstados(false);
      }
    };

    fetchEstados();
  }, []);

  useEffect(() => {
    const fetchCidades = async () => {
      if (!selectedEstado?.id) {
        setCidades([]);
        setValue("cidade", null);
        return;
      }

      setIsLoadingCidades(true);
      try {
        const response = await fetch(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedEstado.id}/municipios`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch cidades");
        }
        const data = await response.json();
        setCidades(data);
      } catch (error) {
        console.error("Erro ao buscar cidades:", error);
        setCidades([]);
      } finally {
        setIsLoadingCidades(false);
      }
    };

    fetchCidades();
  }, [selectedEstado?.id, setValue]);

  const { handleModal } = useDialogModal();

  const [createOrganization, { isLoading, isError, error }] =
    useCreateOrganizationMutation();
  const onSubmit = async (data: FormData) => {
    const payload = {
      name: data.storeName,
    };

    try {
      await createOrganization(payload).unwrap();
      navigation.goBack();
    } catch (error) {
      handleModal({
        isOpen: true,
        element: (
          <Text>
            Pobre, Safado, Atingiu o Limite do plano, pode ir comprando um novo
            memo
          </Text>
        ),
      });
      console.error("Erro ao criar organização:", error);
    }

    console.log("Payload para envio:", payload);
  };

  return (
    <>
      <Header.Root>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            height: 30,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back-outline" size={24} color="#343330" />
          </TouchableOpacity>
          <Text
            style={{
              color: colors.neutral["900"],
              fontSize: 16,
              fontWeight: "600",
              fontFamily: typography.fontFamily.semibold,
              lineHeight: 24,
            }}
          >
            Adicionar nova loja
          </Text>
        </View>
      </Header.Root>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.container}>
          <View style={styles.bannerStore}>
            <View style={styles.mainBanner}>
              <Ionicons name="camera-outline" size={32} color="#fff" />
            </View>
            <View style={styles.avatar}>
              <Ionicons name="camera-outline" size={28} color="#fff" />
            </View>
          </View>
          <ScrollView
            style={styles.formArea}
            contentContainerStyle={{ paddingBottom: 40 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.form}>
              <View style={Input.inputView}>
                <Text style={Input.label}>Nome do Estabelecimento</Text>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      name="storeName"
                      errors={errors}
                      placeholder="Ex: Loja Estrela"
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="storeName"
                />
                {errors.storeName && (
                  <Text style={Input.errorText}>
                    Nome do estabelecimento é obrigatório.
                  </Text>
                )}
              </View>

              {/* Estado */}
              <View style={Input.inputView}>
                <Text style={Input.label}>Estado</Text>
                <Controller
                  control={control}
                  name="estado"
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      variant="option"
                      options={estados.map((e) => ({
                        id: e.id,
                        label: e.nome,
                      }))}
                      errors={errors}
                      placeholder={
                        isLoadingEstados
                          ? "Carregando estados..."
                          : "Selecione o estado"
                      }
                      name="estado"
                      value={value?.label}
                      onChange={(selected) => {
                        onChange(selected);
                        setValue("cidade", null);
                      }}
                    />
                  )}
                />
                {errors.estado && (
                  <Text style={Input.errorText}>Estado é obrigatório</Text>
                )}
              </View>

              {/* Cidade */}
              <View style={Input.inputView}>
                <Text style={Input.label}>Cidade</Text>
                <Controller
                  control={control}
                  name="cidade"
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      variant="option"
                      options={cidades.map((c) => ({
                        id: c.id,
                        label: c.nome,
                      }))}
                      errors={errors}
                      placeholder={
                        isLoadingCidades
                          ? "Carregando..."
                          : !selectedEstado
                          ? "Selecione primeiro um estado"
                          : "Selecione a cidade"
                      }
                      name="cidade"
                      value={value?.label}
                      onChange={onChange}
                    />
                  )}
                />
                {errors.cidade && (
                  <Text style={Input.errorText}>Cidade é obrigatória</Text>
                )}
              </View>

              <View style={Input.inputView}>
                <Text style={Input.label}>Endereço</Text>
                <Controller
                  control={control}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      name="address"
                      errors={errors}
                      placeholder="Ex: Rua Pão, nº 13"
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="address"
                />
                {errors.address && (
                  <Text style={Input.errorText}>Endereço é obrigatório.</Text>
                )}
              </View>

              <View style={Input.inputView}>
                <Text style={Input.label}>Número</Text>
                <Controller
                  control={control}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      name="number"
                      errors={errors}
                      placeholder="Ex: 13"
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="number"
                />
                {errors.number && (
                  <Text style={Input.errorText}>Número é obrigatório.</Text>
                )}
              </View>
              <View style={Input.inputView}>
                <Text style={Input.label}>Bairro</Text>
                <Controller
                  control={control}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      name="neighborhood"
                      errors={errors}
                      placeholder="Ex: Centro"
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="neighborhood"
                />
                {errors.neighborhood && (
                  <Text style={Input.errorText}>Bairro é obrigatório.</Text>
                )}
              </View>
              <View style={Input.inputView}>
                <Text style={Input.label}>Número do telefone</Text>
                <Controller
                  control={control}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      name="phone"
                      errors={errors}
                      placeholder="Ex: (XX) XXXXX-XXXX"
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="phone"
                />
                {errors.phone && (
                  <Text style={Input.errorText}>
                    Número do telefone é obrigatório.
                  </Text>
                )}
              </View>
            </View>
          </ScrollView>
          <View style={styles.footerButtom}>
            <Button onPress={handleSubmit(onSubmit)} isLoading={isLoading}>
              Salvar loja
            </Button>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 80,
  },
  bannerStore: {
    width: "100%",
    height: 140,
    backgroundColor: "#00000080",
    justifyContent: "flex-end",
    position: "relative",
  },
  inputWrapper: {
    flex: 1,
  },
  mainBanner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: "#64748B",
  },
  avatar: {
    position: "absolute",
    left: 20,
    bottom: -35,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#64748B",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "#fff",
    zIndex: 2,
  },
  formArea: {
    width: "100%",
    paddingTop: 60, // espaço para o avatar sobreposto
    paddingHorizontal: 20,
    flex: 1,
  },
  form: {
    width: "100%",
    flexDirection: "column",
    gap: 16,
  },
  footerButtom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    padding: 20,
    backgroundColor: "#FFF",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
});

export default CreateStore;

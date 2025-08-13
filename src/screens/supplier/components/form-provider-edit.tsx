import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { typography } from "../../../styles/typography";

import {
  useCreateSupplierMutation,
  useUpdateSupplierMutation,
} from "../../../services/supplier";
import { useDialogModal } from "../../../hook/handle-modal/hooks/actions";
import { Input } from "../../../components/input/input.style";
import { formatPhoneNumber } from "../../../utils/format-phone-number";
import Button from "../../../components/button";
import { colors } from "../../../styles/colors";
import { useToast } from "../../../hook/toast/useToast";

type FormProviderProps = {
  mode?: "create" | "edit";
  initialData?: {
    id?: string;
    name?: string;
    contactInfo?: string;
    version?: number; 
  };
  onSuccess?: () => void;
};

export const FormProvider = ({ mode = "create", initialData, onSuccess }: FormProviderProps & { onSuccess?: () => void }) => {
  const [createSupplier, { isLoading: isCreating }] = useCreateSupplierMutation();
  const [updateSupplier, { isLoading: isUpdating }] = useUpdateSupplierMutation();
  const { handleModal } = useDialogModal();

const { toast, showToast, hideToast } = useToast();


 const {
  control,
  handleSubmit,
  setValue,
  formState: { errors },
} = useForm({
  defaultValues: {
    name: initialData?.name || "",
    contactInfo: initialData?.contactInfo || "",
    version: initialData?.version || 0,
  },
}); 


  // Inicializa os campos sempre que initialData mudar
  useEffect(() => {
    if (initialData) {
      console.log("Inicializando formulário com dados:", initialData);
      setValue("name", initialData.name || "");
      setValue("contactInfo", initialData.contactInfo || "");
      setValue("version", initialData.version || 0);
    }
  }, [initialData, setValue]);

  const onSubmit = async (data: any) => {
    console.log("Submit chamado com dados:", data);
    const { name, contactInfo, version } = data;

    try {
      if (mode === "edit" && initialData?.id) {
        console.log("Atualizando fornecedor ID:", initialData.id);
        await updateSupplier({
          id: initialData.id,
          name,
          contactInfo,
          version: Number(version),
        }).unwrap();
        console.log("Atualizando fornecedor:", { id: initialData.id, name, contactInfo, version });
        if (onSuccess) onSuccess(updated);
        showToast('Cadastro realizado com sucesso!', 'success');
      } else {
        console.log("Criando novo fornecedor");
        await createSupplier({
          name,
          contactInfo,
        }).unwrap();
         showToast('Cadastro realizado com sucesso!', 'success');
         if (onSuccess) onSuccess(created);
      }
      handleModal({ isOpen: false });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Erro ao salvar fornecedor:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.formContainer}>
        <View style={styles.formContainerLine}>
          <View style={Input.inputView}>
            <Text style={styles.label}>Nome do fornecedor</Text>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={errors.name ? Input.styleError : Input.style}
                  placeholder="Digite o nome do fornecedor"
                  placeholderTextColor={colors.neutral[4]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="name"
            />
            {errors.name && (
              <Text style={Input.errorText}>Nome do fornecedor é obrigatório</Text>
            )}
          </View>
        </View>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.formContainerLine}>
          <View style={Input.inputView}>
            <Text style={styles.label}>Número<Text style={styles.subLabel}> (opcional)</Text></Text>
            <Controller
              control={control}
              rules={{ required: false }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={errors.contactInfo ? Input.styleError : Input.style}
                  placeholder="Digite o número do fornecedor"
                  placeholderTextColor={colors.neutral[4]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={formatPhoneNumber(value)}
                />
              )}
              name="contactInfo"
            />
          </View>
        </View>
      </View>

      <View style={styles.handleIndicator} />

      <View style={styles.buttonContainer}>
        <View style={{ width: "100%", flex: 1 }}>
          <Button variant="neutral" onPress={() => handleModal({ isOpen: false })}>
            Cancelar
          </Button>
        </View>
        <View style={{ width: "100%", flex: 1.5 }}>
          <Button
  onPress={() => {
    console.log("Clicou no botão");
    handleSubmit(onSubmit)();
  }}
  isLoading={isCreating || isUpdating}
>
  {mode === "create" ? "Adicionar" : "Salvar"}
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
  formContainerLine: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
  },
  handleIndicator: {
    alignSelf: "center",
    width: "100%",
    marginTop: 50,
    height: 2,
    backgroundColor: colors.neutral[2],
    marginBottom: 12,
  },
  subLabel:{
    color: colors.neutral[6],
    marginBottom: 8,
    fontFamily: typography.fontFamily.regular,
  },
  label:{
    color: colors.neutral[7],
    marginBottom: 8,
    fontFamily: typography.fontFamily.semibold,
  },
});

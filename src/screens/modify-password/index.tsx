import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../../components/button";
import { Input } from "../../components/input/input.style";
import { colors } from "../../styles/colors";
import { useModifyPasswordMutation } from "../../services/me";
import { CustomInput } from "../../components/input";
import { useDialogNotification } from "../../hook/notification/hooks/actions";
import { ScreensType } from "../index.screens";

export default function ModifyPassword() {
  const navigation = useNavigation<NativeStackNavigationProp<ScreensType>>();
  const [modifyPassword, { isLoading }] = useModifyPasswordMutation();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { handleNotification } = useDialogNotification();

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const newPassword = watch("newPassword");

  const onSubmit = async (data: any) => {
    try {
      await modifyPassword({
        newPassword: data?.newPassword,
        oldPassword: data?.oldPassword,
      }).unwrap();
      handleNotification({
        isOpen: true,
        variant: "success",
        title: "Senha alterada!",
        message: "Senha alterada com sucesso.",
      });
    } catch (error) {
      handleNotification({
        isOpen: true,
        variant: "error",
        title: "Falha no acesso",
        message:
          "Ocorreu um erro ao tentar alterar a senha, verifique os dados e tente novamente.",
      });
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.form}>
          <View style={Input.inputView}>
            <Text style={Input.label}>Senha atual</Text>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  errors={errors}
                  placeholder="***********"
                  variant="password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  name={"oldPassword"}
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                />
              )}
              name="oldPassword"
            />
            {errors.name && (
              <Text style={Input.errorText}>Senha atual é obrigatório.</Text>
            )}
          </View>
          <View style={Input.inputView}>
            <Text style={Input.label}>Nova Senha</Text>
            <Controller
              control={control}
              rules={{
                required: true,
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  errors={errors}
                  placeholder="***********"
                  variant="password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  name={"newPassword"}
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                />
              )}
              name="newPassword"
            />
            {errors.name && (
              <Text style={Input.errorText}>
                Qauntidade de items é obrigatório.
              </Text>
            )}
          </View>
          <View style={Input.inputView}>
            <Text style={Input.label}>Confirmar nova senha</Text>
            <Controller
              control={control}
              rules={{
                required: true,
                validate: (value) =>
                  value === newPassword || "As senhas não coincidem.",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  errors={errors}
                  placeholder="***********"
                  variant="password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  name={"confirmNewPassword"}
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                />
              )}
              name="confirmNewPassword"
            />
            {errors.name && (
              <Text style={Input.errorText}>
                Qauntidade de items é obrigatório.
              </Text>
            )}
          </View>
        </View>
      </View>
      {/* Botão */}
      <View style={styles.footerButtom}>
        <Button onPress={handleSubmit(onSubmit)} isLoading={isLoading}>
          Alterar Senha
        </Button>
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
  bannerContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  banner: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  avatarWrapper: {},
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "#fff",
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: -10,
    backgroundColor: colors.primary["500"],
    borderRadius: 20,
    padding: 5,
  },
  cameraIcon: {
    width: 20,
    height: 20,
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
  form: {
    marginTop: 20,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: colors.neutral["600"],
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: colors.neutral["300"],
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutral["300"],
    marginVertical: 20,
  },
  button: {
    marginHorizontal: 20,
    backgroundColor: colors.primary["500"],
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});

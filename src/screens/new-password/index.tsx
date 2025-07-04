import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";

import { Input } from "../../components/input/input.style";
import Button from "../../components/button";
import { CustomInput } from "../../components/input";
import { colors } from "../../styles/colors";
import { styles } from "./new-password.style";
import BackIconV3 from "../../../assets/icons/backIcon-v3";
import { useRecoveryPasswordMutation } from "../../hook/auth/slice/auth-api";
import { ScreensType } from "../index.screens";
import Typography from "../../components/text";
import { useToast } from "../../hook/toast/useToast";
import { CustomToast } from "../../components/toast";

interface FormData {
  password: string;
  confirmPassword: string;
}

export default function NewPassword() {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isPasswordVisibleConfirmPassword, setIsPasswordVisibleConfirmPassword] = useState(false);

  const route = useRoute();
  const { accessToken } = route.params || ({} as any);

  const navigation = useNavigation<NativeStackNavigationProp<ScreensType>>();
  const { toast, showToast, hideToast } = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    watch,
  } = useForm<FormData>();

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const [recoveryPassword, { isLoading }] = useRecoveryPasswordMutation();
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const isFormValid = () => {
    return password && confirmPassword;
  };

  const onSubmit = async (data: FormData) => {
    try {
      await recoveryPassword({
        accessToken: accessToken,
        newPassword: data.password,
      }).unwrap();

      navigation.navigate("Login", {
        successMessage:
          "Senha resetada com sucesso. Acesse sua conta com a nova senha cadastrada.",
        successType: "success",
      });

    } catch (error: any) {
      console.log(error);
      showToast("Token vencido ou inválido", "danger")
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 80}
      style={{ flex: 1 }}
    >
      <View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {toast && (
            <CustomToast
              key={toast.id}
              message={toast.message}
              type={toast.type}
              onHide={hideToast}
            />
          )}
          <View style={styles.container}>
            <ImageBackground
              source={require("../../../assets/background.png")}
              style={styles.header}
              resizeMode="contain"
              imageStyle={{ left: 140 }}
            >
              <View style={styles.textHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <BackIconV3 />
                </TouchableOpacity>
                <Typography
                  variant="3XL"
                  family="semibold"
                  style={styles.title}
                >
                  Resetar senha
                </Typography>
              </View>
            </ImageBackground>

            <View style={styles.body}>
              <View style={styles.bodyContent}>
                <View style={Input.inputView}>
                  <Typography
                    variant="SM"
                    family="semibold"
                    style={Input.label}
                  >
                    Senha
                  </Typography>
                  <Controller
                    control={control}
                    name="password"
                    rules={{
                      required: "Senha é obrigatória",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                          "A senha deve ter pelo menos 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial.",
                      },
                    }}
                    render={({ field: { onChange, value } }) => (
                      <TouchableOpacity style={Input.inputPassword}>
                        <CustomInput
                          name="password"
                          errors={errors}
                          placeholder="Digite sua senha"
                          onChangeText={onChange}
                          clearErrors={clearErrors}
                          secureTextEntry={!isPasswordVisible}
                          focusedField={focusedField}
                          setFocusedField={setFocusedField}
                          value={value}
                        />
                        <Ionicons
                          onPress={() => setPasswordVisible(!isPasswordVisible)}
                          name={isPasswordVisible ? "eye" : "eye-off"}
                          size={20}
                          style={Input.iconEye}
                          color="gray"
                        />
                      </TouchableOpacity>
                    )}
                  />
                  {errors.password && (
                    <Typography
                      variant="SM"
                      family="regular"
                      style={Input.errorText}
                    >
                      {errors.password.message}
                    </Typography>
                  )}
                </View>

                <View style={Input.inputView}>
                  <Typography
                    variant="SM"
                    family="semibold"
                    style={Input.label}
                  >
                    Repita sua senha
                  </Typography>
                  <Controller
                    control={control}
                    name="confirmPassword"
                    rules={{
                      required: "Confirmação de senha é obrigatória",
                      validate: (value) =>
                        value === password || "As senhas não coincidem.",
                    }}
                    render={({ field: { onChange, value } }) => (
                      <TouchableOpacity style={Input.inputPassword}>
                        <CustomInput
                          name="confirmPassword"
                          errors={errors}
                          placeholder="Repita sua senha"
                          onChangeText={onChange}
                          secureTextEntry={!isPasswordVisibleConfirmPassword}
                          clearErrors={clearErrors}
                          focusedField={focusedField}
                          setFocusedField={setFocusedField}
                          value={value}
                        />
                        <Ionicons
                          onPress={() =>
                            setIsPasswordVisibleConfirmPassword(
                              !isPasswordVisibleConfirmPassword
                            )
                          }
                          name={
                            isPasswordVisibleConfirmPassword ? "eye" : "eye-off"
                          }
                          size={20}
                          style={Input.iconEye}
                          color="gray"
                        />
                      </TouchableOpacity>
                    )}
                  />
                  {errors.confirmPassword && (
                    <Typography
                      variant="SM"
                      family="regular"
                      style={Input.errorText}
                    >
                      {errors.confirmPassword.message}
                    </Typography>
                  )}
                </View>
                <View style={{ width: "100%", marginTop: 22 }}>
                  <Button
                    type="fill"
                    size="large"
                    isLoading={isLoading}
                    onPress={handleSubmit(onSubmit)}
                    disabled={isLoading || !isFormValid()}
                  >
                    Salvar Senha
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={{ justifyContent: "flex-end"}}>
          <Typography
            variant="SM"
            family="medium"
            style={{
              textAlign: "center",
              color: colors.neutral["500"],
              marginTop: 310,
            }}
          >
            Não possui conta?{" "}
            <Typography
              variant="SM"
              family="semibold"
              onPress={() => navigation.navigate("Register")}
              style={{ color: colors.brand.default }}
            >
              Registre-se
            </Typography>
          </Typography>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

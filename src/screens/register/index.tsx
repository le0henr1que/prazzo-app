import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ScreensType } from "../index.screens";
import { useCodeCheckMutation } from "../../hook/auth/slice/auth-api";
import { useDialogNotification } from "../../hook/notification/hooks/actions";
import { styles } from "./register.styles";
import { Input } from "../../components/input/input.style";
import { CustomInput } from "../../components/input";
import Button from "../../components/button";
import { colors } from "../../styles/colors";
import Typography from "../../components/text";
// import { useCodeCheckMutation } from "../../auth/slice/auth-api";
// import Button from "../../components/Button";
// import { Input } from "../../components/Input/Input.style";
// import { useDialogNotification } from "../../hook/notification/hooks/actions";
// import { colors } from "../../styles/colors";
// import { RootStackParamList } from "../HomeScreen";
// import { styles } from "./register.styles";
// import { CustomInput } from "../../components/Input";

export default function Register() {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [
    isPasswordVisibleConfirmPassword,
    setIsPasswordVisibleConfirmPassword,
  ] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<ScreensType>>();

  const [codeCheck, { isLoading, isError }] = useCodeCheckMutation();
  const { handleNotification } = useDialogNotification();
  const [focusedField, setFocusedField] = useState<string | null>(null);


  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    clearErrors,
  } = useForm();

  const password = watch("password");

  const formValues = watch();
  const isFormValid = () => {
    return Object.values(formValues).every(
      (value) => value !== undefined && value !== null && value !== ""
    );
  };

  const onSubmit = async (data: any) => {
    try {
      console.log(isError);
      const userId = await codeCheck({
        email: data.email,
        password: data.password,
        name: data.name,
      }).unwrap();

      navigation.navigate("ConfirmCode", {
        mode: "register",
        userId: userId?.id,
        email: data.email,
        name: data.name,
        password: data.password,
      } as never);
    } catch (error: any) {
      handleNotification({
        isOpen: true,
        variant: "error",
        title: "Falha no acesso",
        message: error.data.messages[0],
      });
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 0 }}>
        <View style={styles.container}>
          <ImageBackground
            source={require("../../../assets/background.png")}
            style={styles.header}
            resizeMode="contain"
            resizeMethod="auto"
            imageStyle={{ left: 140 }}
          >
            <View style={styles.textHeader}>
              <Image
                source={require("../../../assets/default/prazologofinal.png")}
                style={styles.image}
              />
              <Typography variant="3XL" family="semibold" style={styles.title}>
                Cadastre-se
              </Typography>
            </View>
          </ImageBackground>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <View style={Input.inputView}>
                <Typography variant="SM" family="semibold" style={Input.label}>
                  Nome do usuário
                </Typography>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                      errors={errors}
                      name="name"
                      placeholder="Digite seu nome"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      clearErrors={clearErrors}
                      focusedField={focusedField}
                      setFocusedField={setFocusedField}
                      value={value}
                    />
                  )}
                  name="name"
                />
                {errors.name && (
                  <Text style={Input.errorText}>Nome é obrigatório.</Text>
                )}
              </View>
              <View style={Input.inputView}>
                <Typography variant="SM" family="semibold" style={Input.label}>
                  Email
                </Typography>
                <Controller
                  control={control}
                  rules={{
                    required: "O e-mail é obrigatório.",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Email inválido",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                      errors={errors}
                      name="email"
                      placeholder="Digite seu email"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      clearErrors={clearErrors}
                      focusedField={focusedField}
                      setFocusedField={setFocusedField}
                      value={value}
                    />
                  )}
                  name="email"
                />
                {errors.email && (
                  <Text style={Input.errorText}>
                    {(errors as any).email.message}
                  </Text>
                )}
              </View>
              <View style={Input.inputView}>
                <Typography variant="SM" family="semibold" style={Input.label}>
                  Senha
                </Typography>
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
                    <TouchableOpacity style={Input.inputPassword}>
                      <CustomInput
                        errors={errors}
                        name="password"
                        placeholder="Digite sua senha"
                        secureTextEntry={!isPasswordVisible}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        clearErrors={clearErrors}
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
                  name="password"
                />
                {errors.password && (
                  <Text style={Input.errorText}>
                    {(errors as any).password.message || "Senha é obrigatória."}
                  </Text>
                )}
              </View>
              <View style={Input.inputView}>
                <Typography variant="SM" family="semibold" style={Input.label}>
                  Repita sua senha
                </Typography>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    validate: (value) =>
                      value === password || "As senhas não coincidem.",
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TouchableOpacity style={Input.inputPassword}>
                      <CustomInput
                        errors={errors}
                        name="confirmPassword"
                        placeholder="Digite sua senha"
                        secureTextEntry={!isPasswordVisibleConfirmPassword}
                        onBlur={onBlur}
                        onChangeText={onChange}
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
                  name="confirmPassword"
                />
                {errors.confirmPassword && (
                  <Text style={Input.errorText}>
                    {(errors as any).confirmPassword.message ||
                      "Senha é obrigatória."}
                  </Text>
                )}
              </View>

              <View style={{ width: "100%", marginTop: 22 }}>
                <Button
                  type="fill"
                  size="large"
                  isLoading={isLoading}
                  onPress={handleSubmit(onSubmit)}
                  disabled={isLoading || Object.keys(errors).length > 0 || !isFormValid()}
                >
                  Criar conta
                </Button>
              </View>
              <View />
              <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <Typography
                  variant="SM"
                  family="medium"
                  style={{
                    color: colors.neutral["500"],
                    textAlign: "center",
                    marginTop: 95,
                  }}
                >
                  Já possui conta?{" "}
                  <Typography
                    onPress={() => navigation.navigate("Login", {})}
                    variant="SM"
                    family="bold"
                    style={{
                      color: colors.brand.default,
                      textAlign: "center",
                    }}
                  >
                    Entrar
                  </Typography>
                </Typography>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

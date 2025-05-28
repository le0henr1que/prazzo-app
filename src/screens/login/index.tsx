import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../../components/button";
import { CustomInput } from "../../components/input";
import { Input } from "../../components/input/input.style";
import Typography from "../../components/text";
import { useAuth } from "../../hook/auth";
import { useDialogNotification } from "../../hook/notification/hooks/actions";
import { colors } from "../../styles/colors";
import { typography } from "../../styles/typography";
import { styles } from "./login.styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScreensType } from "../index.screens";

export default function Login() {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<ScreensType>>();
  const { handleNotification } = useDialogNotification();

  const { signIn, signInWithGoogle, isAuthenticated, user, isLoading } =
    useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm();

  const formValues = watch();
  const isFormValid = () => {
    return Object.values(formValues).every(
      (value) => value !== undefined && value !== null && value !== ""
    );
  };

  const googleLogin = async () => {
    try {
      await signInWithGoogle();
      // Remova: navigation.navigate("Home");
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
      handleNotification({
        isOpen: true,
        variant: "error",
        title: "Falha no acesso",
        message:
          "Ocorreu um erro ao tentar acessar o app com o Google. Tente novamente mais tarde.",
      });
    }
  };

  const onSubmit = async (data: any) => {
    try {
      await signIn({
        email: data?.email || "",
        password: data?.password || "",
      });
      // Remova: navigation.navigate("Home");
    } catch (e: any) {
      if (e.data?.statusCode === 401) {
        setError("email", {
          type: "manual",
          message: "Email ou senha incorretos",
        });
        return;
      }
      handleNotification({
        isOpen: true,
        variant: "error",
        title: "Falha no acesso",
        message:
          "Ocorreu um erro ao tentar acessar o app. Tente novamente mais tarde.",
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                source={require("../../../assets/logo-white.png")}
                style={styles.image}
              />

              <Typography
                variant="3XL"
                family="bold"
                style={{
                  color: "white",
                  width: "70%",
                  /* lineHeight: 41.6, */
                }}
              >
                Entre com sua conta
              </Typography>
            </View>
          </ImageBackground>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <View style={Input.inputView}>
                <Text style={Input.label}>Email</Text>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                      name="email"
                      errors={errors}
                      placeholder="Digite seu email"
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="email"
                />
                {errors.email && (
                  <Text style={Input.errorText}>
                    {typeof errors?.email?.message === "string" &&
                    errors?.email?.message === ""
                      ? "Email inválido"
                      : String(errors?.email?.message)}
                  </Text>
                )}
              </View>

              <View style={Input.inputView}>
                <Text style={Input.label}>Senha</Text>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TouchableOpacity style={Input.inputPassword}>
                      <CustomInput
                        errors={errors}
                        name="password"
                        placeholder="Digite sua senha"
                        secureTextEntry={!isPasswordVisible}
                        onChangeText={onChange}
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
                  <Text style={Input.errorText}>Senha é obrigatória.</Text>
                )}

                <View
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                    alignItems: "flex-end",
                    marginLeft: 15,
                  }}
                >
                  <Button
                    variant="white"
                    type="fill"
                    size="small"
                    onPress={() => navigation.navigate("ResetPassword")}
                  >
                    Esqueceu a senha?
                  </Button>
                </View>
              </View>
              <View style={{ width: "100%", marginTop: 22 }}>
                <Button
                  type="fill"
                  size="large"
                  isLoading={isLoading}
                  onPress={handleSubmit(onSubmit)}
                  disabled={Object.keys(errors).length > 0 || !isFormValid()}
                >
                  Entrar
                </Button>
              </View>
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  marginTop: 8,
                }}
              >
                <View style={styles.line} />
                <Text
                  style={{
                    color: colors.neutral["500"],
                    fontSize: 12,
                    fontWeight: "normal",
                    fontFamily: typography.fontFamily.regular,
                    lineHeight: 16,
                    marginHorizontal: 10,
                  }}
                >
                  Ou faça login com
                </Text>
                <View style={styles.line} />
              </View>
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: 15,
                }}
              >
                <View style={{ width: "48.5%", marginTop: 8 }}>
                  <Button
                    variant="neutral"
                    type="outlined"
                    onPress={googleLogin}
                  >
                    <Image source={require("../../../assets/google.png")} />
                    Google
                  </Button>
                </View>
                <View style={{ width: "48.5%", marginTop: 8 }}>
                  <Button
                    variant="neutral"
                    type="outlined"
                    onPress={() =>
                      console.log("Facebook login not implemented yet")
                    }
                  >
                    <Image source={require("../../../assets/facebook.png")} />
                    Facebook
                  </Button>
                </View>
              </View>
              <View />
              <View>
                <Typography
                  variant="XS"
                  family="regular"
                  style={{
                    marginBottom: 93,
                    textAlign: "center",
                    color: colors.neutral["500"],
                  }}
                >
                  Não possui conta?{" "}
                  <Typography
                    onPress={() => navigation.navigate("Register")}
                    variant="XS"
                    family="bold"
                    style={{
                      marginTop: 16,
                      textAlign: "center",
                      color: colors.primary["600"],
                    }}
                  >
                    Registre-se
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
